const user = require('../models/user');
const order = require('../models/order');
const product = require('../models/product');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');

// const token = require('../middleware/auth');

exports.generatesecret= function(req,res){
    var secret = speakeasy.generateSecret({length:5});
    res.send({ "secret":secret.base32, endcoding:'base32' });
      // var otp = speakeasy.totp({ secret:secret.base32, encoding:'base32' });
    // res.send(otp);

    // res.send(speakeasy.totp({ secret:secret.base32, encoding:'base32' }));
    var token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
      });
      console.log('token: ',token);

}


exports.generateotp = function(req,res){
   
    var otp = speakeasy.totp({
        secret: req.body.secret,
        encoding: 'base32',
        time:100
      });
      console.log('otp: ',otp);
      res.send(otp);

}

exports.validateotp = function(req,res){
//    console.log('req: ',req);
    var validate = speakeasy.totp.verify({
        secret: req.body.secret,
        encoding: 'base32',
        otp:req.body.otp,
        window:0
       
      });
      console.log('validate: ',validate);
      res.send(validate);

}

exports.addUser = function(req,res){
    user.find({email:req.body.email},function(err,User){
       if(User.length > 0){
         return res.json('Email Already Exists');
        } else {
            bcrypt.hash(req.body.password,10, function(err,hash){
            if(err){
                 res.json(err);
            } else {
                let users = new user({
                    email:req.body.email,
                    password:hash,
                    // mobile_no:req.body.mobile_no
                    });
                    users.save(function(err,result){
                        if(err) res.json(err)
                        res.json(result);
                        console.log('user added');
                    });
                }
            });
        }
    })
}


exports.add = function(req,res){
 
                let data = req.body;
                // user.insertMany(data,function(err,result){
                //         if(err) res.json(err)
                //         res.json(result);
                //         console.log('user added');
                //     });
                // user.count(function(err,result){
                //     if(err) res.json(err)
                //     res.json(result);
                //     console.log('user added');
                // });
                user.distinct('email',function(err,result){
                    if(err) res.json(err)
                    res.json(result);
                    console.log('user added');
                });
                }
   
exports.loginUser = function(req,res){
    
    console.log('res ',req.body.email);
    user.findOne({email:req.body.email},function(err,User,next){
        // console.log('userpass: ',User[0].password);
        // process.exit();
       
        console.log('loginuser: ',User);
        
        // process.exit();
        
       if(!User){
         return res.json('user not found');
        } else {
            bcrypt.compare(req.body.password, User.password, function(err,result){
            if(err) res.json(err);
            if(result){
              const token = jwt.sign({
                    email:result.email,
                    userId:result._id
                },'secret',{
                    expiresIn:'1h'
                })

                return res.json({
                     message:'login success',
                     token:token
                });
            }
            res.json('login failed');
        });
      }
    })
}


exports.deleteUser = function(req,res){
    const id = req.params.userId;
    user.remove({_id:id},function(err,result){
        if(err) throw err;
        res.status(200).json({
            result:result,
            request:{
                type:'DELETE',
                url:"http://localhost/products/ "+id
            }    
        });
        console.log(result);
    });    
}

exports.finduser = function(req,res){
    // let data = '5cbc1b2d9bbd7c6159cffa03'{qnty:{$lt:'100'},;
    user.find({email:{$eq:'abc@gmail.com'}}
        // {$match:{email:'abc@gmail.com'}}
        // {email:{$neq:'abc@gmail.com'}}
    ,(err,result)=>{
        if(err) res.json(err);
        res.json(result);
        console.log(result);

    })
}

exports.findproduct = function(req,res){
    // let data = '5cbc1b2d9bbd7c6159cffa03'{qnty:{$lt:'100'},;
    product.find({qnty:{$gt:'50'}}
        // {$match:{email:'abc@gmail.com'}}
        // {email:{$neq:'abc@gmail.com'}}
    ,(err,result)=>{
        if(err) res.json(err);
        res.json(result);
        console.log(result);

    })
}

exports.findorder = function(req,res){
    // order.find( {},{"qnty":1,"_id":0}
        
    //     //{$group:{_id:"$email", avg:{$avg:"$qnty"}}}

    //     //{qnty:{$mod:[4,0]}}
    //     // {qnty:{$exists:true,$nin:[1,70]}}
    //     // {$nor:[{qnty:{$lt:'50'}}]}
    //     //  {qnty:{$not:{$lt:'50'}}}
    //     // {$where:{qnty:'50'}}
    //     //  {$or:[{qnty:{$lt:'50'}}]}
    //     // {email:{$eq:'abc@gmail.com'}}
    //     // {$and:[{$or:[{qnty:{$gt:'50'}}],$or:[{qnty:{$ne:'70'}}]}]}
    //     // {$and:[{qnty:{$gt:'50'}},{qnty:{$ne:'70'}}]}
    //     // {qnty:{$nin:'1'}}
    //     // {qnty:{$in:'1'}}
    //     // {qnty:{$ne:'1'}}
    //     // {qnty:{$lte:'68'}}
    //     // {qnty:{$gte:'70'}}
    //     // {qnty:{$gt:'60'}}
    //     // {qnty:{$lt:'60'}}
    //   ,(err,result)=>{
    //     if(err) res.json(err);
    //     res.json(result);
    //     console.log(result);
    //   })
    //   order.ensureIndex({'qnty':1});
    //   order.getIndex();
    // }).skip(3).limit(3).sort({'qnty':-1})

    order.aggregate([{$group:{_id:"$qnty",Total:{$sum:1}}}]);
}
