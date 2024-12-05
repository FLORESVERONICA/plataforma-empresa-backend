const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MomgoDB conectado");
    
    } catch(err) {
        console.error("Error al conectar MongoDB", err.message);
        process.exit(1);
    }
};
module.exports = connectDB;