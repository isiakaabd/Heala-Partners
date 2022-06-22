import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/routes/PrivateRoute";
import {
  Settings,
  ViewCompleted,
  ProcessingOrders,
  PendingOrder,
  Profile,
  CancelledOrders,
  CompletedOrders,
  PendingOrderProfile,
  Dashboard,
  PageNotFound,
} from "components/pages";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path={["/", "/dashboard"]} exact component={Dashboard} />

      <PrivateRoute exact path="/pending-order" component={PendingOrder} />

      <PrivateRoute
        exact
        path="/pending-order/:orderId"
        component={PendingOrderProfile}
      />

      <PrivateRoute
        exact
        path="/pending-order/:orderId/order"
        component={PendingOrderProfile}
      />

      <PrivateRoute
        exact
        path="/processing-order"
        component={ProcessingOrders}
      />

      <PrivateRoute exact path="/completed-order" component={CompletedOrders} />

      <PrivateRoute
        exact
        path="/completed-order/:orderId/order"
        component={ViewCompleted}
      />

      {/* ViewCompleted */}

      <PrivateRoute exact path="/cancelled-order" component={CancelledOrders} />

      <PrivateRoute exact path="/settings" component={Settings} />

      <PrivateRoute path="/settings/profile" component={Profile} />
      <PrivateRoute path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
