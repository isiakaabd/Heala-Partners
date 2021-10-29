import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Success from 'components/modals/Success'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormSelect from 'components/Utilities/FormSelect'
import useFormInput from 'components/hooks/useFormInput'
import { makeStyles } from '@mui/styles'
import Modals from 'components/Utilities/Modal'
import Search from 'components/Utilities/Search'
import FilterList from 'components/Utilities/FilterList'
import { rows } from 'components/Utilities/DataHeader'
import EnhancedTable from 'components/layouts/EnhancedTable'
import { partnersHeadCells } from 'components/Utilities/tableHeaders'
import Avatar from '@mui/material/Avatar'
import displayPhoto from 'assets/images/avatar.png'
import { useSelector } from 'react-redux'
import { useActions } from 'components/hooks/useActions'
import { handleSelectedRows } from 'helpers/selectedRows'
import { isSelected } from 'helpers/isSelected'
import Chip from '@mui/material/Chip'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

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
      maxWidth: '7rem',
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
  FormLabel: {
    '&.MuiFormLabel-root': {
      ...theme.typography.FormLabel,
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
}))

const dates = ['Hello', 'World', 'Goodbye', 'World']
const specializations = ['Dentistry', 'Pediatry', 'Optometry', 'Pathology']
const hospitals = ['General Hospital, Lekki', 'H-Medix', 'X Lab']

const CompletedOrders = () => {
  const classes = useStyles()
  const [searchPartner, setSearchPartner] = useState('')
  const [openFilterPartner, setOpenFilterPartner] = useState(false)

  // FILTER PARTNERS SELECT STATES
  const [filterSelectInput, handleSelectedInput] = useFormInput({
    hospitalName: '',
    date: '',
    categoryName: '',
  })
  const [modal, setModal] = useState(false)
  const handleDialogClose = () => setModal(false)
  const handleDialogOpen = () => setModal(true)

  const { hospitalName, date, categoryName } = filterSelectInput

  const { rowsPerPage, selectedRows, page } = useSelector(
    (state) => state.tables,
  )
  const { setSelectedRows } = useActions()

  return (
    <>
      <Grid container direction="column">
        <Grid item container>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchPartner}
              onChange={(e) => setSearchPartner(e.target.value)}
              placeholder="Type to search Referrals..."
              height="5rem"
            />
          </Grid>
          <Grid item>
            <FilterList
              title="Filter Referrals"
              onClick={() => setOpenFilterPartner(true)}
            />
          </Grid>
        </Grid>
        <Grid item container style={{ marginTop: '5rem' }}>
          <EnhancedTable
            headCells={partnersHeadCells}
            rows={rows}
            page={page}
            paginationLabel="Patients per page"
            hasCheckbox={true}
          >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id, selectedRows)

                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={() =>
                          handleSelectedRows(
                            row.id,
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
                      align="center"
                      className={classes.tableCell}
                    >
                      {row.entryDate}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {row.time}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {row.medical}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <div
                        style={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ marginRight: '1rem' }}>
                          <Avatar
                            alt={`Display Photo of ${row.firstName}`}
                            src={displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: '1.25rem' }}>
                          {row.firstName}
                          {row.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label="view order"
                        variant="outlined"
                        onClick={handleDialogOpen}
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
                      <FormLabel
                        component="legend"
                        className={classes.FormLabel}
                      >
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
                      <FormLabel
                        component="legend"
                        className={classes.FormLabel}
                      >
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
                      <FormLabel
                        component="legend"
                        className={classes.FormLabel}
                      >
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

        {/* ADD NEW PARTER MODAL */}

        <Success
          open={modal}
          handleDialogClose={handleDialogClose}
          title="SUCCESSFUL"
          btnValue="Done"
          confirmationMsg="Your order has been successful"
        />
      </Grid>
    </>
  )
}

export default CompletedOrders
