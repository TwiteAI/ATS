import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSwitch: () => void;
  onLoginSuccess: () => void;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  rememberMe: Yup.boolean()
});

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch, onLoginSuccess }) => {
  return (
    <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm max-w-md w-full mx-auto">
      <Formik
        initialValues={{ username: '', password: '', rememberMe: false }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Simulate login - replace with actual API call
          setTimeout(() => {
            setSubmitting(false);
            // For demo purposes, always succeed
            toast.success('Login successful!');
            onLoginSuccess();
          }, 1000);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <Field
                name="username"
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.username && touched.username && (
                <div className="text-red-500 text-sm mt-1">{errors.username}</div>
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

            <div className="flex items-center justify-between">
              <label className="flex items-center text-white">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2 rounded text-cyan-400 focus:ring-cyan-400"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-cyan-400 hover:text-cyan-300"
                onClick={() => toast.error('Feature not implemented')}
              >
                Forgot my password
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