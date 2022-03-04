import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Typography, Toolbar } from '@mui/material'
import HeaderProfile from './HeaderProfile'
import { makeStyles } from '@mui/styles'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useLazyQuery } from '@apollo/client'
import { getPartner } from 'components/graphQL/useQuery'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  text: {
    color: theme.palette.common.lightGrey,
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  name: {
    fontSize: '2rem',
    fontWeight: 300,
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    fontSize: '2.4rem',
    color: theme.palette.common.green,
    '&.MuiTypography-root': {
      marginRight: '.5rem',
    },
  },
  subtitle: {
    color: theme.palette.common.green,
    '&.MuiTypography-root': {
      fontSize: '1.25rem',
      marginLeft: '.5rem',
      alignSelf: 'flex-end',
    },
  },
  customSubHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const CustomHeaderText = ({ title, path }) => {
  const classes = useStyles()

  return (
    <div className={classes.titleWrapper}>
      <Link to={`/${path}`} className={classes.link}>
        <Typography variant="h3" classes={{ root: classes.title }}>
          {title}
        </Typography>
      </Link>
    </div>
  )
}

CustomHeaderText.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
}

const CustomHeaderTitle = ({ title, path }) => {
  const classes = useStyles()

  return (
    <div className={classes.titleWrapper}>
      <Link to={`/${path}`} className={classes.link}>
        <Typography variant="h3" classes={{ root: classes.title }}>
          {title}
        </Typography>
      </Link>
    </div>
  )
}

CustomHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

// SUBMENU HEADERS
const CustomSubHeaderText = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  const {
    title,
    subTitle,
    subSubTitle,
    scopedSubTitle,
    scopedMenu,
    scopedSubMenu,
    titleColor = theme.palette.common.green,
  } = props

  return (
    <div className={classes.customSubHeaderWrapper}>
      <Typography variant="h3" style={{ color: theme.palette.common.grey }}>
        {title}
      </Typography>
      <KeyboardArrowRightIcon
        style={{
          fontSize: '2rem',
          color: theme.palette.common.grey,
        }}
      />
      <Typography
        variant="h3"
        classes={{ root: classes.title }}
        style={{
          color: titleColor,
        }}
      >
        {subTitle}
      </Typography>
      {scopedMenu !== 0 && (
        <Fragment>
          <KeyboardArrowRightIcon
            style={{ fontSize: '2rem', color: theme.palette.common.grey }}
          />
          <Typography
            variant="h3"
            classes={{ root: classes.title }}
            style={{
              color:
                scopedSubMenu === 0
                  ? theme.palette.common.red
                  : theme.palette.common.grey,
            }}
          >
            {subSubTitle}
          </Typography>
        </Fragment>
      )}

      {scopedSubMenu !== 0 && (
        <Fragment>
          <KeyboardArrowRightIcon
            style={{ fontSize: '2rem', color: theme.palette.common.grey }}
          />
          <Typography
            variant="h3"
            classes={{ root: classes.title }}
            style={{ color: theme.palette.common.green }}
          >
            {scopedSubTitle}
          </Typography>
        </Fragment>
      )}
    </div>
  )
}

CustomSubHeaderText.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  subSubTitle: PropTypes.string,
  scopedSubTitle: PropTypes.string,
  titleColor: PropTypes.string,
  scopedMenu: PropTypes.number.isRequired,
  scopedSubMenu: PropTypes.number.isRequired,
}

// HEADER DYNAMIC RENDERING COMPONENT
const HeaderText = (props) => {
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
  const theme = useTheme()
  const id = localStorage.getItem('pharmacyId')

  const [pharmacyData, setPharmacyData] = useState([])

  const [pharmacy, { data }] = useLazyQuery(getPartner, {
    variables: { id: id },
  })

  useEffect(() => {
    ;(async () => {
      setTimeout(pharmacy, 300)
    })()
    if (data) {
      localStorage.setItem('pharmacyID', data.getPartner._id)
      setPharmacyData(data.getPartner)
    }
  }, [pharmacy, data])
  useEffect(() => {
    if (data) {
      setPharmacyData(data.getPartner)
    }
  }, [data])

  switch (selectedMenu) {
    case 0:
      return (
        <div>
          <Typography variant="h5" className={classes.text} gutterBottom>
            Welcome,
          </Typography>
          <Typography variant="h3" color="primary" className={classes.name}>
            {pharmacyData && pharmacyData.name}
          </Typography>
        </div>
      )
    case 1:
      if (selectedSubMenu === 2) {
        return (
          <CustomSubHeaderText
            title="Pending Requests"
            subTitle=" View Request"
            scopedMenu={selectedPatientMenu}
            scopedSubMenu={selectedScopedMenu}
            scopedSubTitle={selectedScopedMenu === 1 ? 'Case Note' : ''}
            titleColor={
              selectedPatientMenu === 0
                ? theme.palette.common.green
                : theme.palette.common.grey
            }
            // subSubTitle={
            //   selectedPatientMenu === 1
            //     ? 'Patient Profile'
            //     : selectedPatientMenu === 2
            //     ? 'Appointments'
            //     : selectedPatientMenu === 3
            //     ? 'Prescriptions'
            //     : selectedPatientMenu === 4
            //     ? 'Medical Records'
            //     : selectedPatientMenu === 5
            //     ? 'Consultations'
            //     : selectedPatientMenu === 6
            //     ? 'Medications'
            //     : ''
            // }
            selectedPatientMenu={selectedPatientMenu}
          />
        )
      }
      return (
        <CustomHeaderText
          title="Pending Requests"
          // total={24}
          path="pending-order"
        />
      )
    case 2:
      if (selectedSubMenu === 3) {
        return (
          <CustomSubHeaderText
            scopedMenu={selectedHcpMenu}
            scopedSubMenu={selectedScopedMenu}
            scopedSubTitle={selectedScopedMenu === 2 ? 'Case Note' : ''}
            subSubTitle={
              selectedHcpMenu === 1
                ? 'Processing Requests'
                : selectedHcpMenu === 2
                ? 'HCP Appointments'
                : selectedHcpMenu === 3
                ? 'Availability'
                : selectedHcpMenu === 4
                ? 'Earnings'
                : selectedHcpMenu === 5
                ? 'Patients'
                : selectedHcpMenu === 6
                ? 'Consultations'
                : ''
            }
            title="Processing Requests"
            subTitle=""
            titleColor={
              selectedHcpMenu === 0
                ? theme.palette.common.red
                : theme.palette.common.grey
            }
          />
        )
      }
      return <CustomHeaderText title="Processing Requests" path="hcps" />
    case 3:
      return (
        <CustomHeaderText title="Completed Requests" path="completed-order" />
      )

    case 4:
      if (selectedSubMenu === 5) {
        if (selectedAppointmentMenu === 1) {
          return (
            <CustomSubHeaderText
              title="Appointments"
              subTitle="Waiting List"
              subSubTitle={waitingListMenu === 1 ? 'Details View' : ''}
              scopedMenu={waitingListMenu}
              scopedSubMenu={0}
            />
          )
        }
        return (
          <CustomSubHeaderText
            title="Appointments"
            subTitle="Consultation"
            scopedMenu={0}
            scopedSubMenu={0}
          />
        )
      }
      return <CustomHeaderTitle title="Appointments" path="appointments" />
    case 5:
      if (selectedSubMenu === 6) {
        return (
          <CustomSubHeaderText
            title="Cancelled Requests"
            scopedMenu={0}
            scopedSubMenu={0}
            // subTitle={
            //   pathname === '/messages/create-message'
            //     ? 'New Message'
            //     : 'View Message'
            // }
          />
        )
      }
      return (
        <CustomHeaderTitle title="Cancelled Requests" path="cancelled-order" />
      )

    default:
      return (
        <div>
          <Typography variant="h5" className={classes.text} gutterBottom>
            Welcomex,
          </Typography>
          <Typography variant="h3" color="primary" className={classes.name}>
            {pharmacyData && pharmacyData.name}
          </Typography>
        </div>
      )
  }
}

HeaderText.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
}

const HeaderContent = (props) => {
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
    <Toolbar className={classes.toolbar}>
      <HeaderText
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        selectedHcpMenu={selectedHcpMenu}
        waitingListMenu={waitingListMenu}
        selectedAppointmentMenu={selectedAppointmentMenu}
        selectedScopedMenu={selectedScopedMenu}
      />
      <HeaderProfile />
    </Toolbar>
  )
}

HeaderContent.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
}

export default HeaderContent
