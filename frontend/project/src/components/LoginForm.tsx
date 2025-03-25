import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { login } from '../utils/auth';

interface LoginFormProps {
  onSwitch: () => void;
  onForgotPassword: () => void;
  onLoginSuccess: () => void;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch, onForgotPassword, onLoginSuccess }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "url('/path-to-your-background.jpg')" }}>  

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Login Box */}
      <div className="relative bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Your Account</h2>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const success = await login(values.email, values.password);
              
              if (success) {
                toast.success('Login successful!');
                onLoginSuccess();
              } else {
                toast.error('Login failed. Please check your credentials.');
                setFieldError('password', 'Invalid email or password');
              }
            } catch (error) {
              toast.error('Login failed. Please try again.');
              setFieldError('password', 'Invalid email or password');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
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
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-cyan-400 hover:text-cyan-300"
                  onClick={onForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>

              <p className="text-center text-white">
                Don't have an account?{' '}
                <button onClick={onSwitch} className="text-cyan-400 hover:text-cyan-300">
                  Sign up
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
