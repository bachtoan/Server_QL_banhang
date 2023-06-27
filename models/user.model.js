var db = require('./db');
const userSchema = new db.mongoose.Schema(
    {
        // đối tượng định nghĩa cấu trúc của model
        name: {type : String, required: true}, // yêu cầu bát buộc phải nhập chuỗi
        email: {type : String, required: true},
        group: {type : String, required: true},
        password: {type : String,required:true},
       
    },
    {
        collection: 'user' // xác định tên collection trong csdl
    }
);


let userModel = db.mongoose.model('userModel', userSchema);


module.exports = {
    userModel
}