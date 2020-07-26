const mongo = require('mongoose')

const UserSchema = mongo.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        minlength:3
    },
    mobile:
    {
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    age:
    {
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8 
    },
    uploaded: [
        {
            bookid:{type:String},
            version:{type:String},
            description:{type:String},
            audiofile:{type:String}
        }
    ]
})

module.exports = mongo.model('user',UserSchema);