const { Router } = require('express')

const {
    loginUsuario,
} = require('../controllers/loginControl')

const router = Router()

// endpoint crear
router.post('/', loginUsuario)

module.exports = router