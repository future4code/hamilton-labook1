import express from 'express';
import { PostController } from '../controllers/PostController';

export const postRoutes = express.Router();

postRoutes.post('/create', new PostController().createPost);