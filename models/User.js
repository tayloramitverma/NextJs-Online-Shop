import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'user',
        enum:['user', 'admin', 'root']
    }
},{
    timestamps:true
})

export default mongoose.models.user || mongoose.model('user', userSchema);