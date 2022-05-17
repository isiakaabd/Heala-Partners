import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import DashboardCharts from "components/layouts/DashboardChart";

const Dashboard = ({ chatMediaActive, setChatMediaActive }) => {
  useLayoutEffect(() => {
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [chatMediaActive]);
  return (
    <Grid container>
      <DashboardCharts />
    </Grid>
  );
};

Dashboard.propTypes = {
  chatMediaActive: PropTypes.bool,
  setChatMediaActive: PropTypes.func,
};

export default Dashboard;
