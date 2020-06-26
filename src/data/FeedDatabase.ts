import { BaseDatabase } from './BaseDatabase';

export class FeedDatabase extends BaseDatabase {

    public async getFeed(id_logged_user: string){
        
        const result = await super.getConnection().raw(`
            SELECT * FROM ${BaseDatabase.TABLE_POST}
            INNER JOIN ${BaseDatabase.TABLE_FRIENDSHIP}            
            ON author_Id = ${BaseDatabase.TABLE_FRIENDSHIP}.id_user1            
            OR author_Id = ${BaseDatabase.TABLE_FRIENDSHIP}.id_user2            
            WHERE ${BaseDatabase.TABLE_FRIENDSHIP}.id_user1 = '${id_logged_user}'            
            OR ${BaseDatabase.TABLE_FRIENDSHIP}.id_user2 = '${id_logged_user}'
            ORDER BY creationDate DESC
        `);
        return result[0];
    };

    public async getFeedByType(id_logged_user: string, type: string){        
            
        const result = await super.getConnection().raw(`
            SELECT * FROM ${BaseDatabase.TABLE_POST}
            INNER JOIN ${BaseDatabase.TABLE_FRIENDSHIP}            
            ON author_Id = ${BaseDatabase.TABLE_FRIENDSHIP}.id_user1            
            OR author_Id = ${BaseDatabase.TABLE_FRIENDSHIP}.id_user2            
            WHERE ${BaseDatabase.TABLE_FRIENDSHIP}.id_user1 = '${id_logged_user}'
            AND type = '${type}'
            OR ${BaseDatabase.TABLE_FRIENDSHIP}.id_user2 = '${id_logged_user}'
            AND type = '${type}'
            ORDER BY creationDate DESC
        `);
        return result[0];
    };

    public async getPagedFeed(id_logged_user: string, page: number){
        
        const limit = 5
        const selectedPage = page * limit
        
        const result = await super.getConnection().raw(`
            SELECT * FROM ${BaseDatabase.TABLE_POST}
            INNER JOIN ${BaseDatabase.TABLE_FRIENDSHIP}            
            ON author_Id = ${BaseDatabase.TABLE_FRIENDSHIP}.id_user1            
            OR author_Id = ${BaseDatabase.TABLE_FRIENDSHIP}.id_user2            
            WHERE ${BaseDatabase.TABLE_FRIENDSHIP}.id_user1 = '${id_logged_user}'            
            OR ${BaseDatabase.TABLE_FRIENDSHIP}.id_user2 = '${id_logged_user}'
            ORDER BY creationDate DESC
            LIMIT ${limit} OFFSET ${selectedPage}
        `);
        return result[0];
    };
};