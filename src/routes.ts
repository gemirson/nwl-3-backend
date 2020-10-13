import express from "express";
import OrphanagesController from "./controllers/OrphanagesController";

const routes = express.Router();

const orphanagesControlller = new OrphanagesController();
const connectionsController = new ConnectionControlller();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post("/classes", orphanagesController.create);
routes.get("/orphanage", classesControlller.index);
routes.post("/connections", connectionsController.create);
routes.get("/connections", connectionsController.index);

export default routes;
