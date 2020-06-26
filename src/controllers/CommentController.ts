import { Request, Response } from 'express';
import { IdGenerator } from '../services/IdGenerator';
import { Authenticator } from '../services/Authenticator';
import { CommentDatabase } from '../data/CommentDatabase';
import { successMessage } from '../messages';

export class CommentController {
    public async createComment(req: Request, res: Response) {
        try{
            const token = req.headers.auth as string;
            
            const getData = new Authenticator().getData(token);
            
            const id = new IdGenerator().generate()

            const commentData = {
                id,
                user_id: getData.id,
                post_id: req.body.post_id,
                message: req.body.message
            };

            const commentDB = await new CommentDatabase().createComment(commentData);

            res.status(200).send(successMessage.createComment);
        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };
};