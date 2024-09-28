const { Router } = require('express')

const {
    crearTipo, 
    consultarTipos,
    consultarTipoPorID,
    editarTipoPorID } = require('../controllers/tipoControl')

const router = Router()

// endpoint crear
router.post('/', crearTipo)

// endpoint consultar todos
router.get('/', consultarTipos)

// endpoint consultar por ID
router.get('/:id', consultarTipoPorID)

router.put('/:id', editarTipoPorID)

module.exports = router