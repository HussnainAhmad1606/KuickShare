import Entry from "@/models/Entry";
import connectDB from "@/middlewares/db";
import { verifyToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req:NextApiRequest, res:NextApiResponse) => {
   
  
    if (req.method == "POST") {
        try {
            const { authorization } = req.headers;
            const token = authorization?.split(' ')[1];
          const decoded = verifyToken(token, process.env.JWT_SECRET);
          const { username } = decoded;
            const entries = await Entry.deleteOne({username: username, shareCode: req.body.shareCode});;
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