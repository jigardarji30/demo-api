const order = require('../models/order');
const product = require('../models/product');


exports.viewOrder = function(req,res){
    order.find({},'_id qnty',function(err,result){
       if(err) res.json(err);
       res.status(200).json({
        message:'orders fetched',
        result:result.map(function(result){
            return {
                product:result.product,
                id:result._id,
                product:result.product,
                qnty:result.qnty,
                name:result.name,
                request:{
                    type:"GET",
                    url:"localhost/orders/view/" + result.id
                }
            }
        })
      });
    }).populate('product').exec();
    
}

exports.addOrder = function(req,res,next){
    product.findById(req.body.productId,function(){
        const orders = new order({
            product:req.body.productId,
            qnty:req.body.qnty
        })
        console.log(orders);
        orders.save(function(err,result){
            if(err) res.json(err);
            res.json(result);
            res.status(200).json({
                
                    message:'orders stored',
                    request:{
                            type:"POST",
                            url:"localhost/orders/add/" + result.id
                        }
                });
        });
})
}


exports.viewIdOrder = function(req,res){
    order.findById(req.params.orderId,function(err,result){
        if(err) res.json(err);
        res.status(200).json({
            message:'orders detail',
            orderId:req.params.orderId,
            result: {
                    id:result._id,
                    order:result.orderId,
                    product:result.productId,
                    qnty:result.qnty,
                    request:{
                        type:"GET",
                        url:"localhost/orders/view/" + result.id
                    }
            }
          })
        }).populate('product').exec();    
    }


exports.updateOrder = function(req,res,next){
    res.status(200).json({
        message:'orders fetched'
    });
}

exports.deleteOrder = function(req,res){
    order.remove({_id:req.params.orderId},function(err,result){
        if(err) res.json(err);
        res.status(200).json({
            message:'orders deleted',
            orderId:req.params.orderId,
            result: {
                    orderId:result._id,
                    order:result.orderId,
                    qnty:result.qnty,
                    request:{
                        type:"delete",
                        url:"localhost/orders/view/" + result.id
                    }
            }
          })
    });
   
}
