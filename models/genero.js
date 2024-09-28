const { Schema, model } = require('mongoose')

const GeneroSchema = Schema({
    nombre : {
        type : String,
        required: [true, 'Nombre requerido'],
        unique: [true, 'Nombre ya existe']
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
    },
    descripcion : {
        type : String
    }
})

module.exports = model('Genero', GeneroSchema)