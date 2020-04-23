const express = require('express')
const data = require('./data')

const config = require('./config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')


const path = require('path')

// import express from 'express';
// import data from './data';

// import config from './config'
// import mongoose from 'mongoose'
// import bodyParser from 'body-parser'
// import userRoute from './routes/userRoute'
// import productRoute from './routes/productRoute'
// import orderRoute from './routes/orderRoute'


// import path from "path"

const PORT = process.env.PORT || 5000;
const app = express();

const mongodbURL = config.MONGODB_URI
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason))

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ecommercedb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }.catch(error => console.log(error.reason)))


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID)
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});