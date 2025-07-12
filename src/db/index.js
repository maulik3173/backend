
import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';


const connectDB = async () => {
  try{
    const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  }
  catch (error){
    console.error('Error connecting to the database:', error);
    process.exit(1);
    // what is process.exit(1) doing here?
    // It terminates the Node.js process with a failure code (1), indicating that the
    // application could not start due to a database connection failure.
  
  }
}

export default connectDB;