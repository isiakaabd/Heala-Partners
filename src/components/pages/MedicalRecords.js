import React, { useEffect, useState } from "react";
import { Grid, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { calculateBMI } from "components/Utilities/bMI";
import {
  getProfile,
  findAllergies,
  // getLabResult,
} from "components/graphQL/useQuery";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";
const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  cardGrid: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem 5rem",
    height: "16.1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.35rem",
      borderRadius: "1.5rem",
      color: theme.palette.common.green,
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.lightGrey}`,
    padding: ".75rem",
    borderRadius: "1.5rem",
    textDecoration: "none",
  },
  linkIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
      marginLeft: "1.2rem",
    },
  },

  allergies: {
    "&.MuiGrid-root:not(:last-of-type)": {
      marginRight: "1rem",
    },
  },
}));

const MedicalRecords = () => {
  const classes = useStyles();
  const { patientId } = useParams();
  const [patientProfile, setPatientProfile] = useState([]);

  const { loading, data, error } = useQuery(getProfile, {
    variables: { profileId: patientId },
  });

  const [alergy, allergyResult] = useLazyQuery(findAllergies, {
    variables: { id: patientId },
  });

  // const [labResult, labResults] = useLazyQuery(getLabResult, {
  //   variables: { id: patientId },
  // })
  const [alergies, setAlergies] = useState([]);
  const [lab] = useState([]); //setLab
  useEffect(() => {
    (async () => {
      try {
        // patients()
        alergy();
        // labResult()
        setAlergies(allergyResult.data.findAllergies.allergies);
        // setLab(labResults.data.getLabResults.lab)
      } catch (err) {
        console.error(err);
      }
    })(); //labResult labResults.data
  }, [alergy, patientId, allergyResult.data]);

  useEffect(() => {
    if (data) {
      setPatientProfile(data.profile);
    }
  }, [data]);

  if (loading || allergyResult.loading) return <Loader />;
  if (error || allergyResult.error)
    return <NoData error={allergyResult.error || error} />;
  // const { height, weight } = data&& patientProfile
  const bmi = calculateBMI(patientProfile.height, patientProfile.weight);
  return (
    <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton
          path={`/patients/${patientId}`}
          /* onClick={() => setSelectedPatientMenu(0)} */
        />
      </Grid>
      <Grid item>
        <Typography variant="h2">Medical Records</Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        style={{ paddingTop: "5rem" }}
      >
        {/* HEIGHT GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginRight: "2rem" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Height</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={
                  patientProfile.height ? patientProfile.height : "No Value"
                }
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* WEIGHT GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginLeft: "2rem" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Weight</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={
                  patientProfile.weight ? patientProfile.weight : "No Value"
                }
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        style={{ paddingTop: "5rem" }}
      >
        {/* BLOOD GROUP GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginRight: "2rem" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Blood Group</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={
                  patientProfile.bloodGroup
                    ? patientProfile.bloodGroup
                    : "No Value"
                }
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* WEIGHT GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginLeft: "2rem" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">GenoType</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={
                  patientProfile.genotype ? patientProfile.genotype : "No Value"
                }
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        style={{ paddingTop: "5rem" }}
      >
        {/* BMI GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginRight: "2rem" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">BMI</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={isNaN(bmi) ? "No Value" : bmi}
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* ALLERGIES GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginLeft: "2rem" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Allergies</Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-around">
                {alergies.length > 0 ? (
                  alergies.map((alergy) => (
                    <Grid item key={alergy._id} className={classes.allergies}>
                      <Chip
                        variant="outlined"
                        label={alergy.food}
                        className={classes.infoBadge}
                      />
                    </Grid>
                  ))
                ) : (
                  <Chip
                    variant="outlined"
                    label="No Allergy for this Patient"
                    className={classes.infoBadge}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        style={{ paddingTop: "5rem" }}
      >
        {/* BMI GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginRight: "2rem" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Lab Results</Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-around">
                {lab.length > 0 ? (
                  lab.map((alergy, index) => (
                    <Grid item key={alergy._id}>
                      <a
                        rel="noreferrer"
                        key={alergy._id}
                        className={classes.link}
                        href={alergy.url}
                        target="_blank"
                      >
                        <span>{`Lab Result 0${index + 1}`}</span>
                      </a>
                    </Grid>
                  ))
                ) : (
                  <Chip
                    variant="outlined"
                    label="No Lab Result"
                    className={classes.infoBadge}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* EMPTY PLACEHOLDER GRID */}
        <Grid
          item
          md
          style={{ marginLeft: "2rem", padding: "4rem 5rem" }}
        ></Grid>
      </Grid>
    </Grid>
  );
};

export default MedicalRecords;
