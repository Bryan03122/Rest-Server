const { request, response } = require('express')

const bcrypt = require('bcryptjs')
const User = require('../models/user')

const usuariosGet = async(req = request, res = response) => {
    const { limit = 5, since = 0 } = req.query
    const condition = { state: true }


    const [total, users] = await Promise.all([
        User.countDocuments(condition),
        User.find(condition)
        .skip(Number(since))
        .limit(Number(limit))
    ])
    res.json({
        total,
        users
    })
}

const usuariosPut = async (req = request, res = response) => {
    const id = req.params.id
    const { _id, password, google, email, ...rest } = req.body

    //TODO: validate id in DB
    if( password ) {
        //Crypt password
        const salt = bcrypt.genSaltSync(10)
        rest.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate( id, rest )
    res.status(401).json(user)
}

const usuariosPost = async (req = request, res = response) => {


    const { name, email, password, role } = req.body
    const user = new User( {name, email, password, role} )

    
    // Crypt password
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(password, salt)
    // Save in DB
    await user.save()
    res.status(201).json(user)
}

const usuariosDelete = async(req=request, res = response) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate( id, {state: false})
    
    
    res.json(user)
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}