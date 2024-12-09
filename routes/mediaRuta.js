const { Router } = require('express')
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin} = require('../middleware/validarRolAdmin');

const {
    crearMedia, 
    consultarMedias,
    consultarMediaPorID,
    editarMediaPorID } = require('../controllers/mediaControl')

const router = Router()

// endpoint crear
router.post('/', [validarJWT, validarRolAdmin], crearMedia)

// endpoint consultar todos
router.get('/', consultarMedias)

// endpoint consultar por ID
router.get('/:id', [validarJWT, validarRolAdmin], consultarMediaPorID)

router.put('/:id', [validarJWT, validarRolAdmin], editarMediaPorID)

module.exports = router