import express from 'express';
import { FriendshipController } from '../controllers/FriendshipController';

export const friendshipRouter = express.Router();

friendshipRouter.post('/:id/create', new FriendshipController().createFriendship);
friendshipRouter.post('/:id/delete', new FriendshipController().deleteFriendship);