const { request, response } = require('express')
const Media = require('../models/media')
const Genero = require('../models/genero')
const Director = require('../models/director')
const Productora = require('../models/productora')
const Tipo = require('../models/tipo')


const crearMedia =  async (req = request, res = response) => {

    try {
        const { serial, titulo, sinopsis, url, imagen, fechaEstreno, genero, director, productora, tipo } = req.body
        
        const generoExiste = await Genero.findOne({_id: genero, estado: true})

        if (!generoExiste){
            return res.status(400).json({msj: "El género no existe o esta inactivo"})
        }

        const directorExiste = await Director.findOne({_id: director, estado: true})

        if (!directorExiste){
            return res.status(400).json({msj: "El director no existe o esta inactivo"})
        }

        const productoraExiste = await Productora.findOne({_id: productora, estado: true})

        if (!productoraExiste){
            return res.status(400).json({msj: "La productora no existe o esta inactivo"})
        }

        const tipoExiste = await Tipo.findOne({_id: tipo})

        if (!tipoExiste){
            return res.status(400).json({msj: "El tipo no existe"})
        }

        const data = {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            fechaEstreno,
            genero,
            director,
            productora,
            tipo
        }

        const media = new Media(data)

        await media.save()

        return res.status(201).json(media)

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msj: 'La Serie o pelicula ya existe' })
        }
        console.log(error)
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }

}

const consultarMedias = async (req = request, res = response) => {
    
try {
    const medias = await Media.find()
    return res.json(medias)
} catch (error) {
    console.log(error)
    return res.status(500).json({msj:error})
}
}

const consultarMediaPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const media = await Media.findById(id)
        
        if(!media){
            return res.status(404).json({msj:'La serie o pelicula buscada no se encuentra'})
        }

        return res.json(media)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msj:'Error en el servidor' + error.message})
    }
}

const editarMediaPorID = async (req = request, res = response) => {

    try {
        const {titulo, sinopsis, url, imagen, fechaEstreno, genero, director, productora, tipo } = req.body
        const id = req.params.id

        const generoExiste = await Genero.findOne({_id: genero, estado: true})

        if (!generoExiste){
            return res.status(400).json({msj: "El género no existe o esta inactivo"})
        }

        const directorExiste = await Director.findOne({_id: director, estado: true})

        if (!directorExiste){
            return res.status(400).json({msj: "El director no existe o esta inactivo"})
        }

        const productoraExiste = await Productora.findOne({_id: productora, estado: true})

        if (!productoraExiste){
            return res.status(400).json({msj: "La productora no existe o esta inactivo"})
        }

        const tipoExiste = await Tipo.findOne({_id: tipo})

        if (!tipoExiste){
            return res.status(400).json({msj: "El tipo no existe"})
        }

        const data = {
            titulo,
            sinopsis,
            url,
            imagen,
            fechaEstreno,
            genero,
            director,
            productora,
            tipo
        }
        data.fechaActualizacion = new Date()
        const media = await Media.findByIdAndUpdate(id, data, {new:true})
        return res.status(201).json(media)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
}

module.exports = {
    crearMedia, 
    consultarMedias,
    consultarMediaPorID,
    editarMediaPorID
}