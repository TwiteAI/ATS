import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Calendar } from 'lucide-react';
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
    .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  skills: Yup.string().required('Skills are required'),
  experience: Yup.number()
    .typeError('Experience must be a number')
    .min(0, 'Experience cannot be negative')
    .required('Experience is required'),
  role: Yup.string(),
  status: Yup.string(),
  current_ctc: Yup.number()
    .typeError('Current CTC must be a number')
    .min(0, 'Current CTC cannot be negative'),
  expected_ctc: Yup.number()
    .typeError('Expected CTC must be a number')
    .min(0, 'Expected CTC cannot be negative'),
  interview_date: Yup.date().nullable(),
  notes: Yup.string()
});

const statusOptions = [
  'Pending',
  'Reviewed',
  'Interviewing',
  'Offered',
  'Rejected'
];

const CandidateForm: React.FC<Props> = ({ onSubmit, initialValues, onClose }) => {
  const defaultValues: CandidateFormValues = {
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    skills: initialValues?.skills ? initialValues.skills.join(', ') : '',
    experience: initialValues?.experience ? initialValues.experience.toString() : '',
    role: initialValues?.role || '',
    status: initialValues?.status || 'Pending',
    current_ctc: initialValues?.current_ctc ? initialValues.current_ctc.toString() : '',
    expected_ctc: initialValues?.expected_ctc ? initialValues.expected_ctc.toString() : '',
    interview_date: initialValues?.interview_date || '',
    notes: initialValues?.notes || ''
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl relative text-white">
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
                role: values.role,
                status: values.status,
                current_ctc: values.current_ctc ? Number(values.current_ctc) : undefined,
                expected_ctc: values.expected_ctc ? Number(values.expected_ctc) : undefined,
                interview_date: values.interview_date,
                notes: values.notes
              });
              onClose();
            } catch (error) {
              console.error("Form submission error:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <Field
                    type="text"
                    name="role"
                    id="role"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-300">
                    Status
                  </label>
                  <Field
                    as="select"
                    name="status"
                    id="status"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="current_ctc" className="block text-sm font-medium text-gray-300">
                    Current CTC
                  </label>
                  <Field
                    type="text"
                    name="current_ctc"
                    id="current_ctc"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name="current_ctc" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="expected_ctc" className="block text-sm font-medium text-gray-300">
                    Expected CTC
                  </label>
                  <Field
                    type="text"
                    name="expected_ctc"
                    id="expected_ctc"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name="expected_ctc" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Phone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-300">
                    Experience (years)
                  </label>
                  <Field
                    type="number"
                    name="experience"
                    id="experience"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-300">
                  Skills (comma-separated)
                </label>
                <Field
                  type="text"
                  name="skills"
                  id="skills"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                />
                <ErrorMessage name="skills" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="interview_date" className="block text-sm font-medium text-gray-300">
                  Interview Date
                </label>
                <div className="relative">
                  <Field
                    type="date"
                    name="interview_date"
                    id="interview_date"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <ErrorMessage name="interview_date" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300">
                  Notes
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  id="notes"
                  rows={4}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-2"
                  placeholder="Add any additional notes about the candidate..."
                />
                <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
              </div>

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