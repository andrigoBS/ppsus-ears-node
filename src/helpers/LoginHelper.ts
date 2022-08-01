export type AuthUser = { password: string, login: string };

export class LoginHelper {
    public static basicAuthToObj(bearerHeader?: string): AuthUser {
        if (!bearerHeader) { throw new Error('Base64 Token Auth not found'); }

        const [login, password] = atob(bearerHeader.replace('Basic ', '')).split(':');

        return { login, password };
    }
}
