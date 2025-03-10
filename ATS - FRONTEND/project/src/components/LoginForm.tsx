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
  rememberMe: Yup.boolean()
});

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch, onForgotPassword, onLoginSuccess }) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Your Account</h2>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const success = await login(values.email, values.password);
            
            if (success) {
              toast.success('Login successful!');
              onLoginSuccess();
            } else {
              toast.error('Login failed. Please check your credentials.');
              setFieldError('email', ' ');
              setFieldError('password', 'Invalid email or password');
            }
          } catch (error: any) {
            console.error('Login error:', error);
            toast.error('Login failed. Please try again.');
            setFieldError('email', ' ');
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
              <label className="flex items-center text-white">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2 rounded text-cyan-400 focus:ring-cyan-400 bg-gray-700"
                />
                Remember me
              </label>
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
              className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>

            <p className="text-center text-white">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitch}
                className="text-cyan-400 hover:text-cyan-300"
              >
                Sign up
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;