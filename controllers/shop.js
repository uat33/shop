/**
 * The shop controllers.
 * Provides functionality for all the shop related methods.
 */

const Product = require("../models/product");
const util = require("util");

/**
 * Retrieve all the products and render the appropriate page displaying them.
 *
 */
exports.getProducts = (req, res, next) => {
    Product.findAll() // this method is provided by sequelize
        .then((products) => {
            // the view we want is called product-list, in the folder shop under views
            res.render("shop/product-list", {
                prods: products, // set the variable prods to the products we found
                // set pageTitle and path to the right values
                pageTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => {
            // output the error if there are any
            console.log(err);
        });
};
/**
 * Retrieve the details on one specific product, and display them.
 *
 */
exports.getProduct = (req, res, next) => {
    // get dynamic value
    // we used productId after the colon in the route
    const prodId = req.params.productId;

    // find the first product with this id -- since id is unique, it will be the only product
    Product.findByPk(prodId)
        .then((product) => {
            // render the right view, passing in product and the product's name as the title
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products",
            });
        })
        .catch((err) => console.log(err)); // output error, if any
};
/**
 * Render the home page.
 *
 */
exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            // pass in products as prods, with the appropriate title and path
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/",
            });
        })
        .catch((err) => {
            console.log(err); // output error, if any
        });
};

/**
 * Update the cart after a new product has been added.
 *
 *
 */
exports.postCart = (req, res, next) => {
    // this is the productId of the product that has just been added to the cart
    const prodId = req.body.productId;
    // declare these out here, so we can use them later
    let fetchedCart;
    let newQuantity = 1;

    req.user
        .getCart() // this method is made when relating user and cart.
        .then((cart) => {
            fetchedCart = cart;
            // get the products currently in the cart that match the product we are adding
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                // if there is something in products, that means the product was already in the cart
                // save it to variable product
                product = products[0];
            }
            if (product) {
                // if the product was already in cart, set newQuantity to the current quantity + 1
                newQuantity = product.cartItem.quantity + 1;
                // return the product
                return product;
            }
            // if the product was not in cart, find it using a method provided by product model
            // newQuantity will be 1 in this case
            return Product.findByPk(prodId);
        })
        .then((product) => {
            // add the product to the fetched cart, setting quantity to newQuantity
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity },
            });
        })
        .then(() => {
            res.redirect("/cart");
        })
        .catch((err) => console.log(err));
};

/**
 *
 * Get the cart using the method getCart which is made when relating the user model with the cart model.
 *
 */
exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts().then((prod) => {
                // render the view, passing in the appropriate parameters
                res.render("shop/cart", {
                    path: "/cart",
                    pageTitle: "Your Cart",
                    products: prod,
                });
            });
        })
        .catch((err) => console.log(err));
};

/**
 * Get the orders using getOrders, which the user model has because it was associated with orders in app.js
 */
exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ["products"] }) // include the products that belong to the order
        .then((orders) => {
            // console.log(util.inspect(orders[3].products, { depth: null }));
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders,
            });
        })
        .catch((err) => console.log(err));
};

// checkout page. eventually more will be added here
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};

/**
 * When an item is deleted from cart.
 */
exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId; // get the id of deleted item
    req.user
        .getCart() // get the user's cart
        .then((cart) => {
            // get those products where the id matches the prodId
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            // it will return an array, so get the first one
            const product = products[0];
            // delete it and redirect to cart
            return product.cartItem.destroy();
        })
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => console.log(err));
};

/**
 * When the user has decided to turn the cart into an order.
 */
exports.postOrder = (req, res, next) => {
    // let allProducts;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts(); // get the products in the user's cart
        })
        .then((products) => {
            // create an order
            return req.user
                .createOrder()
                .then((order) => order.addProducts(products));
        })
        .then((result) => {
            return fetchedCart.setProducts(null);
        })
        .then((result) => res.redirect("/orders")) // redirect to the orders page, where the get route will take over
        .catch((err) => console.log(err));
};
