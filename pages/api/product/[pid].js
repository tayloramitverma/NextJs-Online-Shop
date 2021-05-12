import initDB from '../../../helpers/initDB'
import Product from '../../../models/Product'

initDB()

export default async (req, res)=>{
    switch(req.method){
        case 'GET':
            getProducts(req,res)
        case 'DELETE':
            deleteProduct(req,res)

    }
}

const getProducts = async (req, res) => {
    const product = await Product.findOne({_id:req.query.pid});
    res.status(200).json(product)
}

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete({_id:req.query.pid});
    res.status(200).json({message:'Successfully Deleted!'})
}