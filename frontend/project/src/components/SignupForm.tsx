import { useState } from 'react';
import toast from 'react-hot-toast';

interface SignupFormProps {
  onSwitch: () => void;
  onSignupSuccess: (userData: {
    name: string;
    email: string;
    company_name: string;
    job_title: string;
    phone: string;
    password: string;
    confirm_password: string;
  }) => Promise<void>;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_name: '',
    job_title: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      await onSignupSuccess({
        name: formData.name,
        email: formData.email,
        company_name: formData.company_name,
        job_title: formData.job_title,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.confirm_password // Send only password
      });
      toast.success('Signup successful!');
    } catch (error) {
      toast.error('Error signing up, please try again!');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="input" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} required className="input" />
        <input type="text" name="job_title" placeholder="Job Title" onChange={handleChange} required className="input" />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className="input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
        <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required className="input" />

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-blue-600 font-medium hover:underline">Login</button>
      </p>
    </div>
  );
};

export default SignupForm;
