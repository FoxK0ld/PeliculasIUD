const { Schema, model } = require('mongoose')

const MediaSchema = Schema({
    serial : {
        type : String,
        unique : [true, 'Serial ya existe'],
        required: [true, 'Serial es requerido']
    },
    titulo : {
        type : String,
        required: [true, 'Nombre requerido']
    },
    sinopsis : {
        type : String,
        required: [true, 'Sinopsis es requerida']
    },
    url : {
        type : String,
        unique : [true, 'La URL debe ser unica']
     },
     imagen : {
        type : String,
     },
    fechaCreacion : {
        type : Date,
        default : new Date()
    },
    fechaActualizacion : {
        type : Date
    },
    fechaEstreno : {
        type : Date
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
})

module.exports = model('Media', MediaSchema)