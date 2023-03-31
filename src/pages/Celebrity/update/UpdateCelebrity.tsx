import { Typography, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UpdateCeleberityDetails from './UpdateCelebForm'
import { baseUrl } from 'src/constants/constants'
import axios from 'axios'
import { useParams } from 'react-router'
import { User } from 'src/contexts/AuthContext'

const UpdateCelebrity = () => {

    const [celeb, setCeleb] = useState<User>();
    const [musicCreatorDetails, setMusicCreatorDetails] = useState();
    const { id } = useParams()
    console.log(id);
    const [loader, setLoader] = useState(true);
    const [socialLinks, setSocialLinks] = useState([]);

    const fetchSocialMediaPlatforms = (platformsData, social_media_links) => {
        console.log("inside social media", platformsData, social_media_links);
        try {
            const socialMediaLinks = [];
            const socialMediaMaster = platformsData?.data?.data || [];
            if (social_media_links) {
                const convert = JSON.parse(social_media_links ?? []);
                const keyValuePair = JSON.parse(convert).map((link) => {
                    const key = Object.keys(link)[0] ?? "";
                    return { platform: key, url: link[key], value: link[key] };
                });
                socialMediaMaster.forEach((s) => {
                    if (s.status === "Active") {
                        const valueMap = keyValuePair.find((m) => m.platform === s.platform_name);
                        if (valueMap) {
                            socialMediaLinks.push(valueMap);
                        }
                    }
                });
            } else {
                socialMediaMaster.forEach((s) => {
                    if (s.status === "Active") {
                        socialMediaLinks.push({
                            platform: s.platform_name,
                            url: s.platform_link,
                            value: s.platform_link,
                        });
                    }
                });
            }
            setSocialLinks(socialMediaLinks);
        } catch (error) {
            console.log("error", error);
            setLoader(false);
        }
    };

    const getUserDetails = async () => {


        const celebDetails = await axios.get(
            baseUrl + `/get_celebrity?celebrity_id=${id}`
        );
        const platformsData = await axios.get(baseUrl + "/get_all_social_media_platforms");

        Promise.all([celebDetails, platformsData]).then((responses) => {
            fetchSocialMediaPlatforms(platformsData, celebDetails?.data?.data[0]?.social_media_links);
            setCeleb(celebDetails?.data?.data[0]);
            setLoader(false);
        });



    };

    useEffect(() => {
        getUserDetails();
    }, [id]);


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

                    <>
                        <Typography sx={{ mb: 3 }} variant="h4">
                            Update {celeb && `${celeb?.first_name} ${celeb?.last_name}`} Profile Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item lg={12} md={12} xs={12}>
                                {!loader && celeb ? (
                                    <UpdateCeleberityDetails socialLinks={socialLinks} userDetails={celeb} />
                                ) : (
                                    <>Loading.....</>
                                )}
                            </Grid>
                        </Grid>
                    </>

                </Container>
            </Box>
        </React.Fragment>
    )
}

export default UpdateCelebrity