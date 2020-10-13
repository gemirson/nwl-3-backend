import { Response, Request } from "express";
import { getRepository } from "typeorm";

import Orphanage from "../models/Orphanages";


export default  {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanage = orphanageRepository.find();

    return res.json(orphanage);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = orphanageRepository.findOneOrFail(id);

    return res.json(orphanage);
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      opening_on_weekends
    } = req.body;

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = orphanageRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      opening_on_weekends
    });

    await orphanageRepository.save(orphanage);

    return res.status(201).json({
      statusCode: 201,
      message: orphanage
    });
  }
}
