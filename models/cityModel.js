const mongose = require('mongoose')

const Schema = mongose.Schema

const citySchema = new Schema({
    city: {
        type: [],
        required: true
    },
    state: {
        type: [],
        required: true
    },
})

module.exports = mongose.model('City',citySchema)
