// configure dotenv package
require('dotenv').config();
const express = require("express");
// require massive
const massive = require('massive');
const ctrl = require('./controller')
const app = express();
// destructuring variables from .env file to use in index.js
const { SERVER_PORT, CONNECTION_STRING } = process.env;
// using massive to connect to our database
massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set("db", db)
  console.log('db connected')
}).catch(err => console.log(err));

app.use(express.json());
// endpoints
app.get('/api/airplanes', ctrl.getAirplanes)
app.get('/api/airplane/:plane_id', ctrl.getAirplaneById)
app.post('/api/airplane', ctrl.addAirplane)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});