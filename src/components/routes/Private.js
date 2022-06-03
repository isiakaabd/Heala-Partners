import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/routes/PrivateRoute";
import {
  ViewResult,
  ScheduledRequest,
  ScheduledRequestProfile,
  CancelledOrder,
  CompletedOrder,
  Pending,
  PendingProfile,
  Profiles,
  Setting,
  Dashboards,
} from "components/pages";

const Private = () => {
  return (
    <Switch>
      <PrivateRoute path={["/", "/dashboard"]} exact component={Dashboards} />

      <PrivateRoute exact path="/pending" component={Pending} />

      <PrivateRoute
        exact
        path="/pending/:requestId/request"
        component={PendingProfile}
      />

      <PrivateRoute exact path="/schedule" component={ScheduledRequest} />

      <PrivateRoute
        exact
        path="/schedule/:scheduleId/schedule"
        component={ScheduledRequestProfile}
      />

      <PrivateRoute exact path="/completed" component={CompletedOrder} />
      <PrivateRoute
        exact
        path="/completed/:completeId/view"
        component={ViewResult}
      />

      <PrivateRoute exact path="/cancelled" component={CancelledOrder} />
      <PrivateRoute exact path="/setting" component={Setting} />

      <PrivateRoute path="/setting/profile" component={Profiles} />
    </Switch>
  );
};

export default Private;
