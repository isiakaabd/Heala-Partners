import React, { useState, useEffect, useLayoutEffect } from 'react'
import Modals from 'components/Utilities/Modal'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
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
import { useParams } from 'react-router-dom'
import {
  Chip,
  Grid,
  Typography,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@mui/material'

import { useQuery } from '@apollo/client'
import { getDrugOrder } from 'components/graphQL/useQuery'

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

  useLayoutEffect(() => {
    setChatMediaActive(false)

    // eslint-disable-next-line
  }, [chatMediaActive])
  const {
    createdAt,
    gender,
    sampleCollection,
    referralId,
    affliation,
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
                <Typography variant="h4">2nd Prescription</Typography>
              </Grid>
              <Grid item>
                {prescriptions.map((prescription) => {
                  return Object.keys(prescription)
                })}
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
        title="Select a reason for cancelling referrals"
        rowSpacing={5}
        handleClose={() => setCancel(false)}
      >
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel
              sx={{ color: 'secondary', margin: '2rem 0' }}
              component="legend"
            >
              Select an Option
            </FormLabel>
            <RadioGroup
              aria-label="Select an Option"
              defaultValue="Reason 1"
              name=" reason for cancelling referrals"
            >
              {/* <FormRadio value="Reason 1" label="Reason 1" name="Reason 1" />
              <FormRadio value="Reason 2" label="Reason 2" name="Reason 2" />
              <FormRadio value="Reason 3" label="Reason 3" name="Reason 3" />
              <FormRadio value="Reason 4" label="Reason 4" name="Reason 4" />
              <FormRadio value="Reason 5" label="Reason 5" name="Reason 5" /> */}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <CustomButton
            title="Submit"
            type={darkButton}
            width="100%"
            onClick={() => setCancel(false)}
          />
        </Grid>
      </Modals>
    </>
  )
}

PendingOrderProfile.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
}

export default PendingOrderProfile
