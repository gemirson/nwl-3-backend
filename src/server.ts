import express from "express";
import routes from "./routes";
import cors from "cors";
import path from 'path';
import 'express-async-errors';

const app = express();

import "./database/connection";
import  errorHandler from './errors/handler';
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads',express.static(path.join(__dirname,'..','uploads')));
app.use(errorHandler);

app.listen(3434, () => {
  console.log("[Server]", "Server running");
});
