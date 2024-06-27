import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function AllItem() {
  const [item, setItem] = useState([]);

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:3500/item";
    axios.get(url).then((response) => {
      console.log(response["data"])
      setItem(response["data"])
    });
  };

  const validation = (name,supId,unit,price) => {
    console.log("bb");
    var Error = false;

    if (name === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Name Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (supId === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="item Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (price === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Price Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(
        newRow["name"],
        newRow["time"],
        newRow["date"],
        newRow["driver"],
        newRow["price"],
        newRow["descrption"]
      )
    ) {
      const url = "http://localhost:3500/item/" + oldRow["_id"];
      const data = JSON.stringify({
        name: newRow["name"],
        supId: newRow["supId"],
        unit: newRow["unit"],
        price: newRow["price"]
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onReload();
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Success!"
                content="Update Successful!"
                scheme={Cinnamon.Crisp.SCHEME_GREEN}
                icon={<CheckCircleOutlineIcon />}
              />
            ),
          });
        });
    }
  };

  const onDelete = (id) => {
    const url = "http://localhost:3500/item/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Success!"
            content="Delete Successful!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
            icon={<CheckCircleOutlineIcon />}
          />
        ),
      });
      onReload();
    });
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Sup Id", field: "supId" , editable: 'never'},
    { title: "unit", field: "unit" , editable: 'never'},
    { title: "Price", field: "price" }
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Item Table"
        columns={columns}
        data={item}
        style={{
          maxWidth: "80%",
          padding: "20px 5px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
        options={{
          filtering: true,
          sorting: true,
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newRow, oldRow) =>
            new Promise(async (resolve, reject) => {
              SubmitForm(newRow, oldRow);
              console.log(oldRow._id);
              setTimeout(() => resolve(), 300);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              console.log(selectedRow);
              onDelete(selectedRow._id);
              setTimeout(() => resolve(), 300);
            }),
        }}
      />
      <br />
    </div>
  );
}

export default AllItem;
