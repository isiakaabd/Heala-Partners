import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { AvailabilityCard, Loader } from "components/Utilities";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getAvailability } from "components/graphQL/useQuery";
import { NoData } from "components/layouts";

const HcpAvailability = () => {
  const [availabiltyArray, setAvailabiltyArray] = useState([]);
  const { hcpId } = useParams();
  const { loading, data, error } = useQuery(getAvailability, {
    variables: {
      id: hcpId,
    },
  });
  useEffect(() => {
    if (data) {
      const filteredAvailbility = (
        data?.getAvailabilities?.availability || []
      ).filter((availability) => availability?.dates[0]?.times?.length > 0);
      setAvailabiltyArray(filteredAvailbility);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
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
            const avalCard =
              availability?.dates[0]?.times ||
              availability?.dates[0]?.times?.length > 0 ? (
                <Grid item key={index}>
                  <AvailabilityCard availability={availability?.dates[0]} />
                </Grid>
              ) : (
                ""
              );

            return avalCard;
          })
        ) : (
          <NoData />
        )}
      </Grid>
    </Grid>
  );
};

export default HcpAvailability;
