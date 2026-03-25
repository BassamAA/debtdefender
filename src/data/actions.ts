import { ActionInfo } from '@/types';

export const ACTIONS: ActionInfo[] = [
  {
    id: 'demand-verification',
    label: 'Demand they verify the debt',
    description: 'Require the collector to prove the debt is valid and that they have the right to collect it.',
    icon: '🔍',
  },
  {
    id: 'dispute-entirely',
    label: 'Dispute the debt entirely',
    description: "Tell the collector this isn't your debt, the amount is wrong, or the debt was already paid.",
    icon: '🚫',
  },
  {
    id: 'cease-all-contact',
    label: 'Tell them to stop contacting me',
    description: 'Legally require the collector to cease all further communication with you.',
    icon: '🛑',
  },
  {
    id: 'statute-of-limitations-defense',
    label: 'The debt is past the statute of limitations',
    description: "The debt is too old to sue you over. Put them on notice that you know your rights.",
    icon: '⏰',
  },
  {
    id: 'report-violation',
    label: 'Report a violation of my rights',
    description: "They've broken the law. Document it formally and put them on notice you're taking action.",
    icon: '⚠️',
  },
];
