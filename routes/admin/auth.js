//////R O U T E  H A N D L E R S\\\\\\\\\
const express = require("express")
const {check, validationResult} = require("express-validator") //{} destructuring from the library
// const {validationResult} = require("express-validator") //{} destructuring from the library

const usersRepo = require("../../repositories/users")
const signupTemplate = require("../../views/admin/auth/signup")
const signinTemplate = require("../../views/admin/auth/signin")
const {requireEmail} = require("./validators")
const {requirePassword} = require("./validators")
const {requirePasswordConfirmation} = require("./validators")

//////////S u b  R o u t e r\\\\\\\\\
const router = express.Router()

//GET request handler
router.get("/signup", (req, res) => {
  res.send(signupTemplate({req: req}))
})

//POST request handler
router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  //req handler
  async (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    // console.log(req.body)
    const {email, password, passwordConfirmation} = req.body
    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({email, password})
    // Store the id of that user inside the users cookie
    req.session.userId = user.id

    res.send("Account created!!!")
  }
)

//Sign out request handler
router.get("/signout", (req, res) => {
  req.session = null
  res.send("You are logged out")
})

//Sign in request handler
router.get("/signin", (req, res) => {
  res.send(signinTemplate())
})

//Post request handler - Sign in
router.post("/signin", async (req, res) => {
  const {email, password} = req.body

  const user = await usersRepo.getOneBy({email})

  if (!user) {
    return res.send("Email not found")
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  )
  if (!validPassword) {
    return res.send("Invalid password")
  }

  req.session.userId = user.id

  res.send("You are signed in!!!")
})

module.exports = router
