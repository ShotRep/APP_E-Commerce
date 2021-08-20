const express = require("express")
const cartsRepo = require("../repositories/carts")
const productsRepo = require('../repositories/products')
const cartShowTemplate = require('../views/carts/show')

const router = express.Router()

//route   receive post request to add an item to cart
router.post("/cart/products", async (req, res) => {
  // console.log(req.body.productId)
  let cart
  if (!req.session.cartId) {
    cart = await cartsRepo.create({items: []})
    req.session.cartId = cart.id
  } else {
    cart = await cartsRepo.getOne(req.session.cartId)
  }

  console.log(cart)
  const existingItem = cart.items.find((item) => item.id === req.body.productId)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.items.push({id: req.body.productId, quantity: 1})
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  })
  // res.send("Product added to cart")
  res.redirect('/cart')
})

//route   receive GET request to show all items in cart
router.get('/cart', async(req, res) => {
  if (!req.session.cartId) {
  return res.redirect('/')
  }
  const cart = await cartsRepo.getOne(req.session.cartId)

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id)
    item.product = product
  }
  res.send(cartShowTemplate({items: cart.items}))
})
//route   receive POST request to delete an item from cart
router.post('/cart/products/delete', async (req,res) => {
  // console.log(req.body.itemId)
  const { itemId } = req.body
  const cart = await cartsRepo.getOne(req.session.cartId)

  const items = cart.items.filter(item => item.id !== itemId)

  await cartsRepo.update(req.session.cartId, { items: items })
  
  res.redirect('/cart')
})

module.exports = router
