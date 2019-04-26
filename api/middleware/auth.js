const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    // console.log('reqcheck: ',req);
    // console.log('auth token: ',req.body.token);
    // var token = req.headers.authorization.split(" ")[1];
    // console.log('token: ',token);
    // process.exit();
    try {
      
        var token = req.headers.authorization.split(" ")[1];
        console.log('token: ',token);
        
        var decoded = jwt.verify(token,'secret');
        req.userdata = decoded;
       
        next()
         
    } catch (error) {
        console.log(error);
        // res.status(401).json({message:'auth failed'});
    }
  
}

console.log('auth');