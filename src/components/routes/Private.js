import React from "react";
import PropTypes from "prop-types";
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

const Private = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    setSelectedSubMenu,
    setSelectedHcpMenu,
    selectedHcpMenu,
    setSelectedPatientMenu,
    chatMediaActive,
    setChatMediaActive,
  } = props;
  return (
    <Switch>
      <PrivateRoute
        path={["/", "/dashboard"]}
        exact
        component={Dashboards}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/pending"
        component={Pending}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <PrivateRoute
        exact
        path="/pending/:requestId/request"
        component={PendingProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/schedule"
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedHcpMenu={selectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        component={ScheduledRequest}
      />

      <PrivateRoute
        exact
        path="/schedule/:scheduleId/schedule"
        component={ScheduledRequestProfile}
        selectedMenu={selectedMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        selectedHcpMenu={selectedHcpMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/completed"
        selectedMenu={selectedMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
        component={CompletedOrder}
        selectedHcpMenu={selectedHcpMenu}
      />
      <PrivateRoute
        exact
        path="/completed/:completeId/view"
        component={ViewResult}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/cancelled"
        component={CancelledOrder}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />
      <PrivateRoute
        exact
        path="/setting"
        component={Setting}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/setting/profile"
        component={Profiles}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />
    </Switch>
  );
};

Private.propTypes = {
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

export default Private;
