import { BaseDatabase } from "./BaseDatabase";
import { failureMessage } from '../messages';

export class FriendshipDatabase extends BaseDatabase {
    public async createFriendship(id_user1: string, id_user2: string): Promise<void>{

        const existsFriendship = await this.checkFriendship(id_user1, id_user2);

        if(existsFriendship){
            throw new Error(failureMessage.existsFriendship);
        };

        await super.getConnection()
            .insert({id_user1, id_user2})
            .into(BaseDatabase.TABLE_FRIENDSHIP);            
    };

    private async checkFriendship(user_id1: string, user_id2: string): Promise<boolean>{
        
        const result = await super.getConnection().raw(`
            SELECT * FROM ${BaseDatabase.TABLE_FRIENDSHIP}
            WHERE id_user1 = '${user_id1}' AND
            id_user2 = '${user_id2}' OR
            id_user2 = '${user_id2}' AND
            id_user1 = '${user_id1}'
        `);

        if(result[0][0]){
            return true;
        }else{
            return false;
        };    
    };

    public async deleteFriendship(id_user1: string, id_user2: string): Promise<number>{
        
        const result = await super.getConnection().raw(`
            DELETE FROM ${BaseDatabase.TABLE_FRIENDSHIP}
            WHERE id_user1 = '${id_user1}' AND
            id_user2 = '${id_user2}' OR
            id_user2 = '${id_user2}' AND
            id_user1 = '${id_user1}'
        `);

        return result[0].affectedRows;
    };
};