require("dotenv").config({ path: "../cookbook_env/.env" });
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

//Amazon
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
    region: "eu-central-1",
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    },
});

const uploadImgToAmazon = multer({
    storage: multerS3({
        s3: s3,
        bucket: "cookingimages2",
        acl: "public-read",
        key: function(req, file, cb) {
            cb(null, Date.now().toString() + "_" + file.originalname);
        },
    }),
});
//end Amazon

app.use("/images", express.static("uploads"));

//DB account info
//login - megauser
//pass - 123456789qqq
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://megauser:123456789qqq@cluster0.hsrcs.mongodb.net/cookbook?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//connect to DB
let collectionUsers;
let collectionRecipes;
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        collectionUsers = client.db("cookbook").collection("users");
        collectionRecipes = client.db("cookbook").collection("recipes");
    } catch (err) {
        console.log(err.stack);
    } finally {
        //await client.close();
    }
}
connectToDB().catch(console.dir);

//create account
app.post("/create_account", uploadImgToAmazon.single("img"), (req, res) => {
    const newAccount = JSON.parse(req.body.text);
    newAccount.img = req.file.location;

    //check if username is free
    async function checkForExisting() {
        const query = {
            name: newAccount.name,
        };
        const result = await collectionUsers.findOne(query);
        return result;
    }
    checkForExisting().then((result) => {
        if (!result) {
            createAccount();
        } else {
            res.sendStatus(409);
        }
    });

    async function createAccount() {
        const result = await collectionUsers.insertOne(newAccount);
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
        const result = await collectionUsers.findOne(query);
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
        const cursor = await collectionUsers.find();
        const arr = await cursor.toArray();
        const result = arr.map((user) => {
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

//get all recipes
app.get("/recipes", (req, res) => {
    async function getAllRecipes() {
        const cursor = await collectionRecipes.find();
        const arr = await cursor.toArray();
        const result = arr.map((recipe) => {
            return recipe;
        });
        if (!result) {
            res.sendStatus(403);
            return;
        } else {
            res.send(result);
        }
    }
    getAllRecipes();
});

//create recipe
app.post("/create_recipe", uploadImgToAmazon.single("img"), (req, res) => {
    const newRecipe = JSON.parse(req.body.text);
    newRecipe.img = req.file.location;

    async function createRecipe() {
        const result = await collectionRecipes.insertOne(newRecipe);
        res.send(result);
    }
    createRecipe();
});

//delete recipe
app.delete("/delete_recipe/:id", (req, res) => {
    const id = req.params.id;
    const query = {
        _id: new ObjectId(id),
    };
    async function deleteRecipe() {
        const result = await collectionRecipes.deleteOne(query);
        if (result.deletedCount === 1) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    }
    deleteRecipe();
});

//edit recipe
app.put("/edit_recipe/:id", uploadImgToAmazon.single("img"), (req, res) => {
    const updatedRecipe = JSON.parse(req.body.text);
    updatedRecipe.img = req.file.location;
    const id = req.params.id;
    const query = {
        _id: new ObjectId(id),
    };

    async function editRecipe() {
        const result = await collectionRecipes.replaceOne(query, updatedRecipe);
        res.send(result);
    }
    editRecipe();
});

//start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
