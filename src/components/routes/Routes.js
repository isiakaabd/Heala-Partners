import React from "react";
import PropTypes from "prop-types";
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
} from "components/pages";

const Routes = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
    chatMediaActive,
    setChatMediaActive,
  } = props;
  return (
    <Switch>
      <PrivateRoute
        path={["/", "/dashboard"]}
        exact
        component={Dashboard}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/pending-order"
        component={PendingOrder}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/pending-order/:orderId"
        component={PendingOrderProfile}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/pending-order/:orderId/order"
        component={PendingOrderProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/processing-order"
        component={ProcessingOrders}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/completed-order"
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
        component={CompletedOrders}
      />
      <PrivateRoute
        exact
        path="/completed-order/:orderId/order"
        component={ViewCompleted}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      {/* ViewCompleted */}

      <PrivateRoute
        exact
        path="/cancelled-order"
        component={CancelledOrders}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/settings"
        component={Settings}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/settings/profile"
        component={Profile}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />
    </Switch>
  );
};

Routes.propTypes = {
  selectedMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
  chatMediaActive: PropTypes.bool,
  setSelectedMenu: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  setSelectedPatientMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func,
  setWaitingListMenu: PropTypes.func,
  setSelectedAppointmentMenu: PropTypes.func,
  setChatMediaActive: PropTypes.func,
  setSelectedScopedMenu: PropTypes.func,
};

export default Routes;
