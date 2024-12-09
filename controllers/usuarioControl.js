const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const crearUsuario = async (req = request, res = response) => {
    try {
        const { nombre, email, password, rol } = req.body

        const salt = await bcrypt.genSaltSync();
        const hashedPassword = await bcrypt.hashSync(password, salt);

        let data = { 
            nombre,
            email,
            password: hashedPassword,
            rol 
        }

         const usuario = new Usuario(data)
        await usuario.save()

        return res.status(201).json(usuario)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msj: 'El Usuario ya existe' })
        }
        console.log(error);
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' })
    }
}

const consultarUsuarios = async (req = request, res = response) => {
    
    try {
        const directores = await Usuario.find()
        return res.json(directores)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msj:error})
    }
}

const consultarUsuarioPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const usuario = await Usuario.findById(id)
        
        if(!usuario){
            return res.status(404).json({msj:'El Usuario buscado no se encuentra'})
        }

        return res.json(usuario)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msj:'Error en el servidor' + error.message})
    }
}

const editarUsuarioPorID = async (req = request, res = response) => {
    try {
        const { nombre, email, password, rol, estado } = req.body;
        const { id } = req.params;

        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ msj: 'ID inválido' });
        }

        
        const usuarioExistente = await Usuario.findById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ msj: 'Usuario no encontrado' });
        }

        
        let data = {};
        if (nombre) data.nombre = nombre;
        if (email) data.email = email;
        if (rol) data.rol = rol;
        if (estado !== undefined) data.estado = estado;

        
        if (password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(password, salt);
        }

        
        data.fechaActualizacion = new Date();

        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error en el servidor', error: error.message });
    }
}

    

    

module.exports = {
    crearUsuario,
    consultarUsuarios,
    consultarUsuarioPorID,
    editarUsuarioPorID
};