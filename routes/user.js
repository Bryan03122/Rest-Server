const { Router } = require('express')
const { check } = require('express-validator')

const { validateRole, 
        validateEmail,
        validateUserById        
} = require('../helpers/db-validators')

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete 
        } = require('../controllers/users')

const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom( validateUserById ),
        check('role').custom(validateRole),
        validateFields
], usuariosPut) 


router.post('/',[
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password must containt 6 characters or more').isLength({ min: 6 }),
        check('email', 'Invalid Email').isEmail(),
        check('email').custom(validateEmail),
        check('role').custom(validateRole),
        validateFields
],
 usuariosPost)  

router.delete('/:id', [
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom( validateUserById ),  
        validateFields      
],
usuariosDelete)


module.exports = router