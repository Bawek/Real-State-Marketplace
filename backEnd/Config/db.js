import mongoose from "mongoose";

const connectDB = async () => {
  let retries = 5; // Retry logic
  while (retries) {
    try {
      await mongoose.connect(url);
      console.log(`Connected to MongoDB at ${url}`);
      break;
    } catch (error) {
      console.error("Failed to connect to MongoDB, retrying...", error.message);
      retries -= 1;
      if (retries === 0) {
        process.exit(1); // Exit after retry attempts are exhausted
      }
      await new Promise(res => setTimeout(res, 5000)); // Retry after 5 seconds
    }
  }
};
export default connectDB;
