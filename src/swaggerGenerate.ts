import Dotenv from "dotenv";

const swaggerAutogen: any = require('swagger-autogen')();

Dotenv.config();

const config = {
    info: {
        version: "0.0.1",
        title: process.env.SERVER_NAME,
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: process.env.SERVER_HOST+":"+process.env.SERVER_PORT,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
};

const outputFile = './public/swaggerOutput.json';
const endpointsFiles = ['./src/controllers/routes'];

swaggerAutogen(outputFile, endpointsFiles, config);
