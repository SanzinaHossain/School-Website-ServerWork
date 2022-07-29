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

async function run(){
  try{
         await client.connect();
         const galleryCollection=client.db('gallery').collection('gallerydata');
         app.get('/gallerydata',async (req,res)=>{
            const query={};
            const cursor=galleryCollection.find(query)
            const gallery= await cursor.toArray()
            res.send(gallery)
         })
         console.log("database connected")
  }
  finally{

  }
}
run().catch(console.dir);
  

app.get('/', (req, res) => {
  res.send('School Website')
})

app.listen(port, () => {
  console.log(`School app listening on port ${port}`)
})
