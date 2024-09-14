import Entry from "@/models/Entry";
import connectDB from "@/middlewares/db";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    if (req.method === "POST") {
       
        const entry = await Entry.findOne({ shareCode: req.body.shareCode });
    
        if (entry) {
          
            await Entry.updateOne({ shareCode: req.body.shareCode }, { $inc: { accessCount: 1 } });
    
           
            if (entry.accessCount + 1 >= entry.maxAccessCount) {
                
                await Entry.updateOne({ shareCode: req.body.shareCode }, { $set: { isDeleted: true } });
                console.log("Max Access Count Reached")
                res.status(200).json({ type: "error", message: "Max Access Count Reached" });
            }
        } else {
            res.status(404).json({ type: "error", message: "Entry not found" });
        }
    }
    else {
        res.status(400).json({ type: "error", message: "ERROR" });
    }
}
export default connectDB(handler);