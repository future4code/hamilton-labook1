import express from 'express';
import { CommentController } from '../controllers/CommentController';

export const commentRoutes = express.Router();

commentRoutes.post('/', new CommentController().createComment);