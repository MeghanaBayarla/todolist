const mongoose=require('mongoose');
const TSchema =new mongoose.Schema({
    description:{type:String,required:true},
    category:{type:String},
    duedate:{type:String}
});
const Listdo=mongoose.model('Listdo',TSchema);
module.exports=Listdo;