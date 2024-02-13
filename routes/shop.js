/*
This file has all the routes related to the shop. 

the format is router.REQUEST(URL, METHOD);

REQUEST: either get or post in this case
URL: whichever url we are making a route for
METHOD: the method that handles that url
*/

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/products", shopController.getProducts);

// :productId means there will be a variable there with that name
router.get("/products/:productId", shopController.getProduct);

router.post("/cart", shopController.postCart);

router.get("/cart", shopController.getCart);

router.post("/cart-delete-item", shopController.postCartDelete);

router.get("/orders", shopController.getOrders);
router.post("/create-order", shopController.postOrder);

// this is our home page
router.get("/", shopController.getIndex);

module.exports = router;
