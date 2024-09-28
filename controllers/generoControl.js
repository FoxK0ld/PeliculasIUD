const { request, response } = require('express')
const Genero = require('../models/genero')


const crearGenero =  async (req = request, res = response) => {

    try {
        const {nombre, descripcion} = req.body
        let data = {
            nombre,
            descripcion
        }

        const genero = new Genero(data)

        await genero.save()

        return res.status(201).json(genero)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msj: 'El género ya existe' })
        }
        console.log(error)
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }

}

const consultarGeneros = async (req = request, res = response) => {
    
try {
    const generos = await Genero.find()
    return res.json(generos)
} catch (error) {
    console.log(error)
    return res.status(500).json({msj:error})
}
}

const consultarGeneroPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const genero = await Genero.findById(id)
        
        if(!genero){
            return res.status(404).json({msj:'El genero buscado no se encuentra'})
        }

        return res.json(genero)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msj:'Error en el servidor' + error.message})
    }
}

const editarGeneroPorID = async (req = request, res = response) => {

    try {
        const {nombre, descripcion, estado} = req.body
        const id = req.params.id
        let data = {
            nombre,
            descripcion,
            estado: estado !== undefined ? estado : undefined,
        }
        data.fechaActualizacion = new Date()
        const genero = await Genero.findByIdAndUpdate(id, data, {new:true})
        return res.status(201).json(genero)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
}

module.exports = {
    crearGenero, 
    consultarGeneros,
    consultarGeneroPorID,
    editarGeneroPorID
}