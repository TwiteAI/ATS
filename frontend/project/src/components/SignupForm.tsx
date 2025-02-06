import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

interface SignupFormProps {
  onSwitch: () => void;
  onSignupSuccess: () => void;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  companyName: Yup.string().required('Company name is required'),
  jobTitle: Yup.string().required('Job title is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch, onSignupSuccess }) => {
  return (
    <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm max-w-md w-full mx-auto">
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
        onSubmit={(values, { setSubmitting }) => {
          // Simulate signup - replace with actual API call
          setTimeout(() => {
            setSubmitting(false);
            // For demo purposes, always succeed
            toast.success('Account created successfully!');
            onSignupSuccess();
          }, 1000);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.jobTitle && touched.jobTitle && (
                <div className="text-red-500 text-sm mt-1">{errors.jobTitle}</div>
              )}
            </div>

            <div>
              <Field
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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