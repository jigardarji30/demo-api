const product = require('../models/product');

exports.viewproduct = function(req,res){
    product.find({},function(err,result){
        if(err) throw err;
        if(result.length >= 0){
            res.status(200).json({
                result:result,
                request:{
                    type:'GET',
                    url:"http://localhost/products/view"
                }    
            });
        } else {
            res.status(404).json("Not Found");
        }
        // res.send(result);
        // console.log(result);
    })
   
    // res.status(200).json({
    //     message:'Handlling GET request to /products'
    // });
}

exports.addProduct = function(req,res,next){
    try{
        
        const productSave = new product({
            name:req.body.name,
            price:req.body.price
        });
        console.log('value',  productSave);
        productSave.save(function(err,result){
            if(err) res.json(err);
            res.status(200).json({
                result:result,
                request:{
                    type:'POST',
                    url:"http://localhost/products/add"
                }    
            });
            console.log(result);

        })
        // productSave.save().then(result => {
        //     res.json(result);
        //     console.log(result);
        // }).catch(err => console.log(err));
        
    }catch(error){
        // res.send(error.message);
        // console.log(error.message);
        console.log(error);
         res.json(error);
    }
    
}
exports.viewIdProduct = function(req,res){
 try{
    const id = req.params.productId;
    
    product.findById(id,function(err,result){
        if(err) throw err;
        if(result){
            res.status(200).json({
                result:result,
                request:{
                    type:'GET',
                    url:"http://localhost/products"+id
                }    
            });
        } else {
            res.status(404).json('not found');
        }
        
    })
}catch(error){
        res.send(error.message);
        console.log(error.message);
        console.log(error);

    }
    
}

exports.updateProduct = (req,res,next)=>{
    const id = req.params.productId;
    let data1 = {};
    for(let data of req.body){
        data1[data.key] = data.value;
    }
    product.update({_id:id},{$set:{data1}},function(err,result){
        if(err) throw err;
        res.status(200).json({
            result:result,
            request:{
                type:'PATCH',
                url:"http://localhost/products/ "+id
            }    
        });
        console.log(result);
    });    
    
}


exports.deleteProduct = (req,res,next)=>{
    const id = req.params.productId;
    product.remove({_id:id},function(err,result){
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

