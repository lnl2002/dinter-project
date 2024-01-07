const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require("body-parser");
const cors = require('cors');
config();


const app = express();

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