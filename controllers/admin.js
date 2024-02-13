const Product = require("../models/product");

/**
 * Called when we want to add a product.
 */
exports.getAddProduct = (req, res, next) => {
    // render the edit product page as it is identical

    // but set editing to false so it knows we are adding, not editing
    res.render("admin/edit-product", {
        // first one is the ejs template
        pageTitle: "Add Product",
        path: "/admin/add-product", // this is the path
        editing: false,
    });
};

/**
 * Called after we add a product.
 */
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user
        .createProduct({
            // create the product with the information.
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
        })
        .then((result) => {
            console.log("Created Product");
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

/**
 * Get the screen where we will edit a product.
 */
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) res.redirect("/"); // if we are not in edit mode, redirect to home page

    const prodId = req.params.productId; // get the id
    req.user
        .getProducts({ where: { id: prodId } })
        .then((products) => {
            const product = products[0];
            if (!product) return res.redirect("/"); // if no product is found, redirect to home page
            res.render("admin/edit-product", {
                // otherwise render with appropriate information
                // first one is the ejs template
                pageTitle: "Edit Product",
                path: "/admin/edit-product", // this is the path
                editing: editMode,
                product: product,
            });
        })
        .catch((err) => console.log(err));
};

/**
 * Update the product with entered information.
 */
exports.postEditProduct = (req, res, next) => {
    // get the id
    const prodId = req.body.productId;
    // get all the updated information
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId) // find the product and update info
        .then((product) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            return product.save(); // save back into the database
        })
        .then((result) => {
            console.log("Product updated.");
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

/**
 * Delete a product with the id.
 */
exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId; // id passed in through req.body
    Product.findByPk(prodId) // find that product
        .then((prod) => prod.destroy()) // destroy it
        .then((result) => {
            console.log("Deleted."); // give a small message and redirect
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

/**
 * Display products on admin page.
 */
exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
