export type AuthUser = { password: string, login: string };

export class LoginHelper {
    public static basicAuthToObj(bearerHeader?: string): AuthUser {
        if (!bearerHeader) { throw new Error('Base64 Token Auth not found'); }

        const [login, password] = Buffer.from(bearerHeader.replace('Basic ', ''), 'base64').toString().split(':');

        return { login, password };
    }
}
