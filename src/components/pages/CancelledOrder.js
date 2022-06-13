import React, { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  TableRow,
  FormLabel,
  FormControl,
  TableCell,
  Checkbox,
  Button,
} from "@mui/material";
import { dateMoment } from "components/Utilities/Time";
import { makeStyles } from "@mui/styles";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import {
  Search,
  Modals,
  Loader,
  FilterList,
  FormSelect,
} from "components/Utilities";
import useFormInput from "components/hooks/useFormInput";
import { messagesHeadCell } from "components/Utilities/tableHeaders";
import displayPhoto from "assets/images/avatar.svg";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useQuery } from "@apollo/client";
import { getDiagnosticTests } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      maxWidth: "10rem",
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
      },
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",
      textAlign: "left",
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
}));

const CancelledOrder = () => {
  const classes = useStyles();
  const status = "cancelled";
  const [scheduleState, setScheduleState] = useState([]);
  const { data, loading, error } = useQuery(getDiagnosticTests, {
    variables: { status },
  });
  useEffect(() => {
    if (data) {
      setScheduleState(data.getDiagnosticTests.data);
    }
  }, [data]);
  const specializations = ["Dentistry", "Pediatry", "Optometry", "Pathology"];
  const hospitals = ["General Hospital, Lekki", "H-Medix", "X Lab"];
  const dates = ["Hello", "World", "Goodbye", "World"];
  const [openFilterPartner, setOpenFilterPartner] = useState(false);
  const [filterSelectInput, handleSelectedInput] = useFormInput({
    hospitalName: "",
    date: "",
    categoryName: "",
  });
  const { hospitalName, date, categoryName } = filterSelectInput;

  const [searchMessage, setSearchMessage] = useState("");

  const { rowsPerPage, selectedRows, page } = useSelector(
    (state) => state.tables
  );
  const { setSelectedRows } = useActions();

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid container direction="column" height="100%" flexWrap="nowrap">
        <Grid
          item
          container
          flexDirection={{ md: "row", sm: "row", xs: "column" }}
          spacing={{ md: 4, sm: 4, xs: 2 }}
        >
          <Grid item flex={1}>
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
              title="Filter"
            />
          </Grid>
        </Grid>
        {scheduleState.length > 0 ? (
          <Grid item container style={{ marginTop: "5rem" }} height="100%">
            <EnhancedTable
              headCells={messagesHeadCell}
              rows={scheduleState}
              page={page}
              paginationLabel="Cancelled per page"
              hasCheckbox={true}
            >
              {scheduleState
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    createdAt,
                    _id,
                    referralId,
                    patientData,
                    cancellationReason,
                  } = row;
                  const isItemSelected = isSelected(row.id, selectedRows);

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
                        {referralId}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {cancellationReason}
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
                    </TableRow>
                  );
                })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={messagesHeadCell}
            paginationLabel="Orders  per page"
            text="No Cancelled Test"
          />
        )}
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
                      Referral ID
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormSelect
                        name="Referral"
                        options={specializations}
                        value={hospitalName}
                        onChange={handleSelectedInput}
                        placeholderText="Referral ID"
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
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Reason
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth style={{ height: "3rem" }}>
                      <FormSelect
                        name="Reason"
                        options={hospitals}
                        value={categoryName}
                        onChange={handleSelectedInput}
                        placeholderText="Reason"
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
  );
};

export default CancelledOrder;
