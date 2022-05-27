const express = require("express");
const controller = require("../controllers/ProductController");
const router = express.Router();
router.get("/",(req, res) => res.render("product.ejs"))
router.get("/:productId", controller.findOne)

module.exports = router;