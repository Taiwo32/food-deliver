


import mongoose from "mongoose";

// export const DB = process.env.MONGO_URI

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://taiwosolution02:taiwo1234@taiwo.d2mstxa.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}