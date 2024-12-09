const validarRolAdmin = (req, res, next) => {
    
    if (!req.payload) {
        return res.status(500).json({ message: 'Error: No se pudo validar el rol, falta el token.' });
    }

    
    const { rol } = req.payload;

    if (rol !== 'Administrador') {
        return res.status(403).json({ message: 'Acceso denegado: se requiere rol de Administrador' });
    }

    
    next();
};

module.exports = {
    validarRolAdmin
};
