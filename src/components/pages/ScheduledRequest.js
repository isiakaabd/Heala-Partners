import React, { useState, useEffect } from "react";
import {
  Grid,
  TableRow,
  Avatar,
  Chip,
  FormControl,
  FormLabel,
  Button,
  Checkbox,
  TableCell,
} from "@mui/material";
import { dateMoment, timeMoment } from "components/Utilities/Time";
import prettyMoney from "pretty-money";
import useFormInput from "components/hooks/useFormInput";
import { makeStyles } from "@mui/styles";
import {
  Modals,
  FormSelect,
  Search,
  FilterList,
  Loader,
} from "components/Utilities";
import { Link } from "react-router-dom";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { partnersHeadCells } from "components/Utilities/tableHeaders";
import displayPhoto from "assets/images/avatar.svg";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useQuery } from "@apollo/client";
import { getDiagnosticTests } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },

  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      maxWidth: "7rem",
      fontSize: ".85rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "0.85rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".2rem",
        marginTop: "-.2rem",
      },
    },
  },
  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },
  tableBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      height: "3rem",
      fontSize: "1.25rem",
      borderRadius: "2rem",
      boxShadow: "none",

      "&:hover": {
        "& .MuiButton-endIcon>*:nth-of-type(1)": {
          color: "#fff",
        },
      },

      "&:active": {
        boxShadow: "none",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.5rem",
      },
    },
  },

  redBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
      textAlign: "left",
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  chip: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      height: "3rem",
      cursor: "pointer",
      borderRadius: "1.3rem",
      background: theme.palette.common.white,
      color: theme.palette.common.grey,
      "& .MuiChip-deleteIcon": {
        color: "inherit",
        fontSize: "inherit",
      },
    },
  },
}));

const dates = ["Hello", "World", "Goodbye", "World"];
const specializations = ["Dentistry", "Pediatry", "Optometry", "Pathology"];
const hospitals = ["General Hospital, Lekki", "H-Medix", "X Lab"];

const ScheduledRequest = ({
  setSelectedSubMenu,
  setSelectedMenu,
  selectedMenu,
  selectedSubMenu,
  setSelectedHcpMenu,
}) => {
  const classes = useStyles();
  const [searchPartner, setSearchPartner] = useState("");
  const [scheduleState, setScheduleState] = useState(null);
  const status = "scheduled";
  const { data, loading, error } = useQuery(getDiagnosticTests, {
    variables: { status },
  });

  useEffect(() => {
    if (data) return setScheduleState(data?.getDiagnosticTests.data);
  }, [data]);
  const [openFilterPartner, setOpenFilterPartner] = useState(false);

  // FILTER PARTNERS SELECT STATES
  const [filterSelectInput, handleSelectedInput] = useFormInput({
    hospitalName: "",
    date: "",
    categoryName: "",
  });

  const { hospitalName, date, categoryName } = filterSelectInput;
  const prettyDollarConfig = {
    currency: "₦",
    position: "before",
    spaced: false,
    thousandsDelimiter: ",",
  };

  const { rowsPerPage, selectedRows, page } = useSelector(
    (state) => state.tables
  );
  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(0);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const { setSelectedRows } = useActions();
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid container direction="column" flexWrap="nowrap" gap={2}>
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
        {scheduleState !== null && scheduleState.length > 0 ? (
          <Grid item container>
            <EnhancedTable
              headCells={partnersHeadCells}
              rows={scheduleState}
              page={page}
              paginationLabel="schedule per page"
              hasCheckbox={true}
            >
              {scheduleState
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { _id, patientData, tests, createdAt, testId } = row;
                  const isItemSelected = isSelected(_id, selectedRows);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const x = tests.map((i) => i.price);
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
                              setSelectedRows
                            )
                          }
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
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
                        {testId ? testId : "No Test ID"}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar
                              alt={`Display Photo of ${
                                patientData ? patientData.firstName : "user"
                              }`}
                              src={
                                patientData ? patientData.image : displayPhoto
                              }
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {patientData
                              ? `${patientData.firstName} ${patientData.lastName}`
                              : "No Patient"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {prettyMoney(
                          prettyDollarConfig,
                          x.reduce(function (accumulator, currentValue) {
                            return accumulator + currentValue;
                          }, 0)
                        )}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {x.length}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label="View schedule"
                          variant="outlined"
                          component={Link}
                          to={`/schedule/${_id}/schedule`}
                          className={classes.chip}
                          onClick={() => {
                            setSelectedSubMenu(3);
                            setSelectedHcpMenu(1);
                            // setSelectedPatientMenu(0)
                          }}
                          deleteIcon={<ArrowForwardIosIcon />}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={partnersHeadCells}
            paginationLabel="Requests  per page"
            text="No Scheduled Test"
          />
        )}
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
            <Grid item style={{ marginBottom: "18rem", marginTop: "3rem" }}>
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
                      <FormControl fullWidth style={{ height: "3rem" }}>
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
      </Grid>
    </>
  );
};

export default ScheduledRequest;
