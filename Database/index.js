const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRouter = require('../Database/route/route');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.info(`${req.method} ${req.url}`);
    next();
});
app.use(userRouter);


mongoose.connect('mongodb://localhost:27017/Masai').then(()=>{
    console.log("Connected to MongoDB");
}).then(()=>{
    app.listen(7000,()=>{
        console.log("Server is running on port 7000");
    })
});