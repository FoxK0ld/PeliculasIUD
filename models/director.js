const { Schema, model } = require('mongoose')

const DirectorSchema = Schema({
    nombre : {
        type : String,
        required: [true, 'Nombre requerido'],
    },
    estado : {
        type : Boolean,
        default : true
    },
    fechaCreacion : {
        type : Date,
        default : new Date()
    },
    fechaActualizacion : {
        type : Date
    }
})

module.exports = model('Director', DirectorSchema)