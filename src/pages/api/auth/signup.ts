import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from "@/middlewares/db";

const SECRET_KEY = process.env.JWT_SECRET;
import { NextApiRequest, NextApiResponse } from 'next';
const signupHandler = async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
try {
    
  const { username, password,email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({username, email,password:hashedPassword})
  await user.save();


  res.status(200).json({ type: "success", message: "Account created successfully" });

}
  catch(err:any) {
    return res.status(200).json({type: "error", message: `${err.code}`, errorCode: err.code })
}
};

export default connectDB(signupHandler);