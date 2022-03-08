import express from 'express';
import usersData from './../database/users.json';
import jwt from 'jsonwebtoken';
import { verify } from './../tools/hash';

const router = express.Router();

export default router.use('/', async (req, res) => {
    const { username, password }: { username: string; password: string } =
        req.body;
    
    const user = usersData.findIndex((ele) => ele.username === username);

    if (!username || !password) {
        res.status(400).json({
            result: false,
            error: 'Please provide username and password',
        });
    } else if (user === -1) {
        res.status(401).json({
            result: false,
            error: 'Invalid username/password',
        });
    } else {
        if (
            user !== -1 &&
            (await verify(password, usersData[user]?.password as string))
        ) {
            res.status(200).json({
                result: true,
                jwt: jwt.sign(
                    { username, firstname: usersData[user]?.fname },
                    process.env['JWT_SECRET'] as string
                ),
                message: 'Signin success',
            });
        } else {
            res.status(401).json({
                result: false,
                error: 'Invalid username/password',
            });
        }
    }
});

