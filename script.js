const express = require("express")
const bodyParser = require('body-parser')

const app = express()

//middleware library set to global
app.use(bodyParser.urlencoded({extended: true}))

//route handler - GET method
app.get("/", (req, res) => {
  res.send(`
  <div>
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

//POST method
app.post("/", (req, res) => {
  console.log(req.body)
  res.send("Account Created.")
})

//Listen for incoming traffic
app.listen(3000, () => {
  console.log("Listening")
})
