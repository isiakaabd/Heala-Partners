import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { getDocConsult } from "components/graphQL/useQuery";
import {
  Avatar,
  Typography,
  TableRow,
  Button,
  TableCell,
  Checkbox,
  Grid,
} from "@mui/material";
import { consultationsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { NoData, EnhancedTable, EmptyTable } from "components/layouts";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import displayPhoto from "assets/images/avatar.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Loader } from "components/Utilities";
import { useParams } from "react-router-dom";
import { dateMoment } from "components/Utilities/Time";
import { changeTableLimit } from "helpers/filterHelperFunctions";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
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
      padding: "1rem",
      maxWidth: "12rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".3rem",
      },
    },
  },
}));

// const filterOptions = [
//   { id: 0, value: "Name" },
//   { id: 1, value: "Date" },
//   { id: 2, value: "Description" },
// ];

const HcpConsultations = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [pageInfo, setPageInfo] = useState([]);
  const { hcpId } = useParams();
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [consultations, setConsultations] = useState([]);

  const [fetchDocConsultations, { loading, data, error, refetch }] =
    useLazyQuery(getDocConsult);

  useEffect(() => {
    fetchDocConsultations({
      variables: {
        id: hcpId,
        orderBy: "-createdAt",
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchDocConsultations, hcpId]);

  useEffect(() => {
    if (data?.getConsultations.data) {
      setConsultations(data.getConsultations.data);
      setPageInfo(data.getConsultations.pageInfo);
    }
  }, [data, hcpId]);
  const fetchMoreFunc = (e, newPage) => {
    refetch({ page: newPage });
  };

  if (error) return <NoData error={error} />;
  if (loading) return <Loader />;
  return (
    <Grid container direction="column" height="100%" gap={2}>
      <Grid item container alignItems="center">
        <Grid item flex={1}>
          <Typography variant="h2">Consultations</Typography>
        </Grid>
      </Grid>
      {consultations.length > 0 ? (
        <Grid item container>
          <EnhancedTable
            headCells={consultationsHeadCells}
            rows={consultations}
            paginationLabel="Consultations per page"
            handleChangePage={fetchMoreFunc}
            hasCheckbox={true}
            changeLimit={changeTableLimit}
            fetchData={fetchDocConsultations}
            dataPageInfo={pageInfo}
          >
            {consultations
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                // eslint-disable-next-line
                const {
                  _id,
                  createdAt,
                  symptoms,
                  status,
                  contactMedium,
                  patientData,

                  // eslint-disable-next-line
                } = row;
                const isItemSelected = isSelected(row._id, selectedRows);
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
                          handleSelectedRows(_id, selectedRows, setSelectedRows)
                        }
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    <TableCell align="left" className={classes.tableCell}>
                      {dateMoment(createdAt)}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "left",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${patientData.firstName}`}
                            src={
                              patientData.picture
                                ? patientData.picture
                                : displayPhoto
                            }
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span
                          style={{ fontSize: "1.25rem" }}
                        >{`${patientData.firstName} ${patientData.lastName}`}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        maxWidth: "20rem",
                      }}
                    >
                      <Grid container gap={1}>
                        {symptoms
                          ? symptoms.map((i) => {
                              return <p key={i.name}>{i.name}</p>;
                            })
                          : "No Value"}
                      </Grid>
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        maxWidth: "20rem",
                      }}
                    >
                      {contactMedium}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        maxWidth: "20rem",
                      }}
                    >
                      {status ? status : "No Value"}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        className={classes.button}
                        component={Link}
                        to={`/hcps/${hcpId}/consultations/case-note/${_id}`}
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable
          headCells={consultationsHeadCells}
          paginationLabel="Consultation  per page"
        />
      )}
    </Grid>
  );
};

export default HcpConsultations;
