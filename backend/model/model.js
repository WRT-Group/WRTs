const mongoose = require('mongoose');

const schema=mongoose.Schema({
    nftName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const model=mongoose.model("model",schema)

module.exports=model
