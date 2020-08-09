import express from 'express'
import ClassesControlller from './controllers/ClassesController';
import ConnectionControlller from './controllers/ConnectionController';



const routes = express.Router();
const  classesControlller =  new ClassesControlller();
const connectionsController = new ConnectionControlller()

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

routes.post('/classes', classesControlller.create)
routes.get('/classes', classesControlller.index)
routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes;