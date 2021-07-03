const { request, response } = require('express')

const usuariosGet = (req = request, res = response) => {
    const {nombre='sin nombre', edad} = req.query
    res.json({
        msg: "get API - controlador",
        nombre,
        edad
    })
}

const usuariosPut = (req = request, res = response) => {
    const id = req.params.id
    res.status(401).json({
        msg: "put API - controlador",
        id
    })
}

const usuariosPost = (req = request, res = response) => {
    const {nombre, edad} = req.body
    res.status(201).json({
        msg: "post API - controlador",
        nombre,
        edad
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}