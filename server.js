const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");

app.use(cors());

app.get('/hi_all', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//megauser
//123456789qqq

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://megauser:123456789qqq@cluster0.hsrcs.mongodb.net/cookbook?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const collection = client.db("cookbook").collection("users");
        // const user1 = {
        //     login: "bigLame",
        //     name: "Barny Lewis",
        //     password: "123456",
        // }
        // const user2 = {
        //     login: "torren",
        //     name: "George Tormen",
        //     password: "123456",
        // }       
        const result = await collection.insertOne(user1);
        const result2 = await collection.insertOne(user2);
    } catch (err) {
        console.log(err.stack);
    }
    
    finally {
        await client.close();
    }
}
run().catch(console.dir);
