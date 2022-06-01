import React, { useState, useEffect } from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { useLazyQuery, useMutation } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from "components/pages";
import useApptype from "hooks/useAppType";
import { Header } from "components/layouts";
import { Loader } from "components/Utilities";
import Routes from "components/routes/Routes";
import { muiTheme } from "components/muiTheme";
import { setAccessToken } from "./accessToken";
import Private from "components/routes/Private";
import SideNav from "components/layouts/SideNav";
import Hospital from "components/routes/Hospital";
import ScrollToView from "components/ScrollToView";
import { getPartner } from "components/graphQL/useQuery";
import { LOGOUT_USER } from "components/graphQL/Mutation";
import { useActions } from "components/hooks/useActions";
import { AppTypeProvider } from "store/contexts/AppTypeContext";

const sectionStyles = {
  "--widthA": "max(25rem,22vw)",
  "--widthB": "calc(var(--widthA) +5rem)",

  // paddingLeft: "39rem",
  paddingRight: "min(5rem,8vw)",
  paddingTop: "12rem",
  paddingBottom: "5rem",
  paddingLeft: "calc(var(--widthA) + min(5rem,8vw))", // max(12rem, calc(100% - 80px))
  minHeight: "100vh",
  width: "100%",
};

const PreApp = () => {
  const { changeAppType } = useApptype();
  const [state, setstate] = useState(true);
  const { userDetail, logout } = useActions();
  const [logout_user] = useMutation(LOGOUT_USER);
  const id = localStorage.getItem("AppId");
  const [pharmacy, { data }] = useLazyQuery(getPartner, {
    variables: { id },
  });
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  React.useEffect(() => {
    changeAppType(role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

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
  return (
    <>
      <Router>
        <div className="container">
          {!isAuthenticated && (
            <Route
              path={["/login", "/"]}
              render={(props) => <Login {...props} />}
            />
          )}

          {isAuthenticated && role === "diagnostics" && state && (
            <Loader color="success" />
          )}
          {isAuthenticated && role === "pharmacy" && state && (
            <Loader color="success" />
          )}
          {isAuthenticated && role === "hospital" && state && (
            <Loader color="success" />
          )}
          {isAuthenticated && role === "diagnostics" && !state && (
            <>
              <Header />
              <ScrollToView>
                {!isAuthenticated && (
                  <Route
                    path={["/", "/login"]}
                    render={(props) => <Login {...props} />}
                  />
                )}

                <main
                  style={{
                    display: isAuthenticated ? "flex" : "none",
                  }}
                >
                  <SideNav />

                  <section style={sectionStyles}>
                    <Private />
                  </section>
                </main>
              </ScrollToView>
            </>
          )}

          {isAuthenticated && role === "pharmacy" && !state && (
            <>
              <Header />
              <ScrollToView>
                {!isAuthenticated && (
                  <Route
                    path={["/", "/login"]}
                    render={(props) => <Login {...props} />}
                  />
                )}

                <main
                  style={{
                    display: isAuthenticated ? "flex" : "none",
                  }}
                >
                  <SideNav />

                  <section style={sectionStyles}>
                    <Routes />
                  </section>
                </main>
              </ScrollToView>
            </>
          )}
          {isAuthenticated && role === "hospital" && !state && (
            <>
              <Header />
              <ScrollToView>
                {!isAuthenticated && (
                  <Route
                    path={["/", "/login"]}
                    render={(props) => <Login {...props} />}
                  />
                )}

                <main
                  style={{
                    display: isAuthenticated ? "flex" : "none",
                  }}
                >
                  <SideNav />

                  <section style={sectionStyles}>
                    <Hospital />
                  </section>
                </main>
              </ScrollToView>
            </>
          )}
        </div>
      </Router>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <AppTypeProvider>
        <PreApp />
      </AppTypeProvider>
    </ThemeProvider>
  );
};

export default App;
