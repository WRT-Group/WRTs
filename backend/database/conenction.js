const mongoose=require("mongoose")

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.uri)
        console.log("Connected to MongoDB.")
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectDB
