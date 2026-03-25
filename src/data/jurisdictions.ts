import { JurisdictionInfo } from '@/types';

export const JURISDICTIONS: JurisdictionInfo[] = [
  { id: 'ontario',          name: 'Ontario',           country: 'CA', flag: '🇨🇦', abbreviation: 'ON' },
  { id: 'quebec',           name: 'Quebec',            country: 'CA', flag: '🇨🇦', abbreviation: 'QC' },
  { id: 'british-columbia', name: 'British Columbia',  country: 'CA', flag: '🇨🇦', abbreviation: 'BC' },
  { id: 'alberta',          name: 'Alberta',           country: 'CA', flag: '🇨🇦', abbreviation: 'AB' },
  { id: 'new-york',         name: 'New York',          country: 'US', flag: '🇺🇸', abbreviation: 'NY' },
  { id: 'california',       name: 'California',        country: 'US', flag: '🇺🇸', abbreviation: 'CA' },
  { id: 'texas',            name: 'Texas',             country: 'US', flag: '🇺🇸', abbreviation: 'TX' },
  { id: 'florida',          name: 'Florida',           country: 'US', flag: '🇺🇸', abbreviation: 'FL' },
  { id: 'illinois',         name: 'Illinois',          country: 'US', flag: '🇺🇸', abbreviation: 'IL' },
  { id: 'ohio',             name: 'Ohio',              country: 'US', flag: '🇺🇸', abbreviation: 'OH' },
  { id: 'pennsylvania',     name: 'Pennsylvania',      country: 'US', flag: '🇺🇸', abbreviation: 'PA' },
  { id: 'georgia',          name: 'Georgia',           country: 'US', flag: '🇺🇸', abbreviation: 'GA' },
];

export const JURISDICTION_LABELS: Record<string, string> = Object.fromEntries(
  JURISDICTIONS.map((j) => [j.id, j.name])
);

export const JURISDICTION_URL_SLUGS: Record<string, string> = {
  ontario:            'ontario',
  quebec:             'quebec',
  'british-columbia': 'british-columbia',
  alberta:            'alberta',
  'new-york':         'new-york',
  california:         'california',
  texas:              'texas',
  florida:            'florida',
  illinois:           'illinois',
  ohio:               'ohio',
  pennsylvania:       'pennsylvania',
  georgia:            'georgia',
};
