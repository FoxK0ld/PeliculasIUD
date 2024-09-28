const { Router } = require('express')

const {
    crearGenero, 
    consultarGeneros,
    consultarGeneroPorID,
    editarGeneroPorID } = require('../controllers/generoControl')

const router = Router()

// endpoint crear
router.post('/', crearGenero)

// endpoint consultar todos
router.get('/', consultarGeneros)

// endpoint consultar por ID
router.get('/:id', consultarGeneroPorID)

router.put('/:id', editarGeneroPorID)

module.exports = router