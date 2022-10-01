const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    mainAddress: {
      type: String,
      required: true,
    },
    addresses: [String],
  },
  { timestamps: true }
);

const Address = mongoose.model("address", addressSchema);
module.exports = Address;
