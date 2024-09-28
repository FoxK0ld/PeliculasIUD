const { Router } = require('express')

const {
    crearProductora, 
    consultarProductoras,
    consultarProductoraPorID,
    editarProductoraPorID } = require('../controllers/productoraControl')

const router = Router()

// endpoint crear
router.post('/', crearProductora)

// endpoint consultar todos
router.get('/', consultarProductoras)

// endpoint consultar por ID
router.get('/:id', consultarProductoraPorID)

router.put('/:id', editarProductoraPorID)

module.exports = router