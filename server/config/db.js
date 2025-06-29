import mongoose from "mongoose";

export const connectDB = async() => {{
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connection successful' , mongoose.connection.host);
    })
    .catch((err) => {
        console.log('Database connection failed' , err);
    })
}};