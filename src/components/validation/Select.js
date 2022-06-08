import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Field, ErrorMessage } from "formik";
import { FormControl, FormLabel, Select, MenuItem, Grid } from "@mui/material";

import Typography from "@mui/material/Typography";
import { TextError } from "components/Utilities";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  select: {
    fontWeight: 200,
    color: theme.palette.common.lightGrey,
    minHeight: 50,
    fontSize: "1.6rem !important",
  },
}));

export const Formiks = ({ value, name, onChange, onBlur, children }) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      <Select
        name={name}
        displayEmpty
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        className={classes.select}
      >
        {children}
      </Select>
    </FormControl>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
  onBlur: PropTypes.func,
};

const Selects = (props) => {
  const { name, label, options, placeholder } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field name={name} as={Formiks} label={label}>
        <MenuItem value="">{placeholder}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.key}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

Selects.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export const CustomSelect = (props) => {
  const { value, options, name, onChange, onBlur, placeholder } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormControl fullWidth>
        <Select
          name={name}
          displayEmpty
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          className={classes.select}
        >
          <MenuItem value="">
            <Typography>{placeholder}</Typography>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
CustomSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.string,
  name: PropTypes.func,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

export default Selects;
