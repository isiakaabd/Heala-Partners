import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/login" />;
        else if (isAuthenticated)
          return <Component {...props} {...rest} path={path} />;
      }}
    />
  );
};

export default PrivateRoute;
