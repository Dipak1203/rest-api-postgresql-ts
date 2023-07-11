import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

class JwtService{
    static sign(payload:string,expiry='1h',secret= process.env.JWT_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry});
    }
    static verify(token:string,secret= process.env.JWT_SECRET){
        return jwt.verify(token,secret);
    }
}

export default JwtService;