const express  = require('express')
const {getListCategory,createCategory,createCategoryProduct,getListCategoryProduct} = require('../Controllers/categoryControllers')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(getListCategory)
router.route('/create').post(protect,createCategory)
// 

router.route('/categoryproduct').get(getListCategoryProduct)
router.route('/createProduct').post(protect,createCategoryProduct)
module.exports =router