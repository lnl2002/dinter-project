import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ExpressPeerServer } from 'peer';
import http from 'http'
config();



const app = express();
app.use('/public',express.static('public'));
const PORT = process.env.PORT || 3007;

const server = http.Server(app);
const peerServer = ExpressPeerServer(server, {
  debug: true
})

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    
    app.use(cors());
    
    app.use('/peerjs', peerServer);

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