import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'components/routes/PrivateRoute'
import {
  ViewResult,
  ScheduledRequest,
  ScheduledRequestProfile,
  CancelledOrder,
  CompletedOrder,
  Pending,
  PendingProfile,
  Profile,
  Setting,
  Dashboard,
} from 'components/pages'

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
  } = props
  return (
    <Switch>
      <PrivateRoute
        path={['/', '/dashboard']}
        exact
        component={Dashboard}
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
        selectedHcpMenu={selectedHcpMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
        component={CompletedOrder}
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
        component={Profile}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />
    </Switch>
  )
}

Private.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
  chatMediaActive: PropTypes.bool.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
  setWaitingListMenu: PropTypes.func.isRequired,
  setSelectedAppointmentMenu: PropTypes.func.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
  setSelectedScopedMenu: PropTypes.func.isRequired,
}

export default Private
