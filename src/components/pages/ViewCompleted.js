import React, { useState, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { DisplayProfile, PreviousButton, Loader } from 'components/Utilities'
import { NoData } from 'components/layouts'
import { dateMoment } from 'components/Utilities/Time'
import { useParams } from 'react-router-dom'
import { Chip, Grid, Typography } from '@mui/material'
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

const ViewCompleted = ({ chatMediaActive, setChatMediaActive }) => {
  const classes = useStyles()
  const { orderId } = useParams()

  const { data, loading, error } = useQuery(getDrugOrder, {
    variables: { id: orderId },
  })
  const [state, setState] = useState([])

  useEffect(() => {
    if (data) return setState(data?.getDrugOrder)
  }, [data])

  useLayoutEffect(() => {
    setChatMediaActive(false)

    // eslint-disable-next-line
  }, [chatMediaActive])

  const {
    createdAt,
    affliation,
    prescriptions,
    orderId: idOrder,
    doctorData,
    patientData,
    // eslint-disable-next-line
  } = state
  if (loading) return <Loader />
  if (error) return <NoData error={error} />

  return (
    <>
      <Grid container direction="column" style={{ paddingBottom: '10rem' }}>
        <Grid item style={{ marginBottom: '3rem' }}>
          <PreviousButton path={'/pending-order'} />
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
            style={{ minHeight: '25rem', marginRight: '2rem' }}
          >
            <Grid
              container
              direction="column"
              gap={2}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <Grid item>
                <Typography variant="h4">1st Prescription</Typography>
              </Grid>
              <Grid item container flexWrap="nowrap" gap={3}>
                {prescriptions && prescriptions.length > 0 ? (
                  <Grid item container flexWrap="nowrap" gap={3}>
                    <ul style={{ padding: '2rem' }}>
                      <Typography variant="h4" gutterBottom>
                        <li>
                          Drugs :{'   '} {prescriptions[0].drugName}
                        </li>
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        <li>Dosage : {prescriptions[0].drugName}</li>
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        <li>
                          Dosage Quantity: {prescriptions[0].dosageQuantity}
                        </li>
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        <li>Drug Price : {prescriptions[0].drugPrice}</li>
                      </Typography>
                    </ul>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          {/* DATE OF BIRTH GRID */}
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ minHeight: '25rem', marginLeft: '2rem' }}
          >
            <Grid
              container
              direction="column"
              gap={2}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <Grid item>
                <Typography variant="h4">2nd Prescription</Typography>
              </Grid>
              <Grid item container flexWrap="nowrap" gap={3}>
                {prescriptions && prescriptions.length > 0 ? (
                  <Grid item container flexWrap="nowrap" gap={3}>
                    <ul style={{ padding: '2rem' }}>
                      <Typography variant="h4" gutterBottom>
                        <li>Drugs : {prescriptions[1].drugName}</li>
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        <li>Dosage : {prescriptions[1].drugName}</li>
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        <li>
                          Dosage Quantity: {prescriptions[1].dosageQuantity}
                        </li>
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        <li>Drug Price : {prescriptions[1].drugPrice}</li>
                      </Typography>
                    </ul>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

ViewCompleted.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export default ViewCompleted
