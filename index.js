const express = require("express")
const bodyParser = require("body-parser")
const cookieSession = require("cookie-session")
const authRouter = require("./routes/admin/auth")
const adminProductsRouter = require("./routes/admin/products")
const productsRouter = require("./routes/products")
const cartsRouter = require("./routes/carts")

const app = express()

//middleware library set to global
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(
  cookieSession({
    keys: ["lkasld235j"],
  })
)

//associate with app
app.use(authRouter)
app.use(adminProductsRouter)
app.use(productsRouter)
app.use(cartsRouter)

//middleware implementation - replaced by global library

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

//listen for incoming traffic
app.listen(5000, () => {
  console.log("Listening")
})
