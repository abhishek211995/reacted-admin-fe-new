import { FormEvent, useEffect, useState } from "react";

import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Divider,
    Checkbox,
    FormControlLabel,
    Snackbar,
    Alert,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { baseUrl } from 'src/constants/constants';
import { createMusicCreatorSchema } from 'src/utils/validators';



export const CreateMusicCreatorForm = (props: any) => {
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState<[]>([]);
    const [uploadProfilePicture, setUploadProfilePicture] = useState<any>("");
    const [severity, setSeverity] = useState<any>();
    const [uploadMusicFile, setUploadMusicFile] = useState("");
    const [socialMediaPlatforms, setPlatforms] = useState([])

    const [open, setOpen] = useState(false);
    const [msg, setMessage] = useState("");

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    useEffect(() => {
        axios.get(baseUrl + "/get_category").then((response) => {
            setCategoriesOptions(response?.data?.data);
        });
        axios.get(baseUrl + "/get_all_social_media_platforms").then((response) => {
            setPlatforms(response?.data.data)
        })
    }, []);
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            artist_name: "",
            description: "",
            categories: "",
            country: "",
            social_media_links: socialMediaPlatforms.map(p => ({ platformName: p.platform_name, value: "" })),
            profile_picture: ''
        },
        validationSchema: createMusicCreatorSchema,
        onSubmit: (data) => {
            handleSubmit(data);
        },
        enableReinitialize: true,
        validateOnChange: false
    });
    const handleSubmit = (data: any) => {
        let catIdArray = [];
        let socialMediaLinksArray = [];

        selectedCategories.map((cat: any) => {
            catIdArray.push(cat.category_id);
        });
        data.categories = catIdArray.join(",");
        data['profile_picture[0]'] = uploadProfilePicture;
        data.music = uploadMusicFile;
        let formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key !== "social_media_links") {
                formData.append(key, data[key]);
            }
        });
        const mediaLinks = data.social_media_links.map(link => ({ [link.platformName]: link.value }))
        formData.append("social_media_links", JSON.stringify(mediaLinks))

        axios
            .post(baseUrl + "/add_music_creator_by_admin", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.data.success) {
                    setSeverity("success");
                } else {
                    setSeverity("error");
                }
                setOpen(true);
                setMessage(response.data.message);
            })
            .catch((error: any) => {
                console.log(error?.message, "Could not add music creator");
            });
    };
    const handleChangeUpload = (event: any, type) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        type === "profile"
            ? setUploadProfilePicture(event?.currentTarget?.files[0])
            : setUploadMusicFile(event?.currentTarget?.files[0]);
    };
    console.log('formni', formik.errors)
    return (
        <FormikProvider value={formik}>
            <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader subheader="" title="Add Music Creator" />
                    <Divider />
                    <CardContent>
                        <Typography sx={{ mb: 3 }} variant="h6">
                            Basic Info
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item md={12} xs={12}>
                                <Button variant="contained" component="label">
                                    Upload Profile Photos
                                    <input
                                        type="file"
                                        hidden
                                        name="profile_picture"
                                        accept="image/*"
                                        onChange={(e) => handleChangeUpload(e, "profile")}
                                        // error={Boolean(formik.errors.profile_picture)}
                                        // helperText={formik.errors.profile_picture}
                                        multiple={false}
                                    />
                                </Button>
                                <span style={{ paddingLeft: "1rem" }}>{uploadProfilePicture?.name} </span>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="First name"
                                    name="first_name"
                                    variant="outlined"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.first_name)}
                                    helperText={formik.errors.first_name}
                                    required
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="last_name"
                                    variant="outlined"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.last_name)}
                                    helperText={formik.errors.last_name}
                                    required
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Artist Name"
                                    name="artist_name"
                                    variant="outlined"
                                    value={formik.values.artist_name}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.artist_name)}
                                    helperText={formik.errors.artist_name}
                                    required
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    variant="outlined"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.email)}
                                    helperText={formik.errors.email}
                                    required
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    type="number"
                                    variant="outlined"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.phone)}
                                    helperText={formik.errors.phone}
                                    required
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    variant="outlined"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.country)}
                                    helperText={formik.errors.country}
                                    required
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Autocomplete
                                    multiple
                                    fullWidth
                                    onChange={(event, value: any) => {
                                        formik.setFieldValue('categories', value)
                                        setSelectedCategories(value)
                                    }}
                                    id="checkboxes-tags-demo"
                                    options={categoriesOptions}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option?.category_name}
                                    // getOptionValue={(option) => option?.category_id}
                                    // filterSelectedOptions={((option: any) => option?.category_id)}

                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.category_name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Categories" placeholder="" />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    variant="outlined"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.description)}
                                    helperText={formik.errors.description}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography sx={{ mb: 3 }} variant="h6">
                            Social Media Links
                        </Typography>
                        {/* <Grid container spacing={3}>
                            <FieldArray
                                validateOnChange={false}
                                name="social_media_links"
                            >

                                {
                                    formik.values.social_media_links.map((platform, index) => {
                                        return (
                                            <Grid key={index} item md={6} xs={12}>
                                                <Field name={`social_media_links.${index}.value`}>
                                                    {({ field }) => (
                                                        <TextField
                                                            fullWidth
                                                            label={platform.platformName}
                                                            variant="outlined"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                        )
                                    })
                                }




                            </FieldArray>
                        </Grid> */}
                    </CardContent>
                    <Divider />

                    <Divider />
                    <CardContent>
                        <Grid item md={12} xs={12}>
                            <Typography sx={{ mb: 3 }} variant="h6">
                                Upload Celebrity Music
                            </Typography>
                            <Grid item md={12} xs={12}>
                                <Button variant="contained" component="label">
                                    Upload Music
                                    <input
                                        type="file"
                                        hidden
                                        name="music"
                                        accept=".mp3,audio/*"
                                        onChange={(e) => handleChangeUpload(e, "music")}
                                    // error={Boolean(formik.errors?.name)}
                                    // helperText={formik.errors?.music}
                                    />
                                </Button>
                                <span style={{ paddingLeft: "1rem" }}>{uploadMusicFile} </span>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            p: 2,
                        }}
                    >
                        <Button color="primary" variant="contained" type="submit">
                            Save details
                        </Button>
                    </Box>
                </Card>
                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    anchorOrigin={{ horizontal: "right", vertical: "top" }}
                    onClose={() => setOpen(false)}
                >
                    <Alert sx={{ width: "100%", color: "#fff" }} variant="filled" severity={severity}>
                        {msg}
                    </Alert>
                </Snackbar>
            </form>
        </FormikProvider>
    );
};
