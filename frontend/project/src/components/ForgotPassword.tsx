import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { CircuitBoard } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
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
          <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Reset Password</h2>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={(values, { setSubmitting }) => {
                // Simulate password reset email - replace with actual API call
                setTimeout(() => {
                  setSubmitting(false);
                  toast.success('Password reset instructions sent to your email');
                  onBack();
                }, 1000);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
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

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={onBack}
                      className="w-full bg-transparent border border-cyan-400 text-cyan-400 py-3 rounded-lg hover:bg-cyan-400 hover:text-white transition-colors"
                    >
                      Back to Login
                    </button>
                  </div>

                  <p className="text-center text-gray-400 text-sm">
                    We'll send password reset instructions to your email
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;