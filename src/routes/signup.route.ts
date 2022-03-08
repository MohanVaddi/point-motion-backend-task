import express from 'express';
import UserInterface from '../Interfaces/userInterface';
import usersData from '../database/users.json';
import fs from 'fs';
import { hash } from '../tools/hash';
import path from 'path';

const router = express.Router();

const userAlreadyExists = (
    usersData: UserInterface[],
    username: string
): boolean => {
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i]?.username === username) {
            return true;
        }
    }
    return false;
};

export default router.use('/', async (req, res) => {
    const { username, password, fname, lname }: UserInterface = req.body;

    if (!username || !password || !fname || !lname) {
        res.status(400).json({
            result: false,
            error: "fields can't be empty",
        });
    } else if (
        username.trim() === '' ||
        password.trim() === '' ||
        fname.trim() === '' ||
        lname.trim() === ''
    ) {
        res.status(400).json({
            result: false,
            error: "fields can't be empty",
        });
    } else if (!/^[a-z]{4,}$/.test(username.trim())) {
        res.status(400).json({
            result: false,
            error: 'username check failed',
        });
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(password.trim())
    ) {
        res.status(400).json({
            result: false,
            error: 'password check failed',
        });
    } else if (!/^[a-zA-Z]+$/.test(fname.trim())) {
        res.status(400).json({
            result: false,
            error: 'fname or lname check failed',
        });
    } else if (!/^[a-zA-Z]+$/.test(lname.trim())) {
        res.status(400).json({
            result: false,
            error: 'fname or lname check failed',
        });
    } else if (userAlreadyExists(usersData, username)) {
        res.status(400).json({
            result: false,
            error: 'username already exists',
        });
    } else {
        const hashedPass = await hash(password);
        usersData.push({
            username,
            password: hashedPass as string,
            fname,
            lname,
        });

        try {
            fs.writeFileSync(
                path.join(__dirname, `../database/users.json`),
                JSON.stringify(usersData)
            );
        } catch (err) {
            console.log(err);
        }

        res.status(200).json({
            result: true,
            message: 'SignUp success. Please proceed to Signin',
        });
    }
});
