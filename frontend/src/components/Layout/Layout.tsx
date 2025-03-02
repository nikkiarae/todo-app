"use client";

import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';


const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Box>
  );
}

export default Layout