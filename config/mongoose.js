const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/tdlist');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'ERROR in connection'));
db.once('open',function(){
    console.log("DB connected successfully");
});