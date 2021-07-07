const validateField = require('../middlewares/validate-fields')
const validateToken = require('../middlewares/validate-jwt')
const validateRoles = require('../middlewares/validate-roles')

module.exports = {
    ...validateField,
    ...validateToken,
    ...validateRoles
}