const express = require("express")
const bodyParser = require("body-parser")
const cookieSession = require("cookie-session")
const usersRepo = require("./repositories/users")

const app = express()

//middleware library set to global
app.use(bodyParser.urlencoded({extended: true}))
app.use(
  cookieSession({
    //cookie encryption
    keys: ["j349s9jkd61kzq32hmm00xcxc89jcbneu5xkmjsu730k"],
  })
)

//route handler - GET method
app.get("/signup", (req, res) => {
  res.send(`
  <div>
  Your Id is: ${req.session.userId}
    <form method="POST">
      <input name="email" placeholder="email">
      <input name="password" placeholder="password">
      <input name="passwordConfirmation" placeholder="password confirmation">
      <button>Sign Up</button>
    </form>
  </div>
  `)
})

//middleware

// //parsing logic via middleware function we created - has some holes in it
// const bodyParser = (req, res, next) => {
//   if (req.method === 'POST') {
//     //get access to form data
//     req.on("data", (data) => {
//       //convert buffer to string format
//       console.log(data.toString("utf8"))
//       //parse string
//       const parsed = data.toString("utf8").split("&")
//       //loop over our parsed split strings
//       const formData = {}
//       for (let pair of parsed) {
//         const [key, value] = pair.split("=")
//         formData[key] = value
//       }
//       req.body = formData
//       next()
//     })
//   } else {
//     next()
//   }
// }

//POST request handler
app.post("/signup", async (req, res) => {
  // console.log(req.body)
  const {email, password, passwordConfirmation} = req.body

  const existingUser = await usersRepo.getOneBy({email})
  if (existingUser) {
    return res.send("Email in use.")
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords do not match.")
  }

  //create a user in our user repo
  const user = await usersRepo.create({email: email, password: password})

  //store the id of that user inside a cookie - 3rd party library will handle
  req.session.userID = user.id
  res.send("Account Created.")
})

//signout
app.get("/signout", (req, res) => {
  req.session = null
  res.send("You are logged out")
})

//signin
app.get('/signin', (req, res) => {
    res.send(`
  <div>  
    <form method="POST">
      <input name="email" placeholder="email">
      <input name="password" placeholder="password">      
      <button>Sign In</button>
    </form>
  </div>
  `)
})

//post request handler for signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body
  
  const user = await usersRepo.getOneBy({ email: email })
  
  if (!user) {
    return res.send('Email not found')
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
)

  if (!validPassword) {
    return res.send('Invalid password')
  }

  req.session.userId = user.id

  res.send('You are signed in.')
})

//Listen for incoming traffic
app.listen(3000, () => {
  console.log("Listening")
})
