const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// 
const listProducts = asyncHandler(async(req,res)=>{
    const product = await Product.find({})
    if(product){
        res.status(200).json(product)
    }else{
        res.status(404).json({error:'not found'})
        throw new Error(`Product not found ${id}`)
    }
})

const getProduct = asyncHandler(async(req,res)=>{
    const  {order} = req.body
    const product = await Product.find({_id:req.params.id})
    if(product){
        res.status(200).json({product,order})
    }else{
        res.status(404).json({error:'not found'})
        throw new Error(`Product not found ${id}`)
    }
})

const createProduct = asyncHandler(async(req,res)=>{
    const {title,pic,detail,price,count,describrtion,category_product,color} = req.body
    // console.log(req,'req')
    // console.log(req.user,'req user')

    // 
    if(req.user.isAdmin){

        const product = await Product.create({
            title,pic,detail,price,count,detail,describrtion,category_product,color,user:req.user._id
        })
    
        if(product){
            res.status(201).json({
                title: product.title,
                pic: product.pic,
                detail: product.detail,
                price: product.price,
                count: product.count,
                detail:product.detail,
                describrtion: product.describrtion,
                category_product: product.category_product,
                color: product.color,
                _id: product._id,
                user:product.user
            })
    }else{
        res.status(400).json({error:'dont access to create'})
    }

    }else{
        res.status(400)
        throw new Error('Error Occurd')
    }
})

module.exports= { getProduct,createProduct,listProducts}