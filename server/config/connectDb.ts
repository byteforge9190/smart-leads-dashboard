import mongoose from 'mongoose';

declare global {
    var mongoose: any;
}

let catched = global.mongoose;

if (!catched) {
    catched = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error('Mongoose URI not found on env');
    }
    if (catched.conn) {
        return catched.conn;
    }
    if (!catched.promise) {
        catched.promise = await mongoose.connect(MONGODB_URI)
    }

    try {
        catched.conn = await catched.promise;
    } catch (error) {
        throw error;
    }
    return catched.conn;
}

export default dbConnect;