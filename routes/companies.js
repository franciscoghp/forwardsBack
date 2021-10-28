const { Router } = require('express');

const { getCompanies, postCompany, deleteCompany, getCompany, updateCompany  } = require('../controllers/companies');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:id', validarJWT, getCompanies );
router.get('/company_id/:id', validarJWT, getCompany );
router.post('/', validarJWT, postCompany );
router.put('/:id', validarJWT, updateCompany );
router.delete('/:id', validarJWT, deleteCompany );

module.exports = router;