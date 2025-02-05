export interface Candidate {
  id?: number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
}

export interface CandidateFormValues {
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
}