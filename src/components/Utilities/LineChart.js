import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Chip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { Line } from 'react-chartjs-2'
import { monthNames } from 'components/Utilities/Time'

const useStyles = makeStyles((theme) => ({
  intervalButtonsGrid: {
    background: theme.palette.common.lightGreen,
    borderRadius: '5rem',
    padding: '1rem',
    flexWrap: 'nowrap',
  },

  chip: {
    '&.MuiChip-root': {
      background: '#fff',
      fontSize: '1rem',
    },
  },

  active: {
    '&.MuiChip-root': {
      background: theme.palette.common.green,
      color: '#fff',
    },
  },
}))

const LineChart = ({ selectedTimeframe, setSelectedTimeframe, details }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [state, setState] = useState([])
  useEffect(() => {
    setState(
      details &&
        Object.keys(details)
          .map((key) => details[key].sum)
          .filter((element) => {
            return element !== undefined
          }),
    )
  }, [details])

  const data = {
    labels: monthNames,
    datasets: [
      {
        label: 'Orders',
        data: state,
        fill: false,
        borderColor: theme.palette.common.red,
        pointBackgroundColor: theme.palette.common.red,
        pointBorderColor: theme.palette.common.red,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 0,
        tension: 0.5,
      },
    ],
  }

  const options = {
    locale: 'fr',
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.12)',
          borderDash: [5, 8],
        },
      },
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: colorItem,
        onHover: hover,
        bodyColor: theme.palette.common.lightGrey,
        titleAlign: 'center',
        bodyAlign: 'center',
        borderColor: 'rgba(0, 0, 0, 0.05)',
        borderWidth: 2,
        displayColors: true,
        boxHeight: 0,
        boxWidth: 0,
        yAlign: 'bottom',
        usePointStyle: true,
        callbacks: {
          labelPointStyle: (context) => {
            return {
              pointStyle: 'triangle',
              rotation: 0,
              cursor: 'pointer',
            }
          },
        },
      },
    },
  }

  function hover(event, chartElement) {
    event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
  }
  function colorItem(tooltipItem) {
    const tooltipTitleColor = tooltipItem.tooltip.labelColors[0].backgroundColor

    return tooltipTitleColor
  }

  return (
    <Fragment>
      <Grid item>
        <Line data={data} options={options} />;
      </Grid>
      <Grid item>
        <Grid
          container
          justifyContent="space-evenly"
          className={classes.intervalButtonsGrid}
        >
          {monthNames.map((timeFrame, index) => (
            <Grid item key={index}>
              <Chip
                label={timeFrame}
                color={timeFrame === timeFrame.id ? 'success' : undefined}
                clickable
                className={`${classes.chip} ${
                  selectedTimeframe === timeFrame.id
                    ? classes.active
                    : undefined
                }`}
                onClick={() => setSelectedTimeframe(timeFrame.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Fragment>
  )
}

LineChart.propTypes = {
  timeFrames: PropTypes.array,
  selectedTimeframe: PropTypes.number,
  setSelectedTimeframe: PropTypes.func,
  tooltipTitle: PropTypes.string,
}

export default LineChart
