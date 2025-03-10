import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { signUp } from '../utils/localStorage';

interface SignupFormProps {
  onSwitch: () => void;
  onSignupSuccess: () => void;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  companyName: Yup.string().required('Company name is required'),
  jobTitle: Yup.string().required('Job title is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch, onSignupSuccess }) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Account</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          companyName: '',
          jobTitle: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            console.log("Attempting to sign up with:", values.email);
            
            // Register user with local storage
            const data = await signUp(
              values.email, 
              values.password, 
              {
                name: values.name,
                company_name: values.companyName,
                job_title: values.jobTitle,
                phone_number: values.phoneNumber
              }
            );
            
            console.log("Signup response:", data);
            
            if (data.user) {
              toast.success('Account created successfully!');
              onSignupSuccess();
            } else {
              toast.error('Failed to create account. Please try again.');
            }
          } catch (error: any) {
            console.error('Signup error details:', error);
            toast.error(error.message || 'Failed to create account. Please try again.');
            
            if (error.message && error.message.includes('email')) {
              setFieldError('email', 'This email is already registered');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <Field
                name="companyName"
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.companyName && touched.companyName && (
                <div className="text-red-500 text-sm mt-1">{errors.companyName}</div>
              )}
            </div>

            <div>
              <Field
                name="jobTitle"
                type="text"
                placeholder="Job Title"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.jobTitle && touched.jobTitle && (
                <div className="text-red-500 text-sm mt-1">{errors.jobTitle}</div>
              )}
            </div>

            <div>
              <Field
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number (10 digits)"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>
              )}
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            <div>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>

            <p className="text-center text-white">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitch}
                className="text-cyan-400 hover:text-cyan-300"
              >
                Log in
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;