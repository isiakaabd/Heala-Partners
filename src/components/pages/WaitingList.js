import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import WaitingListTable from "components/layouts/WaitingListTable";
import PreviousButton from "components/Utilities/PreviousButton";

const WaitingList = () => {
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path="/appointments" />
      </Grid>
      <Grid item>
        <Typography variant="h2">Waiting List</Typography>
      </Grid>
      <Grid item style={{ marginTop: "5rem" }}>
        <WaitingListTable path="/appointments/waiting-list" />
      </Grid>
    </Grid>
  );
};

export default WaitingList;
