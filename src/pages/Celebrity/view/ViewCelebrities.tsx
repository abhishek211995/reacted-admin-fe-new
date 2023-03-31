import { Typography, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { CelebrityList } from './CelebrityList'

const ViewCelebrities = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Typography sx={{ mb: 3 }} variant="h4">
                    Celebrities
                </Typography>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} xs={12}>
                        <CelebrityList />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ViewCelebrities