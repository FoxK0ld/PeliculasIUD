const { Router } = require('express')
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin} = require('../middleware/validarRolAdmin');

const {
    crearUsuario, 
    consultarUsuarios,
    consultarUsuarioPorID,
    editarUsuarioPorID
} = require('../controllers/usuarioControl')

const router = Router()

// endpoint crear
router.post('/', [validarJWT, validarRolAdmin], crearUsuario)

// endpoint consultar todos
router.get('/', [validarJWT, validarRolAdmin],consultarUsuarios)

// endpoint consultar por ID
router.get('/:id', [validarJWT, validarRolAdmin], consultarUsuarioPorID)

router.put('/:id', [validarJWT, validarRolAdmin], editarUsuarioPorID)
module.exports = router