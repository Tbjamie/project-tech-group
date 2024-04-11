# GameSphere (Project Tech)

## About

### GameSphere

THE website to find all the games that you desire! 

You can explore games right from the homepage. Already know what you're looking for? You can search any game right from the discover page! This website has all you need to find the perfect game!

Are you just trying to find people to play with? Our website has a matching system that can find the perfect gamebuddy for you, so that you'll never have to play alone again!
So don't hesitate and start right away!

### Technologies used

[![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![express js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![json](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)](https://www.json.org/json-en.html)

### Features and Challenges

#### Supported Features

The current features that this website has to offer are:

1. Homepage
   * You can browse through a set of random games.
   * New releases are easy to find under the "New Releases" heading.
   * Discounted games are easy to find under the "Featured Discounts" heading.
  
2. Discover
   * Search for any game with the searchbar at the top of this page.
   * Explore all the games that we offer.
   * Use filters to find games to your liking (e.g. FPS games).
  
3. Gamebuddy
   * Fill in a short quiz to find users that match your energy.
   * The questions are about: Preferred lagnuage, Platform (e.g. PC), Favorite Genre & Favorite Game.
  
4. Forum
   * Scroll through posts or search for a specific post using the searchbar.
   * Create a post yourself! Just add a title, description & game and you're set!
   * You can see the title, amount of comments and the user that created the post.
  
5. Forum detailpage
   * You can read the full post, title and the user that posted it.
   * You can see what game the post is about.
   * See all comments and the user that posted the comment
  
6. Account page
   * See your information (username, email, account creation date & status)
   * Add/Update your status
   * Edit your profile (username, email, password)
   * Logout
  
7. Login/Logout/Sign up
   * It's possible to make an account with a unique username and email.
   * Once you have an account you can login to your account and stay logged in for at least 1 hour.
   * If you want to log out, you can go to the account page to simply log out and end your session.


#### Future Features

Features that we have in mind but are not yet available are:

1. Discover
   * Add more filters to complete te filter menu

2. Gamebuddy
   * Finish the page, so that you can actually find users that match your liking
   * Give the quiz a rework
   * Make the navigation active once on this page
  
3. Forum
   * Show images next to the post
   * Being able to upload your own images when you make a post
  
4. Forum detailpage
   * Being able to post a comment
  
5. Account
   * Uploading a custom profile image
   * Customizing your profile design/colors

#### Challenges

Some of the challenges we faced during this project were:

1. Staying logged in
   * Since this was the first time I (@Tbjamie) made a backend project I never heard of express-sessions, so I had to do quite some research into it before I managed to get it working. But even though it was one of the most challenging parts, it was also the most satisfying for me when I finally managed to make it work!

2. Filtering/Searching
   * Since the frontend team never made any filtering system before it was quite hard at first to get the filters working. But step by step they worked very hard to overcome this struggle and they managed (especially @camil1404) to make the filters work!
   * The searching was also something we had never done before but after a lot of research @KeyshaManucan found out how to make a working searchbar and these steps were a huge leap forward from making a very plain and static website to a website that actually feels interactive.

3. Forum
   * Making the forum working was a big challenge and me (@Tbjamie) with the help of @sanderboompje (Made the "Make a post page" together with me) did quite some research and also brainstormed a lot. But in the end I managed to get the forum working! With making the forum I noticed I started getting a lot more comfortable with using the backend code, so this was also a great challenge!
  


## How to run the project

1. Download/Clone this repository
2. NPM install in the terminal
3. Node/Nodemon server.js
4. Server should be running
> NOTE: This project is using a .env file. To access the data you'll need to fill in the .env first!
