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
const e = require("express")
const { userInfo } = require("os")

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
const usersCollection = db.collection(process.env.DB_USERS)
const forumCollection = db.collection(process.env.DB_FORUM)
const gamesCollection = db.collection(process.env.DB_GAMES)

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
    if (req.session.visited) {
      console.log(req.session.user)
      let user = req.session.user
      res.render('home.ejs', { user: user })
    } else {
      res.render('welcome.ejs');
    }
  })
  .get('/login', (req, res) => {
    if (req.session.visited) {
      res.redirect('/')
    } else {
      res.render('login.ejs')
    }
  })
  .post('/login', async (req, res) => {
    const user = await usersCollection.findOne({
      username: req.body.username
    })
    if ((user) && (user.password === req.body.password)) {
      req.session.visited = true
      req.session.user = user
      console.log(req.session.id)
      console.log(req.session.user)
      res.redirect('/')
    } else {
      console.log("Wrong username or password")
    }
  })
  .get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
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
  if (req.session.visited) {
    res.redirect('/')
  } else {
    res.render('signup.ejs')
  }
})

app.post('/signup', async (req, res) => {
  let existingUser = await usersCollection.findOne({
    username: req.body.username
  })
  let existingEmail = await usersCollection.findOne({
    email: req.body.email
  })
  if ((existingUser) || (existingEmail)) {
    console.log("User already exists")
  } else {
    console.log("User created")
    newUser = await usersCollection.insertOne({
      username: req.body.username,
      email: req.body.email,
      genre: "",
      password: req.body.password,
      friends: [],
      recentlypw: [],
      profilepic: "/images/blankProfile.png",
      newUser: true
    })
    res.redirect('/')
  }
})

app.get('/account', (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    res.render('account.ejs', { user: user })
  } else {
    res.redirect('/login')
  }
})

app.get('/account/edit', (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    res.render('editaccount.ejs', { user: user })
  } else {
    res.redirect('/login')
  }
})

app.post('/account/edit', async (req, res) => {
  user = req.session.user
  let existingUser = await usersCollection.findOne({
    username: req.body.username
  })
  let existingEmail = await usersCollection.findOne({
    email: req.body.email
  })

  if (user.username == req.body.username) {
    console.log("DEZELFDE NAAM")
  } else if (existingUser) {
    console.log("USERNAME ALREADY EXISTS")
  } else if (req.body.username == "") {
    console.log("JE HEBT NIETS INGEVULD")
  } else {
    console.log(`USERNAME CHANGED TO: ${req.body.username}`)
    changeUsername = await usersCollection.updateOne(
      user,
      { $set: { username: req.body.username } }
      // TODO: HULP VRAGEN HIERBIJ
    )
  }

  if (user.email == req.body.email) {
    console.log("DEZELFDE EMAIL")
  } else if (existingEmail) {
    console.log("EMAIL ALREADY EXISTS")
  } else if (req.body.email == "") {
    console.log("JE HEBT NIETS INGEVULD")
  } else {
    console.log(`EMAIL CHANGED TO: ${req.body.email}`)
  }

  if (user.password === req.body.password) {
    console.log("PASSWORD CANT BE THE SAME")
  } else if (req.body.password == "") {
    console.log("JE HEBT NIETS INGEVULD")
  } else {
    console.log(`PASSWORD CHANGED TO: ${req.body.password}`)
  }
}
)

app.get('/account/friends', (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    res.render('friends.ejs', { user: user })
  } else {
    res.redirect('/login')
  }
})

app.get('/discover', (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    res.render('discover.ejs', { user: user })
  } else {
    res.redirect('/login')
  }
})

app.get('/games/:game', async (req, res) => {
  if (req.session.visited) {
    games = await gamesCollection.findOne({
      title: req.params.game
    })
    console.log(games.title)
    let user = req.session.user
    res.render('detailPage.ejs', { user: user, games: games })
  } else {
    res.redirect('/login')
  }
})


app.use((req, res) => {
  console.error("404 error at URL: " + req.url)
  if (res.status(404)) {
    res.render("404page.ejs")
  }
})

// Middleware to handle server errors - error 500
app.use((err, req, res) => {
  console.error(err.stack)
  if (res.status(500)) {
    res.render("500page.ejs")
  }
})
