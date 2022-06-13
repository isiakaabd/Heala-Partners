import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { getErrors } from "components/Utilities/Time";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { FormikControl } from "components/validation";
import { Formik, Form } from "formik";
import {
  DisplayProfile,
  PreviousButton,
  CustomButton,
  Loader,
  Modals,
} from "components/Utilities";
import { NoData } from "components/layouts";
// import displayPhoto from 'assets/images/avatar.svg'
import { useTheme } from "@mui/material/styles";
import DisablePatient from "components/modals/DeleteOrDisable";
import { dateMoment } from "components/Utilities/Time";
import Success from "components/modals/Success";
import { useParams, useHistory } from "react-router-dom";
import { Chip, Grid, Typography } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  getDrugOrder,
  getDrugOrders,
  cancelDrugOrder,
} from "components/graphQL/useQuery";
import { updateDrugOrder } from "components/graphQL/Mutation";

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
    color: theme.palette.common.green,
    border: "1px solid #bdbdbd",
    padding: ".4rem",
    maxWidth: "max-content",
    minHeight: "2rem",
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
}));

const PendingOrderProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const theme = useTheme();
  const { orderId } = useParams();

  const { data, loading, error } = useQuery(getDrugOrder, {
    variables: { id: orderId },
  });
  const [state, setState] = useState([]);
  const [fulfill] = useMutation(updateDrugOrder);
  useEffect(() => {
    if (data) return setState(data?.getDrugOrder);
  }, [data]);
  const onConfirm = () => setCancel(true);

  const [openDisablePatient, setOpenDisablePatient] = useState(false);
  const [modal, setModal] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [openProcess, setOpenProcess] = useState(false);
  const handleDialogClose = () => setOpenProcess(false);
  const handleDialogOpen = () => setOpenProcess(true);

  const onConfirm2 = async () => {
    setModal(true);
    try {
      await fulfill({
        variables: {
          id: orderId,
        },
        refetchQueries: [
          {
            query: getDrugOrders,
            variables: {
              status: "pending",
            },
          },

          {
            query: getDrugOrders,
            variables: {
              status: "processing",
            },
          },
        ],
      });
      enqueueSnackbar("Test scheduled", {
        variant: "success",
      });
      history.push("/processing-order");
    } catch (error) {
      enqueueSnackbar(getErrors(error), {
        variant: "error",
      });
      console.error(error);
    }

    setModal(false);
  };
  const [cancelTest] = useMutation(cancelDrugOrder);

  const darkButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };
  const history = useHistory();

  const initialValues = {
    reason: "",
  };
  const validationSchema = Yup.object({
    reason: Yup.string("Enter Reason ").trim().required("Reason is required"),
  });
  const onSubmit = async (values) => {
    const { reason } = values;
    try {
      await cancelTest({
        variables: {
          id: orderId,
          reason,
        },
        refetchQueries: [
          {
            query: getDrugOrders,
            variables: {
              status: "pending",
            },
          },
          {
            query: getDrugOrders,
            variables: {
              status: "processing",
            },
          },
          {
            query: getDrugOrders,
            variables: {
              status: "cancelled",
            },
          },
        ],
      });
      history.push("/cancelled-order");
      enqueueSnackbar("Test cancelled", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(getErrors(error), {
        variant: "error",
      });
      console.error(error);
    }
  };
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
      <Grid container direction="column">
        {/* Display photo and profile name grid */}
        <Grid item>
          <DisplayProfile
            medicalTitle="User ID"
            patientData={patientData}
            chatPath={`/patients/${orderId}/profile/chat`}
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
          <Grid item container md={12} xs={12} className={classes.card}>
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
      <Grid
        item
        container
        gap={4}
        justifyContent="center"
        alignItems="center"
        className={`${classes.gridsWrapper} ${classes.buttonsGridWrapper}`}
      >
        <Grid item xs={3}>
          <CustomButton
            variant="contained"
            title="Cancel Request"
            type={trasparentButton}
            width="100%"
            textColor={theme.palette.common.black}
            onClick={() => setOpenDisablePatient(true)}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomButton
            variant="contained"
            title="Process Order"
            width="100%"
            type={darkButton}
            onClick={handleDialogOpen}
          />
        </Grid>
        <DisablePatient
          open={openProcess}
          setOpen={setOpenDisablePatient}
          title="Process Order"
          btnValue="process"
          confirmationMsg="Process Order"
          onConfirm={onConfirm2}
        />

        <DisablePatient
          open={openDisablePatient}
          setOpen={setOpenDisablePatient}
          title="Cancel Referral"
          btnValue="cancel"
          confirmationMsg="Cancel Referral"
          onConfirm={onConfirm}
        />
        <Success
          open={modal}
          handleDialogClose={handleDialogClose}
          title="SUCCESSFUL"
          titleHeader=""
          btnValue="Done"
          confirmationMsg="Your order has been successful"
        />
      </Grid>
      <Modals
        isOpen={cancel}
        title="Cancel Test"
        rowSpacing={5}
        handleClose={() => setCancel(false)}
      >
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
          initialValues={initialValues}
          enableReinitialize
        >
          {({ isSubmitting, dirty, isValid }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid container>
                  <Grid item container>
                    <FormikControl
                      control="input"
                      label="State a Reason"
                      name="reason"
                      placeholder="Enter reason"
                    />
                  </Grid>
                  <Grid item container sx={{ flexGrow: 1, marginTop: "10rem" }}>
                    <CustomButton
                      title="Cancel Test"
                      type={darkButton}
                      width="100%"
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};

PendingOrderProfile.propTypes = {
  type: PropTypes.string,
};

export default PendingOrderProfile;
