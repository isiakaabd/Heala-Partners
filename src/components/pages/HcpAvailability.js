import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AvailabilityCard from "components/Utilities/AvailabilityCard";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getAvailability } from "components/graphQL/useQuery";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";

const HcpAvailability = (props) => {
  const [availabiltyArray, setAvailabiltyArray] = useState([]);
  const { hcpId } = useParams();
  const { loading, data, error } = useQuery(getAvailability, {
    variables: {
      id: hcpId,
    },
  });
  useEffect(() => {
    if (data) setAvailabiltyArray(data.getAvailabilities.availability);
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item>
        <PreviousButton path={`/hcps/${hcpId}`} />
      </Grid>
      <Grid item>
        <Typography variant="h2">HCP Availability</Typography>
      </Grid>
      <Grid
        item
        container
        gap={3}
        direction="column"
        flexWrap="nowrap"
        height="100%"
      >
        {availabiltyArray.length > 0 ? (
          availabiltyArray.map((availability, index) => {
            return (
              <Grid item key={index}>
                <AvailabilityCard availability={availability} />
              </Grid>
            );
          })
        ) : (
          <NoData />
        )}
      </Grid>
    </Grid>
  );
};

export default HcpAvailability;
