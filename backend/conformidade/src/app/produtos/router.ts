import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';
import * as ClassificacaoController from './classificacao/classificacao.controller';

const router = Router();

router.post('/catalogo/filtro', CatalogoController.filtro);
router.get('/classificacao/form', ClassificacaoController.form);

/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/

export default router;