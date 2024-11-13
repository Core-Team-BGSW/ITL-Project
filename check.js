const mongoose = require('mongoose');
// Replace <password> with the actual password
const uri = "mongodb+srv://iterlusers:BDets123@iterl-mongodb-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000";
async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
	tls: true,
    });
    console.log("Mongoose connected successfully to MongoDB");
  } catch (err) {
    console.error("Mongoose connection failed:", err);
  }
}
connectToDB();
