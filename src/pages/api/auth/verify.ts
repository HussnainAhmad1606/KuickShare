
const User = require('@/models/User');
const { verifyToken } = require('@/utils/jwt');
import { NextApiRequest, NextApiResponse } from 'next';

const verifyHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    if (req.method == "POST") {
        console.log(req.body.token)
        const verification = verifyToken(req.body.token, process.env.JWT_SECRET);
        if (!verification) {
            return res.status(401).json({ type: "error", message: "Invalid Token" })
        }
        const user = {
            username: verification.username,
            email: verification.email
        }
      
        res.status(200).json({ type: "success", message: "Token verified", user: user});

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}

export default verifyHandler;
