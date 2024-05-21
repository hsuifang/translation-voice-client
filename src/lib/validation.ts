import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().required('Username cannot be empty').min(8, 'Username cannot be less than 8 characters'),
  password: yup.string().required('Password cannot be empty').min(8, 'Password cannot be less than 8 characters'),
});

export const searchSchema = yup.object({
  examDate: yup.string().nullable(),
  examId: yup.string().nullable(),
  medicalId: yup.string().nullable(),
});
