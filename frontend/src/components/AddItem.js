import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Grid , TextField , Button ,Card , Select , MenuItem , CardContent , Typography , InputLabel , FormControl} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function AddItem() {
  const [name, setName] = useState("");
  const [nameError,setNameError] = useState(false);
  const [nameErrorText,setNameErrorText] = useState("");
  const [supId, setSupId] = useState("");
  const [supIdError,setSupIdError] = useState(false);
  const [supIdErrorText,setSupIdErrorText] = useState("");
  const [unit, setUnit] = useState("");
  const [unitError,setUnitError] = useState(false);
  const [unitErrorText,setUnitErrorText] = useState("");
  const [price, setPrice] = useState("");
  const [priceError,setPriceError] = useState(false);
  const [priceErrorText,setPriceErrorText] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(async () => {
    onReload()
  }, []);
  
  const onReload = async() => {
    var temp
    const url1 = "http://localhost:3500/Supplier"
    await axios.get(url1).then(async(response) => {
      temp=response["data"]
      await setSuppliers(temp)
      console.log(temp)
    });
  };

  const setNameForm = (e) => {
    setName(e.target.value);
  };

  const setSupIdForm = (e) => {
    setSupId(e.target.value);
  };

  const setPriceForm = (e) => {
    setPrice(e.target.value);
  };

  const setUnitForm = (e) => {
    setUnit(e.target.value);
  };

  const onClear = () => {
    setSupId("");
    setUnit("");
    setName("");
    setPrice("");
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
    
    if (price === "") {
      setPriceError(true)
      setPriceErrorText("Price Required!")
      Error = true
    }else{
      setPriceError(false)
      setPriceErrorText('')
    }

    if (supId === "") {
      setSupIdError(true)
      setSupIdErrorText("Supplier Required!")
      Error = true;
    }else{
      setSupIdError(false)
      setSupIdErrorText('')
    }

    if (unit === "") {
      setUnitError(true)
      setUnitErrorText("Unit Required!")
      Error = true;
    }else{
      setUnitError(false)
      setUnitErrorText('')
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/Item";
      const data = JSON.stringify({
        name: name,
        supId: supId,
        unit: unit,
        price: price
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
            >AddItem</Typography>
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
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Supplier</InputLabel>
                    <Select
                      name="supId"
                      value={supId}
                      error ={supIdError}
                      helperText= {supIdErrorText}
                      style={{ textAlign: "left" }}
                      onChange={setSupIdForm}
                    >
                      <MenuItem value={""}>
                        <p>Select</p>
                      </MenuItem>
                        {
                            suppliers.map((res) =>

                                <MenuItem value={res._id}>
                                    <p>{res.name}</p>
                                </MenuItem>
                            )
                        }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      name="unit"
                      value={unit}
                      error ={unitError}
                      helperText= {unitErrorText}
                      style={{ textAlign: "left" }}
                      onChange={setUnitForm}
                    >
                      <MenuItem value={""}>
                        <p>Select</p>
                      </MenuItem>
                      <MenuItem value="Tons">
                                    <p>Tons</p>
                                </MenuItem>
                      <MenuItem value="Litter">
                                    <p>Litter</p>
                                </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Price"
                    variant="outlined"
                    name="price"
                    value={price}
                    error ={priceError}
                    helperText= {priceErrorText}
                    onChange={setPriceForm}
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

export default AddItem;
