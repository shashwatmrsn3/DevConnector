const mongoosse = require('mongoose');

const UserSchema = new mongoosse.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        avatar:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
);

module.exports = User = mongoosse.model('user',UserSchema);