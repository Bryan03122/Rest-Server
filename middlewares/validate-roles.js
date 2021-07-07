const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) => {
    if( !req.authUser ){
        return res.status(500).json({
            msg: 'Trying to verify role without validating token first'
        })
    }

    const { role, name } = req.authUser

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${name} is not admin`
        })
    }

    next()
}

const hasRole = ( ...roles ) => {
    return (req = request, res = response, next) => {
        if( !req.authUser ){
            return res.status(500).json({
                msg: 'Trying to verify role without validating token first'
            })
        }

        if( !roles.includes( req.authUser.role )){
            return res.status(401).json({
                msg: `This endpoint requires these roles: ${roles}`
            })
        }
        
        next()
    }
}

module.exports = {
    isAdminRole,
    hasRole
}