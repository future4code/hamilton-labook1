import { BaseDatabase } from './BaseDatabase';
import { inputCommentDTO } from '../dto/CommentDTO';

export class CommentDatabase extends BaseDatabase {

    public async createComment(body:  inputCommentDTO): Promise<void> {

        await super.getConnection()
            .insert(body)
            .into(BaseDatabase.TABLE_COMMENT)

        super.destroyConnection();
    };
};