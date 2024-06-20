import mongoose from "mongoose";

const connectDB=async ()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database is connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default connectDB