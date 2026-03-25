import { NextRequest, NextResponse } from 'next/server';
import type { InteractionLog } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { logs }: { logs: InteractionLog[] } = await req.json();

    const React = (await import('react')).default;
    const { Document, Page, Text, View, StyleSheet } = await import('@react-pdf/renderer');
    const { renderToBuffer } = await import('@react-pdf/renderer');

    const styles = StyleSheet.create({
      page: { fontFamily: 'Times-Roman', fontSize: 10, padding: 60, color: '#1a1a1a', lineHeight: 1.5 },
      header: { marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#0a1c38', paddingBottom: 10 },
      title: { fontFamily: 'Times-Bold', fontSize: 14, color: '#0a1c38', marginBottom: 4 },
      subtitle: { fontSize: 9, color: '#666' },
      summary: { backgroundColor: '#f0f4f8', padding: 10, marginBottom: 20, borderRadius: 4 },
      summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
      summaryLabel: { fontSize: 9, color: '#555' },
      summaryValue: { fontFamily: 'Times-Bold', fontSize: 9, color: '#0a1c38' },
      entry: { marginBottom: 16, borderWidth: 1, borderColor: '#e0e0e0', padding: 10, borderRadius: 4 },
      entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
      collectorName: { fontFamily: 'Times-Bold', fontSize: 11 },
      dateBadge: { fontSize: 9, color: '#666' },
      label: { fontFamily: 'Times-Bold', fontSize: 9, color: '#555', marginBottom: 2 },
      text: { fontSize: 9, color: '#333', marginBottom: 6, lineHeight: 1.4 },
      violationBox: { backgroundColor: '#fff8f8', borderWidth: 1, borderColor: '#ffaaaa', padding: 6, marginTop: 4, borderRadius: 3 },
      violationTitle: { fontFamily: 'Times-Bold', fontSize: 8, color: '#cc0000', marginBottom: 4 },
      violationItem: { fontSize: 8, color: '#cc4444', marginBottom: 2 },
      footer: { position: 'absolute', bottom: 30, left: 60, right: 60, textAlign: 'center', fontSize: 7, color: '#aaa', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 6 },
    });

    const totalViolations = logs.reduce((sum, l) => sum + l.violationsNoted.length, 0);

    const doc = React.createElement(
      Document,
      { title: 'DebtDefender Interaction Log' },
      React.createElement(
        Page,
        { size: 'LETTER', style: styles.page },
        // Header
        React.createElement(
          View,
          { style: styles.header },
          React.createElement(Text, { style: styles.title }, 'DebtDefender — Collector Interaction Log'),
          React.createElement(Text, { style: styles.subtitle }, `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} — This document may serve as evidence for CFPB complaints or legal action.`)
        ),
        // Summary
        React.createElement(
          View,
          { style: styles.summary },
          React.createElement(View, { style: styles.summaryRow },
            React.createElement(Text, { style: styles.summaryLabel }, 'Total Interactions:'),
            React.createElement(Text, { style: styles.summaryValue }, String(logs.length))
          ),
          React.createElement(View, { style: styles.summaryRow },
            React.createElement(Text, { style: styles.summaryLabel }, 'Total Violations Noted:'),
            React.createElement(Text, { style: styles.summaryValue }, String(totalViolations))
          ),
          React.createElement(View, { style: styles.summaryRow },
            React.createElement(Text, { style: styles.summaryLabel }, 'Potential Statutory Damages (FDCPA @ $1,000/violation):'),
            React.createElement(Text, { style: styles.summaryValue }, `$${(totalViolations * 1000).toLocaleString()}`)
          )
        ),
        // Entries
        ...logs.map((log) =>
          React.createElement(
            View,
            { key: log.id, style: styles.entry },
            React.createElement(
              View,
              { style: styles.entryHeader },
              React.createElement(Text, { style: styles.collectorName }, log.collectorName),
              React.createElement(Text, { style: styles.dateBadge }, `${log.date} — via ${log.contactMethod}`)
            ),
            React.createElement(Text, { style: styles.label }, 'What They Said / Did:'),
            React.createElement(Text, { style: styles.text }, log.whatTheySaid),
            log.yourResponse
              ? React.createElement(React.Fragment, { key: 'response' },
                  React.createElement(Text, { style: styles.label }, 'Your Response:'),
                  React.createElement(Text, { style: styles.text }, log.yourResponse)
                )
              : null,
            log.violationsNoted.length > 0
              ? React.createElement(
                  View,
                  { style: styles.violationBox },
                  React.createElement(Text, { style: styles.violationTitle }, `⚠️ Potential Violations (${log.violationsNoted.length}):`),
                  ...log.violationsNoted.map((v) =>
                    React.createElement(Text, { key: v, style: styles.violationItem }, `• ${v}`)
                  )
                )
              : null
          )
        ),
        React.createElement(Text, { style: styles.footer }, 'DebtDefender Interaction Log — For personal documentation only. Not legal advice. Consult a licensed attorney.')
      )
    );

    const buffer = await renderToBuffer(doc);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="DebtDefender-Interaction-Log.pdf"',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err) {
    console.error('[export-tracker]', err);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
