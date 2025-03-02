"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@/hooks/useTheme"
import { SnackbarProvider } from "@/hooks/useSnackbar";
import theme from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider palette={theme}>
          <SnackbarProvider>
              {children}
          </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
