import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
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
})

export default mongoose.models.cart || mongoose.model('cart', cartSchema)