import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const usersRouter = Router();
const sessionController = new SessionController();

usersRouter.post('/', sessionController.create);

export default usersRouter;
