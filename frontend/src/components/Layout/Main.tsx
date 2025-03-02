import { FC, PropsWithChildren } from "react";
import { Box, Toolbar } from "@mui/material";

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box component="main">
      <Toolbar />
      {children}
    </Box>
  );
};

export default Main;
