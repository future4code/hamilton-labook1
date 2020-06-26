import { Request, Response } from 'express'
import { FeedDatabase } from '../data/FeedDatabase';
import { Authenticator } from '../services/Authenticator';

export class FeedController {
    public async getFeed(req: Request, res: Response){
        try{

            const token = req.headers.auth as string;
            const getData = new Authenticator().getData(token)

            const feedDB = await new FeedDatabase().getFeed(getData.id);

            res.status(200).send(feedDB);

        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };
    
    public async getFeedByType(req: Request, res: Response){
        try{
            const type = req.query.postType as string;

            const token = req.headers.auth as string;
            const getData = new Authenticator().getData(token)

            const feedDB = await new FeedDatabase().getFeedByType(getData.id, type);

            res.status(200).send(feedDB);

        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };

    public async getPagedFeed(req: Request, res: Response){
        try{

            const token = req.headers.auth as string;
            const getData = new Authenticator().getData(token)

            const page = Number(req.query.page);
            const feedDB = await new FeedDatabase().getPagedFeed(getData.id, page);

            res.status(200).send(feedDB);

        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };
};