import Entry from "@/models/Entry";
import connectDB from "@/middlewares/db";
import bcrypt from 'bcryptjs';

import { NextApiRequest, NextApiResponse } from "next";
const crypto = require('crypto');

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');


// Function to encrypt text using AES-256-GCM
function decryptText(encryptedText:any, iv:any, authTag:any) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
const handler = async (req:NextApiRequest, res:NextApiResponse) => {
   
  
    if (req.method == "POST") {

        const entry = await Entry.findOne({shareCode: req.body.shareCode});
        const isValidPassword = await bcrypt.compare(req.body.passcode, entry?.passcodeHash);

        
  if (!isValidPassword) {
    return res.status(401).json({ type: "error", message: 'Wrong Passcode' });
  }

  const content = decryptText(entry?.encryptedContent, entry?.iv, entry?.authTag);
  const data = {
    title: entry?.title,
    type: entry?.type,
    content: content,
    createdAt: entry?.createdAt,
    updatedAt: entry?.updatedAt,
  };

  return res.status(200).json({ type: "success", entry: data });

    }

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);