import React from "react";
import { Grid } from "@mui/material";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import { Card } from "components/Utilities";
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

      // "&:hover": {
      //   background: "#fcfcfc",
      // },

      // "&:active": {
      //   background: "#fafafa",
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

const Setting = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
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
        <Link to="/setting/profile" style={{ textDecoration: "none" }}>
          <Card
            alt="A administrator icon used as a representation for the administrator "
            title="Diagnostics Profile"
            background={theme.palette.common.lightGreen}
          >
            <Administrator fill={theme.palette.common.green} />
          </Card>
        </Link>
      </Grid>

      {/* 2 */}
    </Grid>
  );
};

export default Setting;
