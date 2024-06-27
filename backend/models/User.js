const mongoose = require("mongoose");

var User = mongoose.model("User", {
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  usertype: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  password: { type: String, required: true }
});

module.exports = { User };
