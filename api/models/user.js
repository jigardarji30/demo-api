const mongoose = require('mongoose');
const schema = mongoose.Schema;

let userschema = new schema({
   email:{type:String,required:true},
   password:{type:String,required:true}

});


console.log('user dbschema');

module.exports = mongoose.model('user',userschema);