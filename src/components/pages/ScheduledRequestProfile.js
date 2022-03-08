import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
  Modals,
  Loader,
  CustomButton,
  PreviousButton,
  DisplayProfile1,
} from 'components/Utilities'
import * as Yup from 'yup'
import { FormikControl } from 'components/validation'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { Grid, Typography, Chip } from '@mui/material'
import { NoData } from 'components/layouts'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { DeleteOrDisable } from 'components/modals'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import {
  getDiagnosticTest,
  getDiagnosticTests,
} from 'components/graphQL/useQuery'
import {
  cancelDiagnosticTest,
  completeDiagnosticTest,
} from 'components/graphQL/Mutation'

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

const ScheduledRequestProfile = ({
  chatMediaActive,
  setChatMediaActive,
  type,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()

  const { scheduleId } = useParams()
  const onConfirm = () => setCancel(true)
  const [scheduleState, setScheduleState] = useState([])

  const { loading, error, data } = useQuery(getDiagnosticTest, {
    variables: {
      id: scheduleId,
    },
  })

  useEffect(() => {
    if (data) {
      setScheduleState(data.getDiagnosticTest)
    }
  }, [data])

  const [openDisablePatient, setOpenDisablePatient] = useState(false)
  const [modal, setModal] = useState(false)
  const [cancel, setCancel] = useState(false)
  const handleDialogClose = () => setModal(false)
  const handleDialogOpen = () => setModal(true)

  const initialValues = {
    reason: '',
  }
  const validationSchema = Yup.object({
    reason: Yup.string('Enter Reason ').required('Reason is required'),
  })
  const [cancelTest] = useMutation(cancelDiagnosticTest)
  const onSubmit = async (values) => {
    const { reason } = values
    await cancelTest({
      variables: {
        id: scheduleId,
        reason,
      },
      refetchQueries: [
        {
          query: getDiagnosticTests,
          variables: {
            status: 'scheduled',
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
    history.push('/schedule-request')
  }

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
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  }

  useLayoutEffect(() => {
    setChatMediaActive(false)

    // eslint-disable-next-line
  }, [chatMediaActive])
  const initialValues1 = {
    title: '',
    image: null,
  }
  const validationSchema1 = Yup.object({
    title: Yup.string('select date and time ').required(
      'Date  and time is required',
    ),
    image: Yup.string('Upload a single Image').required('Image is required'),
  })
  const [completeTest] = useMutation(completeDiagnosticTest)
  const onSubmit1 = async (values) => {
    const { title, image } = values
    console.log(values)
    try {
      await completeTest({
        variables: {
          id: scheduleId,
          testResults: {
            title,
            file: image,
          },
        },
        refetchQueries: [
          {
            query: getDiagnosticTests,
            variables: {
              status: 'scheduled',
            },
          },
        ],
      })
      history.push('/schedule')
    } catch (err) {
      console.log(err)
    }
    handleDialogClose()
  }

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
    tests,
    testId,
    affiliation,
    testOption,
    doctorData,
    patient,
    patientData,
    // eslint-disable-next-line
  } = scheduleState
  return (
    <>
      <Grid container direction="column" style={{ paddingBottom: '10rem' }}>
        <Grid item style={{ marginBottom: '3rem' }}>
          <PreviousButton path={'/schedule'} />
        </Grid>
        {/* Display photo and profile name grid */}

        <DisplayProfile1
          createdAt={createdAt}
          gender={gender}
          sampleCollection={sampleCollection}
          referralId={referralId}
          reason={reason}
          status={status}
          doctor={doctor}
          affiliation={affiliation}
          testOption={testOption}
          patient={patient}
          patientData={patientData}
          doctorData={doctorData}
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
                <Typography vvariant="body1">Affliation</Typography>
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
              title="Cancel Test"
              type={trasparentButton}
              width="100%"
              textColor={theme.palette.common.black}
              onClick={() => setOpenDisablePatient(true)}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomButton
              variant="contained"
              title="Complete Test"
              width="100%"
              type={darkButton}
              onClick={handleDialogOpen}
            />
          </Grid>
          <Modals
            isOpen={modal}
            title="Complete Test"
            rowSpacing={5}
            handleClose={handleDialogClose}
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
                    <Grid item container direction="column" gap={4}>
                      <Grid item container md>
                        <FormikControl
                          control="input"
                          name="title"
                          label="Title"
                          placeholder="Enter Title"
                        />
                      </Grid>

                      <Grid item container md>
                        <FormikControl
                          control="file"
                          name="image"
                          label="Upload Your File"
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
                        title="Complete Test"
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
          <DeleteOrDisable
            open={openDisablePatient}
            setOpen={setOpenDisablePatient}
            title="Cancel Test"
            btnValue="cancel"
            confirmationMsg="Cancel Test"
            onConfirm={onConfirm}
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

ScheduledRequestProfile.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
}

export default ScheduledRequestProfile
