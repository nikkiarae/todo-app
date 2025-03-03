"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@/hooks/useTheme"
import { SnackbarProvider } from "@/hooks/useSnackbar";
import theme from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/**
 * AppWrapper Component
 * 
 * This component serves as a wrapper for the entire application, providing essential context providers
 * to all child components. It includes:
 * - `QueryClientProvider`: For managing React Query (data fetching, caching, and synchronization).
 * - `ThemeProvider`: For providing a custom theme to the application.
 * - `SnackbarProvider`: For managing snackbar notifications (e.g., success/error messages).
 * 
 * @param children - The child components to be wrapped by the providers.
 * @returns A wrapper component with all necessary context providers.
 */

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider palette={theme}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default AppWrapper;
