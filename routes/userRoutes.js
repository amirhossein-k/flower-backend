const express = require('express')
const  { registerUser,authUser, updateUser} = require('../Controllers/userControlers')
const { protect } = require('../middleware/authMiddleware')
const generateToken = require('../utils/generateToken')


const router = express.Router()


router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/update').put(protect ,updateUser)

module.exports = router


