import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HeaderContents from "components/layouts/HeaderContents";

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

const Header = (props) => {
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
        <HeaderContents
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

Header.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
};

export default Header;
