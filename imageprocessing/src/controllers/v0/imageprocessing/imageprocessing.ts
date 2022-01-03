// Node imports
import { Router, Request, Response } from 'express';
import { NextFunction } from 'connect';
import axios from 'axios';
// Own imports
import {filterImageFromURL, deleteLocalFiles} from '../../../util/util';
import config from '../../../config';

// Create router
const router: Router = Router();

/**
* Authentication middleware to protect endpoints
* @param req Request
* @param res Response
* @param next Next middleware
* @returns Next
*/
function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Auth header not present error
  if (!req.headers || !req.headers.authorization) return res.status(401).send({ message: 'No authorization headers.' });
  // Token bearer   
  const token_bearer = req.headers.authorization.split(' ');
  if(token_bearer.length != 2) return res.status(401).send({ message: 'Malformed token.' });   
  const token = token_bearer[1];
  // Verify JWT agains auth server
  try {
    axios.get(`${config.BACKEND_SERVER}api/v0/users/auth/verification`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(result => {
      if (result.status === 200) return next(); 
      else return res.status(401).send({ message: 'Failed to authenticate.' });    
    })
    .catch(error => {
      return res.status(401).send({ message: 'Failed to authenticate.' });
    });
  } catch (error) {
    return res.status(401).send({ message: 'Failed to authenticate.' });
  }
}

/**
* GET /filteredimage?image_url={{URL}}
* Endpoint to filter an image from a public url.
* QUERY PARAMATERS
*   image_url: URL of a publicly accessible image
* RETURNS
*   the filtered image file
*/
router.get( "/filteredimage", requireAuth, async ( req: Request, res: Response ) => {
  // Get image_url
  const { image_url } = req.query;
  if (!image_url) return res.status(400).send({ message: 'Image url is mandatory'});
  // Process image_url
  const filteredpath = await filterImageFromURL(image_url);
  return res.status(200).sendFile(filteredpath, err => {
    if (!err) {
      deleteLocalFiles([filteredpath]);
    }
  }); 
});

// Export
export const ImageProcessing: Router = router;