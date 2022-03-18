import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import {
  HospitalDashboardChart,
  NoData,
  AvailabilityTable,
} from 'components/layouts'

import { useQuery } from '@apollo/client'
import { dashboard } from 'components/graphQL/useQuery'
import { Loader } from 'components/Utilities'
const HospitalDashboard = ({ chatMediaActive, setChatMediaActive }) => {
  const { data, error, loading } = useQuery(dashboard, {
    notifyOnNetworkStatusChange: true,
    variables: {
      providerId: localStorage.getItem('partnerProviderId'),
    },
  })

  useLayoutEffect(() => {
    setChatMediaActive(false)

    // eslint-disable-next-line
  }, [chatMediaActive])

  if (loading) return <Loader />

  if (error) return <NoData error={error} />

  return (
    <Grid container direction="column">
      <Grid item container alignItems="center">
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant="h1">Dashboard</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <HospitalDashboardChart data={data} />
      </Grid>
      <AvailabilityTable data={data?.getStats.availabilityCalendar} />
    </Grid>
  )
}

HospitalDashboard.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
}

export default HospitalDashboard
