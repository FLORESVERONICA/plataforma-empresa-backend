const express = require('express');

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const rrhhRoutes = require('./routes/rrhhRoutes')
const produccionRoutes = require('./routes/produccionRoutes');
const authRoutes = require('./routes/authRoutes');



dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/rrhh', rrhhRoutes);
app.use('/api/produccion', produccionRoutes);
app.use('/api', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto  ${PORT}`);
});

