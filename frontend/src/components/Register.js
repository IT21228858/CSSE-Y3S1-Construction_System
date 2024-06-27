import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Grid , TextField , Button ,Card , Select , MenuItem , CardContent , Typography , InputLabel , FormControl} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Register() {
  const [fname, setFname] = useState("");
  const [fnameError,setFnameError] = useState(false);
  const [fnameErrorText,setFnameErrorText] = useState("");
  const [lname, setLname] = useState("");
  const [lnameError,setLnameError] = useState(false);
  const [lnameErrorText,setLnameErrorText] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError,setPhoneError] = useState(false);
  const [phoneErrorText,setPhoneErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [emailError,setEmailError] = useState(false);
  const [emailErrorText,setEmailErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError,setPasswordError] = useState(false);
  const [passwordErrorText,setPasswordErrorText] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [cpasswordError,setCpasswordError] = useState(false);
  const [cpasswordErrorText,setCpasswordErrorText] = useState("");
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(async () => {
    if (localStorage.getItem("loginAccess")) {
      if (localStorage.getItem("type") === "patient") {
      } else {
        if (localStorage.getItem("type") === "admin") {
          history.push("/admin");
        } else if (localStorage.getItem("type") === "doctor") {
          history.push("/doctor");
        } else if (localStorage.getItem("type") === "nurse") {
          history.push("/nurse");
        } else if (localStorage.getItem("type") === "pharmacy") {
          history.push("/pharmacy");
        }
      }
    }
  }, []);

  const setFnameForm = (e) => {
    setFname(e.target.value);
  };

  const setLnameForm = (e) => {
    setLname(e.target.value);
  };

  const setPhoneForm = (e) => {
    setPhone(e.target.value);
  };

  const setEmailForm = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const setCpasswordForm = (e) => {
    setCpassword(e.target.value)
  };

  const onClear = () => {
    setPhone("");
    setEmail("");
    setPassword("");
    setCpassword("");
    setFname("");
    setLname("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (fname === "") {
      setFnameError(true)
      setFnameErrorText("First Name Required!")
      Error = true
    }else{
      setFnameError(false)
      setFnameErrorText('')
    }

    if (lname === "") {
      setLnameError(true)
      setLnameErrorText("Last Name Required!")
      Error = true
    }else{
      setLnameError(false)
      setLnameErrorText('')
    }

    if (phone === "") {
      setPhoneError(true)
      setPhoneErrorText("Phone Required!")
      Error = true;
    }else{
      setPhoneError(false)
      setPhoneErrorText('')
    }

    if (email === "") {
      setEmailError(true)
      setEmailErrorText("Email Required!")
      Error = true;
    }else{
      setEmailError(false)
      setEmailErrorText('')
    }

    if (password === "") {
      setPasswordError(true)
      setPasswordErrorText("Password Required!")
      Error = true;
    }else{
      setPasswordError(false)
      setPasswordErrorText('')
    }

    if (cpassword === "") {
      setCpasswordError(true)
      setCpasswordErrorText("Confirm Password Required!")
      Error = true;
    } else if (password !== cpassword) {
      setCpasswordError(true)
      setCpasswordErrorText("Password & Confirm Password Not Equal!")
      Error = true;
    }else{
      setCpasswordError(false)
      setCpasswordErrorText('')
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/User";
      const data = JSON.stringify({
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        password: password
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.err !== "connection") {
            if (res.data.err === "email") {
              setEmail("");
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Email Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.err !== "already") {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success!"
                    content="Insert Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                    icon={<CheckCircleOutlineIcon />}
                  />
                ),
              });
            } else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            }
          } else {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Validation Error!"
                  content="Connection Error!"
                  scheme={Cinnamon.Crisp.SCHEME_RED}
                  icon={<ErrorOutlineIcon />}
                />
              ),
            });
          }
        });
    }
  };

  return (
    <div className="App">
      <br />
      <Grid>
        <Card
          style={{
            maxWidth: 50 + "%",
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 10px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontFamily: "Arial", fontSize: "34px" }}
            >Register</Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="First Name"
                    inputRef={inputRef}
                    autoFocus
                    variant="outlined"
                    name="fname"
                    value={fname}
                    error ={fnameError}
                    helperText= {fnameErrorText}
                    onChange={setFnameForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Last Name"
                    inputRef={inputRef}
                    autoFocus
                    variant="outlined"
                    name="lname"
                    value={lname}
                    error ={lnameError}
                    helperText= {lnameErrorText}
                    onChange={setLnameForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Phone Number"
                    variant="outlined"
                    name="phone"
                    value={phone}
                    error ={phoneError}
                    helperText= {phoneErrorText}
                    onChange={setPhoneForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Email"
                    variant="outlined"
                    name="email"
                    value={email}
                    error ={emailError}
                    helperText= {emailErrorText}
                    onChange={setEmailForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    name="password"
                    value={password}
                    error ={passwordError}
                    helperText= {passwordErrorText}
                    onChange={setPasswordForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Confirm Password"
                    variant="outlined"
                    name="cpassword"
                    value={cpassword}
                    error ={cpasswordError}
                    helperText= {cpasswordErrorText}
                    onChange={setCpasswordForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onClear()}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

export default Register;
