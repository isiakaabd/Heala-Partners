import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Search } from "components/Utilities";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  // input: {
  //   ...theme.typography.input,
  // },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

const LoginInput = (props) => {
  const { label, name, autoFocus, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="body1" gutterBottom>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Field
          as={Search}
          id={name}
          autoFocus={autoFocus}
          name={name}
          className={classes.input}
          {...rest}
        />
        <ErrorMessage name={name} component={TextError} />
      </Grid>
    </Grid>
  );
};
LoginInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default LoginInput;
