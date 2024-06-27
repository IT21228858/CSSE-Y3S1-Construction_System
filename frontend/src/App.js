import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Admin from "./components/Admin";
import AllSupplier from "./components/AllSupplier";
import AllItem from "./components/AllItem";
import AddItem from "./components/AddItem";
import AllPR from "./components/AllPR";
import AddSupplier from "./components/AddSupplier";
import AllUsers from "./components/AllUsers";
import Login from "./components/Login";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_RIGHT , POS_TOP } from "butter-toast";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: "url(/bg.jpg)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Nav />
        <Switch>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/all_pr" component={AllPR}></Route>
          <Route path="/all_item" component={AllItem}></Route>
          <Route path="/add_item" component={AddItem}></Route>
          <Route path="/add_supplier" component={AddSupplier}></Route>
          <Route path="/all_supplier" component={AllSupplier}></Route>
          <Route path="/all_users" component={AllUsers}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Register}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP , horizontal: POS_RIGHT }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
