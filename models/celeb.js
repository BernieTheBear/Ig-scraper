const mongoose = require('mongoose')

const celebSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    handle:{
        type:String,
        default: 'test'
    },
    sentimentRating:{
        type:Number,
        required:true,
        default:0,
    }
})

module.exports = mongoose.model('celebSchema',celebSchema)