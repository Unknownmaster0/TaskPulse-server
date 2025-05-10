import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionString = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
    } catch (error) {
        console.log(`Error while connecting with db: ${error.message}`);
        throw new Error(`Failed to connect with db`);
    }
}

export default connectDB;