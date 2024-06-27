const mongoose = require("mongoose");

var Item = mongoose.model("Item", {
  name: { type: String, required: true },
  supId: { type: String, required: true },
  unit: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = { Item };
