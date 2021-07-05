const Role = require('../models/role')
const User = require('../models/user')

const validateRole = async (role = '') => {

    const roleExist = await Role.findOne({ role })
    if( !roleExist ){
        throw new Error(`${role} is not defined as a role`)
    }

}

const validateEmail = async(email = '') => {
    const existentEmail = await User.findOne({ email })
    if( existentEmail ){
        throw new Error(`${email} already exists`)
    }
}


const validateUserById = async( id ) => {

    const existentUser = await User.findById(id)
    if( !existentUser ){
        throw new Error(`User with id: ${id} does not exist`)
    }
}

module.exports = {
    validateRole,
    validateEmail,
    validateUserById
}