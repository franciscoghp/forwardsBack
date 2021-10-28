const { Router } = require('express');

const { getShips, postShip, deleteShip, getShip, updateShip  } = require('../controllers/ships');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:id', validarJWT, getShips );
router.get('/ship_id/:id', validarJWT, getShip );
router.post('/', validarJWT, postShip );
router.put('/:id', validarJWT, updateShip );
router.delete('/:id', validarJWT, deleteShip );

module.exports = router;