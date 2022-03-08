import express, { Response } from 'express';
import auth from '../../middleware/auth';
import usersData from './../../database/users.json';

const router = express.Router();

export default router.use('/', auth, (req: any, res: Response) => {
    const user = usersData.findIndex(
        (ele) => ele.username === req.user.username
    );

    res.status(200).json({
        result: true,
        data: {
            fname: usersData[user]?.fname,
            lname: usersData[user]?.lname,
            password: usersData[user]?.password,
        },
    });
});
