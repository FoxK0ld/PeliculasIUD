const { Router } = require('express')

const {
    crearDirector, 
    consultarDirectores,
    consultarDirectorPorID,
    editarDirectorPorID } = require('../controllers/directorControl')

const router = Router()

// endpoint crear
router.post('/', [validarJWT, validarRolAdmin], crearDirector)

// endpoint consultar todos
router.get('/', consultarDirectores)

// endpoint consultar por ID
router.get('/:id', [validarJWT, validarRolAdmin], consultarDirectorPorID)

router.put('/:id', [validarJWT, validarRolAdmin], editarDirectorPorID)
module.exports = router