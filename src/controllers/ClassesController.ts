import { Response ,Request} from "express";
import db from '../database/connection';
import convertHourToMinutes from '../Utils/ConvertHourToMinutes';

interface ScheduleItem{
    week_day:string;
    from: string;
    to:string;
}

export default class ClassesControlller {
    async index(req: Request, res: Response){
        const filters=req.query;

        if(!filters.week_day ||!filters.subject||!filters.time){
            return res.status(400).json({
                statusCode:400,
                error: "Missingfilters to search classes" 
            })
        }

        const subject = filters.subject  as string;

        const timeInMinute = convertHourToMinutes(filters.time as string);

        const classes = await db('classes')
        .whereExists (function()  {
             this.select('*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??',[Number(filters.week_day)])
            .whereRaw('`class_schedule`.`from` <= ??',[timeInMinute])
            .whereRaw('`class_schedule`.`to` > ??',[timeInMinute]);
            
        })
        .where('classes.subject','=',subject)
        .join('users','classes.user_id','=','users.id')
        .select(['classes.*','users.*']);


        return res.json(classes)
    }
    async create(req: Request, res: Response) {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule

        } = req.body;

        const trx = await db.transaction();

    try {
        const insertUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        })
    
        const user_id = insertUsersIds[0]
    
        const insertClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id
        });
    
        const class_id = insertClassesIds[0];
    
        const classesSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
    
            };
    
        })
    
        await trx('class_schedule').insert(classesSchedule)
    
        await trx.commit()
        return res.status(201).json({
            statusCode:201,
            message: "Created new class with sucess"
        });
    } catch (error) {
        await trx.rollback();
        return res.status(400).json({
            statusCode:400,
            error: "Unexpected error while creating new class : " + error
        })
        
    }
    }

}