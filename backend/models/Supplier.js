const mongoose = require("mongoose");

var Supplier = mongoose.model("Supplier", {
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = { Supplier };
