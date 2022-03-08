import express from 'express';

// importing routes
import userMeRoute from './routes/user/me.route';
import signupRoute from './routes/signup.route';
import signinRoute from './routes/signin.route';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env['PORT'] || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/user/me', userMeRoute);

app.listen({ port }, () => {
    console.log(`App listening on port ${port}.`);
});
