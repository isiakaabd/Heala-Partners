import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Avatar, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },
}));
const DisplayProfile = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { displayPhoto, medicalTitle, specialization, status, patientData } =
    props;

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.gridsWrapper}
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "2rem" }}>
              <Avatar
                alt={`Display Photo`}
                src={patientData ? patientData.image : displayPhoto}
                sx={{ width: 50, height: 50 }}
              />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item style={{ marginBottom: "1rem" }}>
                  <Typography variant="h3">
                    {patientData
                      ? `${patientData.firstName} ${patientData.lastName}`
                      : "No Patient"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: "3rem" }}>
                      <Typography
                        variant="h4"
                        color="success"
                        style={{ fontWeight: 400 }}
                      >
                        <span>{medicalTitle}:</span>{" "}
                        <span style={{ color: "green" }}>
                          {patientData
                            ? patientData?.dociId.split("-")[1]
                            : "No Value"}
                        </span>
                      </Typography>
                    </Grid>
                    {specialization ? (
                      <Grid item>
                        <Typography variant="h4" style={{ fontWeight: 400 }}>
                          <span
                            style={{ color: theme.palette.common.lightGrey }}
                          >
                            Specialization:
                          </span>{" "}
                          <Chip
                            label="Dentistry"
                            color="success"
                            className={classes.badge}
                          />
                        </Typography>
                      </Grid>
                    ) : status ? (
                      <Grid item>
                        {" "}
                        <Typography variant="h4">
                          <span
                            style={{ color: theme.palette.common.lightGrey }}
                          >
                            Status:
                          </span>{" "}
                          <Chip
                            label={status}
                            color={status === "Active" ? "success" : "error"}
                            className={classes.badge}
                            style={{
                              background:
                                status === "Active"
                                  ? theme.palette.common.lightGreen
                                  : theme.palette.common.lightRed,
                              color:
                                status === "Active"
                                  ? theme.palette.common.green
                                  : theme.palette.common.red,
                            }}
                          />
                        </Typography>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Action Buttons grid */}
      </Grid>
      {/* <MessageModal
        isOpen={message}
        handleClose={() => setMessage(false)}
        minHeight="30rem"
        title="Sule Muntari"
      ></MessageModal> */}
    </>
  );
};

DisplayProfile.propTypes = {
  fullName: PropTypes.string,
  displayPhoto: PropTypes.string,
  medicalTitle: PropTypes.string,
  statusId: PropTypes.number,
  specialization: PropTypes.string,
  status: PropTypes.string,
  chatPath: PropTypes.string,
  callPath: PropTypes.string,
  videoPath: PropTypes.string,
};

export default DisplayProfile;
