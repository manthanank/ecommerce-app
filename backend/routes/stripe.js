const router = require("express").Router();
const { processPayment } = require("../controllers/stripeController");

router.post("/payment", processPayment);

module.exports = router;