const { Router } = require('express')

const {
    crearGenero, 
    consultarGeneros,
    consultarGeneroPorID,
    editarGeneroPorID } = require('../controllers/generoControl')

const router = Router()

// endpoint crear
router.post('/', [validarJWT, validarRolAdmin], crearGenero)

// endpoint consultar todos
router.get('/', consultarGeneros)

// endpoint consultar por ID
router.get('/:id', [validarJWT, validarRolAdmin], consultarGeneroPorID)

router.put('/:id', [validarJWT, validarRolAdmin], editarGeneroPorID)

module.exports = router