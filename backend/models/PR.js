const mongoose = require("mongoose");

var PR = mongoose.model("PR", {
  userId: { type: String, required: true },
  date: { type: String, required: true },
  item: { type: [], required: true },
  address: { type: String, required: true },
  siteName: { type: String, required: true },
  instructions: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String,
    enum: ["pending", "success","reject"],
    required: true },
  delivery_date: { type: String},
  itemsR: { type: Boolean},
  quality: { type: Boolean},
  quantity: { type: Boolean},
  damage: { type: Boolean},
});

module.exports = { PR };
