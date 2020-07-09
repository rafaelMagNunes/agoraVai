import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';
import indexSupplierService from '@modules/suppliers/services/IndexSupplierService';
import UpdateSupplierService from '@modules/suppliers/services/UpdateSupplierService';
import SearchSupplierService from '@modules/suppliers/services/SearchSupllierService';

export default class SupplierController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexSupplier = container.resolve(indexSupplierService);

    const constructions = await indexSupplier.execute({
      user_id: request.user.id,
      page: Number(request.query.page),
      limit: Number(request.query.limit),
    });

    return response.json(constructions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        phone,
        cnpj,
        cep,
        state,
        city,
        address,
      } = request.body;

      const createSupplier = container.resolve(CreateSupplierService);

      const newSuppliier = await createSupplier.execute({
        name,
        email,
        phone,
        cnpj,
        cep,
        state,
        city,
        address,
        user_id: request.user.id,
      });

      return response.json(newSuppliier);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const searchSupplier = container.resolve(SearchSupplierService);

    const suppliers = await searchSupplier.execute({
      user_id: request.user.id,
      word: request.params.word,
    });

    return response.json(suppliers);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        phone,
        cnpj,
        state,
        city,
        address,
        cep,
      } = request.body;

      const updateSupplier = container.resolve(UpdateSupplierService);

      const updatedSuppliier = await updateSupplier.execute({
        name,
        email,
        phone,
        cnpj,
        state,
        city,
        address,
        cep,
        user_id: request.user.id,
        supplier_id: request.params.id,
      });

      return response.json(updatedSuppliier);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
