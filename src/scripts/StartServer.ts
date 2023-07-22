import fs from 'fs';
import Server from '../Server';

let envFileName = '.env.development';

if(fs.existsSync('.env.production')) {
    envFileName = '.env.production';
}

if(fs.existsSync('.env')) {
    envFileName = '.env';
}

new Server()
    .setUpDotEnv(envFileName)
    .configDatabase()
    .configMiddlewares()
    .createRoutes()
    .start();
