const mongoose = require("mongoose");

module.exports = async function connectDB(){
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing");

  // debug: mask password in logs (safe to keep during dev)
  const masked = uri.replace(/(mongodb:\/\/[^:]+:)[^@]+/, "$1****");
  console.log("Connecting to Mongo:", masked);

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};
