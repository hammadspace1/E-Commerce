import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/E-Commerce';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    
    cached.conn = await cached.promise;
    console.log("MongoDB Connected Successfully!");
    return cached.conn;
}

export default dbConnect;

// import mongoose from "mongoose";

// const MONGODB_URI = "mongodb://localhost:27017/E-Commerce";

// export default async function dbConnect(){
//     try {
//         await mongoose.connect(MONGODB_URI)

//         const connection = mongoose.connection

//         connection.on('connected', () => {
//             console.log("MongoDb Connected Successfully!")
//         })

//         connection.on('error', (err) => {
//             console.log("Mongodb Connection Error:"+ err );
//             process.exit(1);
//         })


//     } catch (error) {
//        console.log("Something went wrong in connecting to db")
//        console.log(error)
//        process.exit(1)
        

//     }
// };