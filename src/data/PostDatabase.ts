import { BaseDatabase } from './BaseDatabase';
import { inputPostDTO } from '../dto/PostDTO';

export class PostDatabase extends BaseDatabase{

    public async createPost(body: inputPostDTO){
        
        await super.getConnection()
            .insert(body)
            .into(BaseDatabase.TABLE_POST);
        
        super.destroyConnection();
    };    
};