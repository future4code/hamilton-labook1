import { BaseDatabase } from './BaseDatabase';
import { inputLikeDTO } from '../dto/LikeDTO';

export class LikeDatabase extends BaseDatabase {

    public async insertVote(body: inputLikeDTO): Promise<void> {
        
        await super.getConnection()
            .insert(body)
            .into(BaseDatabase.TABLE_LIKE)

        super.destroyConnection();
    };

    public async checkLike(post_id: string, user_id: string): Promise<any> {

        const result = await super.getConnection().raw(`
            SELECT * FROM ${BaseDatabase.TABLE_LIKE}
            WHERE post_id = '${post_id}' AND
            user_id = '${user_id}'
        `);

        return result[0][0];
    };

    public async alterVote(body: inputLikeDTO): Promise<void> {

        await super.getConnection().raw(`
            UPDATE ${BaseDatabase.TABLE_LIKE}
            SET vote_direction = '${body.vote_direction}'
            WHERE post_id = '${body.post_id}'
            AND
            user_id = '${body.user_id}'
        `);
    };

    public async deleteVoteRow(body: inputLikeDTO): Promise<void> {

        await super.getConnection().raw(`
            DELETE FROM ${BaseDatabase.TABLE_LIKE}
            WHERE post_id = '${body.post_id}' AND
            user_id = '${body.user_id}'
        `);
    };
};