import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import CustomButton from './CustomButton'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { MessageOutlined } from '@mui/icons-material'

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
      borderRadius: '1.5rem',
    },
  },
}))

const DisplayProfile = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  const {
    fullName,
    displayPhoto,
    medicalTitle,
    statusId,
    specialization,
    status,
    setChatMediaActive,
  } = props

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  }

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={classes.gridsWrapper}
    >
      <Grid item>
        <Grid container alignItems="center">
          <Grid item style={{ marginRight: '2rem' }}>
            <Avatar
              alt={`Display Photo`}
              src={displayPhoto}
              sx={{ width: 50, height: 50 }}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item style={{ marginBottom: '1rem' }}>
                <Typography variant="h3">{fullName}</Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: '3rem' }}>
                    <Typography
                      variant="h4"
                      color="success"
                      style={{ fontWeight: 400 }}
                    >
                      <span>{medicalTitle}:</span>{' '}
                      <span style={{ color: 'green' }}>{statusId}</span>
                    </Typography>
                  </Grid>
                  {specialization ? (
                    <Grid item>
                      <Typography variant="h4" style={{ fontWeight: 400 }}>
                        <span style={{ color: theme.palette.common.lightGrey }}>
                          Specialization:
                        </span>{' '}
                        <Chip
                          label="Dentistry"
                          color="success"
                          className={classes.badge}
                        />
                      </Typography>
                    </Grid>
                  ) : status ? (
                    <Grid item>
                      {' '}
                      <Typography variant="h4">
                        <span style={{ color: theme.palette.common.lightGrey }}>
                          Status:
                        </span>{' '}
                        <Chip
                          label={status}
                          color={status === 'Active' ? 'success' : 'error'}
                          className={classes.badge}
                          style={{
                            background:
                              status === 'Active'
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              status === 'Active'
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
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <CustomButton
              startIcon={<MessageOutlined />}
              title="Message"
              type={greenButton}
              variant="contained"
              component={Link}
              onClick={() => setChatMediaActive(true)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

DisplayProfile.propTypes = {
  fullName: PropTypes.string.isRequired,
  displayPhoto: PropTypes.string.isRequired,
  medicalTitle: PropTypes.string.isRequired,
  statusId: PropTypes.number.isRequired,
  specialization: PropTypes.string,
  status: PropTypes.string,
  chatPath: PropTypes.string.isRequired,
  callPath: PropTypes.string.isRequired,
  videoPath: PropTypes.string.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
}

export default DisplayProfile
