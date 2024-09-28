const { Router } = require('express')

const {
    crearDirector, 
    consultarDirectores,
    consultarDirectorPorID,
    editarDirectorPorID } = require('../controllers/directorControl')

const router = Router()

// endpoint crear
router.post('/', crearDirector)

// endpoint consultar todos
router.get('/', consultarDirectores)

// endpoint consultar por ID
router.get('/:id', consultarDirectorPorID)

router.put('/:id', editarDirectorPorID)
module.exports = router