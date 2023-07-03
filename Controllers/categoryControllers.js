const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const CategoryProduct = require('../models/categoryProductModel')

const getListCategory = asyncHandler(async(req,res)=>{
    try{
        const list = await Category.find()

        if(!list){
            res.status(404).json({erorr: 'empty'})
        }
        res.status(200).json(list)
    }catch(error){
        res.status(400).json({error:`has error: ${error}`})
    }
}) 

// create
// private
const createCategory = asyncHandler(async(req,res)=>{
    try{
        const {category} = req.body

        const list  = await Category.create({category})
        
        if(list){
            res.status(201).json(list)
        }
    }catch(error){
        res.status(400).json({error:`has error: ${error}`})
    }
})
// /////////////////////////////////////
// category list product 
const getListCategoryProduct = asyncHandler(async(req,res)=>{
    try{
        const list = await CategoryProduct.find()

        if(!list){
            res.status(404).json({erorr: 'empty'})
        }
        res.status(200).json(list)
    }catch(error){
        res.status(400).json({error:`has error: ${error}`})
    }
}) 
//  category create list product 
const createCategoryProduct = asyncHandler(async(req,res)=>{
    try{
        const {categoryproduct} = req.body

        console.log(categoryproduct,'category')
        const list  = await CategoryProduct.create({categoryproduct})
        console.log(list)
        if(list){
            res.status(201).json(list)
        }
    }catch(error){
        res.status(400).json({error:`has error: ${error}`})
    }
})
module.exports ={getListCategory,createCategory,createCategoryProduct,getListCategoryProduct}