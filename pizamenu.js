const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const app = express();

//const dbUrl = "mongodb://127.0.0.1:27017";
//const Db_URL ="mongodb+srv://pizzamenu:bz39BkYJzgAOOQAH@pizzamenu.t0hnk.mongodb.net/pizza?retryWrites=true&w=majority"

const DB_URL = process.env.DB_URL||"mongodb://127.0.0.1:27017";
const port = process.env.PORT || 4000;
app.use(express.json());



app.post("/menu", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(DB_URL);
        let db = clientInfo.db("pizza");
        let data = await db.collection("menu").insertMany(req.body);
        res.status(200).json(data);
        res.send(data)
        console.log("menu displayed successfully")
        clientInfo.close();

    } catch (error) {
        console.log(error);
    }
});
app.get("/allmenu", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(DB_URL);
        let db = clientInfo.db("pizza");
        let data = await db.collection("menu").find().toArray();
        res.status(200).json(data);
        res.send(data)
        console.log("menu displayed successfully")
        clientInfo.close();

    } catch (error) {
        console.log(error);
    }
});



app.listen(port, () => console.log("app runs with", port));
//mongodb+srv://stdmentr:ePRHUkFg3aGZfV9t@cluster0.r1zpo.mongodb.net/stdmentr?retryWrites=true&w=majority