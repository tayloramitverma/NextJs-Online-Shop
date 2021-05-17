import jwt from 'jsonwebtoken'

const useAuthorization = (icomponent) => {
    return (req,res) => {
        const {authorization} = req.headers
        if(!authorization){
            return res.status(422).json({err:'You must be logged in!'})
        }
        const token = authorization.replace("Bearer ", "")
    
        try{
            const {userId} = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = userId
            return icomponent(req,res)
        }catch(err){
            res.status(422).json({err:"You must be logged In!"})
        }
    }
}

export default useAuthorization;