import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { SettingsPassword } from './SettingPassword';

const Setting = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Settings
        </Typography>
        {/* <SettingsNotifications />  */}
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  );
};

export default Setting;
