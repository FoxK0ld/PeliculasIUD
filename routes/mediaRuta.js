const { Router } = require('express')

const {
    crearMedia, 
    consultarMedias,
    consultarMediaPorID,
    editarMediaPorID } = require('../controllers/mediaControl')

const router = Router()

// endpoint crear
router.post('/', crearMedia)

// endpoint consultar todos
router.get('/', consultarMedias)

// endpoint consultar por ID
router.get('/:id', consultarMediaPorID)

router.put('/:id', editarMediaPorID)

module.exports = router