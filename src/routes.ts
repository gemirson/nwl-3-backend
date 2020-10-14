import express from "express";
import OrphanagesController from "./controllers/OrphanagesController";
import multer from 'multer';

import uploadConfig from './config/upload';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/orphanage", OrphanagesController.index);
routes.get("/orphanage/:id", OrphanagesController.show);
routes.post("/orphanage",upload.array('images'), OrphanagesController.create);

export default routes;
