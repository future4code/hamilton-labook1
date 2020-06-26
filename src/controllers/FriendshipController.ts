import { Request, Response } from 'express'
import { FriendshipDatabase } from '../data/FriendshipDatabase';
import { Authenticator } from '../services/Authenticator';
import { successMessage, failureMessage } from '../messages';

export class FriendshipController {
    public async createFriendship(req: Request, res: Response){
        try{
            const token = req.headers.auth as string;
            const getData = new Authenticator().getData(token);
            
            const user_id1 = getData.id;
            const user_id2 = req.params.id;            

            const friendshipDB = await new FriendshipDatabase().createFriendship(user_id1, user_id2);

            res.status(200).send(successMessage.friendship);
        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };

    public async deleteFriendship(req: Request, res: Response){
        try{
            const token = req.headers.auth as string;
            const getData = new Authenticator().getData(token);
            
            const user_id1 = getData.id;
            const user_id2 = req.params.id;
            
            const deleteFriendship = await new FriendshipDatabase().deleteFriendship(user_id1, user_id2);
            
            if(deleteFriendship === 0){
                throw new Error(failureMessage.friendshipDelete);
            };

            res.status(200).send(successMessage.friendshipDelete);
        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };
};