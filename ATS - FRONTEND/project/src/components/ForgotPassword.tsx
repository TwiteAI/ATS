import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { resetPasswordForEmail } from '../utils/localStorage';

interface ForgotPasswordProps {
  onBack: () => void;
}

// Validation Schemas
const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const PasscodeSchema = Yup.object().shape({
  passcode: Yup.string().matches(/^\d{6}$/, 'Passcode must be exactly 6 digits').required('Passcode is required'),
});

const PasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const renderStep1 = () => (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={EmailSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await resetPasswordForEmail(values.email);
          setEmail(values.email);
          toast.success('Password reset instructions sent to your email');
          setStep(2);
        } catch (error: any) {
          toast.error(error.message || 'Failed to send password reset instructions');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
          <p className="text-gray-300 mb-6">Enter your email address, and we'll send you a passcode to reset your password.</p>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Check Your Email</h2>
      <p className="text-gray-300 mb-6">
        We've sent password reset instructions to <strong>{email}</strong>. Please check your email and follow the link to reset your password.
      </p>
      <p className="text-gray-300 mb-6">
        If you don't see the email, check your spam folder or request another reset email.
      </p>

      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors"
      >
        Request Another Email
      </button>
    </div>
  );

  const renderStep3 = () => (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={PasswordSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          toast.success('Password reset successfully');
          onBack();
        } catch (error: any) {
          toast.error('Failed to reset password');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
          <p className="text-gray-300 mb-6">Enter your new password</p>

          <div className="space-y-4">
            <div>
              <Field
                name="password"
                type="password"
                placeholder="New password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            <div>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={() => (step === 1 ? onBack() : setStep(step - 1))}
          className="absolute left-4 top-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          {step === 1 ? 'Back to Login' : 'Back'}
        </button>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default ForgotPassword;