const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        console.log("Trying to connect to MongoDB...");

        console.log(
            "MONGO_URI exists:",
            !!process.env.MONGO_URI
        );

        const connection = await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected successfully!"
        );

        console.log(
            "MongoDB Host:",
            connection.connection.host
        );

    } catch (error) {

        console.error("\n========== MONGODB ERROR ==========");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        console.error("Error Code:", error.code);
        console.error("===================================\n");

        process.exit(1);
    }
};

module.exports = connectDB;