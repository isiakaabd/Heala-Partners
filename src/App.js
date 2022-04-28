import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Loader } from "components/Utilities";
import { getPartner } from "components/graphQL/useQuery";
import { LOGOUT_USER } from "components/graphQL/Mutation";
import { useActions } from "components/hooks/useActions";
import { setAccessToken } from "./accessToken";
import { muiTheme } from "components/muiTheme";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Header, Headers, SideMenu, SideMenus } from "components/layouts";
import Routes from "components/routes/Routes";
import { useSelector } from "react-redux";
import ScrollToView from "components/ScrollToView";
import { Login } from "components/pages";
import Private from "components/routes/Private";
import { HospitalHeader, HospitalMenu } from "components/layouts";
import Hospital from "components/routes/Hospital";
import jwtDecode from "jwt-decode";

const sectionStyles = {
  paddingLeft: "39rem",
  paddingRight: "5rem",
  paddingTop: "12rem",
  paddingBottom: "5rem",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#fbfbfb",
};

const App = () => {
  const [state, setstate] = useState(true);
  const { userDetail, logout } = useActions();
  const [logout_user] = useMutation(LOGOUT_USER);
  const id = localStorage.getItem("AppId");
  const [pharmacy, { data }] = useLazyQuery(getPartner, {
    variables: { id },
  });
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("Pharmacy_token");
    const d = async () => {
      if (token) {
        const { exp } = jwtDecode(token);
        const time = Date.now() >= exp * 1000;
        if (token && time) {
          logout();
          logout_user();
        }
        if (token && isAuthenticated && !time && state) {
          setstate(false);

          setAccessToken(token);
        } else if (token && isAuthenticated && !time && !state) {
          setAccessToken(token);
          try {
            await pharmacy();
          } catch (err) {
            console.error(err);
          }

          if (data) {
            userDetail({
              data: data?.getPartner.category,
            });
          }
          setstate(false);
        }
      }
    };
    d();
    // eslint-disable-next-line
  }, [data, pharmacy, state, isAuthenticated]);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState(0);
  const [selectedPatientMenu, setSelectedPatientMenu] = useState(0);
  const [selectedHcpMenu, setSelectedHcpMenu] = useState(0);
  const [selectedAppointmentMenu, setSelectedAppointmentMenu] = useState(0);
  const [waitingListMenu, setWaitingListMenu] = useState(0);
  const [selectedScopedMenu, setSelectedScopedMenu] = useState(0);
  const [selectedPendingMenu, setSelectedPendingMenu] = useState(0);
  const [chatMediaActive, setChatMediaActive] = useState(false);

  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <div className="container">
          {!isAuthenticated && (
            <Route
              path={["/login", "/"]}
              render={(props) => <Login {...props} />}
            />
          )}

          {isAuthenticated &&
            !chatMediaActive &&
            role === "diagnostics" &&
            state && <Loader color="success" />}
          {isAuthenticated &&
            !chatMediaActive &&
            role === "pharmacy" &&
            state && <Loader color="success" />}
          {isAuthenticated &&
            !chatMediaActive &&
            role === "hospital" &&
            state && <Loader color="success" />}
          {isAuthenticated &&
            !chatMediaActive &&
            role === "diagnostics" &&
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
                      path={["/", "/login"]}
                      render={(props) => <Login {...props} />}
                    />
                  )}

                  <main
                    style={{
                      display: isAuthenticated
                        ? "flex"
                        : chatMediaActive
                        ? "block"
                        : "none",
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
                        !chatMediaActive ? sectionStyles : { width: "100%" }
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
            role === "pharmacy" &&
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
                      path={["/", "/login"]}
                      render={(props) => <Login {...props} />}
                    />
                  )}

                  <main
                    style={{
                      display: isAuthenticated
                        ? "flex"
                        : chatMediaActive
                        ? "block"
                        : "none",
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
                        !chatMediaActive ? sectionStyles : { width: "100%" }
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
          {isAuthenticated &&
            !chatMediaActive &&
            role === "hospital" &&
            !state && (
              <>
                <HospitalHeader
                  selectedMenu={selectedMenu}
                  selectedPendingMenu={selectedPendingMenu}
                  selectedSubMenu={selectedSubMenu}
                  setSelectedMenu={setSelectedMenu}
                  selectedPatientMenu={selectedPatientMenu}
                  selectedHcpMenu={selectedHcpMenu}
                  selectedAppointmentMenu={selectedAppointmentMenu}
                  waitingListMenu={waitingListMenu}
                  selectedScopedMenu={selectedScopedMenu}
                />
                <ScrollToView>
                  {!isAuthenticated && (
                    <Route
                      path={["/", "/login"]}
                      render={(props) => <Login {...props} />}
                    />
                  )}

                  <main
                    style={{
                      display: isAuthenticated
                        ? "flex"
                        : chatMediaActive
                        ? "block"
                        : "none",
                    }}
                  >
                    <HospitalMenu
                      selectedMenu={selectedMenu}
                      setSelectedMenu={setSelectedMenu}
                      setSelectedSubMenu={setSelectedSubMenu}
                      setWaitingListMenu={setWaitingListMenu}
                      setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                    />

                    <section
                      style={
                        !chatMediaActive ? sectionStyles : { width: "100%" }
                      }
                    >
                      <Hospital
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
                      />
                    </section>
                  </main>
                </ScrollToView>
              </>
            )}
          {/* {!chatMediaActive && !state && <div>ghgcfvh</div>} */}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
