import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { Post } from '../models/Post';
import { PostDatabase } from '../data/PostDatabase';

export class PostController {
    public async createPost(req: Request, res: Response){
        try{
            const token = req.headers.auth as string;
            const getData = new Authenticator().getData(token);
            
            const id = new IdGenerator().generate();            
            
            const postData = {
                id: id,
                photo: req.body.photo,
                description: req.body.description,
                creationDate: new Date(),
                type: new Post().mapStringToType(req.body.type),
                author_Id: getData.id,
            }

            const postDB = await new PostDatabase().createPost(postData);

            res.status(200).send({
                message: "Post criado com sucesso."
            });
        }catch(error){
            res.status(400).send({ message: error.message });
        }
    }
}