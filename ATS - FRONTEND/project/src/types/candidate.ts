export interface Candidate {
  id?: number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  user_id?: string;
  created_at?: string;
  role?: string;
  status?: string;
  current_ctc?: number;
  expected_ctc?: number;
  interview_date?: string;
  notes?: string;
}

export interface CandidateFormValues {
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
  role?: string;
  status?: string;
  current_ctc?: string;
  expected_ctc?: string;
  interview_date?: string;
  notes?: string;
}