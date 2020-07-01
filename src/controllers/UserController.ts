import { Request, Response } from 'express'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { failureMessage } from '../messages';

export class UserController {
    public async signUp(req: Request, res: Response){
        try{
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const hashedPassword = await new HashManager().hash(userData.password);
            const id = new IdGenerator().generate();

            const signUp = await new UserDatabase().createUser({
                id,
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            });

            const token = new Authenticator().generateToken({ id });

            res.status(200).send({ token });
        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };

    public async login(req: Request, res: Response){
        try{
            const userData = {
                email: req.body.email,
                password: req.body.password
            };            

            const userLogged = await new UserDatabase().getUserByEmail(userData.email)

            if(!userLogged){
                throw new Error(failureMessage.login);
            }
            
            const authorization = await new HashManager().compare(
                userData.password, userLogged.password
            );

            if(authorization){
                const token = new Authenticator().generateToken({ id: userLogged.id });

                res.status(200).send(token);
            }else{
                throw new Error(failureMessage.login);
            };
        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };
};