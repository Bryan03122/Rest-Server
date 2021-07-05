const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../databse/config')
class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        //Connect to databse
        this.connectDB()
        //Middlewares
        this.middlewares()
        //App Routes
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use( cors())
        //Body Read & Parse
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor activo en puerto ', this.port)
        })
    }

}

module.exports = Server