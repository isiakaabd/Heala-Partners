import React from "react";
import { Grid, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import HeaderContents from "components/layouts/HeaderContents";

const useStyles = makeStyles((theme) => ({
  appBar: {
    "&.MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-around",
      padding: "0px",
      alignItems: "center",
      paddingInline: "min(2.5rem,4vw)",
    },
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

const Header = ({ drawerWidth, handleDrawerToggle }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      padding="1rem"
      sx={{
        width: { md: `calc(100% - (${drawerWidth}px + 3em))` },
      }}
    >
      <Toolbar className={classes.appBar}>
        <Grid item marginInline={2.5}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: "white",
              fontSize: "3rem",
              background: "black",
              display: { md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <HeaderContents
          // selectedMenu={selectedMenu}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
