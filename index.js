const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`El Servidor está corriendo en el puerto ${PORT}`));