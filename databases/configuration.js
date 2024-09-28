const mongoose = require('mongoose')

const mongoConn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'peliculas-iud'
        })
        console.log('Conectado correctamente a la base de datos!')
    } catch(e) {
        console.log('Error ', e)
        throw new Error('Error de conexión')
    }
}

module.exports = { mongoConn }