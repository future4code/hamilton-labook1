import express from 'express';
import { LikeController } from '../controllers/LikeController';

export const likeRoutes = express.Router();

likeRoutes.post('/', new LikeController().likePost);