import Stripe from 'stripe'
import {v4 as uuidv4} from 'uuid'
import initDB from '../../helpers/initDB'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import useAuthorization from '../../helpers/useAuthorization'

initDB()
const stripe = Stripe(process.env.STRIPE_SECRET)

export default useAuthorization (async (req, res) => {
    const {paymentInfo} = req.body

    const cart = await Cart.findOne({user:req.userId})
    .populate("products.product")

    let price = 0;
    cart.products.forEach(item => {
        price += item.quantity * item.product.price
    });

    const prevCustomer = await stripe.customers.list({
        email:paymentInfo.email
    })

    const isCustomerExisting = prevCustomer.data.lenght > 0

    let newCustomer = ''
    if(!isCustomerExisting){
        newCustomer = await stripe.customers.create({
            email:paymentInfo.email,
            source:paymentInfo.id
        })
    }

    await stripe.charges.create({
        currency: "INR",
        amount: price * 100,
        receipt_email: paymentInfo.email,
        customer: isCustomerExisting ? prevCustomer.data[0].id : newCustomer.id,
        description: `You have successfully done payment with us | ${paymentInfo.email}`
    },{
        idempotencyKey:uuidv4()
    })

    await new Order({
        user:req.userId,
        email:paymentInfo.email,
        total:price,
        products:cart.products
    }).save()

    const cartData = await Cart.findOneAndUpdate(
        {_id:cart.id},
        {$set:{products:[]}},
        {new:true}
    )

    res.status(200).json({message:"Payment was successfully done!",products:cartData.products})
})