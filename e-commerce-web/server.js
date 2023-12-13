const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/product');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use(postRoutes);


const PORT = 5000;
const DB_URL = 'mongodb+srv://meroonshanth89:Miroon3004@mern-app.icqhjbq.mongodb.net/';

mongoose.connect(DB_URL).then(()=>{
      console.log(`DB Connected`)
}).catch((error)=>
console.log(`DB Connection error`,error));

app.listen(PORT, ()=>{
      console.log(`App is running on ${PORT}`);
});