const mongoose = require('mongoose');
const schema = mongoose.Schema;

let orderschema = new schema({
   product: { type:mongoose.Schema.Types.ObjectId, ref: "product", required: true},
   qnty: { type:Number , default: 1 }
});


console.log('order dbschema');

module.exports = mongoose.model('order',orderschema);