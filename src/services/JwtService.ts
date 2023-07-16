import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: string;
  role: string;
}

class JwtService {
  static sign(
    payload: JwtPayload,
    expiresIn: string = '1h',
    secret: string = process.env.JWT_SECRET as string
  ) {
    const options: SignOptions = {
      expiresIn,
    };
    return jwt.sign(payload, secret, options);
  }

  static verify(token: string, secret: string = process.env.JWT_SECRET as string): JwtPayload {
    return jwt.verify(token, secret) as JwtPayload;
  }
}

export default JwtService;
