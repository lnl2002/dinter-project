// const express = require('express');
// const { config } = require('dotenv');
// const mongoose = require('mongoose');
// const routes = require('./routes/index');
// const bodyParser = require("body-parser");
// const cors = require('cors');

import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
config();



const app = express();
app.use('/public',express.static('public'));
const PORT = process.env.PORT || 3007;


async function main() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    
    app.use(cors());
    
    app.use(bodyParser.json());
    routes(app);


    app.listen(PORT, () => {
      console.log('Dinter running on port ' + PORT);
    })
  } catch(err) {
    console.log(err);
  }
}

main();