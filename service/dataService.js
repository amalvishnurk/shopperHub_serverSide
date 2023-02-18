const db = require('./db')

// getAllProducts function
const getAllProducts = () => {
    return db.Product.find()
        .then((data) => {
            if (data) {
                return {
                    statusCode: 200,
                    result: data
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: 'Failed to fetch data from database'
                }
            }

        })
}

// getCartProducts function
const getCartProducts = () => {
    return db.Cart.find()
        .then((data) => {
            if (data) {
                console.log(data);
                let grandTotal = 0
                if (data.length > 0) {
                    const total = data.map(pro => pro.price).reduce((p1, p2) => p1 + p2)
                    grandTotal = total.toFixed(2)
                }


                return {
                    statusCode: 200,
                    result: data,
                    amount: grandTotal
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: 'Failed to fetch data from database'
                }
            }

        })
}

// addToCart function
const addToCart = (id, title, price, description, image) => {
    return db.Cart.findOne({
        id
    })
        .then((result) => {
            if (result) {
                return {
                    statusCode: 404,
                    message: 'Product already added to cart'
                }
            }
            else {

                const newProduct = new db.Cart({
                    id,
                    title,
                    price,
                    description,
                    image

                })
                newProduct.save()
                return {
                    statusCode: 200,
                    message: 'Product added to cart'
                }
            }
        })
}

// addOrderDetails function
const addOrderDetails = (orderId, userName, email, mobile, totalPrice, cartList) => {
    return db.OrderDetail.findOne({
        orderId
    })

        .then((result) => {
            if (result) {
                return {
                    statusCode: 404,
                    message: 'Already ordered'
                }
            }
            else {
                const newOrder = new db.OrderDetail({
                    orderId,
                    userName,
                    email,
                    mobile,
                    totalPrice,
                    cartList
                })
                newOrder.save()
                return {
                    statusCode: 200,
                    message: 'order placed successfully'
                }
            }
        })

}

// deleteProduct function
const deleteProduct = (id) => {
    return db.Cart.deleteOne({ id })
        .then(result => {
            return {
                statusCode: 200,
                message: 'product removed successfully'
            }
        })
}

// emptyCart function
const emptyCart = () => {
    return db.Cart.deleteMany({})
        .then(result => {
            return {
                statusCode: 200,
                message: 'empty cart'
            }
        })
}

//function for initialize Database
const initializeDatabase = () => {
    db.initializeDbAndCollections();
    db.Product.countDocuments({}, (err, count) => {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log(`Number of documents in Product collection: ${count}`);
            if (count === 0) {
                console.log('Product collection is empty');
                const fs = require('fs');
                const path = require('path');

                // Define the file path
                const dataPath = path.join(__dirname, 'datastore.json');
                // Read the data from the file
                const rawData = fs.readFileSync(path.resolve(dataPath));
                const products = JSON.parse(rawData);
                return db.Product.insertMany(products, (err, result) => {
                    if (err) throw err;
                    console.log('product collection created successfully');
                })
            } else {
                console.log('Product collection is not empty');
            }
        }
    });
}

module.exports = {
    getAllProducts,
    addToCart,
    addOrderDetails,
    getCartProducts,
    deleteProduct,
    emptyCart,
    initializeDatabase
}