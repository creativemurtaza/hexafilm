export interface TextFieldConfig {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  required?: boolean;
}

export interface ChoiceConfig {
  letter: string;
  label: string;
  value: string;
}

export interface StepConfig {
  id: string;
  number: number;
  question: string;
  type: 'text' | 'choice';
  fields?: TextFieldConfig[];
  choices?: ChoiceConfig[];
  answerKey?: string;
  submitLabel: string;
}

export const steps: StepConfig[] = [
  {
    id: 'name',
    number: 1,
    question: 'Your name',
    type: 'text',
    fields: [
      { key: 'firstName', label: 'First name', placeholder: 'Jane', required: true },
      { key: 'lastName', label: 'Last name', placeholder: 'Doe', required: true },
    ],
    submitLabel: 'OK',
  },
  {
    id: 'contact',
    number: 2,
    question: 'Contact',
    type: 'text',
    fields: [
      { key: 'email', label: 'Email', placeholder: 'jane@company.com', type: 'email', required: true },
      { key: 'phone', label: 'Phone (optional)', placeholder: '+1 555 000 0000', type: 'tel' },
    ],
    submitLabel: 'OK',
  },
  {
    id: 'website',
    number: 3,
    question: 'Company website',
    type: 'text',
    fields: [
      { key: 'website', label: 'URL', placeholder: 'https://yourcompany.com', type: 'url', required: true },
    ],
    submitLabel: 'OK',
  },
  {
    id: 'businessType',
    number: 4,
    question: 'What do you sell?',
    type: 'choice',
    answerKey: 'businessType',
    choices: [
      { letter: 'A', label: 'E-commerce / Products', value: 'ecommerce' },
      { letter: 'B', label: 'Coaching / Consulting', value: 'coaching' },
      { letter: 'C', label: 'Agency / Services', value: 'agency' },
      { letter: 'D', label: 'SaaS / Software', value: 'saas' },
      { letter: 'E', label: 'Local / Service business', value: 'local' },
      { letter: 'F', label: 'Other', value: 'other' },
    ],
    submitLabel: 'OK',
  },
  {
    id: 'goal',
    number: 5,
    question: 'Your main goal',
    type: 'choice',
    answerKey: 'mainGoal',
    choices: [
      { letter: 'A', label: 'Lower my cost-per-lead', value: 'lower-cpl' },
      { letter: 'B', label: 'Get more leads', value: 'more-leads' },
      { letter: 'C', label: 'Build brand awareness', value: 'brand' },
      { letter: 'D', label: 'Launch a new product', value: 'launch' },
    ],
    submitLabel: 'OK',
  },
  {
    id: 'revenue',
    number: 6,
    question: 'Current monthly revenue',
    type: 'choice',
    answerKey: 'monthlyRevenue',
    choices: [
      { letter: 'A', label: 'Under  €25k', value: 'under-25k' },
      { letter: 'B', label: '€25k–€50k', value: '25k-50k' },
      { letter: 'C', label: '€50k–€100k', value: '50k-100k' },
      { letter: 'D', label: '€100k–€250k', value: '100k-250k' },
      { letter: 'E', label: 'Over €250k', value: 'over-250k' },
    ],
    submitLabel: 'OK',
  },
  {
    id: 'teamSize',
    number: 7,
    question: 'Team size',
    type: 'choice',
    answerKey: 'teamSize',
    choices: [
      { letter: 'A', label: 'Just me / freelancers', value: 'solo' },
      { letter: 'B', label: '1–3', value: '1-3' },
      { letter: 'C', label: '3–10', value: '3-10' },
      { letter: 'D', label: '10–20', value: '10-20' },
      { letter: 'E', label: '20+', value: '20+' },
    ],
    submitLabel: 'Submit',
  },
];

export const defaultAnswers: Record<string, string> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  website: '',
  businessType: '',
  mainGoal: '',
  monthlyRevenue: '',
  teamSize: '',
};
