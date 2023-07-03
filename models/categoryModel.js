const mongoose =require('mongoose')

const Scehma = mongoose.Schema

const categorySchema = new Scehma({
    category:{
        type:[],
        required: true
    },

})

module.exports = mongoose.model('Category',categorySchema)