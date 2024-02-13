/**
 * This model specifies the cart-item using sequelize.
 */

// get the integer type from sequelize
const SequelizeInteger = require("sequelize").INTEGER;

const sequelize = require("../util/database");

// define cartitem with the following properites
const CartItem = sequelize.define("cartItem", {
    id: {
        type: SequelizeInteger, // id of type int
        autoIncrement: true, // increments automatically for each new item
        allowNull: false, // must have value
        primaryKey: true, // the primary key for this table
    },
    quantity: SequelizeInteger, // the quantity is also an integer
});

module.exports = CartItem;
