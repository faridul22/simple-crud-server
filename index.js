const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//---------------MongoDB----------
// simpleCRUDServer
// UJWpKAgOJDDqiKxS


// const uri = "mongodb+srv://simpleCRUDServer:UJWpKAgOJDDqiKxS@cluster0.xwjksg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = "mongodb+srv://simpleCRUDServer:UJWpKAgOJDDqiKxS@cluster0.xwjksg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

//---------------End--------------

app.get('/', (req, res) => {
    res.send("Simple CRUD is Running")
});

app.listen(port, () => {
    console.log(`Simple CRUD is Running on port: ${port}`)
})