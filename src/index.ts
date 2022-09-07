import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";

import errorHandler from "./middlewares/errorHandlingMiddleware";
import router from "./routers/indexRouter";

const server = express();
server.use(cors());
server.use(json());
dotenv.config();

server.use(router);
server.use(errorHandler);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log("server running on port " + PORT);
})