import React, { lazy, Suspense } from "react";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { dashboard } from "components/graphQL/useQuery";
import { Loader } from "components/Utilities";
const HospitalDashboardChart = lazy(() =>
  import("components/layouts/HospitalDashboardChart")
);
const AvailabilityTable = lazy(() =>
  import("components/layouts/AvailabilityTable")
);
const NoData = lazy(() => import("components/layouts/NoData"));

const HospitalDashboard = () => {
  const { data, error, loading } = useQuery(dashboard, {
    notifyOnNetworkStatusChange: true,
    variables: {
      providerId: localStorage.getItem("partnerProviderId"),
    },
  });

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <Suspense fallback={<Loader />}>
      <Grid container direction="column" rowGap={3}>
        <Grid item container alignItems="center">
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography variant="h1">Dashboard</Typography>
          </Grid>
        </Grid>

        <HospitalDashboardChart data={data} />

        <AvailabilityTable data={data?.getStats?.availabilityCalendar} />
      </Grid>
    </Suspense>
  );
};

export default HospitalDashboard;
