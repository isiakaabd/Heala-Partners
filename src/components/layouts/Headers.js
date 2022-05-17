import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import HeadersContents from "components/layouts/HeadersContents";

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingLeft: "35rem",
    paddingTop: "2em",
    paddingBottom: "2em",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

const Headers = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
  } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={classes.appBar}
        classes={{ root: classes.appBar }}
      >
        <HeadersContents
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          selectedHcpMenu={selectedHcpMenu}
          waitingListMenu={waitingListMenu}
          selectedAppointmentMenu={selectedAppointmentMenu}
          selectedScopedMenu={selectedScopedMenu}
        />
      </AppBar>
    </Fragment>
  );
};

Headers.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
};

export default Headers;
