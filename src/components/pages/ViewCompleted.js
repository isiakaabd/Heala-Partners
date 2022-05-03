import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { DisplayProfile, PreviousButton, Loader } from "components/Utilities";
import { NoData } from "components/layouts";
import { dateMoment } from "components/Utilities/Time";
import { useParams } from "react-router-dom";
import { Chip, Grid, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getDrugOrder } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "5rem",
    gap: "max(2rem, 3vw)",
    justifyContent: "center",
    flexWrap: "nowrap",
    width: "100%",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  cardsWrapper: {
    "&.MuiGrid-root > *": {
      flexWrap: "wrap",
    },
  },
  card: {
    "&.MuiGrid-root": {
      height: "100%",
      borderRadius: "1rem",
      flexDirection: "column",
      padding: "min(3rem,4vw)",
      gap: "1rem",
    },
  },

  chipRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    wordBreak: "break-all",
    fontSize: "1.3rem !important",
    border: "1px solid #bdbdbd",
    padding: ".4rem",
    maxWidth: "max-content",
    minHeight: "2rem",
    color: "#2dd39e !important",
  },
  chipLabel: {
    overflowWrap: "break-word",
    whiteSpace: "normal",
    textOverflow: "clip",
  },

  cardContainer: {
    "&.MuiGrid-root": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(15rem,1fr))",
      rowGap: "3rem",
      columnGap: "2rem",
      "& > *": {
        flex: 1,
        boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
        minHeight: "14.9rem",
        background: "#fff",
      },
    },
  },
  buttonsGridWrapper: {
    marginTop: "5rem !important",
  },

  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
    },
  },
  // gridsWrapper: {
  //   background: "#fff",
  //   borderRadius: "1rem",
  //   padding: "4rem",
  //   boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  // },

  // badge: {
  //   "&.MuiChip-root": {
  //     fontSize: "1.3rem !important",
  //     //   height: "2.7rem",
  //     background: theme.palette.common.lightGreen,
  //     color: theme.palette.common.green,
  //     borderRadius: "1.5rem",
  //   },
  // },

  // cardGrid: {
  //   background: "#fff",
  //   borderRadius: "1rem",
  //   padding: "4rem 5rem",
  //   height: "16.1rem",
  //   boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  // },

  // infoBadge: {
  //   "&.MuiChip-root": {
  //     fontSize: "1.25rem",
  //     borderRadius: "1.5rem",
  //     color: theme.palette.common.green,
  //   },
  // },

  // link: {
  //   display: "flex",
  //   alignItems: "center",
  //   fontSize: "1.25rem",
  //   color: theme.palette.common.green,
  //   border: `1px solid ${theme.palette.common.lightGrey}`,
  //   padding: ".75rem",
  //   borderRadius: "1.5rem",
  //   textDecoration: "none",
  // },

  // linkIcon: {
  //   "&.MuiSvgIcon-root": {
  //     fontSize: "1.25rem",
  //     color: theme.palette.common.green,
  //     marginLeft: "1.2rem",
  //   },
  // },

  // buttonsGridWrapper: {
  //   marginTop: "5rem !important",
  //   height: "16.1rem",
  // },
}));

const ViewCompleted = ({ chatMediaActive, setChatMediaActive }) => {
  const classes = useStyles();
  const { orderId } = useParams();

  const { data, loading, error } = useQuery(getDrugOrder, {
    variables: { id: orderId },
  });
  const [state, setState] = useState([]);

  useEffect(() => {
    if (data) return setState(data?.getDrugOrder);
  }, [data]);

  useLayoutEffect(() => {
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [chatMediaActive]);

  const {
    createdAt,
    affliation,
    prescriptions,
    orderId: idOrder,
    doctorData,
    patientData,
    // eslint-disable-next-line
  } = state;
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton path={"/completed-order"} />
        </Grid>
        {/* Display photo and profile name grid */}
        <Grid item>
          <DisplayProfile
            medicalTitle="User ID"
            patientData={patientData}
            chatPath={`/patients/${orderId}/profile/chat`}
            setChatMediaActive={setChatMediaActive}
          />
        </Grid>
        {/* PERSONAL INFO SECTION */}
        <Grid
          item
          container
          className={classes.cardContainer}
          ga
          sx={{ paddingTop: "5rem" }}
        >
          <Grid item xs={12} md={12} container className={classes.card}>
            <Grid item>
              <Typography variant="h4">Patient Name</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={
                  patientData
                    ? `${patientData.firstName} ${patientData.lastName}`
                    : "no Value"
                }
                classes={{
                  root: classes.chipRoot,
                  label: classes.chipLabel,
                }}
              />
            </Grid>
          </Grid>
          <Grid item md={12} xs={12} container className={classes.card}>
            <Grid item>
              <Typography variant="h4">Date </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={dateMoment(createdAt)}
                classes={{
                  root: classes.chipRoot,
                  label: classes.chipLabel,
                }}
              />
            </Grid>
          </Grid>
          <Grid item container md={12} xs={12} className={classes.card}>
            <Grid item>
              <Typography variant="h4">Order ID</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={idOrder}
                variant="outlined"
                classes={{
                  root: classes.chipRoot,
                  label: classes.chipLabel,
                }}
              />
            </Grid>
          </Grid>
          <Grid item container md={12} xs={12} className={classes.card}>
            <Grid item>
              <Typography variant="h4">Doctor Name</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={
                  doctorData
                    ? `${doctorData.firstName} ${doctorData.lastName}`
                    : "No Value"
                }
                variant="outlined"
                classes={{
                  root: classes.chipRoot,
                  label: classes.chipLabel,
                }}
              />
            </Grid>
          </Grid>
          <Grid item container md={12} xs={12} className={classes.card}>
            <Grid item>
              <Typography variant="h4">Diagnostics</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label="Chisom Sule"
                classes={{
                  root: classes.chipRoot,
                  label: classes.chipLabel,
                }}
              />
            </Grid>
          </Grid>
          <Grid item container md={12} xs={12} className={classes.card}>
            <Grid item>
              <Typography variant="h4">Affliation</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={affliation ? affliation : "No Value"}
                classes={{
                  root: classes.chipRoot,
                  label: classes.chipLabel,
                }}
              />
            </Grid>
          </Grid>
          {prescriptions &&
            prescriptions.map((i, index) => {
              return (
                <Grid item container md={12} xs={12} className={classes.card}>
                  <Grid item>
                    <Typography variant="h4">
                      {index + 1} Prescription
                    </Typography>
                  </Grid>
                  <Grid item container flexWrap="nowrap" gap={3}>
                    {/* {prescriptions && prescriptions.length > 0 ? ( */}
                    <Grid item container flexWrap="nowrap" gap={3}>
                      <ul style={{ padding: "2rem", color: "#606060" }}>
                        <Typography variant="h4" gutterBottom>
                          <li>Drugs : {i.drugName}</li>
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          <li>Dosage : {i.drugName}</li>
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          <li>Dosage Quantity: {i.dosageQuantity}</li>
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          <li>Drug Price : {i.drugPrice}</li>
                        </Typography>
                      </ul>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

ViewCompleted.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default ViewCompleted;
