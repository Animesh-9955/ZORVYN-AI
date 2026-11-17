import { Router } from 'express';
import healthRoutes from './healthRoutes.js';

import chatRoutes from './chatRoutes.js';
import documentRoutes from './documentRoutes.js';

const apiRouter = Router();


apiRouter.use('/health', healthRoutes);
apiRouter.use('/chat', chatRoutes);

apiRouter.use('/documents', documentRoutes);

export default apiRouter;

