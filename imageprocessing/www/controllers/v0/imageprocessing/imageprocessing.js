"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node imports
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
// Own imports
const util_1 = require("../../../util/util");
const config_1 = __importDefault(require("../../../config"));
// Create router
const router = express_1.Router();
/**
* Authentication middleware to protect endpoints
* @param req Request
* @param res Response
* @param next Next middleware
* @returns Next
*/
function requireAuth(req, res, next) {
    // Auth header not present error
    if (!req.headers || !req.headers.authorization)
        return res.status(401).send({ message: 'No authorization headers.' });
    // Token bearer   
    const token_bearer = req.headers.authorization.split(' ');
    if (token_bearer.length != 2)
        return res.status(401).send({ message: 'Malformed token.' });
    const token = token_bearer[1];
    // Verify JWT agains auth server
    try {
        axios_1.default.get(`${config_1.default.BACKEND_SERVER}api/v0/users/auth/verification`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(result => {
            if (result.status === 200)
                return next();
            else
                return res.status(401).send({ message: 'Failed to authenticate.' });
        })
            .catch(error => {
            return res.status(401).send({ message: 'Failed to authenticate.' });
        });
    }
    catch (error) {
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
router.get("/filteredimage", requireAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Get image_url
    const { image_url } = req.query;
    if (!image_url)
        return res.status(400).send({ message: 'Image url is mandatory' });
    // Process image_url
    const filteredpath = yield util_1.filterImageFromURL(image_url);
    return res.status(200).sendFile(filteredpath, err => {
        if (!err) {
            util_1.deleteLocalFiles([filteredpath]);
        }
    });
}));
// Export
exports.ImageProcessing = router;
//# sourceMappingURL=imageprocessing.js.map