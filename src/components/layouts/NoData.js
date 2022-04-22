import React from 'react'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
const NoData = ({ error,text }) => {
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      height="100%"
      justifyContent="center"
    >
      <Grid item>
        <Typography variant="h1">
          {error
            ? error && error.networkError.result.errors[0].message
            : text?text:"No Data Yet"}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {!error
            ? 'we have not computed data for this table yet'
            : 'pls refresh page'}
        </Typography>
      </Grid>
    </Grid>
  )
}
NoData.propTypes = {
  error: PropTypes.string,
}
export default NoData
