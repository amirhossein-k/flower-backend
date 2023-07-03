const mongoose = require('mongoose')

// 
const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    pic:{
        type:[],
        required:true
    },
    detail:{
        type:[Object],
        required:true
    },
    price:{
        type:String,
        required:true
    },
    count:{
        type:String,
        required:true
    },
    detail:{
        type:[],
        required:true
    },
    describrtion:{
        type:[],
        required:true
    },
    category_product:{
        type:[],
        required:true
    },
    color: {
        type:[],
        required:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
})

module.exports = mongoose.model('product',productSchema)
















