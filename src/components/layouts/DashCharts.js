import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { LineChart, Loader } from "components/Utilities";
import { NoData } from "components/layouts";
import "chartjs-plugin-style";
import { useQuery } from "@apollo/client";
import { getDiagnosticDashboard } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    "&.MuiGrid-root": {
      // maxWidth: "42rem",
    },
  },
  chartCard: {
    background: "#fff",
    borderRadius: "1rem",
  },
  chartImg: {
    maxWidth: "100%",
  },
  headerGrid: {
    background: "rgb(253, 253, 253)",
    width: "100%",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    padding: "1.5rem 2rem",
  },
  overviewGrid: {
    padding: "4rem 2rem 3rem",
    background: "#fff",
  },
  groupIconGrid: {
    width: "5rem",
    height: "5rem",
    background: theme.palette.common.lightGreen,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  groupIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
  bottomChartGrid: {
    padding: "3rem 0rem",
    background: "#fff",
  },

  dottedCircle: {
    width: 12,
    height: 12,
    border: "4px solid",
    borderRadius: "50%",
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
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    "&.MuiSvgIcon-root": {
      color: "#fff",
    },
  },
}));

const DashCharts = () => {
  const [cancelled, setCancelled] = useState([]);
  const [testRequest, setTestRequest] = useState("");
  const [scheduledTests, setScheduledTests] = useState("");
  const [completedTests, setCompletedTests] = useState("");
  const [testRequestsStats, setTestRequestsStats] = useState("");
  const [scheduledTestsStats, setScheduledTestsStats] = useState("");
  const [completedTestsStats, setCompletedTestsStats] = useState("");
  const [cancelledTestsStats, setCancelledTestsStats] = useState("");

  // const totalDoc = activeDoctors + inactiveDoctors;
  // const totalPatient = activePatients + inactivePatients;
  // const patientPercentage = returnpercent(activePatients, inactivePatients);
  // const doctorPercentage = returnpercent(activeDoctors, inactiveDoctors);

  const { data, loading, error } = useQuery(getDiagnosticDashboard, {
    variables: {
      partner: localStorage.getItem("pharmacyID"),
    },
  });

  useEffect(() => {
    if (data) {
      const {
        testRequestsCount,
        scheduledTestsCount,
        completedTestsCount,
        cancelledTestsCount,
        testRequestsStats,
        scheduledTestsStats,
        completedTestsStats,
        cancelledTestsStats,
      } = data?.getDiagnosticDashboard;
      // setState(data.getDiagnosticTests.data)
      setTestRequest(testRequestsCount);
      setScheduledTests(scheduledTestsCount);
      setCompletedTests(completedTestsCount);
      setCancelled(cancelledTestsCount);
      setTestRequestsStats(testRequestsStats);
      setScheduledTestsStats(scheduledTestsStats);
      setCompletedTestsStats(completedTestsStats);
      setCancelledTestsStats(cancelledTestsStats);
    }
  }, [data]);
  const classes = useStyles();
  const theme = useTheme();

  const [selectedTimeframe, setSelectedTimeframe] = useState(0);

  if (loading) return <Loader />;
  if (error) return <NoData />;
  return (
    <Grid
      container
      style={{ marginBottom: "5rem" }}
      justifyContent="space-between"
      spacing={5}
    >
      <Grid item md={6} sm={12} lg={6}>
        <Grid container direction="column">
          <Grid
            item
            className={classes.chartCard}
            // style={{ marginBottom: '3em' }}
          >
            <Grid container direction="column">
              <Grid item className={classes.headerGrid}>
                <Typography variant="h5">Total Tests</Typography>
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
                      <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                        <Typography variant="h1">{testRequest}</Typography>
                      </Grid>
                      <Grid item style={{ marginRight: "0.5rem" }}>
                        <ArrowUpwardIcon color="success" />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.success.main }}
                        >
                          {/* 2.76% */}
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
                  selectedTimeframe={selectedTimeframe}
                  setSelectedTimeframe={setSelectedTimeframe}
                  details={testRequestsStats}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* hehre */}
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Completed Tests</Typography>
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
                  <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h1">{completedTests}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: "0.5rem" }}>
                    <ArrowUpwardIcon color="success" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ color: theme.palette.success.main }}
                    >
                      {/* 2.76% */}
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
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              details={completedTestsStats}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={6} sm={12} lg={6}>
        <Grid item container direction="column" className={classes.chartCard}>
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Scheduled Tests</Typography>
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
                  <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h1">{scheduledTests}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: "0.5rem" }}>
                    <ArrowUpwardIcon color="success" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ color: theme.palette.success.main }}
                    >
                      {/* 2.76% */}
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
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              details={scheduledTestsStats}
            />
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Cancelled Tests</Typography>
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
                  <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h1">{cancelled}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: "0.5rem" }}>
                    <ArrowUpwardIcon color="success" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ color: theme.palette.success.main }}
                    >
                      {/* 2.76% */}
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
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              details={cancelledTestsStats}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DashCharts;
