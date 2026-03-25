import {
  WizardFormData,
  GeneratedLetter,
  LetterType,
  LetterTemplate,
  ScenarioType,
  ActionType,
  Jurisdiction,
} from '@/types';

// Determine the best letter type based on scenarios + actions selected
export function resolveLetterType(
  scenarios: ScenarioType[],
  actions: ActionType[]
): LetterType {
  // Priority logic: most urgent / legally specific action wins
  if (actions.includes('statute-of-limitations-defense')) return 'statute-of-limitations';
  if (scenarios.includes('dont-recognize-debt') || scenarios.includes('already-paid')) {
    if (actions.includes('dispute-entirely')) return 'not-my-debt';
  }
  if (scenarios.includes('calling-workplace')) return 'cease-workplace-contact';
  if (scenarios.includes('contacting-family')) return 'cease-third-party-contact';
  if (scenarios.includes('wrong-amount') && actions.includes('dispute-entirely')) return 'dispute-amount';
  if (actions.includes('cease-all-contact')) return 'cease-and-desist';
  if (actions.includes('demand-verification')) return 'debt-validation';
  if (actions.includes('dispute-entirely')) return 'not-my-debt';
  // Default
  return 'debt-validation';
}

// Load template for the given letter type + jurisdiction
export async function loadTemplate(
  letterType: LetterType,
  jurisdiction: Jurisdiction
): Promise<LetterTemplate> {
  const isUS = ['new-york', 'california', 'texas', 'florida', 'illinois', 'ohio', 'pennsylvania', 'georgia'].includes(jurisdiction);

  let templates: LetterTemplate[];

  switch (letterType) {
    case 'debt-validation':
      templates = (await import('@/data/templates/debt-validation.json')).default as LetterTemplate[];
      break;
    case 'cease-and-desist':
      templates = (await import('@/data/templates/cease-and-desist.json')).default as LetterTemplate[];
      break;
    case 'statute-of-limitations':
      templates = (await import('@/data/templates/statute-of-limitations.json')).default as LetterTemplate[];
      break;
    case 'not-my-debt':
      templates = (await import('@/data/templates/not-my-debt.json')).default as LetterTemplate[];
      break;
    case 'cease-workplace-contact':
      templates = (await import('@/data/templates/cease-workplace-contact.json')).default as LetterTemplate[];
      break;
    case 'cease-third-party-contact':
      templates = (await import('@/data/templates/cease-third-party-contact.json')).default as LetterTemplate[];
      break;
    case 'dispute-amount':
      templates = (await import('@/data/templates/dispute-amount.json')).default as LetterTemplate[];
      break;
    default:
      templates = (await import('@/data/templates/debt-validation.json')).default as LetterTemplate[];
  }

  // Try exact jurisdiction match first, then country-level, then global
  const exact = templates.find((t) => t.jurisdiction === jurisdiction);
  if (exact) return exact;

  const countryMatch = templates.find((t) =>
    isUS ? t.jurisdiction === 'us-federal' : t.jurisdiction === 'canada-general'
  );
  if (countryMatch) return countryMatch;

  const global = templates.find((t) => t.applicableToAllJurisdictions === true);
  if (global) return global;

  return templates[0];
}

// Interpolate variables into a string
function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `[${key}]`);
}

// Build the full plaintext letter body
export function buildLetterBody(template: LetterTemplate, vars: Record<string, string>): string {
  const lines: string[] = [];

  // Sender block
  lines.push(vars.yourName || '[YOUR NAME]');
  lines.push(vars.yourAddress || '[YOUR ADDRESS]');
  lines.push('');
  lines.push(vars.dateGenerated);
  lines.push('');

  // Recipient
  lines.push(vars.collectorName || 'To Whom It May Concern');
  lines.push('');

  // Re:
  lines.push(`RE: ${interpolate(template.subject, vars)}`);
  if (vars.originalCreditorName) {
    lines.push(`Alleged Original Creditor: ${vars.originalCreditorName}`);
  }
  if (vars.approximateAmount) {
    lines.push(`Alleged Amount: ${vars.approximateAmount}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // Salutation
  lines.push('To Whom It May Concern:');
  lines.push('');

  // Opening
  lines.push(interpolate(template.openingParagraph, vars));
  lines.push('');

  // Body
  for (const para of template.bodyParagraphs) {
    lines.push(interpolate(para, vars));
    lines.push('');
  }

  // Demands
  lines.push('Pursuant to the foregoing, I demand that you:');
  lines.push('');
  template.demands.forEach((demand, i) => {
    lines.push(`  ${i + 1}. ${interpolate(demand, vars)}`);
  });
  lines.push('');

  // Consequences
  lines.push(interpolate(template.consequencesStatement, vars));
  lines.push('');

  // Closing
  lines.push(interpolate(template.closingStatement, vars));
  lines.push('');
  lines.push('Sincerely,');
  lines.push('');
  lines.push('');
  lines.push('_________________________');
  lines.push(vars.yourName || '[YOUR SIGNATURE]');

  // Legal citations
  lines.push('');
  lines.push('---');
  lines.push('APPLICABLE LAW:');
  for (const cite of template.legalCitations) {
    lines.push(`• ${cite.act} — ${cite.section}`);
  }

  return lines.join('\n');
}

// Main: generate the full letter object from wizard form data
export async function generateLetter(formData: WizardFormData): Promise<GeneratedLetter> {
  const letterType = resolveLetterType(formData.scenarios, formData.actions);
  const template = await loadTemplate(letterType, formData.jurisdiction as Jurisdiction);

  const dateGenerated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const vars: Record<string, string> = {
    yourName: formData.yourName,
    yourAddress: formData.yourAddress,
    collectorName: formData.collectorName || 'Collection Agency',
    originalCreditorName: formData.originalCreditorName || 'Original Creditor',
    approximateAmount: formData.approximateAmount ? `$${formData.approximateAmount}` : '',
    debtAgeYears: formData.debtAgeYears,
    dateGenerated,
    jurisdiction: formData.jurisdiction,
  };

  const letterBody = buildLetterBody(template, vars);

  return {
    letterType,
    jurisdiction: formData.jurisdiction,
    yourName: formData.yourName,
    yourAddress: formData.yourAddress,
    collectorName: formData.collectorName,
    originalCreditorName: formData.originalCreditorName,
    debtType: formData.debtType,
    approximateAmount: formData.approximateAmount,
    dateGenerated,
    letterBody,
    template,
    formData,
  };
}

// Letter type display labels
export const LETTER_TYPE_LABELS: Record<LetterType, string> = {
  'debt-validation':         'Debt Validation Request',
  'cease-and-desist':        'Cease & Desist — Stop All Contact',
  'statute-of-limitations':  'Statute of Limitations Defense',
  'dispute-amount':          'Dispute of Amount Claimed',
  'not-my-debt':             'Not My Debt / Identity Theft Dispute',
  'cease-workplace-contact': 'Cease Workplace Contact',
  'cease-third-party-contact': 'Cease Third-Party Contact',
};
