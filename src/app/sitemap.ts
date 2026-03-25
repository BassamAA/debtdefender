import { MetadataRoute } from 'next';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { DEBT_TYPE_URL_SLUGS } from '@/data/debtTypes';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://debtdispute.org';

const LETTER_SLUGS = [
  'debt-validation',
  'cease-and-desist',
  'statute-of-limitations-defense',
  'not-my-debt',
  'cease-workplace-contact',
  'cease-third-party-contact',
  'dispute-amount',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/wizard`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tracker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Letter type pages
  for (const slug of LETTER_SLUGS) {
    routes.push({
      url: `${BASE_URL}/letters/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  }

  // Jurisdiction + debt type combo pages
  for (const j of JURISDICTIONS) {
    for (const [, slug] of Object.entries(DEBT_TYPE_URL_SLUGS)) {
      routes.push({
        url: `${BASE_URL}/${j.id}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    }
  }

  return routes;
}
