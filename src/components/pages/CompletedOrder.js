import React, { useState, useEffect } from "react";
import { dateMoment, timeMoment } from "components/Utilities/Time";
import {
  Button,
  FormControl,
  FormLabel,
  Avatar,
  Chip,
  TableRow,
  Grid,
  TableCell,
  Checkbox,
} from "@mui/material";
import NoData from "components/layouts/NoData";
import {
  Loader,
  FormSelect,
  Search,
  Modals,
  FilterList,
} from "components/Utilities";
import useFormInput from "components/hooks/useFormInput";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { EnhancedTable, EmptyTable } from "components/layouts";
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

const CompletedOrder = ({
  selectedMenu,
  selectedSubMenu,
  setSelectedMenu,
  setSelectedSubMenu,
}) => {
  const classes = useStyles();
  const [searchPartner, setSearchPartner] = useState("");
  const [openFilterPartner, setOpenFilterPartner] = useState(false);
  useEffect(() => {
    setSelectedMenu(3);
    setSelectedSubMenu(0);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  // FILTER PARTNERS SELECT STATES
  const [filterSelectInput, handleSelectedInput] = useFormInput({
    hospitalName: "",
    date: "",
    categoryName: "",
  });
  const [scheduleState, setScheduleState] = useState([]);
  const status = "completed";
  const { data, loading, error } = useQuery(getDiagnosticTests, {
    variables: { status },
  });

  useEffect(() => {
    if (data) {
      setScheduleState(data.getDiagnosticTests.data);
    }
  }, [data]);

  const { hospitalName, date, categoryName } = filterSelectInput;

  const { rowsPerPage, selectedRows, page } = useSelector(
    (state) => state.tables
  );
  const { setSelectedRows } = useActions();
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid container direction="column" flexWrap="nowrap" height="100%">
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
          <Grid item container height="100%" style={{ marginTop: "5rem" }}>
            <EnhancedTable
              headCells={partnersHeadCells}
              rows={scheduleState}
              page={page}
              paginationLabel="Orders per page"
              hasCheckbox={true}
            >
              {scheduleState
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log(row);
                  const { createdAt, _id, testId, patientData } = row;
                  const isItemSelected = isSelected(_id, selectedRows);

                  const labelId = `enhanced-table-checkbox-${index}`;

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
                        {testId}
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
                              : " No User"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label="View result"
                          variant="outlined"
                          component={Link}
                          to={`/completed/${_id}/view`}
                          onClick={() => {
                            setSelectedSubMenu(4);
                            // setSelectedPatientMenu(1)
                          }}
                          className={classes.chip}
                          deleteIcon={<ArrowForwardIosIcon />}
                          onDelete={() => console.log(" ")}
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
            paginationLabel="Orders  per page"
            text="No Completed Order"
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

export default CompletedOrder;
