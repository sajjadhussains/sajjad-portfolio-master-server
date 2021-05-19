const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://portfolio:shuvo123@cluster0.mgbtc.mongodb.net/portfolioData?retryWrites=true&w=majority";

const port = 4000;

const app = express();
app.use(bodyParser.json())
app.use(cors())


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("portfolioData").collection("pMessage");
  app.post('/message',(req,res)=>{
      console.log(req.body);
      const message =req.body;
      collection.insertOne(message)
      .then(result =>{
          res.send(result.insertedCount>0);
          console.log(result);
      })
  })
  
 
});


app.listen(process.env.PORT || port,()=>console.log(`server is running at ${process.env.PORT || port}`));