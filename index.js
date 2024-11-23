const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/horarios', horarioRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

