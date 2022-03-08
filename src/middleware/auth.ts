import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export default (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    //removing the Bearer part from the authorization header.
    const token = authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            result: false,
            error: 'Please provide a JWT token',
        });
    }
    try {
        const decoded: any = jwt.verify(
            token,
            process.env['JWT_SECRET'] as string
        );
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            result: false,
            error: 'JWT Verification Failed',
        });
    }
    return next();
};
