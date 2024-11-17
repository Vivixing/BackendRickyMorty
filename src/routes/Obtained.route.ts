import * as express from 'express';
import { ObtainedController } from '../controllers/Obtained.controller';

const router = express.Router();

const obtainedController = new ObtainedController();

router.get(
    '/Obtained/user/:user',
    obtainedController.getByUser
);

router.get(
    '/Obtained',
    obtainedController.getAll
);

router.get(
    '/Obtained/:user',
    obtainedController.getByUser
);

router.get(
    '/Obtained/:id',
    obtainedController.findById
);

router.get(
    '/Obtained/:user/:characterId',
    obtainedController.getByUserAndCharacterId
);

router.post(
    '/Obtained',
    obtainedController.saveObtained
);

router.put(
    '/Obtained',
    obtainedController.updateObtained
);

router.delete(
    '/Obtained/:id',
    obtainedController.deleteObtained
);

export { router as obtainedRouter };
