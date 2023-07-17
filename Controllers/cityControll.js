const asyncHandler = require('express-async-handler')
const City = require('../models/cityModel')

const getAll = asyncHandler(async(req,res)=>{
    
    const cityList = await City.find({})

    cityList ? res.status(200).json({cityList}) : res.status(404).json("not found")
})

const newCity = asyncHandler(async(req,res)=>{
    const {city,state}= req.body
    // const cityList = await City.find({})

    const newcity = await City.create({city,state})

    newcity ? res.status(201).json(newcity) : res.status(401).json('i cant create')
})

module.exports = { getAll,newCity}