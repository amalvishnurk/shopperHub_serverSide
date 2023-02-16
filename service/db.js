const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/eCommerce', () => {
//     console.log('Mongodb connected successfully');
// })


// product schema
const Product = mongoose.model('Product', {
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
})

// cart schema
const Cart = mongoose.model('Cart', {
    id: Number,
    title: String,
    price: Number,
    description: String,
    image: String
})

//orderDetails schema
const OrderDetail = mongoose.model('OrderDetail', {
    orderId: String,
    userName: String,
    email: String,
    mobile: Number,
    totalPrice: Number,
    cartList: Array
})

function initializeDbAndCollections() {
    // for creating DB eCommerce and collections
    mongoose.connect('mongodb://localhost:27017/eCommerce', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Mongodb connected successfully');
            // Check if the products collection exists
            mongoose.connection.db.listCollections({ name: 'products' })
                .next((err, collinfo) => {
                    if (collinfo) {
                        console.log('Products collection already exists');
                    } else {
                        // Create the products collection
                        mongoose.connection.db.createCollection('products');
                        console.log('Products collection created successfully');
                    }
                });
            // Check if the database exists
            mongoose.connection.db.listCollections({ name: 'carts' })
                .next((err, collinfo) => {
                    if (collinfo) {
                        console.log('Carts collection already exists');
                    } else {
                        // Create the carts collection
                        mongoose.connection.db.createCollection('carts');
                        console.log('Carts collection created successfully');
                    }
                });
            // Check if the database exists
            mongoose.connection.db.listCollections({ name: 'orderdetails' })
                .next((err, collinfo) => {
                    if (collinfo) {
                        console.log('OrderDetails collection already exists');
                    } else {
                        // Create the orderdetails collection
                        mongoose.connection.db.createCollection('orderdetails');
                        console.log('OrderDetails collection created successfully');
                    }
                });
        })
        .catch((err) => console.log(err));
}

module.exports = {
    Product,
    Cart,
    OrderDetail,
    initializeDbAndCollections

}
