import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import { Loader } from 'components/Utilities'
import { setAccessToken } from './accessToken'
import { muiTheme } from 'components/muiTheme'
import { Header, Headers, SideMenu, SideMenus } from 'components/layouts'
import Routes from 'components/routes/Routes'
import { useSelector } from 'react-redux'
import ScrollToView from 'components/ScrollToView'
import { Login } from 'components/pages'
import Private from 'components/routes/Private'

const sectionStyles = {
  paddingLeft: '39rem',
  paddingRight: '5rem',
  paddingTop: '12rem',
  paddingBottom: '5rem',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: '#fbfbfb',
}

const App = () => {
  // const { userDetail } = useActions()
  /* The selected SubMenu handles the visibility of the menu's sub. 0 is set as a buffer. so if you want to reset the submenu, just pass in 0 to the setSelectedSubMenu function. 1 is for the dashboard submenu, 2 for Patients and serially like that to the last menu items */
  useEffect(() => {
    const token = localStorage.getItem('token')
    setAccessToken(token)
    setstate(false)
  }, [])

  const [selectedMenu, setSelectedMenu] = useState(0)
  const { isAuthenticated, role } = useSelector((state) => state.auth)
  const [selectedSubMenu, setSelectedSubMenu] = useState(0)
  const [selectedPatientMenu, setSelectedPatientMenu] = useState(0)
  const [selectedHcpMenu, setSelectedHcpMenu] = useState(0)
  const [selectedAppointmentMenu, setSelectedAppointmentMenu] = useState(0)
  const [waitingListMenu, setWaitingListMenu] = useState(0)
  const [selectedScopedMenu, setSelectedScopedMenu] = useState(0)
  const [selectedPendingMenu, setSelectedPendingMenu] = useState(0)
  const [chatMediaActive, setChatMediaActive] = useState(false)
  const [state, setstate] = useState(true)
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <div className="container">
          {!isAuthenticated && (
            <Route
              path={['/login', '/']}
              render={(props) => <Login {...props} />}
            />
          )}

          {isAuthenticated &&
            !chatMediaActive &&
            role === 'pharmacy' &&
            state && <Loader color="success" />}
          {isAuthenticated &&
            !chatMediaActive &&
            role === 'diagnostics' &&
            !state && (
              <>
                <Headers
                  selectedMenu={selectedMenu}
                  selectedPendingMenu={selectedPendingMenu}
                  selectedSubMenu={selectedSubMenu}
                  selectedPatientMenu={selectedPatientMenu}
                  selectedHcpMenu={selectedHcpMenu}
                  selectedAppointmentMenu={selectedAppointmentMenu}
                  waitingListMenu={waitingListMenu}
                  selectedScopedMenu={selectedScopedMenu}
                />
                <ScrollToView>
                  {!isAuthenticated && (
                    <Route
                      path={['/', '/login']}
                      render={(props) => <Login {...props} />}
                    />
                  )}

                  <main
                    style={{
                      display: isAuthenticated
                        ? 'flex'
                        : chatMediaActive
                        ? 'block'
                        : 'none',
                    }}
                  >
                    <SideMenus
                      selectedMenu={selectedMenu}
                      setSelectedMenu={setSelectedMenu}
                      setSelectedSubMenu={setSelectedSubMenu}
                      setWaitingListMenu={setWaitingListMenu}
                      setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                    />

                    <section
                      style={
                        !chatMediaActive ? sectionStyles : { width: '100%' }
                      }
                    >
                      <Private
                        setSelectedMenu={setSelectedMenu}
                        selectedMenu={selectedMenu}
                        selectedSubMenu={selectedSubMenu}
                        setSelectedSubMenu={setSelectedSubMenu}
                        selectedPatientMenu={selectedPatientMenu}
                        setSelectedPatientMenu={setSelectedPatientMenu}
                        selectedHcpMenu={selectedHcpMenu}
                        setSelectedHcpMenu={setSelectedHcpMenu}
                        selectedAppointmentMenu={selectedAppointmentMenu}
                        setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                        waitingListMenu={waitingListMenu}
                        setWaitingListMenu={setWaitingListMenu}
                        chatMediaActive={chatMediaActive}
                        setChatMediaActive={setChatMediaActive}
                        selectedScopedMenu={selectedScopedMenu}
                        setSelectedScopedMenu={setSelectedScopedMenu}
                        setSelectedPendingMenu={setSelectedPendingMenu}
                      />
                    </section>
                  </main>
                </ScrollToView>
              </>
            )}
          {isAuthenticated &&
            !chatMediaActive &&
            role !== 'diagnostics' &&
            !state && (
              <>
                <Header
                  selectedMenu={selectedMenu}
                  selectedPendingMenu={selectedPendingMenu}
                  selectedSubMenu={selectedSubMenu}
                  selectedPatientMenu={selectedPatientMenu}
                  selectedHcpMenu={selectedHcpMenu}
                  selectedAppointmentMenu={selectedAppointmentMenu}
                  waitingListMenu={waitingListMenu}
                  selectedScopedMenu={selectedScopedMenu}
                />
                <ScrollToView>
                  {!isAuthenticated && (
                    <Route
                      path={['/', '/login']}
                      render={(props) => <Login {...props} />}
                    />
                  )}

                  <main
                    style={{
                      display: isAuthenticated
                        ? 'flex'
                        : chatMediaActive
                        ? 'block'
                        : 'none',
                    }}
                  >
                    <SideMenu
                      selectedMenu={selectedMenu}
                      setSelectedMenu={setSelectedMenu}
                      setSelectedSubMenu={setSelectedSubMenu}
                      setWaitingListMenu={setWaitingListMenu}
                      setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                    />

                    <section
                      style={
                        !chatMediaActive ? sectionStyles : { width: '100%' }
                      }
                    >
                      <Routes
                        setSelectedMenu={setSelectedMenu}
                        selectedMenu={selectedMenu}
                        selectedSubMenu={selectedSubMenu}
                        setSelectedSubMenu={setSelectedSubMenu}
                        selectedPatientMenu={selectedPatientMenu}
                        setSelectedPatientMenu={setSelectedPatientMenu}
                        selectedHcpMenu={selectedHcpMenu}
                        setSelectedHcpMenu={setSelectedHcpMenu}
                        selectedAppointmentMenu={selectedAppointmentMenu}
                        setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                        waitingListMenu={waitingListMenu}
                        setWaitingListMenu={setWaitingListMenu}
                        chatMediaActive={chatMediaActive}
                        setChatMediaActive={setChatMediaActive}
                        selectedScopedMenu={selectedScopedMenu}
                        setSelectedScopedMenu={setSelectedScopedMenu}
                        setSelectedPendingMenu={setSelectedPendingMenu}
                      />
                    </section>
                  </main>
                </ScrollToView>
              </>
            )}
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
