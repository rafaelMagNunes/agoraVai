import { Router } from 'express';

import SupplierController from '@modules/suppliers/infra/http/controllers/SupplierController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const itensRouter = Router();
const supplierController = new SupplierController();

itensRouter.use(ensureAuthenticated);

itensRouter.get('/', supplierController.index);
itensRouter.get('/search/:word', supplierController.search);
itensRouter.post('/', supplierController.create);
itensRouter.put('/:id', supplierController.update);

export default itensRouter;
