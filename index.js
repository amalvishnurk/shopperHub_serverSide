const express = require('express')
const dataService = require('./service/dataService')
const app = express()
app.listen(3000, () => {
    console.log('Server started at 3000');
    dataService.initializeDatabase()
})

const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:3001']
}))

app.use(express.json())

// getAllProducts API
app.get('/all-Products', (req, res) => {
    console.log('inside getAllProducts function');
    dataService.getAllProducts()
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// addToCart API
app.post('/addToCart', (req, res) => {
    console.log('Inside addToCart function');
    console.log(req.body);
    dataService.addToCart(req.body.id, req.body.title, req.body.price, req.body.description, req.body.image)
        .then(result => {
            res.send(result)
        })
})

// addOrderDetails API
app.post('/orderDetails', (req, res) => {
    dataService.addOrderDetails(req.body.orderId,req.body.userName, req.body.email, req.body.mobile, req.body.totalPrice, req.body.cartList)
        .then(result => {
            res.send(result)
        })
})

// getFromCart API
app.get('/CartProducts', (req, res) => {
    console.log('inside getFromCart function');
    dataService.getCartProducts()
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// deleteProuct API
app.post('/deleteProduct', (req, res) => {
    console.log('inside deleteProuct function');
    dataService.deleteProduct(req.body.id)
        .then(result => {
            res.send(result)
        })
})

// emptyCart API
app.delete('/emptyCart',(req,res)=>{
    console.log('inside emptyCart function');
    dataService.emptyCart()
    .then(result=>{
        res.send(result)
    })
})
