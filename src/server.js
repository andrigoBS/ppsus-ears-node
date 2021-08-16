const server = require('express')();

/* Execute documentation generator and then create server */
require('./configs/swagger').then(() => {
    /* Setup dot env */
    require('dotenv').config();

    /* Setup CORS, adding this options to all response headers. */
    server.use(require('./configs/cors'));

    /* Preparing middleware to parse different data formats */
    const bodyParser = require('body-parser');
    server.use(bodyParser.json()); // serverlication/json
    server.use(bodyParser.urlencoded({ extended: true, })); // serverlication/x-www-form-urlencoded

    /* Adding routes */
    server.use('/', require('./controllers/routes'));

    /* Server configurations */
    server.set('port', process.env.SERVER_PORT);
    server.listen(process.env.SERVER_PORT, () => {
        console.clear();
        console.log(`${process.env.SERVER_NAME} running on port ${process.env.SERVER_PORT}.`);
    });

    module.exports = server;
})
