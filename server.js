// dit is een boilerplate voor een node.js webserver met alle basis die je nodig hebt om je webserver aan de praat te krijgen

// Add info from .env file to process.env
require("dotenv").config();

// Initialise Express webserver
const express = require("express");
const { disconnect } = require("process");
const app = express();
const {
  ServerApiVersion,
  ObjectId,
  MongoClient,
} = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

client.connect()
    .then((res) => {
        console.log("Database connection established")
    })
    .catch((err) => {
        console.log(`Database connection error - ${err}`)
        console.log(`For uri - ${uri}`)
    })

const db = client.db(process.env.DB_NAME)
const collection = db.collection(process.env.DB_COLLECTION)

app
  .use(express.urlencoded({ extended: true })) // middleware to parse form data from incoming HTTP request and add form fields to req.body
  .use(express.static("./static")) // Allow server to serve static content such as images, stylesheets, fonts or frontend js from the directory named static
  .set("view engine", "ejs") // Set EJS to be our templating engine
  .set("views", "view") // And tell it the views can be found in the directory named view
  .get("/", welcome)
  .get("/discover", discover)
//   .post("/sign-up", signUp);

app.listen(`${process.env.PORT}`, () => {
  console.log(
    `Running on port ${process.env.PORT}`
  );
});

// async function getUsers(req, res) {
//     users = await collection.find().toArray()

//     console.log(users)
//     res.render('test.ejs', {users: users})
// }

function welcome(req, res) {
    res.render("welcome.ejs")
}

function discover(req, res) {
    res.render("discover.ejs")
}

// Middleware to handle not found errors - error 404
app.use((req, res) => {
  console.error("404 error at URL: " + req.url);
  if(res.status(404)) {
      res.render("404page.ejs")
  }
});

// Middleware to handle server errors - error 500
app.use((err, req, res) => {
  console.error(err.stack);
  if(res.status(500)) {
      res.render("500page.ejs")
  }
});
