// Node imports
import express from 'express';
import bodyParser from 'body-parser';
// Own imports
import { ImageProcessing } from './controllers/v0/imageprocessing/imageprocessing';
import config from './config';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

// Sentry
Sentry.init({
  dsn: "https://31d0e00de00449d8928aed881812bb50@o1107973.ingest.sentry.io/6135323",
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

// Init the Express application
const app = express();
const port = config.PORT || 8082;

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/api/v0/', ImageProcessing);

/**
* Root endpoint
* Displays a simple message to the user
*/
app.get( "/", async ( req, res ) => {
  res.send("try GET /api/v0/filteredimage?image_url={{}}")
} );

/**
* Start the Server
*/
app.listen( port, () => {
  console.log( `server running http://localhost:${ port }` );
  console.log( `press CTRL+C to stop server` );
} );

throw new Error("Error to be captured by sentry");
