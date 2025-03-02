"use client";

import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useMemo,
    useState,
  } from "react";

  import Alert, { AlertColor } from "@mui/material/Alert";
  import Snackbar from "@mui/material/Snackbar";
  
  // Create a context
  interface SnackbarContextProps {
    snackbar: { open: boolean; message: string; severity: AlertColor };
    showSnackbar: (message: string, severity: AlertColor) => void;
  }
  const SnackbarContext = createContext<SnackbarContextProps>({
    snackbar: { open: false, message: "", severity: "success" },
    showSnackbar: () => {},
  });
  
  // Provider component
  interface SnackbarProviderProps {}
  export const SnackbarProvider: FC<PropsWithChildren<SnackbarProviderProps>> = ({
    children,
  }) => {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success" as AlertColor,
    });
  
    // Show snack bar function
    const showSnackbar = (message: string, severity: AlertColor = "success") => {
      setSnackbar({ open: true, message, severity });
    };
  
    const hideSnackbar = () => {
      setSnackbar({ open: false, message: "", severity: "success" });
    };
  
    const value = useMemo(
      () => ({
        snackbar,
        showSnackbar,
        hideSnackbar,
      }),
      [snackbar, showSnackbar, hideSnackbar],
    );
  
    return (
      <SnackbarContext.Provider value={value}>
        {children}
        {snackbar.open && (
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={hideSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ mt: 9 }}
          >
            <Alert
              onClose={hideSnackbar}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        )}
      </SnackbarContext.Provider>
    );
  };
  
  export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
      throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
  };
  