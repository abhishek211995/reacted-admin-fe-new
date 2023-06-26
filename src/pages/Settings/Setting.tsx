import { Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { SettingsPassword } from '../Components/setting/SettingPassword'
import { SettingsNotifications } from './SettingsNotifications'

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
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Settings
                </Typography>
                <SettingsNotifications />
                <Box sx={{ pt: 3 }}>
                    <SettingsPassword />
                </Box>
            </Container>
        </Box>
    )
}

export default Setting