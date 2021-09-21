import "reflect-metadata";
import Express, {Application} from 'express';
import {createConnection} from "typeorm";
import Dotenv from 'dotenv';
import BodyParser from "body-parser";
import Cors from './configs/Cors';
import Routes from './controllers/Routes';
import SwaggerUI from "swagger-ui-express";

const swaggerFile: any = require('../public/swaggerOutput.json');

const server: Application = Express();

/* Setup dot env */
Dotenv.config();

/* connect db. see .env for typeorm config */
createConnection().then(() => console.log("DB Connect"))

/* Setup CORS, adding this options to all response headers. */
server.use(Cors);

/* Preparing middleware to parse different data formats */
server.use(BodyParser.json()); // serverlication/json
server.use(BodyParser.urlencoded({ extended: true, })); // serverlication/x-www-form-urlencoded

/* Adding routes */
server.use(Routes);
server.use('/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerFile));

/* Server configurations */
server.set('port', process.env.SERVER_PORT);
server.listen(process.env.SERVER_PORT, () => {
    console.clear();
    console.log(`${process.env.SERVER_NAME} running on port ${process.env.SERVER_PORT}.`);
});