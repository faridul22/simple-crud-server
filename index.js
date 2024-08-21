const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        const usersCollection = client.db("simpleCrudDB").collection("usersCollection");

        app.get("/users", async (req, res) => {
            const users = usersCollection.find();
            const result = await users.toArray();
            res.send(result)
        })

        app.post("/users", async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await usersCollection.insertOne(newUser);
            res.send(result)
        })

        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            console.log('Please delete form database', id)
            const query = { _id: new ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
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