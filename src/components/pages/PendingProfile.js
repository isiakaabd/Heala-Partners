import React, { useState, useLayoutEffect, useEffect } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { NoData } from 'components/layouts'
import { FormikControl } from 'components/validation'
import { Formik, Form } from 'formik'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { DeleteOrDisable } from 'components/modals'
import { useParams, useHistory } from 'react-router-dom'
import { time } from 'components/Utilities/Time'
import { useQuery, useMutation } from '@apollo/client'
import {
  getDiagnosticTest,
  getDiagnosticTests,
} from 'components/graphQL/useQuery'
import {
  cancelDiagnosticTest,
  scheduleDiagnosticTest,
} from 'components/graphQL/Mutation'

import { Typography, Grid, Chip } from '@mui/material'
import {
  DisplayProfile2,
  CustomButton,
  Loader,
  Modals,
  PreviousButton,
} from 'components/Utilities'

const useStyles = makeStyles((theme) => ({
  parentGridWrapper: {
    background: '#fff',
    borderRadius: '1rem',
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.1)',
    '&:not(:last-of-type)': {
      marginBottom: '5rem',
    },
  },
  gridsWrapper: {
    background: '#fff',
    borderRadius: '1rem',
    padding: '1rem',
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.2)',
  },

  badge: {
    '&.MuiChip-root': {
      fontSize: '1.3rem !important',
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
      borderRadius: '1.5rem',
    },
  },

  cardGrid: {
    background: '#fff',
    borderRadius: '1rem',
    padding: '4rem 5rem',
    height: '14.1rem',
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.2)',
  },
  firstContainer: {
    width: '100%',
    height: '100%',
  },

  infoBadge: {
    '&.MuiChip-root': {
      fontSize: '1.25rem',
      borderRadius: '1.5rem',
      color: theme.palette.common.green,
    },
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

  title: {
    '&.MuiTypography-root': {
      color: theme.palette.common.grey,
    },
  },
}))

const PendingProfile = ({
  chatMediaActive,
  setChatMediaActive,
  setSelectedSubMenu,
  setSelectedPatientMenu,
}) => {
  const initialValues = {
    reason: '',
  }
  const validationSchema = Yup.object({
    reason: Yup.string('Enter Reason ').required('Reason is required'),
  })
  const [scheduleReferrals] = useMutation(scheduleDiagnosticTest)
  const [cancel, setCancel] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  }

  const { requestId } = useParams()
  const [cancelTest] = useMutation(cancelDiagnosticTest)
  const onSubmit = async (values) => {
    const { reason } = values
    await cancelTest({
      variables: {
        id: requestId,
        reason,
      },
      refetchQueries: [
        {
          query: getDiagnosticTests,
          variables: {
            status: 'pending',
          },
        },
        {
          query: getDiagnosticTests,
          variables: {
            status: 'cancelled',
          },
        },
      ],
    })
    history.push('/pending')
  }

  const onConfirm = () => setCancel(true)

  const { data, loading, error } = useQuery(getDiagnosticTest, {
    variables: { id: requestId },
  })

  useEffect(() => {
    if (data) {
      setPendingProfile(data?.getDiagnosticTest)
    }
  }, [data])
  const onSubmit1 = async (values) => {
    const { date } = values
    const timeValue = time(date)
    try {
      await scheduleReferrals({
        variables: { id: requestId, time: timeValue },
        refetchQueries: [
          {
            query: getDiagnosticTests,
            variables: {
              status: 'pending',
            },
          },
          {
            query: getDiagnosticTests,
            variables: {
              status: 'scheduled',
            },
          },
        ],
      })
      history.push('/pending')
    } catch (err) {
      console.log(err)
    }
    handlePatientCloses()
  }
  const initialValues1 = {
    date: '',
  }
  const validationSchema1 = Yup.object({
    date: Yup.string('select date and time ').required(
      'Date  and time is required',
    ),
  })
  const [openDisablePatient, setOpenDisablePatient] = useState(false)
  const [isPatients, setIsPatients] = useState(false)
  const handleDialogOpen = () => setIsPatients(true)
  const [pendingProfile, setPendingProfile] = useState([])

  const {
    createdAt,
    gender,
    sampleCollection,
    referralId,
    reason,
    testId,
    userLocation,
    status,
    doctor,
    tests,
    affiliation,
    testOption,
    doctorData,
    patientData,
    // eslint-disable-next-line
  } = pendingProfile

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
  const handlePatientCloses = () => setIsPatients(false)

  if (loading) return <Loader />
  if (error) return <NoData error={error} />
  return (
    <>
      <Grid container direction="column" style={{ paddingBottom: '10rem' }}>
        <Grid item style={{ marginBottom: '3rem' }}>
          <PreviousButton
            path={'/pending'}
            onClick={() => {
              setSelectedSubMenu(3)
            }}
          />
        </Grid>

        <DisplayProfile2
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
                  {' '}
                  {tests && tests.length > 1 ? 'Tests' : 'Test'}
                </Typography>
              </Grid>
              <Grid item container gap={2}>
                {tests && tests.length > 0 ? (
                  tests.map((i, index) => {
                    return (
                      <Grid item key={index}>
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
              {userLocation ? (
                <Grid item container gap={2}>
                  <Grid item>
                    <Chip
                      variant="outlined"
                      label={userLocation.address}
                      className={classes.infoBadge}
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      variant="outlined"
                      label={userLocation.city}
                      className={classes.infoBadge}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid>
                  <Chip
                    variant="outlined"
                    label="No Collection Details"
                    className={classes.infoBadge}
                  />
                </Grid>
              )}
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
              title="Cancel Referral"
              type={trasparentButton}
              width="100%"
              textColor={theme.palette.common.black}
              onClick={() => setOpenDisablePatient(true)}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomButton
              variant="contained"
              title="Schedule Referral"
              width="100%"
              type={darkButton}
              onClick={handleDialogOpen}
            />
          </Grid>

          <DeleteOrDisable
            open={openDisablePatient}
            setOpen={setOpenDisablePatient}
            title="Cancel Test"
            btnValue="cancel"
            confirmationMsg="Cancel Test"
            onConfirm={onConfirm}
          />

          <Modals
            isOpen={isPatients}
            title="Schedule Referral"
            rowSpacing={5}
            height="90vh"
            handleClose={handlePatientCloses}
          >
            <Formik
              initialValues={initialValues1}
              onSubmit={onSubmit1}
              validationSchema={validationSchema1}
              validateOnChange={false}
              validateOnMount={false}
            >
              {({ isSubmitting, dirty, isValid, setFieldValue }) => {
                return (
                  <Form style={{ marginTop: '3rem' }}>
                    <Grid item container>
                      <Grid item md>
                        <FormikControl
                          control="time"
                          name="date"
                          label="Date"
                          placeholder="Choose Date and Time"
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="flex-end"
                      marginTop={3}
                      xs={12}
                    >
                      <CustomButton
                        title="Schedule Referral"
                        width="100%"
                        type={buttonType}
                        isSubmitting={isSubmitting}
                        disabled={!(dirty || isValid)}
                      />
                    </Grid>
                  </Form>
                )
              }}
            </Formik>
          </Modals>
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

PendingProfile.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
}

export default PendingProfile
