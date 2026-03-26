import { Router } from 'express';
import { getRegions, getTypes } from '../controllers/categoriesController.js';

const router = Router();

router.get('/categories/regions', getRegions);

router.get('/categories/types', getTypes);

export default router;
