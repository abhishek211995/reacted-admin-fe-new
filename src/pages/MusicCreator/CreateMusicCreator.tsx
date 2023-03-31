import { Box, Container, Typography, Grid } from '@mui/material'
import React from 'react'
import { CreateMusicCreatorForm } from './CreateMusicCreatorForm'

const CreateMusicCreator = () => {
    return (
        <React.Fragment>
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
                        Music Creator
                    </Typography>
                    <Grid container
                        spacing={2}>
                        <Grid item
                            lg={12}
                            md={12}
                            xs={12}>
                            <CreateMusicCreatorForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default CreateMusicCreator