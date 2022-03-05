import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { dateMoment, timeMoment } from 'components/Utilities/Time'
import {
  Chip,
  TableRow,
  Avatar,
  Grid,
  Checkbox,
  FormControl,
  FormLabel,
  TableCell,
  Button,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useQuery } from '@apollo/client'
import { getDrugOrders } from 'components/graphQL/useQuery'
import { NoData } from 'components/layouts' //
import useFormInput from 'components/hooks/useFormInput'
import { useTheme } from '@mui/material/styles'
import EnhancedTable from 'components/layouts/EnhancedTable'
import { messagesHeadCells } from 'components/Utilities/tableHeaders'
import displayPhoto from 'assets/images/avatar.png'
import { useSelector } from 'react-redux'
import { useActions } from 'components/hooks/useActions'
import { handleSelectedRows } from 'helpers/selectedRows'
import { isSelected } from 'helpers/isSelected'
import {
  Modals,
  Loader,
  FormSelect,
  FilterList,
  Search,
} from 'components/Utilities'

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    '&.MuiGrid-root': {
      flex: 1,
      marginRight: '5rem',
    },
  },
  actionBtnGrid: {
    '&.MuiGrid-root': {
      marginRight: '1.5rem',
    },
  },
  button: {
    '&.MuiButton-root': {
      background: '#fff',
      color: theme.palette.common.grey,
      textTransform: 'none',
      borderRadius: '2rem',
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      maxWidth: '10rem',
      fontSize: '.85rem',

      '&:hover': {
        background: '#fcfcfc',
      },

      '&:active': {
        background: '#fafafa',
      },

      '& .MuiButton-endIcon>*:nth-of-type(1)': {
        fontSize: '0.85rem',
      },

      '& .MuiButton-endIcon': {
        marginLeft: '.2rem',
      },
    },
  },
  searchFilterBtn: {
    '&.MuiButton-root': {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: '100%',
    },
  },
  badge: {
    '&.MuiChip-root': {
      fontSize: '1.25rem !important',
      height: '2.7rem',
      textAlign: 'left',
      borderRadius: '1.3rem',
    },
  },
  tableBtn: {
    '&.MuiButton-root': {
      ...theme.typography.btn,
      height: '3rem',
      fontSize: '1.25rem',
      borderRadius: '2rem',
      boxShadow: 'none',

      '&:hover': {
        '& .MuiButton-endIcon>*:nth-of-type(1)': {
          color: '#fff',
        },
      },

      '&:active': {
        boxShadow: 'none',
      },

      '& .MuiButton-endIcon>*:nth-of-type(1)': {
        fontSize: '1.5rem',
      },
    },
  },

  redBtn: {
    '&.MuiButton-root': {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      '&:hover': {
        background: theme.palette.error.light,
        color: '#fff',
      },
    },
  },
}))

const CancelledOrders = ({
  selectedMenu,
  selectedSubMenu,
  setSelectedMenu,
  setSelectedSubMenu,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const [state, setState] = useState([])
  const orderState = 'cancelled'
  const { data, loading, error } = useQuery(getDrugOrders, {
    variables: { status: orderState },
  })
  useEffect(() => {
    if (data) return setState(data?.getDrugOrders.data)
  }, [data])
  const specializations = ['Dentistry', 'Pediatry', 'Optometry', 'Pathology']
  const hospitals = ['General Hospital, Lekki', 'H-Medix', 'X Lab']
  const dates = ['Hello', 'World', 'Goodbye', 'World']
  const [openFilterPartner, setOpenFilterPartner] = useState(false)
  const [filterSelectInput, handleSelectedInput] = useFormInput({
    hospitalName: '',
    date: '',
    categoryName: '',
  })
  const { hospitalName, date, categoryName } = filterSelectInput

  const [searchMessage, setSearchMessage] = useState('')

  const { rowsPerPage, selectedRows, page } = useSelector(
    (state) => state.tables,
  )
  const { setSelectedRows } = useActions()

  useEffect(() => {
    setSelectedMenu(5)
    setSelectedSubMenu(0)
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu])
  if (loading) return <Loader />
  if (error) return <NoData error={error} />
  return (
    <>
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid item container>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMessage}
              onChange={(e) => setSearchMessage(e.target.value)}
              placeholder="Type to search Referrals..."
              height="5rem"
            />
          </Grid>
          <Grid item>
            <FilterList
              onClick={() => setOpenFilterPartner(true)}
              title="Filter referrals"
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          height="100%"
          direction="column"
          style={{ marginTop: '5rem' }}
        >
          {state.length > 0 ? (
            <EnhancedTable
              headCells={messagesHeadCells}
              rows={state}
              page={page}
              paginationLabel="Patients per page"
              hasCheckbox={true}
            >
              {state
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { _id, createdAt, orderId, patientData, status } = row
                  const isItemSelected = isSelected(_id, selectedRows)

                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={() =>
                            handleSelectedRows(
                              _id,
                              selectedRows,
                              setSelectedRows,
                            )
                          }
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {dateMoment(createdAt)}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {timeMoment(createdAt)}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {orderId}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <div
                          style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ marginRight: '1rem' }}>
                            <Avatar
                              alt={`Display Photo of ${patientData?.firstName}`}
                              src={
                                patientData
                                  ? patientData.logoImageUrl
                                  : displayPhoto
                              }
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: '1.25rem' }}>
                            {patientData
                              ? `${patientData.firstName}
                            ${patientData.lastName}`
                              : 'No Patient'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Chip
                          label={status}
                          className={classes.badge}
                          style={{
                            background:
                              row.status === 'completed'
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              row.status === 'completed'
                                ? theme.palette.common.green
                                : theme.palette.common.red,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
            </EnhancedTable>
          ) : (
            <NoData />
          )}
        </Grid>
      </Grid>

      <Modals
        isOpen={openFilterPartner}
        title="Filter"
        rowSpacing={5}
        handleClose={() => setOpenFilterPartner(false)}
      >
        <Grid item container direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Date
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormSelect
                        name="date"
                        options={dates}
                        value={date}
                        onChange={handleSelectedInput}
                        placeholderText="Choose Date"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Time
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormSelect
                        name="Time"
                        options={specializations}
                        value={hospitalName}
                        onChange={handleSelectedInput}
                        placeholderText="Select Time"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginBottom: '18rem', marginTop: '3rem' }}>
            <Grid container spacing={2}>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Order Number
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth style={{ height: '3rem' }}>
                      <FormSelect
                        name="Order Number"
                        options={hospitals}
                        value={categoryName}
                        onChange={handleSelectedInput}
                        placeholderText="Enter order number"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => setOpenFilterPartner(false)}
              type="submit"
              className={classes.searchFilterBtn}
            >
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Modals>
    </>
  )
}

CancelledOrders.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
}

export default CancelledOrders
