import express from 'express';
import { FeedController } from '../controllers/FeedController';

export const feedRoutes = express.Router();

feedRoutes.get('/', new FeedController().getFeed);
feedRoutes.get('/type', new FeedController().getFeedByType)
feedRoutes.get('/paged', new FeedController().getPagedFeed);