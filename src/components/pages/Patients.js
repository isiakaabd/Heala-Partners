import React, { useState, useEffect, useCallback } from "react";
import FormikControl from "components/validation/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { NoData, EmptyTable } from "components/layouts";
import { debounce } from "lodash";
import {
  Button,
  Avatar,
  Chip,
  Checkbox,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import {
  Modals,
  FilterList,
  Loader,
  Search,
  CustomButton,
} from "components/Utilities";
import { EnhancedTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { patientsHeadCells1 } from "components/Utilities/tableHeaders";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useLazyQuery } from "@apollo/client";
import { getPatients } from "components/graphQL/useQuery";

const genderType = [
  { key: "Male", value: "0" },
  { key: "Female", value: "1" },
];

const useStyles = makeStyles((theme) => ({
  searchFilterContainer: {
    "&.MuiGrid-root": {
      justifyContent: "space-between",
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
      justifyContent: "center",
      padding: "1rem",
      maxWidth: "15rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1rem",
      },
    },
  },

  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
      textAlign: "left",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",

      borderRadius: "1.3rem",
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
}));

const Patients = () => {
  const classes = useStyles();
  const theme = useTheme();
  // const inputRef = createRef();

  const initialValues = {
    name: "",
    bloodGroup: "",
    phone: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string("Enter your hospital").trim(),
    bloodGroup: Yup.string("Enter your bloodGroup").trim(),
    gender: Yup.string("Select your gender"),
    phone: Yup.number("Enter your specialization").typeError(
      "Enter a current Number"
    ),
  });
  const [fetchpatient, { loading, error, data }] = useLazyQuery(getPatients, {
    variables: {
      providerId: localStorage.getItem("partnerProviderId"),
    },
  });

  // ), {
  //   notifyOnNetworkStatusChange: true,
  // });
  useEffect(() => {
    (async () => {
      fetchpatient();
    })();
  }, [fetchpatient]);
  // const [fetchUser] = useLazyQuery(getPatients);
  const [profiles, setProfiles] = useState([]);
  const onSubmit = async (values) => {
    const { gender } = values;
    // if (!gender) return;

    await fetchpatient({
      variables: {
        gender,
      },
    });
    handleDialogClose();
  };
  const [pageInfo, setPageInfo] = useState([]);
  useEffect(() => {
    if (data) {
      setPageInfo(data.profiles.pageInfo);
      setProfiles(data.profiles.data);
    }
  }, [data]);
  const { page, totalPages, hasNextPage, hasPrevPage, limit, totalDocs } =
    pageInfo;
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const { selectedRows } = useSelector((state) => state.tables);

  const { setSelectedRows } = useActions();

  const debouncer = useCallback(() => {
    debounce(fetchpatient, 3000);
  }, [fetchpatient]);

  const fetchMoreFunc = async (e, newPage) => {
    fetchpatient({
      variables: {
        page: newPage,
      },
    });
    //refetch({ page: newPage });
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid
          item
          container
          spacing={{ sm: 4, md: 4, xs: 2 }}
          // flexWrap={{ sm: "nowrap", md: "nowrap", xs: "wrap" }}
          // direction={{ sm: "row", md: "row", xs: "column" }}
          className={classes.searchFilterContainer}
        >
          <Grid item flex={1}>
            <Search
              onChange={(e) => {
                let value = e.target.value;

                if (value !== "") {
                  return debouncer({
                    variables: { dociId: `HEALA-${value.toUpperCase()}` },
                  });
                }
              }}
              // onChange={debouncedChangeHandler}
              placeholder="Search by ID e.g 7NE6ELLO "
              height="5rem"
            />
          </Grid>
          <Grid item>
            <FilterList title="Filter" onClick={handleDialogOpen} />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}

        {profiles.length > 0 ? (
          <Grid item container height="100%" direction="column">
            <EnhancedTable
              headCells={patientsHeadCells1}
              rows={profiles}
              paginationLabel="Patients per page"
              page={page}
              limit={limit}
              totalPages={totalPages}
              totalDocs={totalDocs}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              handleChangePage={fetchMoreFunc}
              hasCheckbox={true}
            >
              {(rowsPerPage > 0
                ? profiles.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : profiles
              ).map((row, index) => {
                const {
                  dociId,
                  firstName,
                  lastName,
                  plan,
                  provider,
                  image,
                  consultations,
                  _id,
                  status,
                } = row;
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
                          handleSelectedRows(_id, selectedRows, setSelectedRows)
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
                      style={{
                        color: theme.palette.common.grey,
                        textAlign: "left",
                      }}
                    >
                      {dociId?.split("-")[1]}
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
                            alt={`Display Photo of ${firstName}`}
                            src={image ? image : displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span
                          style={{ fontSize: "1.25rem" }}
                        >{`${firstName} ${lastName}`}</span>
                      </div>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {plan ? plan : "No Plan"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {provider ? provider : "No Provider"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {consultations ? consultations : 0}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <Chip
                        label={status ? status : "No Status"}
                        className={classes.badge}
                        style={{
                          background:
                            status === "Active"
                              ? theme.palette.common.lightGreen
                              : theme.palette.common.lightRed,
                          color:
                            status === "Active"
                              ? theme.palette.common.green
                              : theme.palette.common.red,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        className={classes.button}
                        component={Link}
                        to={`patients/${_id}`}
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={patientsHeadCells1}
            paginationLabel="Patients  per page"
          />
        )}
      </Grid>
      <Modals
        isOpen={isOpen}
        title="Filter"
        rowSpacing={5}
        handleClose={handleDialogClose}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item>
                    <FormikControl
                      control="select"
                      options={genderType}
                      name="gender"
                      label="Filter by Gender"
                      placeholder="Filter by Gender"
                    />
                  </Grid>

                  <Grid item>
                    <CustomButton
                      title="Apply Filter"
                      width="100%"
                      type={buttonType}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};

export default Patients;
