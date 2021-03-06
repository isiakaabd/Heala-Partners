import { Box, Drawer, Toolbar, CssBaseline } from "@mui/material";
import React, { useState, Suspense, lazy, useEffect } from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { useLazyQuery, useMutation } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from "components/pages";
import useApptype from "hooks/useAppType";
import { Header } from "components/layouts";
import { muiTheme } from "components/muiTheme";
import { setAccessToken } from "./accessToken";
import { getPartner } from "components/graphQL/useQuery";
import { LOGOUT_USER } from "components/graphQL/Mutation";
import { useActions } from "components/hooks/useActions";
import { AppTypeProvider } from "store/contexts/AppTypeContext";
import Loader from "components/Utilities/Loader";
const SideNav = lazy(() => import("components/layouts/SideNav"));
const Hospital = lazy(() => import("components/routes/Hospital"));
const Private = lazy(() => import("components/routes/Private"));
const Routes = lazy(() => import("components/routes/Routes"));
const PreApp = ({ window }) => {
  const { changeAppType } = useApptype();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [state, setstate] = useState(true);
  const { userDetail, logout } = useActions();
  const [logout_user] = useMutation(LOGOUT_USER);
  const [mobileOpen, setMobileOpen] = useState(false);
  const id = localStorage.getItem("AppId");
  const [pharmacy, { data }] = useLazyQuery(getPartner, {
    variables: { id },
  });
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const drawerWidth = 200;
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    changeAppType(role);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  useEffect(() => {
    const token = localStorage.getItem("App_Token");
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

          {isAuthenticated && role === "diagnostics" && !state && (
            <>
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Header
                  handleDrawerToggle={handleDrawerToggle}
                  drawerWidth={drawerWidth}
                />

                {!isAuthenticated && (
                  <Route
                    path={["/", "/login"]}
                    render={(props) => <Login {...props} />}
                  />
                )}
                <Box
                  component="nav"
                  sx={{ width: { md: "300px" }, flexShrink: { md: 0 } }}
                  aria-label="sidebar_menu"
                >
                  <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: "block", md: "none" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                      "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <SideNav
                      types="temporary"
                      handleDrawerToggle={handleDrawerToggle}
                    />
                  </Drawer>
                  <Drawer
                    variant="permanent"
                    sx={{
                      display: { xs: "none", md: "block" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                      "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    open
                  >
                    <SideNav />
                  </Drawer>
                </Box>
                <Box
                  component="main"
                  sx={{
                    flex: 1,
                    p: 3,
                    width: { xs: `calc(100% - ${drawerWidth}px)` },
                  }}
                >
                  <Toolbar />
                  <Private />
                </Box>
              </Box>
            </>
          )}
          {isAuthenticated && role === "pharmacy" && !state && (
            <>
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Header
                  handleDrawerToggle={handleDrawerToggle}
                  drawerWidth={drawerWidth}
                />

                {!isAuthenticated && (
                  <Route
                    path={["/", "/login"]}
                    render={(props) => <Login {...props} />}
                  />
                )}
                <Box
                  component="nav"
                  sx={{ width: { md: "300px" }, flexShrink: { md: 0 } }}
                  aria-label="sidebar_menu"
                >
                  <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: "block", md: "none" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                      "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <SideNav
                      types="temporary"
                      handleDrawerToggle={handleDrawerToggle}
                    />
                  </Drawer>
                  <Drawer
                    variant="permanent"
                    sx={{
                      display: { xs: "none", md: "block" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                      "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    open
                  >
                    <SideNav handleDrawerToggle={handleDrawerToggle} />
                  </Drawer>
                </Box>
                <Box
                  component="main"
                  sx={{
                    flex: 1,
                    p: 3,
                    width: { xs: `calc(100% - ${drawerWidth}px)` },
                  }}
                >
                  <Toolbar />
                  <Routes />
                </Box>
              </Box>
            </>
          )}
          {isAuthenticated && role === "hospital" && !state && (
            <>
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Header
                  handleDrawerToggle={handleDrawerToggle}
                  drawerWidth={drawerWidth}
                />

                {!isAuthenticated && (
                  <Route
                    path={["/", "/login"]}
                    render={(props) => <Login {...props} />}
                  />
                )}
                <Box
                  component="nav"
                  sx={{ width: { md: "300px" }, flexShrink: { md: 0 } }}
                  aria-label="sidebar_menu"
                >
                  <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: "block", md: "none" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                      "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <SideNav
                      types="temporary"
                      handleDrawerToggle={handleDrawerToggle}
                    />
                  </Drawer>
                  <Drawer
                    variant="permanent"
                    sx={{
                      display: { xs: "none", md: "block" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                      "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    open
                  >
                    <SideNav />
                  </Drawer>
                </Box>
                <Box
                  component="main"
                  sx={{
                    flex: 1,
                    p: 3,
                    width: { xs: `calc(100% - ${drawerWidth}px)` },
                  }}
                >
                  <Toolbar />
                  <Hospital />
                </Box>
              </Box>
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
        <Suspense fallback={<Loader />}>
          <PreApp />
        </Suspense>
      </AppTypeProvider>
    </ThemeProvider>
  );
};

export default App;
