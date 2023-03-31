import { Box, Container, Typography, Grid } from '@mui/material'
import React from 'react'
import { CreateCelebrityForm } from './CreateCelebrityForm'

const CreateCelebrityIndex = () => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Create Celebrity
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>
                            <CreateCelebrityForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default CreateCelebrityIndex