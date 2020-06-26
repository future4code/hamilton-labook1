import { BaseDatabase } from "./BaseDatabase";
import { inputRefreshTokenDTO } from "../dto/RefreshTokenDTO";


export class RefreshTokenDataBase extends BaseDatabase{

    public async createRefreshToken(body: inputRefreshTokenDTO){

        await super.getConnection().raw(`
            INSERT INTO labook1_RefreshToken(token, device, isActive, user_id)
            VALUES( "vsCode", "vscode", "TRUE", "2630c1c8-4104-49ed-a49e-aebb957d2c7b")
        `);

        super.destroyConnection();
    };

    public async getRefreshToken(token:string):Promise<any>{
        const result = await super.getConnection().raw(`SELECT * FROM ${BaseDatabase.TABLE_REFRESH_TOKEN}
        WHERE token = "${token}" `);

        const retrievedToken = result[0][0];

        super.destroyConnection();
        return {
            token: retrievedToken.token,
            device: retrievedToken.device,
            isActive: retrievedToken.isActive,
            user_id: retrievedToken.user_id
        };
    };

    public async deleteRefleshToken(token:string):Promise<void>{
        await super.getConnection().raw(`
        DELETE FROM ${BaseDatabase.TABLE_REFRESH_TOKEN} WHERE token = "${token}"`)

        super.destroyConnection();
    };
};