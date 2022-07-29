const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
         //get gallery data
         app.get('/gallerydata',async (req,res)=>{
            const query={};
            const cursor=galleryCollection.find(query)
            const gallery= await cursor.toArray()
            res.send(gallery)
         })
         //add new gallery data
         app.post('/gallerydata',async(req,res)=>{
          const galleryx=req.body;
          console.log(galleryx)
          const result=await galleryCollection.insertOne(galleryx);
          res.send(result);
        })
        //gallery item delete delete
        app.delete('/gallerydata/:id', async(req,res)=>{
          const id = req.params.id;
          const query={_id:ObjectId(id)};
          const result=await galleryCollection.deleteOne(query);
          res.send(result)
      })
       //get particular gallery data
       app.get('/gallerydata/:id',async(req,res)=>{ 
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const collect=await galleryCollection.findOne(query);
        res.send(collect);
    })
      //update gallery
      app.put('/gallerydata/:id',async(req,res)=>{
        const id = req.params.id;
        const gallery=req.body;
        const query = {_id: ObjectId(id)};
        const collect=await galleryCollection.findOne(query);
        if(collect){
        const result= await galleryCollection.updateOne(query,
          {
            $set:{
              img:gallery.img,
              description:gallery.description
            }
          });
        res.send(result);
        }
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
