import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import LineChart from 'components/Utilities/LineChart'
import 'chartjs-plugin-style'

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    '&.MuiGrid-root': {
      // maxWidth: "42rem",
    },
  },
  chartCard: {
    background: '#fff',
    borderRadius: '1rem',
  },
  chartImg: {
    maxWidth: '100%',
  },
  headerGrid: {
    background: 'rgb(253, 253, 253)',
    width: '100%',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    padding: '1.5rem 2rem',
  },
  overviewGrid: {
    padding: '4rem 2rem 3rem',
  },
  groupIconGrid: {
    width: '5rem',
    height: '5rem',
    background: theme.palette.common.lightGreen,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupIcon: {
    '&.MuiSvgIcon-root': {
      fontSize: '2.5rem',
    },
  },
  bottomChartGrid: {
    padding: '3rem 2rem',
  },

  dottedCircle: {
    width: 12,
    height: 12,
    border: '4px solid',
    borderRadius: '50%',
  },
  red: {
    borderColor: theme.palette.common.red,
  },
  green: {
    borderColor: theme.palette.common.green,
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenIconBg: {
    background: theme.palette.common.lightGreen,
  },
  redIconBg: {
    background: theme.palette.common.lightRed,
  },

  greenNotificationBg: {
    background: theme.palette.common.green,
  },

  notificationIcon: {
    '&.MuiSvgIcon-root': {
      color: '#fff',
    },
  },
}))

const DashboardCharts = () => {
  const classes = useStyles()
  const theme = useTheme()

  const [selectedTimeframe, setSelectedTimeframe] = useState(0)

  const timeFrames = [
    { id: 0, time: 'One Day' },
    { id: 1, time: 'Five Days' },
    { id: 2, time: 'One Month' },
    { id: 3, time: 'Three Months' },
    { id: 4, time: 'One Year' },
  ]

  return (
    <Grid
      container
      style={{ marginBottom: '5rem' }}
      justifyContent="space-between"
      spacing={5}
    >
      <Grid item md>
        <Grid container direction="column">
          <Grid
            item
            className={classes.chartCard}
            // style={{ marginBottom: '3em' }}
          >
            <Grid container direction="column">
              <Grid item className={classes.headerGrid}>
                <Typography variant="h5">Pending Orders</Typography>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item>
                <Grid
                  container
                  className={classes.overviewGrid}
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item className={classes.groupIconGrid}>
                        <GroupIcon
                          color="success"
                          className={classes.groupIcon}
                        />
                      </Grid>
                      <Grid item style={{ margin: '0 0.5rem 0 1rem' }}>
                        <Typography variant="h1">3000</Typography>
                      </Grid>
                      <Grid item style={{ marginRight: '0.5rem' }}>
                        <ArrowUpwardIcon color="success" />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.success.main }}
                        >
                          2.76%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid
                item
                container
                direction="column"
                className={classes.bottomChartGrid}
              >
                <LineChart
                  timeFrames={timeFrames}
                  selectedTimeframe={selectedTimeframe}
                  setSelectedTimeframe={setSelectedTimeframe}
                  tooltipTitle="1800 HCPs"
                />
              </Grid>
            </Grid>
          </Grid>
          {/* hehre */}
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Completed Orders</Typography>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />

          <Grid item>
            <Grid
              container
              className={classes.overviewGrid}
              justifyContent="space-between"
            >
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className={classes.groupIconGrid}>
                    <GroupIcon color="success" className={classes.groupIcon} />
                  </Grid>
                  <Grid item style={{ margin: '0 0.5rem 0 1rem' }}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h1">3000</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: '0.5rem' }}>
                    <ArrowUpwardIcon color="success" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ color: theme.palette.success.main }}
                    >
                      2.76%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid
            item
            container
            direction="column"
            className={classes.bottomChartGrid}
          >
            <LineChart
              timeFrames={timeFrames}
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              tooltipTitle="900 Subscribers"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item md>
        <Grid container direction="column" className={classes.chartCard}>
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Processing Orders</Typography>
          </Grid>
          <Divider color={theme.palette.common.lightGrey} />
          <Grid item>
            <Grid
              container
              className={classes.overviewGrid}
              justifyContent="space-between"
            >
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className={classes.groupIconGrid}>
                    <GroupIcon color="success" className={classes.groupIcon} />
                  </Grid>
                  <Grid item style={{ margin: '0 0.5rem 0 1rem' }}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h1">3000</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: '0.5rem' }}>
                    <ArrowUpwardIcon color="success" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ color: theme.palette.success.main }}
                    >
                      2.76%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          {/* <Divider color={theme.palette.common.lighterGrey} /> */}
          <Grid
            item
            container
            direction="column"
            className={classes.bottomChartGrid}
          >
            <LineChart
              timeFrames={timeFrames}
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              tooltipTitle="1800 Patients"
            />
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Cancelled Orders</Typography>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item>
            <Grid
              container
              className={classes.overviewGrid}
              justifyContent="space-between"
            >
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className={classes.groupIconGrid}>
                    <GroupIcon color="success" className={classes.groupIcon} />
                  </Grid>
                  <Grid item style={{ margin: '0 0.5rem 0 1rem' }}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h1">3000</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: '0.5rem' }}>
                    <ArrowUpwardIcon color="success" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ color: theme.palette.success.main }}
                    >
                      2.76%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid
            item
            container
            direction="column"
            className={classes.bottomChartGrid}
          >
            <LineChart
              timeFrames={timeFrames}
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              tooltipTitle="900 Subscribers"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default DashboardCharts
