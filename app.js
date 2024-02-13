const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// get the 404 page not found message
const errorController = require("./controllers/404");

// import sequelize from database file
const sequelize = require("./util/database");

// import models
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();
// using ejs templates, which are located in the views folder
app.set("view engine", "ejs");
app.set("views", "views");

// get the routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
// static files will be located in the public directory
// use the path module to construct this so it should always work
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

// setup routes

// admin routes have a /admin in the front, so we don't have to specify that for each route
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// relating
// onDelete: cascade so deleting user deletes their products
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
sequelize
    .sync()
    .then((res) => {
        // right now there is only one sample user.
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            // if there isn't a user, make the sample user
            return User.create({ name: "Max", email: "test@test.com" });
        }
        return Promise.resolve(user);
    })
    .then((user) => {
        // make their cart
        return user.createCart();
    })
    .then((cart) => app.listen(3000))
    .catch((err) => {
        console.log(err);
    });
