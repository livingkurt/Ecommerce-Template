import express from 'express';
import data from './data';

import config from './config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'



const mongodbURL = config.MONGODB_URI
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason))

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/glowdb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }.catch(error => console.log(error.reason)))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


const app = express();
app.use(bodyParser.json())
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID)
})




// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find((x) => x._id === productId);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ msg: "Product Not Found" });
//   }
// })

// app.get("/api/products", (req, res) => {
//   res.send(data)
// })




app.listen(5000, () => { console.log("Server started at http://localhost:5000") })