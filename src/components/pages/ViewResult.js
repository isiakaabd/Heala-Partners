import React, { useState, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Chip } from '@mui/material'
import { NoData } from 'components/layouts'
import { ReactComponent as CompleteIcon } from 'assets/images/complete.svg'
import { Loader, DisplayProfiles, PreviousButton } from 'components/Utilities'
import { makeStyles } from '@mui/styles'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { getDiagnosticTest } from 'components/graphQL/useQuery'

const useStyles = makeStyles((theme) => ({
  infoBadge: {
    '&.MuiChip-root': {
      fontSize: '1.25rem',
      borderRadius: '1.5rem',
      color: theme.palette.common.green,
    },
  },
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
  container: {
    background: '#EEF0F7',
    width: '7.2rem',
    height: '7.6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notLink: {
    border: 'none',
    justifyContent: 'center',
    fontSize: '1rem',
    maxWidth: '7.2rem !important',
    padding: '.75rem 0',
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
    minHeight: '16.1rem',
  },
}))

const ViewResult = ({
  chatMediaActive,
  setChatMediaActive,
  setSelectedSubMenu,
  type,
}) => {
  const classes = useStyles()
  const { completeId } = useParams()
  const [scheduleState, setScheduleState] = useState([])

  const { loading, error, data } = useQuery(getDiagnosticTest, {
    variables: {
      id: completeId,
    },
  })

  useEffect(() => {
    if (data) {
      setScheduleState(data?.getDiagnosticTest)
    }
  }, [data])

  useLayoutEffect(() => {
    setChatMediaActive(false)

    // eslint-disable-next-line
  }, [chatMediaActive])

  if (loading) return <Loader />
  if (error) return <NoData error={error} />
  const {
    createdAt,
    gender,
    sampleCollection,
    referralId,
    reason,
    userLocation,
    status,
    doctor,
    testId,
    affiliation,
    testResults,
    testOption,
    doctorData,
    patientData,
    tests,
    // eslint-disable-next-line
  } = scheduleState
  console.log(testResults)
  return (
    <>
      <Grid container direction="column" style={{ paddingBottom: '2rem' }}>
        <Grid item style={{ marginBottom: '3rem' }}>
          <PreviousButton
            path={'/completed'}
            onClick={() => {
              setSelectedSubMenu(6)
            }}
          />
        </Grid>
        {/* Display photo and profile name grid */}

        <DisplayProfiles
          createdAt={createdAt}
          gender={gender}
          sampleCollection={sampleCollection}
          referralId={referralId}
          reason={reason}
          status={status}
          doctor={doctor}
          affiliation={affiliation}
          testOption={testOption}
          doctorData={doctorData}
          patientData={patientData}
          type="scheduled"
        />

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
              alignItems="left"
            >
              <Grid item>
                <Typography variant="body1">
                  {tests && tests.length > 1 ? 'Tests' : 'Test'}
                </Typography>
              </Grid>
              <Grid item container gap={2}>
                {tests && tests.length > 0 ? (
                  tests.map((i) => {
                    return (
                      <Grid item>
                        <Chip
                          variant="outlined"
                          label={i.name}
                          className={classes.infoBadge}
                        />
                      </Grid>
                    )
                  })
                ) : (
                  <Grid item>
                    <Chip
                      variant="outlined"
                      label={'No Test yet'}
                      className={classes.infoBadge}
                    />
                  </Grid>
                )}
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
              alignItems="left"
            >
              <Grid item>
                <Typography variant="body1">Test ID </Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={testId ? testId : 'No Value'}
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
              alignItems="left"
            >
              <Grid item>
                <Typography variant="body1">Doctor Name</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={
                    doctorData
                      ? `${doctorData.firstName} ${doctorData.lastName}`
                      : 'No Doctor'
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
              alignItems="left"
            >
              <Grid item>
                <Typography variant="body1">Affliation</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={affiliation ? affiliation : 'No Affliation'}
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
              alignItems="left"
            >
              <Grid item>
                <Typography variant="body1">Test Option</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={sampleCollection ? sampleCollection : 'No Value'}
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
              alignItems="left"
              flexWrap="wrap"
            >
              <Grid item>
                <Typography variant="body1">Test Collection Details</Typography>
              </Grid>

              <Grid item container gap={2}>
                <Grid item>
                  <Chip
                    variant="outlined"
                    label={userLocation && userLocation.address}
                    className={classes.infoBadge}
                  />
                </Grid>
                <Grid item>
                  <Chip
                    variant="outlined"
                    label={userLocation && userLocation.city}
                    className={classes.infoBadge}
                  />
                </Grid>
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
              alignItems="left"
            >
              <Grid item>
                <Typography variant="body1">Reason For Referral</Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  label={reason ? reason : 'No Reason'}
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
            style={{ marginLeft: '2rem', visibility: 'hidden' }}
          ></Grid>
        </Grid>
        <Grid
          className={`${classes.gridsWrapper} ${classes.buttonsGridWrapper}`}
        >
          <Grid
            container
            direction="column"
            style={{ height: '100%' }}
            // justifyContent="space-between"
            gap={2}
            alignItems="left"
          >
            <Grid item>
              <Typography variant="body1">Test Result</Typography>
            </Grid>
            <Grid item container gap={2}>
              {testResults ? (
                testResults.map((item, index) => {
                  console.log(item)
                  return (
                    <Grid item key={index}>
                      <Grid container direction="column">
                        <Grid item className={classes.container}>
                          <a href={item?.file} rel="noreferrer" target="_blank">
                            <CompleteIcon />
                          </a>
                        </Grid>
                        <Grid
                          item
                          className={`${classes.link} ${classes.notLink}`}
                        >
                          {item?.title}
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                })
              ) : (
                <Grid item className={classes.link}>
                  no test result yet
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

ViewResult.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
}

export default ViewResult
