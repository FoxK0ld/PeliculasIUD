const dotenv = require('dotenv')
const express = require('express')
const app = express()
dotenv.config()
const { mongoConn } = require('./databases/configuration')
mongoConn()

const cors = require('cors')

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors({
    origin : '*'
}))

const generos = require('./routes/generoRuta')
const usuarios = require('./routes/usuarioRuta')
const login = require('./routes/loginRuta')
const directores = require('./routes/directorRuta')
const productoras = require('./routes/productoraRuta')
const tipos = require('./routes/tipoRuta')
const medias = require('./routes/mediaRuta')
app.use('/api/v1/generos', generos)
app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/login', login)
app.use('/api/v1/directores', directores)
app.use('/api/v1/productoras', productoras)
app.use('/api/v1/Tipos', tipos)
app.use('/api/v1/Medias', medias)
module.exports = app