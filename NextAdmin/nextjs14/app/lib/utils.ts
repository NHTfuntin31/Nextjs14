import mongoose from "mongoose";

const connection: any = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;

    const mongoURI = process.env.MONGO;

    if (!mongoURI) {
      throw new Error("MongoDB URI is undefined");
    }

    const db = await mongoose.connect(mongoURI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
