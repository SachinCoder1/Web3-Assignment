const express = require("express");
const { loginUser, getAddress, addAddress, removeAddress } = require("../controllers/address");
const checkUser = require("../middlewares/checkUser");

const router = express.Router();

router.post("/addAddress", loginUser);
router.put("/addToAddress", addAddress);
router.get("/getAddress", getAddress);
router.delete("/removeAddress", removeAddress);

module.exports = router;