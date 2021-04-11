import * as express from 'express';

import { authenticationController } from '../controllers';

const router = express.Router();

router.post('/authentication', authenticationController.authenticate);

export default router;
