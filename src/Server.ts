import 'reflect-metadata';
import Express, { Application } from 'express';
import { createConnection, getConnectionOptions } from 'typeorm';
import Cors from 'cors';
import Dotenv from 'dotenv';
import Routes from './controllers/Routes';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import SwaggerUI from 'swagger-ui-express';

export default class Server {
    private readonly express: Application;

    constructor() {
        /* Setup dot env */
        Dotenv.config();
        this.express = Express();

        this.database();
        this.middlewares();
        this.routes();
    }

    public start(): void {
        const port = process.env.PORT || process.env.SERVER_PORT;
        this.express.set('port', port);
        this.express.listen(port, () => {
            console.log(`${process.env.SERVER_NAME} running on port ${port}.`);
        });
    }

    private middlewares(): void {
        /* Preparing middleware to parse different data formats */
        this.express.use(Express.json());
        this.express.use(Express.urlencoded({ extended: true }));
        /* Setup CORS, adding this options to all response headers. */
        this.express.use(Cors());
    }

    /* connect db. see .env for typeorm config */
    private database(): void {
        getConnectionOptions()
            .then((envOptions) => {
                const additionalOptions: any = { namingStrategy: new SnakeNamingStrategy() };
                if (process.env.CLEARDB_DATABASE_URL) { // heroku db url
                    additionalOptions.url = process.env.CLEARDB_DATABASE_URL;
                }
                return { ...envOptions, ...additionalOptions };
            })
            .then(createConnection)
            .then(() => console.log('DB Connect'))
            .catch(console.error)
        ;
    }

    private routes(): void {
        this.express.use(new Routes().getRouter());
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.express.use('/docs', SwaggerUI.serve, SwaggerUI.setup(require('../swaggerOutput.json')));
    }
}
