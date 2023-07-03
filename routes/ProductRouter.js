const express = require('express')
const {getProduct,createProduct,listProducts} = require('../Controllers/productControllers')
const { protect } = require('../middleware/authMiddleware')

//
const router = express.Router() 

// 
router.route('/newproduct').post(protect,createProduct)
router.route('/list').get(listProducts)
router.route('/:id').get(getProduct)

module.exports = router