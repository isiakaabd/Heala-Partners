import React, { useState, useEffect, useLayoutEffect } from 'react'
import Modals from 'components/Utilities/Modal'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import StarIcon from '@mui/icons-material/Star'
import { makeStyles } from '@mui/styles'
import { FormikControl } from 'components/validation'
import { Formik, Form } from 'formik'
import {
  DisplayProfile,
  PreviousButton,
  CustomButton,
  Loader,
} from 'components/Utilities'
import { NoData } from 'components/layouts'
import displayPhoto from 'assets/images/avatar.png'
import { useTheme } from '@mui/material/styles'
import DisablePatient from 'components/modals/DeleteOrDisable'

import { dateMoment } from 'components/Utilities/Time'
import Success from 'components/modals/Success'
import { useParams, useHistory } from 'react-router-dom'
import {
  Chip,
  Grid,
  Typography,
  RadioGroup,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormLabel,
} from '@mui/material'

import { useQuery, useMutation } from '@apollo/client'
import {
  getDrugOrder,
  getDrugOrders,
  cancelDrugOrder,
} from 'components/graphQL/useQuery'

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: '#fff',
    borderRadius: '1rem',
    padding: '4rem',
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.2)',
  },

  badge: {
    '&.MuiChip-root': {
      fontSize: '1.3rem !important',
      //   height: "2.7rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
      borderRadius: '1.5rem',
    },
  },

  cardGrid: {
    background: '#fff',
    borderRadius: '1rem',
    padding: '4rem 5rem',
    height: '16.1rem',
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.2)',
  },

  infoBadge: {
    '&.MuiChip-root': {
      fontSize: '1.25rem',
      borderRadius: '1.5rem',
      color: theme.palette.common.green,
    },
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.lightGrey}`,
    padding: '.75rem',
    borderRadius: '1.5rem',
    textDecoration: 'none',
  },

  linkIcon: {
    '&.MuiSvgIcon-root': {
      fontSize: '1.25rem',
      color: theme.palette.common.green,
      marginLeft: '1.2rem',
    },
  },

  buttonsGridWrapper: {
    marginTop: '5rem !important',
    height: '16.1rem',
  },
}))

const PendingOrderProfile = ({ chatMediaActive, setChatMediaActive }) => {
  const arr = [
    'Drugs',
    'Dosage',
    'Dosage Frequency',
    'Dosage Duration',
    'Mode of Administration',
  ]
  const classes = useStyles()
  const theme = useTheme()
  const { orderId } = useParams()

  const { data, loading, error } = useQuery(getDrugOrder, {
    variables: { id: orderId },
  })
  const [state, setState] = useState([])
  useEffect(() => {
    if (data) return setState(data?.getDrugOrder)
  }, [data])
  const onConfirm = () => {
    setCancel(true)
  }
  const [openDisablePatient, setOpenDisablePatient] = useState(false)
  const [modal, setModal] = useState(false)
  const [cancel, setCancel] = useState(false)
  const handleDialogClose = () => setModal(false)
  const handleDialogOpen = () => setModal(true)
  const [cancelTest] = useMutation(cancelDrugOrder)

  const darkButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  }

  const trasparentButton = {
    background: 'transparent',
    hover: '#fafafa',
    active: '#f4f4f4',
  }
  const history = useHistory()

  useLayoutEffect(() => {
    setChatMediaActive(false)

    // eslint-disable-next-line
  }, [chatMediaActive])

  const initialValues = {
    reason: '',
  }
  const validationSchema = Yup.object({
    reason: Yup.string('Enter Reason ').required('Reason is required'),
  })
  const onSubmit = async (values) => {
    const { reason } = values
    await cancelTest({
      variables: {
        id: orderId,
        reason,
      },
      refetchQueries: [
        {
          query: getDrugOrders,
          variables: {
            status: 'pending',
          },
        },
        {
          query: getDrugOrders,
          variables: {
            status: 'cancelled',
          },
        },
      ],
    })
    history.push('/pending-request')
  }
  const {
    createdAt,
    gender,
    sampleCollection,
    referralId,
    affliation,
    prescriptions,
    reason,
    testId,
    orderId: idOrder,
    userLocation,
    status,
    doctor,
    tests,
    affiliation,
    testOption,
    doctorData,
    patientData,
    // eslint-disable-next-line
  } = state
  console.log(state)
  if (loading) return <Loader />
  if (error) return <NoData error={error} />

  return (
    <>
      <Grid container direction="column" style={{ paddingBottom: '10rem' }}>
        <Grid item style={{ marginBottom: '3rem' }}>
          <PreviousButton path={'/pending-order/'} />
        </Grid>
        {/* Display photo and profile name grid */}
        <Grid item>
          <DisplayProfile
            fullName="Raphael Igbinedion"
            displayPhoto={displayPhoto}
            medicalTitle="User ID"
            statusId={132467}
            status={null}
            chatPath={`/patients/${orderId}/profile/chat`}
            setChatMediaActive={setChatMediaActive}
          />
        </Grid>
        {/* PERSONAL INFO SECTION */}
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: '5rem' }}
        >
          {/* GENDER GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Patient Name</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={
                    patientData
                      ? `${patientData.firstName} ${patientData.lastName}`
                      : 'no Value'
                  }
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Date </Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={dateMoment(createdAt)}
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
          style={{ paddingTop: '5rem' }}
        >
          {/* EMAIL ADDRESS GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Order ID</Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={idOrder}
                  variant="outlined"
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Doctor Name</Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={
                    doctorData
                      ? `${doctorData.firstName} ${doctorData.lastName}`
                      : 'No Value'
                  }
                  variant="outlined"
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
          style={{ paddingTop: '5rem' }}
        >
          {/* EMAIL ADDRESS GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Diagnostics</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label="Chisom Sule"
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">Affliation</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={affliation ? affliation : 'No Value'}
                  className={classes.infoBadge}
                />
                {/* <Chip variant="outlined" label="08123456789" className={classes.infoBadge} /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: '5rem' }}
        >
          {/* EMAIL ADDRESS GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">1st Prescription</Typography>
              </Grid>
              <Grid item container flexWrap="nowrap">
                {prescriptions && prescriptions.length > 0 ? (
                  <>
                    <Grid item container direction="column">
                      {arr.map((i) => {
                        return (
                          <Typography key={i} variant="h6">
                            {i}
                          </Typography>
                        )
                      })}
                    </Grid>
                    <Grid item container direction="column">
                      {Object.values(prescriptions[0]).map((i) => {
                        return <Typography variant="h6">{i}</Typography>
                      })}
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: '2rem' }}
          >
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <Grid item>
                <Typography variant="h4">2nd Prescription</Typography>
              </Grid>
              <Grid item container flexWrap="nowrap">
                {prescriptions && prescriptions.length > 0 ? (
                  <>
                    <Grid item container direction="column">
                      {arr.map((i) => {
                        return (
                          <Typography key={i} variant="h6">
                            {i}
                          </Typography>
                        )
                      })}
                    </Grid>
                    <Grid item container direction="column">
                      {Object.values(prescriptions[0]).map((i) => {
                        return <Typography variant="h6">{i}</Typography>
                      })}
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Grid>
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
            btnValue="Done"
            confirmationMsg="Your order has been successful"
          />
        </Grid>
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
              <Form style={{ marginTop: '3rem' }}>
                <Grid container>
                  <Grid item container>
                    <FormikControl
                      control="input"
                      label="State a Reason"
                      name="reason"
                      placeholder="Enter reason"
                    />
                  </Grid>
                  <Grid item container sx={{ flexGrow: 1, marginTop: '10rem' }}>
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
            )
          }}
        </Formik>
      </Modals>
    </>
  )
}

PendingOrderProfile.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
}

export default PendingOrderProfile
