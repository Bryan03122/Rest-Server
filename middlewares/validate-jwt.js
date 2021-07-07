const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')
    //console.log(token)

    if(!token){
        return res.status(401).json({
            msg: 'There is not a valid token'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        const authUser = await User.findById(uid) 
        
        
        //Authenticated user is trying to delete a user
        if( !authUser){
            return res.status(401).json({
                msg: 'Invalid token -user does not exist on DB'
            })
        }
        //Verify uid state
        if(!authUser.state){
            return res.status(401).json({
                msg: 'Invalid token -user state false'
            })
        }
        req.authUser = authUser
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({
            msg:'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}