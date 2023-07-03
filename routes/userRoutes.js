const express = require('express')
const  { registerUser,authUser} = require('../Controllers/userControlers')


const router = express.Router()


router.route('/').post(registerUser)
router.route('/login').put(authUser)

module.exports = router


