import { Request, Response } from 'express'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { failureMessage } from '../messages';
import { RefreshTokenDataBase } from '../data/RefreshTokenDataBase';

export class UserController {
    public async signUp(req: Request, res: Response){
        try{
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                device: req.body.device
            };

            const hashedPassword = await new HashManager().hash(userData.password);
            const id = new IdGenerator().generate();

            const signUp = await new UserDatabase().createUser({
                id,
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            });

            const refreshToken = new Authenticator().generateRefreshToken({
                id, device: userData.device
            });
            const refreshTokenDB = new RefreshTokenDataBase().createRefreshToken(
                {
                    token: refreshToken,
                    device: userData.device,
                    isActive: "true",
                    user_id: id
                }
            );

            const accessToken = new Authenticator().generateAccessToken({id})

            res.status(200).send({ accessToken, refreshToken });
        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };

    public async login(req: Request, res: Response){
        try{
            const userData = {
                email: req.body.email,
                password: req.body.password,
                device: req.body.device
            };

            const userLogged = await new UserDatabase().getUserByEmail(userData.email)

            if(!userLogged){
                throw new Error(failureMessage.login);
            };
            
            const authorization = await new HashManager().compare(
                userData.password, userLogged.password
            );

            if(authorization){
                const accessToken = new Authenticator().generateAccessToken(
                    { id: userLogged.id, device: userData.device });
                
                const refreshToken = new Authenticator().generateRefreshToken({
                    id: userLogged, device: userData.device
                });

                const refreshTokenDB = await new RefreshTokenDataBase().
                    createRefreshToken(
                        {
                            token: refreshToken,
                            device: userData.device,
                            isActive: "true",
                            user_id: userLogged.id
                        });
                        
                res.status(200).send({accessToken, refreshToken});
            }else{
                throw new Error(failureMessage.login);
            };
        }catch(error){
            res.status(400).send({ message: error.message });
        };
    };
};