const { Schema, model } = require('mongoose')

const TipoSchema = Schema({
    nombre : {
        type : String,
        required: [true, 'Nombre requerido'],
    },
    fechaCreacion : {
        type : Date,
        default : new Date()
    },
    fechaActualizacion : {
        type : Date
    },
    descripcioon : {
        type : String
    }
})

module.exports = model('Tipo', TipoSchema)