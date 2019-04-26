const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const speakeasy = require('speakeasy');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const fs = require('fs');

var port = 8000;
app.listen(port,()=>console.log(`server start at port ${port}`))
console.log('server connected');

const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const userRoute = require('./api/routes/users');


mongoose.connect('mongodb://localhost:27017/demo-api',{ useNewUrlParser: true });

app.use(cookieParser());
app.use(session({
    secret:'SECRET',
    resave:false,
    saveUninitialized:true,
    cookie:{
        // originalMaxAge:'60000',
        maxAge:'60000'
    }}));

app.use(flash())

app.get('/flash',(req,res)=>{
    req.flash('info','information');
    console.log('information');
    res.render('users',{messages:req.flash('info')});
});

// fs.readdirSync(__dirname + '/api/models').forEach(function(filename){
//     console.log('filename',filename);
//     if(filename.indexOf('.js')) {
//        let file = require(__dirname + '/api/models/' + filename);
//     }
// });

// var orders = mongoose.model('orders',{name:String});
// var product = mongoose.model('product',{content:String});

// app.get('/mongo/:id',function(req,res){
//     console.log(req.params.id);
//     mongoose.model('orders').find({_id:req.params.id},function(err,result){
//         // res.send(result);    
//         // console.log(result);
//         mongoose.model('product').populate('product').then(function(err,data){
//             if(err) console.log(err);
//             res.send(data);
//         });
//        });

// });

// app.get('/mongo2',function(req,res){
 
//     // product.find({},function(err,product){
//     //     if(err) console.log(err);
//     //     res.send(product);    
//     //     console.log(product);
      
//     // })   
// })



let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
    console.log('success connect');
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-origin','*');
//     res.header('Access-Control-Allow-headers',
//     'origin, x-Requested-With,Content-Type,Accept,Authorization');
//     if(req.method === 'OPTIONS'){
//     res.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE');
//     return res.status(200).json({});

//     }
// });

app.use('/products',productRoute);
app.use('/orders',orderRoute);
app.use('/users',userRoute);


app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
    res.send(
     error.message
    );
});

// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'It works'
//     });
// });
console.log('app');

module.exports = app;