import React, { useState, useEffect } from 'react'
import Success from 'components/modals/Success'
import { dateMoment, timeMoment } from 'components/Utilities/Time'
import PropTypes from 'prop-types'
import {
  Grid,
  FormControl,
  FormLabel,
  Chip,
  Button,
  Checkbox,
  Avatar,
  TableCell,
  TableRow,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  FormSelect,
  Modals,
  Search,
  FilterList,
  Loader,
} from 'components/Utilities'
import { EnhancedTable } from 'components/layouts'
import { hcpsHeadCells } from 'components/Utilities/tableHeaders'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useHistory } from 'react-router-dom'
import displayPhoto from 'assets/images/avatar.png'
import { useSelector } from 'react-redux'
import { useActions } from 'components/hooks/useActions'
import { handleSelectedRows } from 'helpers/selectedRows'
import { isSelected } from 'helpers/isSelected'
import useFormInput from 'components/hooks/useFormInput'
import { useQuery, useMutation } from '@apollo/client'
import { getDrugOrders } from 'components/graphQL/useQuery'
import { fulfillDrugOrder } from 'components/graphQL/Mutation'
import { NoData, EmptyTable } from 'components/layouts'
const dates = ['Hello', 'World', 'Goodbye', 'World']
const specializations = ['Dentistry', 'Pediatry', 'Optometry', 'Pathology']
const hospitals = ['General Hospital, Lekki', 'H-Medix', 'X Lab']

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    '&.MuiGrid-root': {
      flex: 1,
      marginRight: '5rem',
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
      maxWidth: '12rem',
      fontSize: '1rem',

      '&:hover': {
        background: '#fcfcfc',
      },

      '&:active': {
        background: '#fafafa',
      },

      '& .MuiButton-endIcon>*:nth-of-type(1)': {
        fontSize: '.85rem',
      },

      '& .MuiButton-endIcon': {
        marginLeft: '.2rem',
        marginTop: '-.2rem',
      },
    },
  },
  badge: {
    '&.MuiChip-root': {
      fontSize: '1.25rem !important',
      height: '2.7rem',
      borderRadius: '1.3rem',
    },
  },

  searchFilterBtn: {
    '&.MuiButton-root': {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: '100%',
    },
  },
  chip: {
    '&.MuiChip-root': {
      fontSize: '1.25rem',
      height: '3rem',
      borderRadius: '1.3rem',
      background: theme.palette.common.white,
      color: theme.palette.common.grey,
      '& .MuiChip-deleteIcon': {
        color: 'inherit',
        fontSize: 'inherit',
      },
    },
  },
  uploadBtn: {
    '&.MuiButton-root': {
      ...theme.typography.btn,
      background: '#f2f2f2',
      boxShadow: 'none',
      color: theme.palette.common.black,

      '&:hover': {
        background: '#f2f3f3',
        boxShadow: 'none',
      },

      '&:active': {
        boxShadow: 'none',
      },
    },
  },
}))

const ProcessingOrders = () => {
  const classes = useStyles()
  const [state, setState] = useState([])
  const { data, loading, error } = useQuery(getDrugOrders, {
    variables: { status: 'processing' },
  })
  useEffect(() => {
    if (data) return setState(data?.getDrugOrders.data)
  }, [data])
  const history = useHistory()
  const [searchHcp, setSearchHcp] = useState('')
  const [openHcpFilter, setOpenHcpFilter] = useState(false)
  const [fulfill] = useMutation(fulfillDrugOrder)
  const [modal, setModal] = useState(false)
  const handleDialogClose = () => setModal(false)
  const handleDialogOpen = async (id) => {
    console.log(id)
    setModal(true)
    await fulfill({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: getDrugOrders,
          variables: {
            status: 'processing',
          },
        },
        {
          query: getDrugOrders,
          variables: {
            status: 'completed',
          },
        },
      ],
    })
    history.push('/processing-order')

    setModal(false)
  }

  const [selectedInput, handleSelectedInput] = useFormInput({
    date: '',
    specialization: '',
    hospital: '',
    status: '',
  })

  // Add new HCP modals input state

  const { date, specialization, hospital } = selectedInput

  const { rowsPerPage, selectedRows, page } = useSelector(
    (state) => state.tables,
  )
  const { setSelectedRows } = useActions()
  if (loading) return <Loader />
  if (error) return <NoData error={error} />
  console.log(data)
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchHcp}
            onChange={(e) => setSearchHcp(e.target.value)}
            placeholder="Type to search referrals..."
            height="5rem"
          />
        </Grid>
        <Grid item>
          <FilterList
            onClick={() => setOpenHcpFilter(true)}
            title="Filter referrals"
          />
        </Grid>
      </Grid>
      {state.length > 0 ? (
        <Grid
          item
          container
          height="100%"
          direction="column"
          style={{ marginTop: '5rem' }}
        >
          <EnhancedTable
            headCells={hcpsHeadCells}
            rows={state}
            page={page}
            paginationLabel="Patients per page"
            hasCheckbox={true}
          >
            {state
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                console.log(row)
                const { _id, createdAt, orderId, patientData } = row
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
                          handleSelectedRows(_id, selectedRows, setSelectedRows)
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
                            src={patientData?.image || displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: '1.25rem' }}>
                          {patientData
                            ? `${patientData?.firstName} ${patientData?.lastName}`
                            : 'No Value'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label="complete order"
                        variant="outlined"
                        onClick={() => handleDialogOpen(_id)}
                        className={classes.chip}
                        deleteIcon={<ArrowForwardIosIcon />}
                        onDelete={() => console.log(' ')}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable
          headCells={hcpsHeadCells}
          paginationLabel="Orders  per page"
          text="No Processing Order"
        />
      )}
      {/* Filter Modal */}
      <Success
        open={modal}
        handleDialogClose={handleDialogClose}
        title="SUCCESSFUL"
        btnValue="Done"
        confirmationMsg="Your order has been successful"
      />
      <Modals
        isOpen={openHcpFilter}
        title="Filter"
        rowSpacing={5}
        handleClose={() => setOpenHcpFilter(false)}
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
                        value={specialization}
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
                        value={hospital}
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
              onClick={() => setOpenHcpFilter(false)}
              type="submit"
              className={classes.searchFilterBtn}
            >
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Modals>
    </Grid>
  )
}

ProcessingOrders.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
}

export default ProcessingOrders
