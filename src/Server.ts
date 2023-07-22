import Cors from 'cors';
import Dotenv from 'dotenv';
import Express, { Application } from 'express';
import 'reflect-metadata';
import SwaggerUI from 'swagger-ui-express';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Routes from './controllers/Routes';
import SwaggerGenerateHelper from './helpers/SwaggerGenerateHelper';

export default class Server {
    private readonly express: Application = Express();

    public start(port?: string|number): Server {
        port = port || process.env.PORT || process.env.SERVER_PORT;
        this.express.set('port', port);
        this.express.listen(port, () => {
            console.log(`${process.env.SERVER_NAME} running on port ${port}.`);
        });

        return this;
    }

    public setUpDotEnv(envFileName: string): Server {
        Dotenv.config({ path: envFileName });
        return this;
    }

    public configMiddlewares(): Server {
        /* Preparing middleware to parse different data formats */
        this.express.use(Express.json());
        this.express.use(Express.urlencoded({ extended: true }));
        /* Setup CORS, adding this options to all response headers. */
        this.express.use(Cors());

        return this;
    }

    /* connect db. see .env for typeorm config */
    public configDatabase(): Server {
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

        return this;
    }

    public createRoutes(): Server {
        const routes = new Routes();
        this.express.use(routes.getRouter());

        const docs = new SwaggerGenerateHelper().getBaseSwagger(routes.getDocs());
        this.express.use('/docs', SwaggerUI.serve, SwaggerUI.setup(docs));

        return this;
    }
}
