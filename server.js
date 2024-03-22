// dit is een boilerplate voor een node.js webserver met alle basis die je nodig hebt om je webserver aan de praat te krijgen

// Add info from .env file to process.env
require("dotenv").config()

const xss = require("xss") // TODO: GEBRUIK DEZE NOG ERGENS
const bcrypt = require('bcryptjs') // TODO: GEBRUIK DEZE NOG ERGENS
const session = require('express-session') // TODO: GEBRUIK DEZE NOG ERGENS

// Initialise Express webserver
const express = require("express")
const { disconnect } = require("process")
const app = express()
const {
  ServerApiVersion,
  ObjectId,
  MongoClient
} = require("mongodb")
const { error } = require("console")
const { Cookie } = require("express-session")
const { request } = require("http")

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
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
  .use(session({
    secret: `${process.env.SECRET}`,
    cookie: {
      maxAge: 60000 * 60 
    },
    saveUninitialized: false,
    resave: false
  }))
  .set("view engine", "ejs") // Set EJS to be our templating engine
  .set("views", "view") // And tell it the views can be found in the directory named view
  .get('/', (req, res) => {
    console.log(req.session.id)
    if(req.session.visited) {
        console.log(req.session.user)
        let user = req.session.user
        res.render('home.ejs', {user: user})
    } else {
        res.render('welcome.ejs');
    }
})
.get('/login', (req, res) => {
    if(req.session.visited) {
        res.redirect('/')
    } else {
        res.render('login.ejs')
    }
})
.post('/login', async (req, res) => {
    const user = await collection.findOne({
        username: req.body.username
    })
    if((user) && (user.password === req.body.password)) {
        req.session.visited = true
        req.session.user = user
        console.log(req.session.id)
        console.log(req.session.user)
        // console.log(user)
        res.redirect('/')
    } else {
        console.log("Wrong username or password")
    }
})
.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})
app.listen(`${process.env.PORT}`, () => {
  console.log(
    `Running on port ${process.env.PORT}`
  )
})
app.get('/signup', (req, res) => {
  if(req.session.visited) {
      res.redirect('/')
  } else {
      res.render('signup.ejs')
  }
})

app.post('/signup', async (req, res) => {
  let existingUser = await collection.findOne({
    username: req.body.username
  })
  let existingEmail = await collection.findOne({
    email: req.body.email
  })
  if((existingUser) || (existingEmail)) {
    console.log("User already exists")
  } else {
    console.log("User created")
    let newUser = await collection.insertOne({
    username: req.body.username,
    email: req.body.email,
    genre: "",
    password: req.body.password,
    friends: [],
    recentlypw: [],
    profilepic: ""
    })
  }
  res.redirect('/')
})

app.get('/account', (req, res) => {
  if(req.session.visited) {
    let user = req.session.user
    res.render('account.ejs', {user: user})
} else {
    res.redirect('/login')
}
})

app.get('/account/edit', (req, res) => {
  if(req.session.visited) {
    let user = req.session.user
    res.render('editaccount.ejs', {user: user})
  } else {
    res.redirect('/login')
  }
})

app.get('/discover', (req, res) => {
  if(req.session.visited) {
    let user = req.session.user
    res.render('discover.ejs', {user: user})
  } else {
    res.redirect('/login')
  }
})


app.use((req, res) => {
  console.error("404 error at URL: " + req.url)
  if(res.status(404)) {
    res.render("404page.ejs")
  }
})

// Middleware to handle server errors - error 500
app.use((err, req, res) => {
  console.error(err.stack)
  if(res.status(500)) {
      res.render("500page.ejs")
  }
})
