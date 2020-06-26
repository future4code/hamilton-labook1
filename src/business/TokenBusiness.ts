import { RefreshTokenDataBase } from "../data/RefreshTokenDataBase";


export class TokenBusiness{

    public async handleLoginToken(token: string){


        const retrievedToken = new RefreshTokenDataBase().getRefreshToken(token);

        if(retrievedToken){
            const cleanTokenDB = new RefreshTokenDataBase().deleteRefleshToken(token);
        };

        

    };

};