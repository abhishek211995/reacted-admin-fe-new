import { FormEvent, useEffect, useState } from 'react';

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
  Alert
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Field, FieldArray, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import { baseUrl } from 'src/constants/constants';
import { createMusicCreatorSchema } from 'src/utils/validators';
import { useLocation, useParams } from 'react-router';

export const CreateMusicCreatorForm = (props: any) => {
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [uploadProfilePicture, setUploadProfilePicture] = useState<any>('');
  const [severity, setSeverity] = useState<any>('info');
  const [uploadMusicFile, setUploadMusicFile] = useState<any>('');
  const [socialMediaPlatforms, setPlatforms] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');
  const [creatorValues, setCreator] = useState<any>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    artist_name: '',
    description: '',
    categories: '',
    country: '',
    social_media_links: socialMediaPlatforms.map((p) => ({
      platformName: p.platform_name,
      value: ''
    }))
  });
  console.log('upload Music', uploadMusicFile);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  useEffect(() => {
    axios.get(baseUrl + '/get_category').then((response) => {
      setCategoriesOptions(response?.data?.data);
    });
    axios.get(baseUrl + '/get_all_social_media_platforms').then((response) => {
      setPlatforms(response?.data.data);
    });
  }, []);
  // const { query: { edit, userId } } = useRouter()
  const { pathname } = useLocation();
  const { userId } = useParams();
  console.log('search', pathname.split('/')[2]);

  useEffect(() => {
    if (pathname.split('/')?.[2] === 'edit') setEditMode(true);
  }, [pathname]);
  useEffect(() => {
    if (editMode && userId) {
      fetchCreator(userId);
    }
  }, [editMode, userId]);
  const fetchCreator = async (userId: any) => {
    axios
      .get(baseUrl + `/get_music_creator?music_creator_id=${userId}`)
      .then((response) => {
        if (response.data.success) {
          const details = response.data.data[0];
          const socialLinks = JSON.parse(
            response.data.data[0].social_media_links
          );
          setCreator({
            ...creatorValues,
            first_name: details.first_name,
            artist_name: details.artist_name,
            categories: [],
            description: details.description,
            email: details.email,
            last_name: details.last_name,
            phone: details.phone,
            social_media_links: Array.isArray(socialLinks)
              ? socialLinks.map((s) => ({
                  platformName: Object.keys(s)[0],
                  value: Object.values(s)[0]
                }))
              : [],
            country: details.country
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const formik = useFormik({
    initialValues: creatorValues,
    validationSchema: createMusicCreatorSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    },
    enableReinitialize: true,
    validateOnChange: false
  });
  const handleSubmit = async (data: any) => {
    let catIdArray = [];
    let socialMediaLinksArray = [];

    selectedCategories?.map((cat) => {
      catIdArray.push(cat.category_id);
    });
    data.categories = catIdArray.join(',');
    data['profile_picture[0]'] = uploadProfilePicture;
    data.music = uploadMusicFile;
    let formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== 'social_media_links') {
        formData.append(key, data[key]);
      }
    });
    formData.append('music_creator_id', userId);
    const mediaLinks = data.social_media_links?.map((link) => ({
      [link.platformName]: link.value
    }));
    formData.append('social_media_links', JSON.stringify(mediaLinks));

    if (editMode) {
      axios
        .post(baseUrl + '/update_music_creator', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${localStorage
              .getItem('access_key')
              ?.replaceAll('"', '')}`
          }
        })
        .then((response) => {
          console.log('response', response);
          if (response.data.success) {
            setSeverity('success');
          } else {
            setSeverity('error');
          }
          console.log('then');
          console.log(severity);
          setOpen(true);
          setMessage(response.data.message);
        })
        .catch((error) => {
          console.log(error, 'Could not add music creator');
        });
    } else {
      // formData.append('step', 'upload');
      axios
        .post(baseUrl + '/add_music_creator_by_admin', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${localStorage
              .getItem('access_key')
              ?.replaceAll('"', '')}`
          }
        })
        .then((response) => {
          console.log('response', response);
          if (response.data.success) {
            setSeverity('success');
          } else {
            setSeverity('error');
          }
          setOpen(true);
          setMessage(response.data.message);
        })
        .catch((error) => {
          console.log(error, 'Could not add music creator');
        });
    }
  };
  const handleChangeUpload = (event: any, type: string) => {
    if (type === 'profile') {
      setUploadProfilePicture(event?.currentTarget?.files[0]);
    } else {
      setUploadMusicFile(event?.currentTarget?.files[0]);
    }
  };
  console.log('creatorValues', creatorValues);
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
                  <TextField
                    type="file"
                    hidden
                    name="profile_picture"
                    // accept="image/*"
                    onChange={(e) => handleChangeUpload(e, 'profile')}
                    error={Boolean(formik.errors.profile_picture)}
                    helperText={formik.errors.profile_picture}
                    // multiple={false}
                  />
                </Button>
                <span style={{ paddingLeft: '1rem' }}>
                  {uploadProfilePicture?.name}{' '}
                </span>
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
                  onChange={(event, value) => {
                    formik.setFieldValue('categories', value);
                    setSelectedCategories(value);
                  }}
                  id="checkboxes-tags-demo"
                  options={categoriesOptions}
                  disableCloseOnSelect
                  getOptionLabel={(option: any) => option?.category_name}
                  // getOptionValue={(option: any) => option?.category_id}
                  renderOption={(props, option: any, { selected }) => (
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
                  <TextField
                    type="file"
                    hidden
                    name="music"
                    // accept=".mp3,audio/*"
                    onChange={(e) => handleChangeUpload(e, 'music')}
                    error={Boolean(formik.errors.music)}
                    helperText={formik.errors.music}
                  />
                </Button>
                <span style={{ paddingLeft: '1rem' }}>
                  {uploadMusicFile?.[0] ? uploadMusicFile?.[0]?.name : ''}
                </span>
              </Grid>
            </Grid>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button color="primary" variant="contained" type="submit">
              Save details
            </Button>
          </Box>
        </Card>
      </form>
      <Snackbar
        open={open}
        sx={{position: 'relative', z-index: 9999}}
        autoHideDuration={1000}
        //  // anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        onClose={() => setOpen(false)}
      >
        <Alert
          sx={{ width: '100%', color: '#fff' }}
          variant="filled"
          severity={severity}
        >
          {msg}
        </Alert>
      </Snackbar>
    </FormikProvider>
  );
};
