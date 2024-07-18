


// import mongoose from "mongoose";

// // export const DB = process.env.MONGO_URI

// export const connectDB = async () =>{
//     await mongoose.connect('mongodb+srv://taiwosolution02:taiwo1234@taiwo.d2mstxa.mongodb.net/food-del').then(()=>console.log("DB Connected"))
// }

import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',()=>{
        console.log("Connection Established");
    })

    await mongoose.connect(`${process.env.MONGO_URI}/food-del`)

}
export default connectDB;