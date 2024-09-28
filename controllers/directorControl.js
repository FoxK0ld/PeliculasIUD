const { request, response } = require('express')
const Director = require('../models/director')

const crearDirector = async (req = request, res = response) => {
    try {
        const { nombre } = req.body
        let data = { nombre }

        const director = new Director(data)
        await director.save()

        return res.status(201).json(director)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msj: 'El Director ya existe' })
        }
        console.log(error);
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' })
    }
}

const consultarDirectores = async (req = request, res = response) => {
    
    try {
        const directores = await Director.find()
        return res.json(directores)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msj:error})
    }
}

const consultarDirectorPorID = async (req = request, res = response) => {
        try {
            const id = req.params.id
            const director = await Director.findById(id)
            
            if(!director){
                return res.status(404).json({msj:'El Director buscado no se encuentra'})
            }
    
            return res.json(director)
    
        } catch (error) {
            console.log(error)
            return res.status(500).json({msj:'Error en el servidor' + error.message})
        }
}
    
const editarDirectorPorID = async (req = request, res = response) => {
    
        try {
            const { nombre, estado } = req.body
            const id = req.params.id
            let data = {
                nombre,
                estado: estado !== undefined ? estado : undefined,
            }
            data.fechaActualizacion = new Date()
            const director = await Director.findByIdAndUpdate(id, data, {new:true})
            return res.status(201).json(director)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
        
    }
    

module.exports = {
    crearDirector,
    consultarDirectores,
    consultarDirectorPorID,
    editarDirectorPorID
};