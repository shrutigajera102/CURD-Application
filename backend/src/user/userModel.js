const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    }
});

module.exports= mongoose.model('Employee', userSchema);