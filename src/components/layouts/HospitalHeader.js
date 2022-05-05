import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HospitalHeaderContent } from "components/layouts";
// import { LOGOUT_USER } from 'components/graphQL/Mutation'
// import { useMutation } from '@apollo/client'
// import jwtDecode from 'jwt-decode'
// import { useActions } from 'components/hooks/useActions'

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingLeft: "max(35rem,24vw)",
    paddingTop: "2em",
    paddingBottom: "2em",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

const HospitalHeader = (props) => {
  // const { logout } = useActions()
  // const [logout_user] = useMutation(LOGOUT_USER)
  const {
    selectedMenu,
    // setSelectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
  } = props;
  const classes = useStyles();
  // useEffect(() => {
  //   const token = localStorage.getItem('Pharmacy_token')
  //   const { exp } = jwtDecode(token)
  //   ;(async () => {
  //     if (Date.now() < exp * 1000) {
  //       await logout_user()
  //       setSelectedMenu(13)
  //       logout()
  //     } else {
  //       console.log(123)
  //       // setAccessToken(token)
  //       // try {
  //       //   setTimeout(pharmacy, 300)
  //       //   setstate(false)
  //       // } catch (err) {
  //       //   console.error(err)
  //       // }
  //     }
  //   })()
  // }, [logout])

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={classes.appBar}
        classes={{ root: classes.appBar }}
      >
        <HospitalHeaderContent
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

HospitalHeader.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
};

export default HospitalHeader;
