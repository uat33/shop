/*
This file has all the routes related to the admin. 

Note that all these routes have a /admin in front of them, which is specified in app.js.

the format is router.REQUEST(URL, METHOD);

REQUEST: either get or post in this case
URL: whichever url we are making a route for
METHOD: the method that handles that url
*/

const express = require("express");

const router = express.Router();

// get the controllers
const adminController = require("../controllers/admin");

// get request to add-product
router.get("/add-product", adminController.getAddProduct);

// get request to products
router.get("/products", adminController.getProducts);

// post request to add-product
router.post("/add-product", adminController.postAddProduct);

// get request to edit-product
// :productId means there will be a variable here, namely the id of the product we want to edit
router.get("/edit-product/:productId", adminController.getEditProduct);

// post request to edit-product
router.post("/edit-product", adminController.postEditProduct);
// post request to delete-product
router.post("/delete-product", adminController.deleteProduct);

module.exports = router;
