import React, { useRef, useState, useEffect, useCallback } from "react";
import { Field, ErrorMessage } from "formik";
import { Loader, TextError } from "components/Utilities";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Badge,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

const Icon = styled(EditIcon)(({ theme }) => ({
  "&.MuiBadge-badge": {
    background: "red !important",
    "&::after": {
      content: '""',
    },
  },
  color: "white",
  position: "absolute",
  top: "100%",
  left: "10px",
  background: "green",
  borderRadius: "50%",
  width: 20,
  height: 20,

  // border: `2px solid ${theme.palette.background.paper}`,
}));
const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      color: theme.palette.common.black,

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },
}));

export const Formiks = ({ name, setFieldValue, onBlur, type, file, value }) => {
  const [preview, setPreview] = useState(null);
  console.log("preview", preview);
  // const [array, setArray] = useState([])
  const [progress, setProgress] = useState();
  console.log(value);
  const classes = useStyles();
  // console.log(array)
  const uploadImage = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      const data = await axios({
        method: "post",
        url: "https://api.heala.io/rest/media/upload/",
        data: form,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      return data.data.data.mediaUrl; //data.data.mediaUrl
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setPreview(value);
  }, [value]);
  const onChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const files = await uploadImage(file);
      if (value === "") {
        setPreview(null);
      } else setPreview(files);

      setFieldValue(name, files);
    },
    [setFieldValue, name, value]
  );
  const fileRef = useRef(null);
  return (
    <Grid item container alignItems="center">
      <Grid item>
        <Grid container>
          <FormControl>
            <input
              accept="image/*"
              onChange={onChange}
              type="file"
              multiple
              name={name}
              onBlur={onBlur}
              hidden
              ref={fileRef}
            />
            {type === "image" ? (
              <Badge
                onClick={() => fileRef.current.click()}
                overlap="circular"
                sx={{
                  cursor: "pointer",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={<Icon />}
              >
                <Avatar
                  src={preview ? preview : file}
                  alt="name"
                  sx={{ height: 100, width: 100 }}
                />
              </Badge>
            ) : (
              <Button
                variant="contained"
                onClick={() => fileRef.current.click()}
                component="span"
                className={classes.uploadBtn}
              >
                Upload Photo
              </Button>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <Grid item marginLeft="1rem">
        <Grid container>
          {progress < 100 ? (
            <Grid item>
              <Loader />
            </Grid>
          ) : (
            preview && !type && <Avatar src={preview} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  setFieldValue: PropTypes.func,
};

const Files = (props) => {
  const { name, label, value, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field name={name} as={Formiks} label={label} value={value} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

Files.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default Files;
