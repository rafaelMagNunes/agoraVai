import { Router } from 'express';

import ItensController from '@modules/itens/infra/http/controllers/ItensController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const itensRouter = Router();
const itensController = new ItensController();

itensRouter.use(ensureAuthenticated);

itensRouter.get('/bytime/:id', itensController.findByTime);

itensRouter.get('/:word', itensController.search);

itensRouter.post('/:id', itensController.create);

itensRouter.put('/:id', itensController.update);

itensRouter.delete('/:id', itensController.delete);

export default itensRouter;
