import React from "react";
import { useSnackbar } from "notistack";

const NotistackAlert = ({ variant, message, error }) => {
  const newMessage = (newMessage =
    error?.networkError?.result?.errors[0].message);

  const { enqueueSnackbar } = useSnackbar();
  return enqueueSnackbar(error ? newMessage : message, {
    variant,
  });
};

export default NotistackAlert;
