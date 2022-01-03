// Node imports
import express from 'express';
import bodyParser from 'body-parser';
// Own imports
import { ImageProcessing } from './controllers/v0/imageprocessing/imageprocessing';
import config from './config';

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