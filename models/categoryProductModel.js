const mongoose =require('mongoose')

const Scehma = mongoose.Schema

const categoryProductSchema = new Scehma({
    categoryproduct:{
        type:[],
        required: true
    },

})

module.exports = mongoose.model('CategoryProduct',categoryProductSchema)