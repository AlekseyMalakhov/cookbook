const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

//DB account info
//login - megauser
//pass - 123456789qqq
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://megauser:123456789qqq@cluster0.hsrcs.mongodb.net/cookbook?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//connect to DB
let collection;
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        collection = client.db("cookbook").collection("users");
    } catch (err) {
        console.log(err.stack);
    } finally {
        //await client.close();
    }
}
run().catch(console.dir);

//create account
app.post("/create_account", (req, res) => {
    const newAccount = req.body;

    //check if username is free
    async function checkForExisting() {
        const query = {
            name: newAccount.name,
        };
        const result = await collection.findOne(query);
        return result;
    }
    checkForExisting().then(result => {
        if (!result) {
            createAccount();
        } else {
            res.sendStatus(409);
        }
    });

    async function createAccount() {
        const result = await collection.insertOne(newAccount);
        res.send(result);
    }
});

//login
app.post("/login", (req, res) => {
    const user = req.body;
    async function getUser() {
        const query = {
            name: user.name,
        };
        const result = await collection.findOne(query);
        console.log(result);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        if (result && result.password === user.password) {
            res.send(result);
        } else {
            res.sendStatus(403);
        }
    }
    getUser();
});

//get all users
app.get("/users", (req, res) => {
    async function getAllUsers() {
        const cursor = await collection.find();
        const arr = await cursor.toArray();
        const result = arr.map(user => {
            delete user.password;
            return user;
        });
        if (!result) {
            res.sendStatus(403);
            return;
        } else {
            res.send(result);
        }
    }
    getAllUsers();
});

//create recipe
app.post("/create_recipe", (req, res) => {
    const newRecipe = req.body;

    // //check if username is free
    // async function checkForExisting() {
    //     const query = {
    //         name: newAccount.name,
    //     };
    //     const result = await collection.findOne(query);
    //     return result;
    // }
    // checkForExisting().then(result => {
    //     if (!result) {
    //         createAccount();
    //     } else {
    //         res.sendStatus(409);
    //     }
    // });

    console.log(newRecipe);

    async function createRecipe() {
        const result = await collection.insertOne(newRecipe);
        res.send(result);
    }
    //createRecipe();
});

//start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
