import React, { useState, useEffect } from "react";
import { NoData } from "components/layouts";
import { Grid, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  CircularProgressBar,
  Loader,
  Card,
  FormSelect,
} from "components/Utilities";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getEarningStats } from "components/graphQL/useQuery";
import { financialPercent, formatNumber } from "components/Utilities/Time";

import { getUsertypess } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    "&.MuiCard-root": {
      width: "100%",
      height: "15.8rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      background: "white",
      marginRight: "5rem",
      "&:hover": {
        boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
        cursor: "pointer",
      },
      "&:active": {
        background: "#fafafa",
      },
      "& .MuiCardContent-root .MuiTypography-h5": {
        textDecoration: "none !important",
        textTransform: "uppercase",
      },
    },
  },

  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardGrid: {
    justifyContent: "center",
    alignItems: "center",
    height: "25.8rem",
  },
  flexContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    width: "100%",

    padding: "2rem 4rem",
    "&:first-child": {
      borderBottom: ".5px solid #F8F8F8",
    },
  },
  lightGreen: {
    color: theme.palette.common.green,
  },

  lightRed: {
    color: theme.palette.common.red,
  },
  mainContainer: {
    flexDirection: "column",
    width: "100%",
    background: "white",
    borderRadius: "2rem",
    boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  },
  parentGrid: {
    textDecoration: "none",
    width: "24.7rem",
    color: theme.palette.primary.main,
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
      minWidth: "20rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },
    },
  },

  cardIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "3rem",
    },
  },
}));
const Finance = () => {
  const [form, setForm] = useState("");
  const { data, error, loading, refetch } = useQuery(getEarningStats, {
    variables: {
      q: "365",
      providerId: localStorage.getItem("partnerProviderId"),
    },
  });
  const [dropDown, setDropDown] = useState([]);
  const { data: da } = useQuery(getUsertypess, {
    variables: {
      userTypeId: "61ed2354e6091400135e3d94",
    },
  });
  useEffect(() => {
    if (da) {
      const datas = da.getUserTypeProviders.provider;
      setDropDown(
        datas &&
          datas.map((i) => {
            return { key: i.name, value: i._id };
          })
      );
    }
  }, [da]);
  const [totalEarning, setTotalEarning] = useState([]);
  const [totalPayouts, setTotalPayouts] = useState([]);
  const financialValue = financialPercent(totalEarning, totalPayouts);
  const [finances, setFinances] = useState(financialValue);
  const onChange = async (e) => {
    setForm(e.target.value);
    await refetch({ q: e.target.value });
  };

  const theme = useTheme();
  useEffect(() => {
    if (data) {
      const { totalEarnings, totalPayout } = data.getEarningStats;
      setTotalEarning(totalEarnings);
      setTotalPayouts(totalPayout);
      const value = financialPercent(totalEarnings, totalPayout);
      setFinances(value);
    }
  }, [form, data]);
  const classes = useStyles();
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <Stack position="static" className={classes.containerGrid} spacing={3}>
      <Grid container component="div" className={classes.mainContainer}>
        <Grid item sm container className={classes.flexContainer}>
          <Grid item>
            <Typography variant="h1" color="#2D2F39">
              Earning
            </Typography>
          </Grid>
          <Grid item>
            <FormSelect
              placeholder="Select days"
              value={form}
              onChange={onChange}
              options={dropDown}
              name="finance"
            />
          </Grid>
        </Grid>

        <Grid item container sx={{ padding: "3rem 4rem" }}>
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={4}>
              <CircularProgressBar
                height="17rem"
                width="17rem"
                color={theme.palette.common.green}
                trailColor={theme.palette.common.red}
                value={finances}
                strokeWidth={8}
              />
            </Grid>
            <Grid
              item
              sm
              container
              columnSpacing={2}
              xs={3}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid
                className={classes.iconWrapper}
                sx={{ background: theme.palette.common.lightGreen }}
              >
                <Grid item>
                  <TrendingDownIcon
                    color="success"
                    className={classes.cardIcon}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Typography noWrap variant="h2" style={{ fontSize: "3.9rem" }}>
                  <span
                    style={{
                      textDecoration: "line-through",
                      textDecorationStyle: "double",
                    }}
                  >
                    N{""}
                  </span>
                  {formatNumber(totalEarning)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: theme.palette.common.lightGrey,
                    fontSize: "2.275rem",
                  }}
                >
                  Total earning
                </Typography>
              </Grid>
            </Grid>
            {/* second */}
            <Grid
              item
              sm
              container
              columnSpacing={2}
              xs={3}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid
                className={classes.iconWrapper}
                sx={{ background: theme.palette.common.lightRed }}
              >
                <Grid item>
                  <TrendingUpIcon color="error" className={classes.cardIcon} />
                </Grid>
              </Grid>

              <Grid item>
                <Typography noWrap variant="h2" style={{ fontSize: "3.9rem" }}>
                  <span
                    style={{
                      textDecoration: "line-through",
                      textDecorationStyle: "double",
                    }}
                  >
                    N{""}
                  </span>
                  {formatNumber(totalPayouts)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: theme.palette.common.lightGrey,
                    fontSize: "2.275rem",
                  }}
                >
                  Total withdrawal
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          component={Link}
          to="/finance/earnings"
          className={classes.parentGrid}
          style={{ marginRight: "5rem" }}
        >
          <Card
            title="Earnings Table"
            background={theme.palette.common.lightGreen}
          >
            <Grid className={classes.iconWrapper}>
              <TrendingDownIcon color="success" className={classes.cardIcon} />
            </Grid>
          </Card>
        </Grid>
        <Grid
          item
          component={Link}
          to="/finance/payouts"
          className={classes.parentGrid}
          style={{ marginRight: "5rem" }}
        >
          <Card
            title="Payouts Table"
            background={theme.palette.common.lightRed}
          >
            <TrendingUpIcon color="error" className={classes.cardIcon} />
          </Card>
        </Grid>
        <Grid
          item
          component={Link}
          to="/finance/pending"
          className={classes.parentGrid}
          style={{ marginRight: "5rem" }}
        >
          <Card
            title="Pending Payout"
            background={theme.palette.common.lightRed}
          >
            <Grid className={classes.iconWrapper}>
              <TrendingUpIcon color="error" className={classes.cardIcon} />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Finance;
