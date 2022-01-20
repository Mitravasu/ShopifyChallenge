const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    stock:{type:Number,required:true},
    group:{type:String,default:""}
})

module.exports = mongoose.model('Item', itemSchema);