import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'components/routes/PrivateRoute'
import ProcessingOrders from 'components/pages/ProcessingOrders'
import Dashboard from 'components/pages/Dashboard'
import PendingOrderProfile from 'components/pages/PendingOrderProfile'
import Settings from 'components/pages/Settings'
import Profile from 'components/pages/Profile'
import PendingOrder from 'components/pages/PendingOrder'
import CompletedOrders from 'components/pages/CompletedOrders'
import CancelledOrders from 'components/pages/CancelledOrders'
import ViewCompleted from 'components/pages/ViewCompleted'

const Routes = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
    setSelectedHcpMenu,
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
        path="/pending-order"
        component={PendingOrder}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
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
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute exact path="/completed-order" component={CompletedOrders} />
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
  )
}

Routes.propTypes = {
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

export default Routes
