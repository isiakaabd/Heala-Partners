import React, { useState, useEffect } from "react";
import { Grid, Avatar, IconButton, Typography, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import { useActions } from "components/hooks/useActions";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Notifications from "components/layouts/Notifications";
import { useLazyQuery } from "@apollo/client";
import { getPartner } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  role: {
    fontSize: "1.5rem",
    color: theme.palette.common.lightGrey,
  },

  name: {
    fontWeight: "normal",
  },
  notification: {
    fontSize: "2rem",
  },
}));

const HeadersProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }
  const { userDetail } = useActions();

  const id = localStorage.getItem("diagnosticId");
  const [pharmacyData, setPharmacyData] = useState({});

  const [pharmacy, { data }] = useLazyQuery(getPartner, {
    variables: { id },
  });

  useEffect(() => {
    (async () => {
      setTimeout(pharmacy, 300);
    })();
    if (data) {
      setPharmacyData(data?.getPartner);
      userDetail({
        data: data?.getPartner.category,
      });
    }
    //eslint-disable-next-line
  }, [pharmacy, data]);

  return (
    <header>
      <Grid container alignItems="center">
        <Grid item>
          <Avatar
            alt="Display avatar"
            src={pharmacyData ? pharmacyData?.logoImageUrl : displayPhoto}
          />
        </Grid>
        <Grid item style={{ marginRight: "3em", marginLeft: "1em" }}>
          <Grid container direction="column" justifyContent="center">
            <Grid item>
              <Typography variant="body1" className={classes.name}>
                {pharmacyData?.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                className={classes.role}
                style={{ fontWeight: 300 }}
              >
                {pharmacyData && pharmacyData.category}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            aria-label={notificationsLabel(0)}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Badge badgeContent={0} color="error">
              <NotificationsActiveIcon color="primary" fontSize="large" />
            </Badge>
          </IconButton>
          <Notifications anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Grid>
      </Grid>
    </header>
  );
};

export default HeadersProfile;
