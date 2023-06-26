import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const requiredMessage = (fieldName) => `${fieldName} is required`;

export const validMessage = (fieldName) => `Please enter valid ${fieldName}`;

export const minErrorMessage = (min) =>
  `Please enter atleast ${min} characters`;

const emailValidator = Yup.string()
  .email(validMessage('email'))
  .required(requiredMessage('Email'));

const passwordValidator = Yup.string()
  .required(requiredMessage('Password'))
  .min(8, minErrorMessage(8));

export const LoginSchema = Yup.object().shape({
  email: emailValidator,
  password: passwordValidator
});

export const RegisterSchema = Yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  name: Yup.string().required(requiredMessage('Name'))
});

export const AddUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: emailValidator,
  role: Yup.string().required("Role is Required"),
});


export const createCelebritySchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('First Name')),
  last_name: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Last Name')),
  email: emailValidator,
  phone: Yup.string()
    .required('required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long'),
  title: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Title')),
  tag_line: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Tag Line')),
  short_description: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Short Description')),
  long_description: Yup.string()
    .min(100, minErrorMessage(100))
    .required(requiredMessage('Long Description')),
  price: Yup.number().min(0).required(requiredMessage('Price')),
  country: Yup.string().required(requiredMessage('Country')),
  categories: Yup.array().required('At least one category is required'),
  social_media_links: Yup.array().of(
    Yup.object().shape({
      platformName: Yup.string(),
      value: Yup.string()
    })
  )
});

export const UpdateCelebritySchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('First Name')),
  last_name: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Last Name')),
  email: emailValidator,
  phone: Yup.string()
    .required('required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long'),
  title: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Title')),
  tag_line: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Tag Line')),
  short_description: Yup.string()
    .min(3, minErrorMessage(3))
    .required(requiredMessage('Short Description')),
  long_description: Yup.string()
    .min(100, minErrorMessage(100))
    .required(requiredMessage('Long Description')),
  price: Yup.number().min(0).required(requiredMessage('Price')),
  // country: Yup.string("")
  // .required(requiredMessage("Country")),
  // categories: Yup.array().required("At least one category is required"),
  social_media_links: Yup.array().of(
    Yup.object().shape({
      platformName: Yup.string(),
      value: Yup.string()
    })
  )
});

export const createMusicCreatorSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  artist_name: Yup.string().required('Artist Name is required'),
  description: Yup.string().required('Description is required'),
  country: Yup.string().required('Country is required')
});

export const UpdateMusicCreatorSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  artist_name: Yup.string().required('Artist Name is required'),
  description: Yup.string().required('Description is required')
});
