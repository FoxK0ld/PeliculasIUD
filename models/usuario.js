const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre : {
        type : String,
        required: [true, 'Nombre requerido'],
    },
    email : {
        type : String,
        required: [true, 'Email requerido'],
        unique: true
    },
    password : {
        type : String,
        required: [true, 'Password requerido'],
    },
    rol : {
        type : String,
        required: [true, 'Rol requerido'],
        enum: ['Administrador', 'Docente']
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

module.exports = model('Usuario', UsuarioSchema)