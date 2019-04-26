const mongoose = require('mongoose');
let schema = mongoose.Schema;
var schematable = new schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    price:{type:Number, required:true}
},{collection:'product'});


console.log('product dbschema');

module.exports = mongoose.model('product',schematable);