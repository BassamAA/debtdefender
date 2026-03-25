import { NextRequest, NextResponse } from 'next/server';
import { generateLetter } from '@/lib/templateEngine';
import type { WizardFormData } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const formData: WizardFormData = await req.json();
    const letter = await generateLetter(formData);
    return NextResponse.json({
      letterBody: letter.letterBody,
      letterType: letter.letterType,
    });
  } catch (err) {
    console.error('[generate-preview]', err);
    return NextResponse.json({ error: 'Failed to generate letter' }, { status: 500 });
  }
}
