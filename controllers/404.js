/**
 * This module contains the controllers for page not found.
 *
 * For now, all invalid urls will render the same thing
 */

/**
 *
 * Set the status to 404.
 * Render the 404 views page, pass in the parameters pageTitle and path with their respective values.
 */
exports.get404 = (req, res, next) => {
    res.status(404).render("404", { pageTitle: "Page Not Found", path: "404" });
};
