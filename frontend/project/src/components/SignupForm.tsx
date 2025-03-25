import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { signUp } from '../utils/auth';

interface SignupFormProps {
  onSwitch: () => void;
  onSignupSuccess: () => void;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch, onSignupSuccess }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "url('/path-to-your-background.jpg')" }}>  

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Signup Box */}
      <div className="relative bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h2>
        
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const success = await signUp(values.email, values.password, values.name);
              
              if (success) {
                toast.success('Account created successfully!');
                onSignupSuccess();
              } else {
                toast.error('Failed to create an account.');
              }
            } catch (error: any) {
              toast.error(error.message || 'Signup failed. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>

              <p className="text-center text-white">
                Already have an account?{' '}
                <button onClick={onSwitch} className="text-cyan-400 hover:text-cyan-300">
                  Log in
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;