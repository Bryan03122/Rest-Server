const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const{ generateJWT } = require('../helpers/generate-jwt')

const login = async(req = request, res = response) => {
    const { email, password } = req.body
    try {
        //Verify if email exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: 'User / Password are not correct -email'
            })
        }
        //Verify if user is active
        if(user.state === false){
            return res.status(400).json({
                msg: 'User / Password are not correct -state'
            })
        }
        //Verify if password matches
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Password are not correct -password'
            })
        }
        //Generate JWT
        const token = await generateJWT( user.id )


        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Something went wrong"
        })
    }
}


module.exports = {
    login
}