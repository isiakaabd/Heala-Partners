import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
}));
const PreviousButton = ({ path, ...rest }) => {
  const classes = useStyles();
  return (
    <IconButton LinkComponent={Link} to={path} {...rest}>
      <KeyboardBackspaceIcon color="success" className={classes.icon} />
    </IconButton>
  );
};

PreviousButton.propTypes = {
  path: PropTypes.string,
};

export default PreviousButton;
