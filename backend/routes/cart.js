const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("./cartController");

// CREATE
router.post("/", verifyToken, createCart);

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

// GET ALL
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
