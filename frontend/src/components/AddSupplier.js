import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Grid , TextField , Button ,Card , Select , MenuItem , CardContent , Typography , InputLabel , FormControl} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function AddSupplier() {
  const [name, setName] = useState("");
  const [nameError,setNameError] = useState(false);
  const [nameErrorText,setNameErrorText] = useState("");
  const [address, setAddress] = useState("");
  const [addressError,setAddressError] = useState(false);
  const [addressErrorText,setAddressErrorText] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError,setPhoneError] = useState(false);
  const [phoneErrorText,setPhoneErrorText] = useState("");
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(async () => {
    if (localStorage.getItem("loginAccess")) {
    }
  }, []);

  const setNameForm = (e) => {
    setName(e.target.value);
  };

  const setAddressForm = (e) => {
    setAddress(e.target.value);
  };

  const setPhoneForm = (e) => {
    setPhone(e.target.value);
  };

  const onClear = () => {
    setAddress("");
    setName("");
    setPhone("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (name === "") {
      setNameError(true)
      setNameErrorText("Name Required!")
      Error = true
    }else{
      setNameError(false)
      setNameErrorText('')
    }
    
    if (phone === "") {
      setPhoneError(true)
      setPhoneErrorText("Phone Required!")
      Error = true
    }else{
      setPhoneError(false)
      setPhoneErrorText('')
    }

    if (address === "") {
      setAddressError(true)
      setAddressErrorText("Vehicle Number Required!")
      Error = true;
    }else{
      setAddressError(false)
      setAddressErrorText('')
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/Supplier";
      const data = JSON.stringify({
        name: name,
        address: address,
        phone: phone
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res);
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
            >Add Supplier</Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Name"
                    inputRef={inputRef}
                    autoFocus
                    variant="outlined"
                    name="name"
                    value={name}
                    error ={nameError}
                    helperText= {nameErrorText}
                    onChange={setNameForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Address"
                    variant="outlined"
                    name="address"
                    value={address}
                    error ={addressError}
                    helperText= {addressErrorText}
                    onChange={setAddressForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Phone"
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

export default AddSupplier;
