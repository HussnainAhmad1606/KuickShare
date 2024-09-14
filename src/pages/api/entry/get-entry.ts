import Entry from "@/models/Entry";
import connectDB from "@/middlewares/db";
const bcrypt = require('bcrypt');
const crypto = require('crypto');
import { NextApiRequest, NextApiResponse } from "next";
const saltRounds = 10;

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
const iv = crypto.randomBytes(16);  // 128-bit IV (Initialization Vector)
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomString() {
    let tempResult = '';
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      tempResult += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return tempResult;
  }

// Function to encrypt text using AES-256-GCM
function encryptText(plainText:String) {
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    let encryptedText = cipher.update(plainText, 'utf8', 'hex');
    encryptedText += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
        encryptedData: encryptedText,
        iv: iv.toString('hex'),
        authTag: authTag
    };
}

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
   
  
    if (req.method == "POST") {
        const entry = await Entry.findOne({shareCode: req.body.shareCode});
        if (entry) {
            if (entry.passcodeHash == "") {
                res.status(200).json({type: "success", isProtected: false, entry: entry});
            }
            else {
                res.status(200).json({type: "success", isProtected: true});
            }
        }
        else {
            res.status(400).json({type: "error", message: "ERROR. "})
        }
       }

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);