const { request, response } = require('express')
const Productora = require('../models/productora')


const crearProductora =  async (req = request, res = response) => {

    try {
        const {nombre, descripcion, slogan} = req.body
        let data = {
            nombre,
            descripcion,
            slogan
        }

        const productora = new Productora(data)

        await productora.save()

        return res.status(201).json(productora)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msj: 'La productora ya existe' })
        }
        console.log(error)
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }

}

const consultarProductoras = async (req = request, res = response) => {
    
try {
    const productoras = await Productora.find()
    return res.json(productoras)
} catch (error) {
    console.log(error)
    return res.status(500).json({msj:error})
}
}

const consultarProductoraPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const productora = await Productora.findById(id)
        
        if(!productora){
            return res.status(404).json({msj:'La productora buscada no se encuentra'})
        }

        return res.json(productora)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msj:'Error en el servidor' + error.message})
    }
}

const editarProductoraPorID = async (req = request, res = response) => {

    try {
        const {nombre, descripcion, slogan, estado} = req.body
        const id = req.params.id
        let data = {
            nombre,
            descripcion,
            slogan,
            estado: estado !== undefined ? estado : undefined,
        }
        data.fechaActualizacion = new Date()
        const productora = await Productora.findByIdAndUpdate(id, data, {new:true})
        return res.status(201).json(productora)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
}

module.exports = {
    crearProductora, 
    consultarProductoras,
    consultarProductoraPorID,
    editarProductoraPorID
}