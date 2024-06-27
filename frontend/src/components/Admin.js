import React, { useState , useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'

function Admin() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
        Admin Dashboard
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Admin
            </Typography>
            <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button href="/all_users" type="submit" variant="contained" color="primary" fullWidth>Users Manage</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/add_supplier" type="submit" variant="contained" color="primary" fullWidth>Add Supplier</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/all_supplier" type="submit" variant="contained" color="primary" fullWidth>All Supplier</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/add_item" type="submit" variant="contained" color="primary" fullWidth>Add Item</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/all_item" type="submit" variant="contained" color="primary" fullWidth>All Item</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/all_pr" type="submit" variant="contained" color="primary" fullWidth>All PR</Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => logout()}
                    fullWidth
                  >Logout</Button>
                </Grid>

              </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br/>
    </div>
  );
}

export default Admin;