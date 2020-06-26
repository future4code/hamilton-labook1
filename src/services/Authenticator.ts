import * as jwt from "jsonwebtoken";

export class Authenticator{
    private static REFRESH_EXPIRES_IN = "1y";
    private static ACCESS_EXPIRES_IN = "1min";

    public generateRefreshToken(data: AuthenticatorData):string{
        return jwt.sign(data, process.env.JWT_KEY as string,{
            expiresIn: Authenticator.REFRESH_EXPIRES_IN,
        });
    };

    public generateAccessToken(data: AuthenticatorData):string{
        return jwt.sign(data, process.env.JWT_KEY as string,{
            expiresIn: Authenticator.ACCESS_EXPIRES_IN,
        });
    };

    public getData (token: string): AuthenticatorData {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
        const result = {
            id: payload.id
        };
        return result;
    };
}

export interface AuthenticatorData{
    id: string;
    device?: string
};