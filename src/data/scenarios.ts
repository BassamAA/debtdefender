import { ScenarioInfo } from '@/types';

export const SCENARIOS: ScenarioInfo[] = [
  {
    id: 'calling-demanding-payment',
    label: 'They called me demanding payment',
    icon: '📞',
    severity: 'medium',
  },
  {
    id: 'written-notice-received',
    label: 'I received a written collection notice',
    icon: '✉️',
    severity: 'low',
  },
  {
    id: 'threatening-to-sue',
    label: "They're threatening to sue me",
    icon: '⚖️',
    severity: 'high',
  },
  {
    id: 'calling-workplace',
    label: "They're calling my workplace",
    icon: '🏢',
    severity: 'high',
  },
  {
    id: 'contacting-family',
    label: "They're contacting my family or friends",
    icon: '👨‍👩‍👧',
    severity: 'high',
  },
  {
    id: 'reporting-on-credit',
    label: "They're reporting this on my credit report",
    icon: '📊',
    severity: 'medium',
  },
  {
    id: 'dont-recognize-debt',
    label: "I don't recognize this debt at all",
    icon: '❓',
    severity: 'high',
  },
  {
    id: 'already-paid',
    label: 'I already paid this debt',
    icon: '✅',
    severity: 'high',
  },
  {
    id: 'wrong-amount',
    label: 'The amount they claim is wrong',
    icon: '🔢',
    severity: 'medium',
  },
];
