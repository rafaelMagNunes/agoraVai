import { Router } from 'express';

import ConstructionController from '@modules/constructions/infra/http/controllers/ConstructionsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const constructionsRouter = Router();
const constructionController = new ConstructionController();

constructionsRouter.use(ensureAuthenticated);

constructionsRouter.get('/', constructionController.index);

constructionsRouter.get('/byid/:id', constructionController.indexById);

constructionsRouter.get(
  '/search/:word',
  constructionController.findByCosntructionOrAddress,
);

constructionsRouter.post('/', constructionController.create);

constructionsRouter.put('/:id', constructionController.update);

constructionsRouter.delete('/:id', constructionController.delete);

export default constructionsRouter;
