import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import initDB from '../../helpers/initDB'
import User from '../../models/User'
import Cart from '../../models/Cart'
import useAuthorization from '../../helpers/useAuthorization'

initDB()

export default async (req, res)=>{
    switch(req.headers.requesttype){
        case 'createUser':
            createUser(req,res)
        break;

        case 'loginUser':
            loginUser(req,res)
        break;

        case 'getUsers':
            getUsers(req,res)
        break;

        case 'updateRole':
            updateRole(req,res)
        break;
    }
}

const createUser = async (req, res) => {
    const {name, email, password} = await req.body
   
    try{
        if(!name || !email || !password){
            return res.status(422).json({err:'Please add all the fields!'})
        }

        const exist = await User.findOne({email});
        if(exist){
            return res.status(422).json({err:'User already exists with this email!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
     
        const newUser = await new User({
            name,
            email,
            password:hashedPassword,
        }).save()

        await new Cart({
            user:newUser._id
        }).save()
     
        res.status(200).json({message:'Successfully Created!'})
    }catch(err){
        console.log(err)
    }
}

const loginUser = async (req, res) => {
    const {email, password} = await req.body
   
    try{
        if(!email || !password){
            return res.status(422).json({err:'Please add all the fields!'})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(422).json({err:'User is not exists with this email!'})
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if(passwordCheck){
            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {
                expiresIn:'7d'
            })
            const {name, email,role} = user
            res.status(200).json({message:'Successfully Authenticated!',token,user:{name,email,role}})
        }else{
            return res.status(422).json({err:'User is not exists with this email!'})
        }
     
    }catch(err){
        console.log(err)
    }
}

const getUsers = useAuthorization (async (req, res) => {
    const users = await User.find({_id:{$ne:req.userId}})
    res.status(200).json(users)
})

const updateRole = useAuthorization(async (req, res)=> {
    const {id,role} = req.body
    const newRole  = role=="user"?"admin":"user"
    const users  = await User.findOneAndUpdate(
        {_id:id},
        {role:newRole},
        {new:true}
    )
    .select("-password")
    res.status(200).json(users)
})