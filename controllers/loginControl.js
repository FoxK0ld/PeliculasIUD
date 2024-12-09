const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helper/jwt');

const loginUsuario = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

       
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        
        const passwordValida = bcrypt.compareSync(password, usuario.password);
        if (!passwordValida) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        
        const token = await generarJWT(usuario); 

        
        return res.status(200).json({
            msg: 'Login exitoso',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                access_token: token
            },
    
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

module.exports = {
    loginUsuario,
};

