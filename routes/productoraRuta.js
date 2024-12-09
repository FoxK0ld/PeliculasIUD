const { Router } = require('express')
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin} = require('../middleware/validarRolAdmin');

const {
    crearProductora, 
    consultarProductoras,
    consultarProductoraPorID,
    editarProductoraPorID } = require('../controllers/productoraControl')

const router = Router()

// endpoint crear
router.post('/',[validarJWT, validarRolAdmin], crearProductora)

// endpoint consultar todos
router.get('/', consultarProductoras)

// endpoint consultar por ID
router.get('/:id', [validarJWT, validarRolAdmin], consultarProductoraPorID)

router.put('/:id', [validarJWT, validarRolAdmin], editarProductoraPorID)

module.exports = router