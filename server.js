const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors");
const { MongoClient } = require('mongodb');
const Scama = require('./model');
const pdf = require('pdf-parse');
const ejs = require('ejs');
const pdf = require('pdf-parse');
const router = express.Router();
const fs = require('fs')
const fileUpload = require("express-fileupload");
const url = "mongodb+srv://<username>:<password>@cluster.lmdk2wn.mongodb.net/resumes";


app.use(express.static(path.join(__dirname, "./public/")));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname), "views");
app.set('view engine', 'ejs');


require("dotenv").config({ path: "./config.env" });
global.__basedir = __dirname;



const storage = multer.diskStorage({
    destination: "/public/",
    filename: function (req, file, cb) {
        cb(null,  Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("myfile");

const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
    keywords: [String]
});

// Create a model for the collection
const Data = mongoose.model('Data', DataSchema);
const databaseName = 'resumes';
const client = new MongoClient(url);

async function dbConnect() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection('datas');

}


app.get('/search', async (req, res) => {
    console.log(req.query.parameterName);
    if ((req.query.parameterName === "{}") ||  (req.query.parameterName === "")){

        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            
            if (err) throw err;
            const dbo = db.db('resumes');
            dbo.collection('datas').find({}).project({ name: 1, email: 1 }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        }

        )
    }
    else { 

    client.connect(err => {
        const collection = client.db("resumes").collection("datas");
        // perform actions on the collection object
        var query = { keywords: `${req.query.parameterName}` };
        console.log(query);

        collection.aggregate([
            { $match: query },
            { $project: { name: 1, email: 1 } }
        ]).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        });
    }

});

     
function uploadHelper(pathHelper, tempEmail) {
    mongoose.connect("mongodb+srv://<username>:<password>@cluster.lmdk2wn.mongodb.net/resumes", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    var name;
    var tags;
   
    
    string_to_array = function (str) {
        temp = str.trim().split(" ");
        unique = temp.filter((item, i, ar) => ar.indexOf(item) == i);
        name = unique[0] + " " + unique[1]
        tags = unique.slice(2)
        return {
            name,
            tags
        }
    };
    fs.readFile(pathHelper, 'utf8', function (err, data) {
        console.log('123', tempPath);
        if (err) throw err;
        new_words = data.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029\u0028\u0029]+/g, " ")
        string_to_array(new_words)
        console.log(name)
        console.log(tags)
        if (tempEmail === "") {
            tempEmail = "N/A";
        }

        const data2 = new Data({
            name: name,
            email: tempEmail,
            keywords: tags
        });
        console.log(data2);
        data2.save((error) => {
            if (error) throw error;
            console.log('Data successfully uploaded to the database!');
        });

    });
    return ("1");
}

app.post("/upload", (req, res) => {
    
   
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    mongoose.connect("mongodb+srv://<username>:<password>@cluster.lmdk2wn.mongodb.net/resumes", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const file = req.files.myFile;
    const email = req.body.email;
    console.log(email);
    const path = __dirname + "/uploads/" + file.name; // changed to / instead of \\
    tempPath = "./uploads/" + file.name;
    //console.log(file.extname())

    file.mv(path, (err) => {
        if (err) {
            console.log(path);
            return res.status(500).send(err);
        }
        if (file.name.split(".").includes("PDF") || file.name.split(".").includes("pdf")) {
            var tempVar = file.name.split(".", 1);
            let dataBuffer = fs.readFileSync(tempPath);
            pdf(dataBuffer).then(function (data) {
                console.log(data.text);
                fs.writeFile("./uploads/"+`${tempVar}`+".txt", data.text, function (err) {
                    if (err) throw err;
                    console.log("succk");
                });
            });

            tempPath = "./uploads/" + `${tempVar}` + ".txt";
        }
        //fs.watch(tempPath, (eventType, file.name)) =>
        console.log(path);  // added this line to check the path
        uploadHelper(tempPath, email);  // remove one of the call to tempToop
    });
    res.redirect("/");
});

app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(router);


app.get("/", (req, res) => {
    res.render("views/index.ejs");
});

mongoose.connect("mongodb+srv://<username>:<password>@cluster.lmdk2wn.mongodb.net/resumes", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => { console.log("DB is connected") })

app.listen(PORT, () => {
    console.log("Listening on Port: ", PORT)
});
