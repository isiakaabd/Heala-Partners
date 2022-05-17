import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import Card from "components/Utilities/Card";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  containerGrid: {
    paddingTop: "7em",
  },

  parentGrid: {
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
      width: "30rem",

      // '&:hover': {
      //   background: '#fcfcfc',
      // },

      // '&:active': {
      //   background: '#fafafa',
      // },
    },
  },

  gridWrapper: {
    ...theme.typography.cardGridWrapper,
  },

  iconWrapper: {
    ...theme.typography.cardIconWrapper,
  },
}));

const HospitalSettings = ({ setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        className={classes.containerGrid}
        columnGap={4}
        rowSpacing={4}
      >
        <Grid
          item
          className={classes.parentGrid}
          style={{ marginRight: "2em" }}
          lg={4}
          md={6}
          sm={12}
        >
          <Link
            to="/hsettings/profile"
            style={{ textDecoration: "none" }}
            onClick={() => setSelectedSubMenu(12)}
          >
            <Card
              alt="A administrator icon used as a representation for the administrator "
              title="Hospital Profile"
              background={theme.palette.common.lightGreen}
            >
              <Administrator fill={theme.palette.common.green} />
            </Card>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

HospitalSettings.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
};

export default HospitalSettings;
