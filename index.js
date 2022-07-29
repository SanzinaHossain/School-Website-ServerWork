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
const uri = "mongodb+srv://school_admin:<password>@cluster0.obuisi6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
  res.send('School Website')
})

app.listen(port, () => {
  console.log(`School app listening on port ${port}`)
})
