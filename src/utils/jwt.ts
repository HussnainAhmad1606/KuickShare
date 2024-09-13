import jwt from 'jsonwebtoken';

export const signToken = (payload:any, secret:any, expiresIn:any) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token:string, secret:string) => {
  return jwt.verify(token, secret);
};