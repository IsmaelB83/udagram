// Node Imports
import express from 'express';
import { sequelize } from './sequelize';
import bodyParser from 'body-parser';
// Own Imports
import { IndexRouter } from './controllers/v0/index.router';
import { V0MODELS } from './controllers/v0/model.index';
import config from "./config";

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

// Sentry
Sentry.init({
    dsn: "https://df356a4e98a14f43b018ac6a1f4672e4@o1107973.ingest.sentry.io/6135308",  
    tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});

setTimeout(() => {
    try {        
        console.log("Test sentry")
    } catch (e) {
        Sentry.captureException(e);
    } finally {
        transaction.finish();
    }
}, 99);

// Constants
const ENV = config.ENV;

// Initialize sequelize
sequelizeConfig();

// Create express
const app = express();
const port = ENV.PORT || 8080;

// Middlewares
app.use(bodyParser.json());

// CORS Should be restricted
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Routes
app.use('/api/v0/', IndexRouter);
app.get( "/", async (req, res) => res.send( "/api/v0/" ));

// Start the Server
app.listen( port, () => {
    console.log( `server running http://localhost:${ port }` );
    console.log( `press CTRL+C to stop server` );
} );

// Sequelize
async function sequelizeConfig (): Promise<void> {
    console.log('Starting sequelize...')
    await sequelize.authenticate();
    await sequelize.addModels(V0MODELS);
    if (ENV.ENV === 'DEV') {
        await sequelize.sync({ force: true, logging: console.log });
    }
    console.log('Sequelize configuration... OK');
}