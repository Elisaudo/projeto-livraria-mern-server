const mongoose = require('mongoose');
const express = require('express');
//const connectDB = require('./config/db');
const booksRoutes = require('./routes/api/books');
const cors = require('cors');
require("dotenv").config();

//Express app
const app = express();

/*
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}  
*/

//Middleware
app.use(express.json({ extended: false }));
//app.get('/', (req, res) => res.send('Hello world!'));

//Conecta o Banco de Dados
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(uri, {
            useNewUrlParser:true,
        });
        console.log('MongoDB está conectado...');
    } catch (err){
        console.error(err.message);
        process.exit(1)
    }
};

connectDB();




// Cors
app.use(cors({ origin: true, credentials: true }));

//Routes
app.use('/api/books', booksRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
