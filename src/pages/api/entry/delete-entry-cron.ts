import Entry from "@/models/Entry";
import connectDB from "@/middlewares/db";
import { verifyToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req:NextApiRequest, res:NextApiResponse) => {
   
  
    if (req.method == "POST") {
        try {
            const { API_KEY } = req.body;
            if (API_KEY !== process.env.API_SECRET_KEY) {
                return res.status(401).json({ type: "error", message: 'Unauthorized' });
            }
            const entries = await Entry.deleteOne({shareCode: req.body.shareCode});;
            res.status(200).json({type: "success", message: "Entries deleted successfully"})
        }
        catch(error) {
            console.log(error);
            res.status(400).json({type: "error", message: "ERROR. "})
        }
       }

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);