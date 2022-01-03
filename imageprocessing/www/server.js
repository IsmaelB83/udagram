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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// Own imports
const imageprocessing_1 = require("./controllers/v0/imageprocessing/imageprocessing");
const config_1 = __importDefault(require("./config"));
// Init the Express application
const app = express_1.default();
const port = config_1.default.PORT || 8082;
// Middlewares
app.use(body_parser_1.default.json());
// Routes
app.use('/api/v0/', imageprocessing_1.ImageProcessing);
/**
* Root endpoint
* Displays a simple message to the user
*/
app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("try GET /api/v0/filteredimage?image_url={{}}");
}));
/**
* Start the Server
*/
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
});
//# sourceMappingURL=server.js.map