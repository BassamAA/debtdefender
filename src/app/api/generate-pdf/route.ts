import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { generateLetter } from '@/lib/templateEngine';
import type { WizardFormData } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return NextResponse.json({ error: 'Payment not complete' }, { status: 402 });
    }

    // Reconstruct form data from Stripe session metadata
    const meta = session.metadata ?? {};
    const formData: WizardFormData = {
      jurisdiction:         meta.jurisdiction as WizardFormData['jurisdiction'],
      debtType:             meta.debtType as WizardFormData['debtType'],
      collectorName:        meta.collectorName ?? '',
      originalCreditorName: meta.originalCreditorName ?? '',
      approximateAmount:    meta.approximateAmount ?? '',
      debtAgeYears:         meta.debtAgeYears ?? '',
      yourName:             meta.yourName ?? '',
      yourAddress:          meta.yourAddress ?? '',
      scenarios:            JSON.parse(meta.scenarios ?? '[]'),
      actions:              JSON.parse(meta.actions ?? '[]'),
    };

    const letter = await generateLetter(formData);

    // Render PDF server-side
    const { renderToBuffer } = await import('@react-pdf/renderer');
    const React = (await import('react')).default;
    const { LetterPDFDocument } = await import('@/lib/pdfGenerator');

    // Cast to avoid react-pdf type mismatch with React element
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(LetterPDFDocument, { letter }) as any;
    const pdfBuffer = await renderToBuffer(element);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="DebtDispute-Letter-${letter.letterType}.pdf"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err) {
    console.error('[generate-pdf]', err);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }
}
