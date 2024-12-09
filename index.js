const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const MongoStore = require('connect-mongo');

const rrhhRoutes = require('./routes/rrhhRoutes')
const produccionRoutes = require('./routes/produccionRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: 'https://miplataforma.netlify.app',
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'miClaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, maxAge: 3600000 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, 
      ttl: 14 * 24 * 60 * 60, 
    }),
  })
);


app.use('/api/rrhh', rrhhRoutes);
app.use('/api/produccion', produccionRoutes);
app.use('/api', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto  ${PORT}`);
});

