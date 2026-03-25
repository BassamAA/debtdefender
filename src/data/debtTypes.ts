import { DebtTypeInfo } from '@/types';

export const DEBT_TYPES: DebtTypeInfo[] = [
  { id: 'credit-card',          label: 'Credit Card',            icon: '💳' },
  { id: 'medical',              label: 'Medical Bill',           icon: '🏥' },
  { id: 'auto-loan',            label: 'Auto Loan / Repossession',icon: '🚗' },
  { id: 'personal-loan',        label: 'Personal Loan',          icon: '📋' },
  { id: 'student-loan',         label: 'Student Loan (Private)', icon: '🎓' },
  { id: 'mortgage-deficiency',  label: 'Mortgage Deficiency',    icon: '🏠' },
  { id: 'utility-bill',         label: 'Utility Bill',           icon: '💡' },
];

export const DEBT_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  DEBT_TYPES.map((d) => [d.id, d.label])
);

export const DEBT_TYPE_URL_SLUGS: Record<string, string> = {
  'credit-card':         'credit-card-debt',
  'medical':             'medical-debt',
  'auto-loan':           'auto-loan-debt',
  'personal-loan':       'personal-loan-debt',
  'student-loan':        'student-loan-debt',
  'mortgage-deficiency': 'mortgage-deficiency',
  'utility-bill':        'utility-bill-debt',
};
