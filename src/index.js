import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import PWAPrompt from "react-ios-pwa-prompt";
import { Provider } from "react-redux";
import { store } from "store";
import { SnackbarProvider } from "notistack";
import { Typography, Slide } from "@mui/material";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { getAccessToken } from "./accessToken";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "components/pages";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const httpLink = createHttpLink({
  uri: BASE_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : null,
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  resolvers: {},
});
// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <SnackbarProvider
    ref={notistackRef}
    maxSnack={3}
    action={(key) => (
      <Typography
        onClick={onClickDismiss(key)}
        style={{
          fontSize: "1.2rem",
          color: "ffffff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Dismiss
      </Typography>
    )}
    classes={{
      base: { fontSize: 33 },
    }}
    TransitionComponent={Slide}
  >
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ErrorBoundary FallbackComponent={Error}>
          <App />
          <PWAPrompt />
        </ErrorBoundary>
      </ApolloProvider>
    </Provider>
  </SnackbarProvider>
  // </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
