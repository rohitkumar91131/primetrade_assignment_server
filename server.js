const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));

app.get("/",(req, res)=>{
  res.send("Api is working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));