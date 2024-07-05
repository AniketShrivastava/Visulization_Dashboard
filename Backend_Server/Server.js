import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./config_db/db.js";
import router from "./routes/Visualization_route.js";
import mongoose from "mongoose";
import cors from 'cors'

const app = express()
connectToDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
app.use(cors());

const port = 5000;

app.use('/',router)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });