require("./db.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var ItemRoutes = require("./controllers/ItemController")
var SupplierRoutes = require("./controllers/SupplierController")
var PRRoutes = require("./controllers/PRController")
var UserRoutes = require("./controllers/UserController")

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }))
app.listen(3500, () => console.log("Server started at : 3500"))

app.use("/Item", ItemRoutes)
app.use("/Supplier", SupplierRoutes)
app.use("/PR", PRRoutes)
app.use("/User", UserRoutes)

app.use(express.static("public"))
