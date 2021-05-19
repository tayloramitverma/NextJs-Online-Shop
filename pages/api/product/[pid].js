import initDB from '../../../helpers/initDB'
import Product from '../../../models/Product'
import Cart from '../../../models/Cart'
import Order from '../../../models/Order'
import useAuthorization from '../../../helpers/useAuthorization'

initDB()

export default async (req, res)=>{
    switch(req.headers.requesttype){
        case 'getProduct':
            getProduct(req,res)
        break;
        case 'getProducts':
            getProducts(req,res)
        break;
        case 'createProduct':
            createProduct(req,res)
        break;
        case 'deleteProduct':
            deleteProduct(req,res)
        break;
        case 'getCart':
            getCart(req,res)
        break;
        case 'addToCart':
            addToCart(req,res)
        break;
        case 'removeCartItem':
            removeCartItem(req,res)
        break;
        case 'getOrders':
            getOrders(req,res)
        break;

    }
}

const getProduct = async (req, res) => {
    const product = await Product.findOne({_id:req.query.pid});
    res.status(200).json(product)
}

const getProducts = async (req, res) => {
    const data = await Product.find();
    res.status(200).json(data)
}

const createProduct = async (req, res) => {

   const {name, price, description, mediaURI} = await req.body
   
   if(!name && !price && !description && !mediaURI){
       return res.status(422).json({err:'Please add all the fields!'})
   }

   const product = await new Product({
       name,
       price,
       description,
       mediaURI
   }).save()

   res.status(200).json({message:'Successfully Created!',product:product})
}

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete({_id:req.query.pid});
    res.status(200).json({message:'Successfully Deleted!'})
 }


const getCart = useAuthorization (async (req, res) => {

    const cart = await Cart.findOne({user:req.userId})
    .populate("products.product")
    res.status(200).json(cart.products)
})

const addToCart = useAuthorization (async (req, res) => {

    const {quantity, product} = req.body
    const cart = await Cart.findOne({user:req.userId})
    const pExist = cart.products.some(pDoc => product === pDoc.product.toString())
    if(pExist){
        await Cart.findOneAndUpdate(
            {_id:cart._id,"products.product":product},
            {$inc:{'products.$.quantity':quantity}}
        )
    }else{
        const newProduct = {
            quantity:parseInt(quantity),
            product:product
        }

        await Cart.findOneAndUpdate(
            {_id:cart._id},
            {$push:{products:newProduct}}
        )
    }

    res.status(200).json({message:"Product added to cart!"})
})


const removeCartItem = useAuthorization (async (req, res) => {

    const cart = await Cart.findOneAndUpdate(
        {user:req.userId},
        {$pull:{products:{product:req.query.pid}}},
        {new:true}
    )
    .populate("products.product")

    res.status(200).json(cart.products)
})

const getOrders = useAuthorization (async (req, res) => {

    const orders = await Order.find({user:req.userId})
    .populate("products.product")
    
    res.status(200).json(orders)
})