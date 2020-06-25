import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { LikeDatabase } from '../data/LikeDatabase';
import { LikeBusiness } from '../business/LikeBusiness';

export class LikeController {
    public async likePost(req: Request, res: Response) {
        try{
            const token = req.headers.auth as string;
            const getData = new Authenticator().getData(token);

            const userData = {
                user_id: getData.id,
                post_id: req.body.post_id,
                vote_direction: req.body.vote_direction                
            };

            const likeBusiness = await new LikeBusiness().votePost(userData);

            res.status(200).send({message: "Voto registrado."});
        }catch(error){
            res.status(400).send({
                message: error.message
            });
        };
    };
};