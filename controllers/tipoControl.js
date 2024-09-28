const { request, response } = require('express')
const Tipo = require('../models/tipo')


const crearTipo =  async (req = request, res = response) => {

    try {
        const {nombre, descripcion} = req.body
        let data = {
            nombre,
            descripcion
        }

        const tipo = new Tipo(data)

        await tipo.save()

        return res.status(201).json(tipo)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msj: 'El tipo ya existe' })
        }
        console.log(error)
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }

}

const consultarTipos = async (req = request, res = response) => {
    
try {
    const tipos = await Tipo.find()
    return res.json(tipos)
} catch (error) {
    console.log(error)
    return res.status(500).json({msj:error})
}
}

const consultarTipoPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const tipo = await Tipo.findById(id)
        
        if(!tipo){
            return res.status(404).json({msj:'El tipo buscado no se encuentra'})
        }

        return res.json(tipo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msj:'Error en el servidor' + error.message})
    }
}

const editarTipoPorID = async (req = request, res = response) => {

    try {
        const {nombre, descripcion} = req.body
        const id = req.params.id
        let data = {
            nombre,
            descripcion
        }
        data.fechaActualizacion = new Date()
        const tipo = await Tipo.findByIdAndUpdate(id, data, {new:true})
        return res.status(201).json(tipo)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
}

module.exports = {
    crearTipo, 
    consultarTipos,
    consultarTipoPorID,
    editarTipoPorID
}