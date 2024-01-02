const express = require('express');
const mongoose = require('./config/mongoose');
const path = require('path');
const Listdo = require('./models/TSchema');
// data is inserted into database after creating as document and push into collection
const PORT = 8084;
const app = express();
app.use(express.static('../Listtodo/public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); // middleware
app.get('/',function(req,res){
res.send("i am in home page");

});

app.get('/delete-data',function(req,res){
    var id=req.query;
    var len = Object.keys(id).length;
    var deletePromises = [];
    for(let i=0;i<len;i++){
        deletePromises.push(Listdo.findByIdAndDelete(Object.keys(id)[i]));
    }
    Promise.all(deletePromises)
    .then(() =>{
        console.log("task(s) deleted successfully");
        return res.redirect('back');
    })
    .catch((err) => {
        console.log("Error in deleting data",err);
        return res.redirect('back');
    })
});
app.get('/show',function(req,res){
    const todos = Listdo.find({}).exec();
    //find return query object to execute that query we use exec method
    // contacts.then().catch(); -----> promise
    todos
    .then(data =>{
        console.log(data);
        res.render('listtodo',{data:data});
    })
    .catch(err => {
        console.log("error while fetching data from db");
    });

// res.render('contact');
});
app.post('/add-contact',function(req,res){
const tdlist = new Promise((resolve,reject) => {
Listdo.create({
    description:req.body.description,
    category:req.body.category,
    duedate:req.body.duedate
})
.then(newData => {
    console.log("*********newData*******");
    resolve(newData);})
    .catch(err =>{
    console.log("Error in Adding data",err);
    reject(err);
});

});
tdlist
.then((newData) => {
    res.redirect('back');
})
.catch(err =>{
    console.log("Error",err);})
});
app.listen(PORT,function(err){
if(err){
console.log("Server is not running");
return;
}
console.log("Server is UP & Running on port:",PORT);
});
