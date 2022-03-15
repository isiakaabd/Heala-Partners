import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { AppBar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import HospitalHeaderContent from 'components/layouts/HospitalHeaderContent'

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingLeft: '35rem',
    paddingTop: '2em',
    paddingBottom: '2em',
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}))

const HospitalHeader = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
  } = props
  const classes = useStyles()
  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={classes.appBar}
        classes={{ root: classes.appBar }}
      >
        <HospitalHeaderContent
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          selectedHcpMenu={selectedHcpMenu}
          waitingListMenu={waitingListMenu}
          selectedAppointmentMenu={selectedAppointmentMenu}
          selectedScopedMenu={selectedScopedMenu}
        />
      </AppBar>
    </Fragment>
  )
}

HospitalHeader.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
}

export default HospitalHeader
