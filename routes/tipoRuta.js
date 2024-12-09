const { Router } = require('express')

const {
    crearTipo, 
    consultarTipos,
    consultarTipoPorID,
    editarTipoPorID } = require('../controllers/tipoControl')

const router = Router()

// endpoint crear
router.post('/', [validarJWT, validarRolAdmin], crearTipo)

// endpoint consultar todos
router.get('/', consultarTipos)

// endpoint consultar por ID
router.get('/:id', [validarJWT, validarRolAdmin], consultarTipoPorID)

router.put('/:id', [validarJWT, validarRolAdmin], editarTipoPorID)

module.exports = router