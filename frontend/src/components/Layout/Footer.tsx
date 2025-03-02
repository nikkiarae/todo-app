import { FC } from 'react';
import { Box, Typography } from '@mui/material';

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto'
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Todo App by N A Rae
      </Typography>
    </Box>
  );
}

export default Footer