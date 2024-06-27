import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function AllPR() {
  const [pr, setPR] = useState([]);

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:3500/pr";
    axios.get(url).then((response) => {
      console.log(response["data"])
      setPR(response["data"])
    });
  };

  const validation = (status) => {
    console.log("bb");
    var Error = false;

    if (status === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="status Required!"
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
        newRow["status"]
      )
    ) {
      const url = "http://localhost:3500/pr/status/" + oldRow["_id"];
      const data = JSON.stringify({
        status: newRow["status"],
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
    const url = "http://localhost:3500/pr/";
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
    { title: "Date", field: "date" , editable: 'never' },
    { title: "address", field: "address" , editable: 'never'},
    { title: "Site Name", field: "siteName" , editable: 'never'},
    { title: "Instructions", field: "instructions" , editable: 'never' },
    { title: "Total", field: "total" , editable: 'never' },
    { title: "Status", field: "status" , 
    lookup: { pending:"pending", success:"success" , reject:"reject" }},
    { title: "Delivery_date", field: "delivery_date" , editable: 'never'},
    { title: "itemsR", field: "itemsR" , editable: 'never'},
    { title: "quality", field: "quality" , editable: 'never' },
    { title: "quantity", field: "quantity" , editable: 'never'},
    { title: "damage", field: "damage" , editable: 'never'},
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="PR Table"
        columns={columns}
        data={pr}
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

export default AllPR;
