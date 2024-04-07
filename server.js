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

  // const findUser = async () => {
  //   let user = await usersCollection.findOne({
  //     _id: req.session.user
  //   })

  //   return user
  // }
  app.get('/', (req, res) => {
    console.log(req.session.id)
    if (req.session.visited) {
      // let user = findUser()
      console.log(req.session.user)
      let user = req.session.user
      res.render('home.ejs', { user: user })
    } else {
      res.render('welcome.ejs');
    }
  })

  // app.post('/', async (req, res) => {
  //   if (req.session.visited) {
  //     console.log(req.session.user)
  //     let user = req.session.user
  //     const tutorialDone = await usersCollection.updateOne(
  //       {_id: new ObjectId(user._id)},
  //       { $set: { newUser: false } }
  //       // TODO: HULP VRAGEN HIERBIJ
  //     )
  //     res.render('home.ejs', { user: user })
  //   } else {
  //     res.render('welcome.ejs');
  //   }
  // })
  app.get('/login', (req, res) => {
    if (req.session.visited) {
      res.redirect('/')
    } else {
      res.render('login.ejs')
    }
  })
  app.post('/login', async (req, res) => {
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
  app.get('/logout', (req, res) => {
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
      newUser: true,
      creationDate: new Date().toDateString(),
      status: ""
    })
    const user = await usersCollection.findOne({
      username: req.body.username
    })
    req.session.visited = true
    req.session.user = user
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

app.post('/account', async (req, res) => {
  if (req.session.visited) {
    let user = req.session.user

    if(req.body.statusField == "") {
      console.log("JE HEBT NIET INGEVULD")
    } else {
        const updateStatus = await usersCollection.updateOne(
          {_id: new ObjectId(user._id)},
          { $set: { status: req.body.statusField } }
        )
        console.log('status updated')
        res.render('account.ejs', { user: user })
    }
  
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
  if (req.session.visited) {
    let user = req.session.user
    console.log(user)
    console.log(req.session.user)
    let existingUser = await usersCollection.findOne({
      username: req.body.username
    })
    let existingEmail = await usersCollection.findOne({
      email: req.body.email
    })
  
    if (user.username == req.body.username) {
      console.log("DEZELFDE NAAM")
      res.render('editaccount.ejs', { user: user })
    } else if (existingUser) {
      console.log("USERNAME ALREADY EXISTS")
      res.render('editaccount.ejs', { user: user })
    } else if (req.body.username == "") {
      console.log("JE HEBT NIETS INGEVULD")
      res.render('editaccount.ejs', { user: user })
    } else {
      console.log(`USERNAME CHANGED TO: ${req.body.username}`)
      const changeUsername = await usersCollection.updateOne(
        {_id: new ObjectId(user._id)},
        { $set: { username: req.body.username } }
        // TODO: HULP VRAGEN HIERBIJ
      )
    }
  
    if (user.email == req.body.email) {
      console.log("DEZELFDE EMAIL")
      res.render('editaccount.ejs', { user: user })
    } else if (existingEmail) {
      console.log("EMAIL ALREADY EXISTS")
      res.render('editaccount.ejs', { user: user })
    } else if (req.body.email == "") {
      console.log("JE HEBT NIETS INGEVULD")
      res.render('editaccount.ejs', { user: user })
    } else {
      console.log(`EMAIL CHANGED TO: ${req.body.email}`)
      const changeEmail = await usersCollection.updateOne(
        {_id: new ObjectId(user._id)},
        { $set: { email: req.body.email } }
        // TODO: HULP VRAGEN HIERBIJ
      )
    }
  
    if (user.password === req.body.password) {
      console.log("PASSWORD CANT BE THE SAME")
      res.render('editaccount.ejs', { user: user })
    } else if (req.body.password == "") {
      console.log("JE HEBT NIETS INGEVULD")
      res.render('editaccount.ejs', { user: user })
    } else {
      console.log(`PASSWORD CHANGED TO: ${req.body.password}`)
      const changePassword = await usersCollection.updateOne(
        {_id: new ObjectId(user._id)},
        { $set: { password: req.body.password } }
        // TODO: HULP VRAGEN HIERBIJ
      )
    }
  } else {
    res.redirect('/login')
  }
}
)

app.get('/account/friends', async (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    let friends = user.friends
    let findFriends = usersCollection.find({
      username: friends.username
    })
    console.log(findFriends)
    res.render('friends.ejs', { user: user, friends: friends })
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

app.get('/forum', async (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    let posts = await forumCollection.find().toArray()
    let game = await gamesCollection.findOne({
      title: posts.game
    })

    console.log(posts[0].game)

    res.render('forum.ejs', { user: user, posts: posts, game: game })
  } else {
    res.redirect('/login')
  }
})

app.get('/forum/makePost', async (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    res.render('makePost.ejs', { user: user })
  } else {
    res.redirect('/login')
  }
})

app.post('/forum/makePost', async (req, res) => {
  if (req.session.visited) {
    let user = req.session.user
    let posts = await forumCollection.find().toArray()
    let game = await gamesCollection.findOne({
      title: posts.game
    })
    let newPost = await forumCollection.insertOne({
      title: req.body.title,
      description: req.body.description,
      game: req.body.game,
      user: user.username,
      image: "",
      comments: []
    })
    console.log(newPost)
    res.redirect('/forum')
  } else {
    res.redirect('/login')
  }
})

app.get('/forum/:topic', async (req, res) => {
  if (req.session.visited) {
      let user = req.session.user
      let post = await forumCollection.findOne({
        title: req.params.topic
      })
      let author = await usersCollection.findOne({
        username: post.user
      })
      console.log(author)
      res.render('postDetail.ejs', { user: user, post: post, author: author }) // , topic: req.params.topic
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
