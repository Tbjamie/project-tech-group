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
const { error } = require("console");

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
  .post("/", login)
  .get("/login", loginPage)
  .post("/login", login)
  // .get("/home", home)
  // .get("/home", home)
  .get("/discover", discover)
  // .get("/get-users", getUsers)
  .get("/sign-up", signUp)
  .post("/sign-up", signUp)

app.listen(`${process.env.PORT}`, () => {
  console.log(
    `Running on port ${process.env.PORT}`
  );
});

// async function getUsers(req, res) {
//     let users = await collection.find().toArray()
//     users.forEach(user => {
//       console.log(user.username)
//     })
//     // console.log(users)
//     res.render('users.ejs', {users: users})
// }

async function login(req, res) {
  let user = await collection.findOne({
    username: req.body.username,
  })
  if((user) && (user.password === req.body.password)) {
    console.log(user)
    res.render('home.ejs', {user: user})
  } else {
    console.log(`${req.body.username} not found`)
  }
}

async function signUp(req, res) {
  res.render('signUp.ejs')
  let user = await collection.findOne({
    username: req.body.username,
  })
  if(user) {
    console.log(`The username: ${req.body.username} is already in use, please pick another username!`)
    // res.render('signUp.ejs', {existingUser: existingUser})
  } else {
    // FIXME: ZORG DAT JE NIET MET DEZELFDE EMAIL EEN ACC AAN KAN MAKEN
    let newUser = await collection.insertOne({
      username: req.body.username,
      email: req.body.email,
      genre: "",
      password: req.body.password,
      profilepic: "",
      friends: [],
      recentlypw: []
    })
    console.log(`You made a new account with the username ${req.body.username}`)
    // res.render('home.ejs', {user: newUser})
  }
}



function welcome(req, res) {
    res.render("welcome.ejs")
}

function loginPage(req, res) {
    res.render("login.ejs")
}

function discover(req, res) {
    res.render("discover.ejs")
}

// function signUp(req, res) {
//   res.render("signUp.ejs")
// }

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
