import { Typography, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { baseUrl } from 'src/constants/constants';
import { CategoryComponent } from './CategoriesComponent';
import { CategoryList } from './CategoryList';

const CategoriesIndex = () => {
    const [categoryList, setCategoryList] = useState([]);

    const getCategoryList = useCallback(() => {
        axios
            .get(baseUrl + "/get_all_categories")
            .then((response) => {
                //console.log(response);
                setCategoryList(response.data.data.reverse());
            })
            .catch((response) => {
                console.log(response);
            });
    }, []);


    useEffect(() => {
        getCategoryList();
    }, [getCategoryList]);
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
                        Categories
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={5} md={5} xs={12}>
                            <CategoryComponent onCategorySubmit={() => getCategoryList()} />
                        </Grid>
                        <Grid item lg={7}>
                            <CategoryList data={categoryList} onDeletePlatformItem={() => getCategoryList()} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default CategoriesIndex