import initDB from '../../helpers/initDB';
import Product from '../../models/Product'

initDB()

export default (req, res)=>{
    Product.find().then(products=>{
        res.status(200).json({message:'Hello World',products:products})
    })
}