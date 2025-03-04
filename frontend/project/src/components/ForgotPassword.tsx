import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { CircuitBoard, ArrowLeft } from 'lucide-react';
import { forgotPassword, resetPassword } from '../utils/api'; // Import necessary API functions

interface ForgotPasswordProps {
  onBack: () => void;
}

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState(''); // ✅ State for storing email
  const [passcode, setPasscode] = useState(''); // ✅ State for storing passcode

  // Step 1: Enter Email
  const renderStep1 = () => (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={EmailSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setUserEmail(values.email); // ✅ Store the email for next steps
          const response = await forgotPassword(values.email); // ✅ Call API function
          if (response) {
            toast.success('Passcode sent to your email');
            setStep(2);
          } else {
            toast.error('Failed to send passcode. Please try again.');
          }
        } catch (error) {
          toast.error('Failed to send passcode');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
          <p className="text-gray-300 mb-6">Enter your email address to receive a passcode.</p>
          <Field
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Passcode'}
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Enter Passcode</h2>
      <p className="text-gray-300 mb-6">Enter the 6-digit passcode sent to {userEmail}</p>
      
      <input
        type="text"
        placeholder="Enter passcode"
        className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      
      <button
        onClick={() => setStep(3)} // ✅ Move directly to password reset step
        className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors"
      >
        Continue
      </button>
    </div>
  );

  const renderStep3 = () => (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={Yup.object().shape({
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm password is required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Sending reset password request...");
          await resetPassword(userEmail, passcode, values.password); // ✅ Pass everything to API
          toast.success('Password reset successfully');
          onBack(); // ✅ Redirect back to login
        } catch (error: any) {
          toast.error(error.message || 'Invalid passcode or reset failed');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
          <Field
            name="password"
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}

          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}

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
    <div className="min-h-screen bg-[#020817] relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557264322-b44d383a2906?auto=format&fit=crop&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-8 w-8 text-cyan-400" />
            <h1 className="text-3xl font-bold tracking-wider text-white">TWITE AI TECHNOLOGIES</h1>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm max-w-md w-full relative">
            <button onClick={onBack} className="absolute left-4 top-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Login
            </button>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
