import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { CandidateFormValues, Candidate } from '../types/candidate';

interface Props {
  onSubmit: (values: Omit<Candidate, 'id'>) => Promise<void>;
  initialValues?: Candidate;
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string()
    .matches(/\d{10,}/, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  skills: Yup.string().required('Skills are required'),
  experience: Yup.number()
    .typeError('Experience must be a number')
    .min(0, 'Experience cannot be negative')
    .required('Experience is required'),
});

const CandidateForm: React.FC<Props> = ({ onSubmit, initialValues, onClose }) => {
  const defaultValues: CandidateFormValues = {
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    skills: initialValues?.skills?.join(', ') || '',
    experience: initialValues?.experience?.toString() || '',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative text-white">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">
          {initialValues ? 'Edit Candidate' : 'Add Candidate'}
        </h2>
        
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSubmit({
                name: values.name,
                email: values.email,
                phone: values.phone,
                skills: values.skills.split(',').map(skill => skill.trim()),
                experience: Number(values.experience),
              });
              onClose();
            } catch (error) {
              console.error("Form submission error:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {['name', 'email', 'phone', 'skills', 'experience'].map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-300">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <Field
                    type={field === 'experience' ? 'number' : 'text'}
                    name={field}
                    id={field}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CandidateForm;
