"use client";

import { FC, PropsWithChildren } from "react";
import theme from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
              {children}
    </QueryClientProvider>
  );
};

export default AppWrapper;
