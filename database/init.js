import mongoose from "mongoose";

export async function useDatabase() {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    const db = mongoose.connection;

    return db;
}
