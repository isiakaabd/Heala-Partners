import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { DashCharts } from "components/layouts";

const Dashboards = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <DashCharts />
      </Grid>
    </Grid>
  );
};

Dashboards.propTypes = {
  chatMediaActive: PropTypes.bool,
  setChatMediaActive: PropTypes.func,
};

export default Dashboards;
