const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const PORT = 8000;

const DB_URI = "mongodb+srv://admin:123@cluster0.vznvem9.mongodb.net/task?retryWrites=true&w=majority"

const server = express();

mongoose.connect(DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error)=>{
    if (error){
        console.log("error connecting to database")
    } else {
        console.log("conected to database!");
    }
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});