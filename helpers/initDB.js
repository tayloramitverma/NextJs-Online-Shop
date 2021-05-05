import mongoose from 'mongoose'

function initDB(){

    if(mongoose.connections[0].readyState){
        console.log("Already connected!")
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    mongoose.connection.on('connected',()=>{
        console.log("Connected to mongodb!")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("Monogodb connection issue!", err)
    })
}

export default initDB;