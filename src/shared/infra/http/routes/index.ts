import { Router } from 'express';

// Routes
import constructionsRouter from '@modules/constructions/infra/http/routes/construction.routes';
import itensRoutes from '@modules/itens/infra/http/routes/iten.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/constructions', constructionsRouter);
routes.use('/itens', itensRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/suppliers', suppliersRouter);
routes.use('/users', usersRouter);

export default routes;
