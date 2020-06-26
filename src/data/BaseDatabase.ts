import knex from "knex";
import Knex from "knex";

export abstract class BaseDatabase{

    protected static TABLE_USER: string = "labook1_User";
    protected static TABLE_FRIENDSHIP: string = "labook1_Friendship";
    protected static TABLE_POST: string = "labook1_Post";
    protected static TABLE_LIKE: string = "labook1_Like";
    protected static TABLE_COMMENT: string = "labook1_Comment";
    protected static TABLE_REFRESH_TOKEN: string = "labook1_RefreshToken";

    private static connection: Knex | null = null;

    protected getConnection(): knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection:{
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME
                }
            });
        };

        return BaseDatabase.connection;
    };

    protected async destroyConnection():Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        };
    };
};