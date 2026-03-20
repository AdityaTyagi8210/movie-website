const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username:String,
    email:{
        type:String,
        unique:[true,"Email already exists"],
    },
    password:String
})

const usermodel = mongoose.model("User",userSchema);

module.exports = usermodel;
