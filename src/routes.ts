import express from "express";
import OrphanagesController from "./controllers/OrphanagesController";

const routes = express.Router();

routes.post("/orphanage", OrphanagesController.create);
routes.get("/orphanage", OrphanagesController.index);
routes.get("/orphanage/id:", OrphanagesController.show);

export default routes;
