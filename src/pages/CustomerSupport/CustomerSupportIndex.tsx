import { Typography, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { CustomerSupportList } from './CustomerSupportList'

const CustomerSupportIndex = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Typography sx={{ mb: 3 }}
                    variant="h4">
                    Customer Support
                </Typography>
                <Grid container
                    spacing={2}>
                    <Grid item
                        lg={12}>
                        <CustomerSupportList />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default CustomerSupportIndex