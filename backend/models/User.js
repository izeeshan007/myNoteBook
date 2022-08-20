const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type : String,
        required: true
    }, 
    email:{
        type : String,
        required: true,
        unique: true
    } ,
    password:{
        type : String,
        required: true
    },
    date:{
        type : Date,
        default: Date.now
    } 

    
  });

  const User= mongoose.model('user', UserSchema);
// User.createIndexes(); //It helps to make unique id for some peoperties

  module.exports = mongoose.model('user', UserSchema);

