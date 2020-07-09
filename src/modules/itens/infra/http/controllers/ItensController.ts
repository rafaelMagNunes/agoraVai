import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateItenService from '@modules/itens/services/CreateItenService';
import DeleteItenService from '@modules/itens/services/DeleteItenService';
import UpdateItenService from '@modules/itens/services/UpdateItensService';
import SearchItenService from '@modules/itens/services/SearchItenService';
import FindItenByTimeService from '@modules/itens/services/FindItenByTimeServic';

export default class ItensController {
  public async findByTime(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findIten = container.resolve(FindItenByTimeService);

    const itens = await findIten.execute({
      time: String(request.query.time),
      construction_id: String(request.params.id),
    });

    return response.json(itens);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        date,
        description,
        supplier_id,
        payment_type,
        self_life_date = null,
        value,
      } = request.body;

      const createIten = container.resolve(CreateItenService);

      const newIten = await createIten.execute({
        date,
        description,
        supplier_id,
        payment_type,
        value,
        self_life_date,
        construction_id: request.params.id,
      });

      return response.json(newIten);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const searchIten = container.resolve(SearchItenService);

    const itens = await searchIten.execute({
      construction_id: String(request.query.id),
      word: request.params.word,
    });

    return response.json(itens);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
        date,
        description,
        payment_type,
        self_life_date = null,
        value,
      } = request.body;

      const updateIten = container.resolve(UpdateItenService);

      const updatedIten = await updateIten.execute({
        date,
        description,
        payment_type,
        self_life_date,
        value,
        iten_id: request.params.id,
      });

      return response.json(updatedIten);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const deleteIten = container.resolve(DeleteItenService);

      await deleteIten.execute({
        id: request.params.id,
      });

      return response.send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
