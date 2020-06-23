import express from 'express';
import { UserController } from '../controllers/UserController';

export const userRouter = express.Router();

userRouter.post('/signUp', new UserController().signUp);
userRouter.post('/login', new UserController().login);