import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateConstructionService from '@modules/constructions/services/CreateConstructionService';
import IndexConstructionService from '@modules/constructions/services/IndexConstructionService';
import IndexByIdConstructionService from '@modules/constructions/services/IndexByIdConstructionService';
import UpdateConstructionService from '@modules/constructions/services/UpdateConstructionService';
import DeleteConstructionService from '@modules/constructions/services/DeleteConstructionService';
import SearchConstructionService from '@modules/constructions/services/SearchConstructionService';

export default class ConstructionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexConstruction = container.resolve(IndexConstructionService);

    const constructions = await indexConstruction.execute({
      user_id: request.user.id,
      page: Number(request.query.page),
      limit: Number(request.query.limit),
    });

    return response.json(constructions);
  }

  public async indexById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexConstruction = container.resolve(IndexByIdConstructionService);

    const construction = await indexConstruction.execute({
      details: String(request.query.details),
      id: request.params.id,
      start_date: String(request.query.start_date),
      end_date: String(request.query.end_date),
    });

    return response.json(construction);
  }

  public async findByCosntructionOrAddress(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const searchConstruction = container.resolve(SearchConstructionService);

    const constructions = await searchConstruction.execute({
      user_id: request.user.id,
      word: request.params.word,
    });

    return response.json(constructions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        construction,
        address,
        start_date,
        cep,
        city,
        state,
      } = request.body;

      const createConstruction = container.resolve(CreateConstructionService);

      const newConstruction = await createConstruction.execute({
        construction,
        address,
        start_date,
        cep,
        city,
        state,
        user_id: request.user.id,
      });

      return response.json(newConstruction);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      construction,
      address,
      start_date,
      state,
      cep,
      city,
    } = request.body;

    const updateConstruction = container.resolve(UpdateConstructionService);

    const updatedConstruction = await updateConstruction.execute({
      construction,
      address,
      start_date,
      state,
      cep,
      city,
      user_id: request.user.id,
      construction_id: request.params.id,
    });

    return response.json(updatedConstruction);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteConstruction = container.resolve(DeleteConstructionService);

    try {
      await deleteConstruction.execute({ id });

      return response.send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
