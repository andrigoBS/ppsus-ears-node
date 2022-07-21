export default class LoginHelper {
    public static basicAuthToObj(bearerHeader?: string): {login: string, password: string} {
        if (!bearerHeader) { throw new Error('Base64 Token Auth not found'); }

        const [login, password] = atob(bearerHeader.replace('Basic ', '')).split(':');

        return { login, password };
    }
}
