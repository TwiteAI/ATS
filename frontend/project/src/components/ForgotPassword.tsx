import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { CircuitBoard, ArrowLeft } from 'lucide-react';

 
interface ForgotPasswordProps {
  onBack: () => void;
}
 
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});
 
const PasscodeSchema = Yup.object().shape({
  passcode: Yup.string()
    .matches(/^\d{6}$/, 'Passcode must be exactly 6 digits')
    .required('Passcode is required'),
});
 
const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
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
          // Simulate API call to send passcode
          await new Promise(resolve => setTimeout(resolve, 1000));
          setEmail(values.email);
          toast.success('Passcode sent to your email');
          setStep(2);
        } catch (error) {
          toast.error('Failed to send passcode');
        } finally {
          setSubmitting(false);
        }
      }}
>
      {({ errors, touched, isSubmitting }) => (
<Form className="space-y-6">
<div>
<h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
<p className="text-gray-300 mb-6">Enter your email address and we'll send you a passcode to reset your password.</p>
<Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {errors.email && touched.email && (
<div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
</div>
 
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
<Formik
      initialValues={{ passcode: '' }}
      validationSchema={PasscodeSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // Simulate API call to verify passcode
          await new Promise(resolve => setTimeout(resolve, 1000));
          toast.success('Passcode verified');
          setStep(3);
        } catch (error) {
          toast.error('Invalid passcode');
        } finally {
          setSubmitting(false);
        }
      }}
>
      {({ errors, touched, isSubmitting }) => (
<Form className="space-y-6">
<div>
<h2 className="text-2xl font-bold text-white mb-6">Enter Passcode</h2>
<p className="text-gray-300 mb-6">Enter the 6-digit passcode sent to {email}</p>
<Field
              name="passcode"
              type="text"
              placeholder="Enter 6-digit passcode"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              maxLength={6}
            />
            {errors.passcode && touched.passcode && (
<div className="text-red-500 text-sm mt-1">{errors.passcode}</div>
            )}
</div>
 
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
>
            {isSubmitting ? 'Verifying...' : 'Verify Passcode'}
</button>
</Form>
      )}
</Formik>
  );
 
  const renderStep3 = () => (
<Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={PasswordSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // Simulate API call to reset password
          await new Promise(resolve => setTimeout(resolve, 1000));
          toast.success('Password reset successfully');
          onBack();
        } catch (error) {
          toast.error('Failed to reset password');
        } finally {
          setSubmitting(false);
        }
      }}
>
      {({ errors, touched, isSubmitting }) => (
<Form className="space-y-6">
<div>
<h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
<p className="text-gray-300 mb-6">Enter your new password</p>
<div className="space-y-4">
<div>
<Field
                  name="password"
                  type="password"
                  placeholder="New password"
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
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                {errors.confirmPassword && touched.confirmPassword && (
<div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                )}
</div>
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
<div className="min-h-screen bg-[#020817] relative overflow-hidden">
      {/* Wave Background */}
<div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557264322-b44d383a2906?auto=format&fit=crop&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)'
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
<button
              onClick={() => step === 1 ? onBack() : setStep(step - 1)}
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
</div>
</div>
  );
};
 
export default ForgotPassword;