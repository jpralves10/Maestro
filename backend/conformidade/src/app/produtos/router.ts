import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';

const router = Router();

router.post('/filtro', CatalogoController.filtro);
/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/

export default router;