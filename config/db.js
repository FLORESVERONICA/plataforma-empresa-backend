const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });
        console.log("MomgoDB conectado");
    
    } catch(err) {
        console.error("Error al conectar MongoDB");
        process.exit(1);
    }
};
module.exports = connectDB;