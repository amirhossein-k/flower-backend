const express = require('express')
const { getAll ,newCity} = require('../Controllers/cityControll')

const router = express.Router()


router.route('/').get(getAll)
router.route('/create').post(newCity)

module.exports = router