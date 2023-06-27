const myModel = require('../models/user.model');
exports.getUserView = async (req,res,next) => {   
    let msg = "";
    let listUser = await myModel.userModel.find();

    

    res.render( 'user/user', { listUser:listUser, msg:msg } )
};

exports.searchUser = async (req,res,next) => {   
    let msg = "";
    let regex = new RegExp(req.body.userName, "i"); 
    let listUser = await myModel.userModel.find({ name: regex });  
    if (listUser.length == 0){
        msg = "Không có user nào có tên đăng nhập gần giống: " + req.body.userName;
    } 
    res.render( 'user/user', { listUser:listUser, msg:msg } )
}

exports.reloadUser = async (req,res,next) => {   
    res.redirect('/users');
    
}


exports.deleteUser = async (req, res, next) => {
    await myModel.userModel.deleteOne({ _id: req.body.productIdDelete });

    res.redirect('/users');
}

exports.signUp = async (req, res, next) => {
    if (req.method == "POST") {      
        let objUser = new myModel.userModel();
        objUser.name = req.body.userName;
        objUser.email = req.body.userEmail;
        objUser.password = req.body.userPassword;
        objUser.group = req.body.userGroup;
        

        try{
            let new_group = await objUser.save();
            
        }catch(err){
            console.log(err);
        }
    }
    res.redirect('/users');
};

