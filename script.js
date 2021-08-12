const express = require("express")
const app = express()

//route handler
app.get('/', (req, res) => {
  res.send('Hi There!')
})

//Listen for incoming traffic
app.listen(3000, () => {
  console.log('Listening')
})
