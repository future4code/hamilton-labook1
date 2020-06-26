import { BaseDatabase } from "./BaseDatabase";
import { signUpInputDTO } from '../dto/UserDTO';

export class UserDatabase extends BaseDatabase {    
    
    public async createUser(body: signUpInputDTO){        
        try{
            await super.getConnection()
                .insert(body)
                .into(BaseDatabase.TABLE_USER);

            super.destroyConnection();            
        }catch(error){
            throw new Error(error.message);
        };
    };

    public async getUserByEmail(email: string){
        try{
            const user = await super.getConnection()
                .select("*")
                .from(BaseDatabase.TABLE_USER)
                .where({email});

            // super.destroyConnection();

            return user[0];
        }catch(error){
            throw new Error(error.message);
        };
    };
};