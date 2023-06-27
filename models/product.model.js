var db = require('./db');
const productSchema = new db.mongoose.Schema(
    {
        // đối tượng định nghĩa cấu trúc của model
        name: {type : String, required: true}, // yêu cầu bát buộc phải nhập chuỗi
        price: {type : Number, required: true},
        description: {type : String,required: false},
        image: {type : String,required:false},
        id_group: {type : db.mongoose.Schema.Types.ObjectId, ref:'groupModel'},
    },
    {
        collection: 'product' // xác định tên collection trong csdl
    }
);

const groupSchema = db.mongoose.Schema(
    {
        name:{type: String,required: true}
    },
    {collection: 'group'}
);

let productModel = db.mongoose.model('productModel', productSchema);
let groupModel = db.mongoose.model('groupModel', groupSchema);

module.exports = {
    productModel,groupModel
}