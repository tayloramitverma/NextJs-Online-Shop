import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    email:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    products:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product'
            }
        }
    ]
},{
    timestamps:true
})

export default mongoose.models.order || mongoose.model('order', orderSchema)