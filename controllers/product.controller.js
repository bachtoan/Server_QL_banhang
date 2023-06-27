const fs = require('fs');
const myModel = require('../models/product.model');
const { log, group } = require('console');



exports.getProductsView = async (req,res,next) => {   
    
    let listGroup = await myModel.groupModel.find();
    let list = await myModel.productModel.find().populate("id_group");
    
    let msg = list.length + " sản phẩm";
    
    res.render( 'products/product', { listProduct: list, listGroup:listGroup, title:"Tẩt cả sản phẩm", msg:msg } )
};

exports.postProduct = async (req, res, next) => {
    var url_image = "";
    if (req.method == "POST") {
      
      // sử dụng hàm fs.rename để di chuyển file
      
      if(req.file != undefined) {
        try {
            await fs.rename(
              req.file.path,
              "./public/uploads/" + req.file.originalname,
              function (err) {
                if (err) throw err;
                //không có lỗi ==> upload thành công
                url_image = "/uploads/" + req.file.originalname;
                console.log("upload thanh cong" + url_image);
              }
            );
          } catch (error) {
            // nếu có lỗi thì xảy ra lỗi ở đây
            console.log(error);
          }

            let objProduct = new myModel.productModel();
            objProduct.name = req.body.productName;
            objProduct.price = req.body.productPrice;
            objProduct.description = req.body.productDescription;
            objProduct.image = req.file.originalname;
            objProduct.id_group = req.body.productGroup;
            try{
                let new_product = await objProduct.save();
                console.log(new_product);
                
            }catch(err){
                console.log(err);
            }
        }else{
            let objProduct = new myModel.productModel();
            objProduct.name = req.body.productName;
            objProduct.price = req.body.productPrice;
            objProduct.description = req.body.productDescription;
            objProduct.id_group = req.body.productGroup;
            try{
                let new_product = await objProduct.save();
                console.log(new_product);
                
            }catch(err){
                console.log(err);
            }
        }
    }
    res.redirect('/products');
};


exports.editProduct = async (req, res, next) => {
    var url_image = "";
    if (req.method == "POST") {
      
        if(req.file != undefined) {
            try {
                await fs.rename(
                  req.file.path,
                  "./public/uploads/" + req.file.originalname,
                  function (err) {
                    if (err) throw err;
                    url_image = "/uploads/" + req.file.originalname;
                    console.log("upload thanh cong" + url_image);
                  }
                );
              } catch (error) {
                console.log("don't have new images");
              }
            let objProduct = new myModel.productModel();
            objProduct.name = req.body.productName;
            objProduct.price = req.body.productPrice;
            objProduct.description = req.body.productDescription;
            objProduct.image = req.file.originalname;
            objProduct.id_group = req.body.productGroup;
            objProduct._id = req.body.productId;
            console.log(req.body.productId);
            try{
             await myModel.productModel.findByIdAndUpdate({_id:  req.body.productId}, { $set: objProduct });
             console.log("đã sửa");
    
            }catch(err){
                console.log(err);
                console.log("Chưa sửa được");
            }
        }else{
            let objProduct = new myModel.productModel();
            objProduct.name = req.body.productName;
            objProduct.price = req.body.productPrice;
            objProduct.description = req.body.productDescription;
            objProduct.id_group = req.body.productGroup;
            objProduct._id = req.body.productId;
            console.log(req.body.productId);
            try{
             await myModel.productModel.findByIdAndUpdate({_id:  req.body.productId}, { $set: objProduct });
             console.log("đã sửa");
    
            }catch(err){
                console.log(err);
                console.log("Chưa sửa được");
            }
        }
        
    }
    res.redirect('/products');
}
  
  
  
exports.deleteProduct = async (req, res, next) => {
    await myModel.productModel.deleteOne({ _id: req.body.productIdDelete });

    res.redirect('/products');
}
  
  
  

exports.getGroupView = async (req,res,next) => {   
    let listGroup = await myModel.groupModel.find();

    res.render( 'products/group', { listGroup:listGroup,title:"Thể loại" }  )
};

exports.postGroup = async (req, res, next) => {
   
    if (req.method == "POST") {      
        let objGroup = new myModel.groupModel();
        objGroup.name = req.body.groupName;
        

        try{
            let new_group = await objGroup.save();
            
        }catch(err){
            console.log(err);
        }
    }
    res.redirect('/products/group');
};


exports.updateGroup = async (req, res, next) => {
    
    if (req.method == "POST") {
      
        
            let objGroup = new myModel.groupModel();
            objGroup.name = req.body.groupName;
            objGroup._id = req.body.groupId;
           
            try{
             await myModel.groupModel.findByIdAndUpdate({_id:  req.body.groupId}, { $set: objGroup });
             console.log("đã sửa");
    
            }catch(err){
                console.log(err);
                console.log("Chưa sửa được");
            }
        
        
    }
    res.redirect('/products/group');
}

exports.deleteGroup = async (req, res, next) => {
    await myModel.groupModel.deleteOne({ _id: req.body.productIdDelete });

    res.redirect('/products/group');
}

exports.productInfo = async (req, res, next) => {

    let objProduct = await myModel.productModel.findById(req.params.idProduct);
    
    let objGroup = await myModel.groupModel.findById(objProduct.id_group);
    
    res.render('products/info',{objProduct: objProduct, objGroup: objGroup});
};

exports.filterProduct= async (req,res,next)=>{

    let msg = "";

    if(req.body.filterGroup == "") {
        res.redirect('/products');
    }else {
        let listGroup = await myModel.groupModel.find();
        let list = await myModel.productModel.find({id_group: req.body.filterGroup}).populate("id_group");
        let group = await myModel.groupModel.findOne({_id: req.body.filterGroup});
        
        if(list.length == 0){
            msg = "Không có sản phẩm nào thuộc thể loại: " + group.name;
        }else{
            msg = "Có " +list.length +" sản phẩm thuộc thể loại: " + group.name;
        }
        console.log(list.length, listGroup.length);
        var title = "";
    res.render( 'products/product', { listProduct: list, listGroup:listGroup, title:title , msg:msg} )
    }
}


