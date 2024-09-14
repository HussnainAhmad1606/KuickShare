import Entry from "@/models/Entry";
import connectDB from "@/middlewares/db";

import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req:NextApiRequest, res:NextApiResponse) => {
   
  
    if (req.method == "POST") {
        
       }

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);