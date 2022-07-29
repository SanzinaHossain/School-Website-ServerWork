const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors =require('cors');
require('dotenv').config();

const app = express()
const port =process.env.PORT || 5000
//middle ware 
app.use(cors())
app.use(express.json())

//database connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.obuisi6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("connected")
});

app.get('/', (req, res) => {
  res.send('School Website')
})

app.listen(port, () => {
  console.log(`School app listening on port ${port}`)
})
