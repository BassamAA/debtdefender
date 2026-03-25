import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { GeneratedLetter } from '@/types';
import { LETTER_TYPE_LABELS } from '@/lib/templateEngine';

// Register fonts (using standard PDF fonts - no external download needed)
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 11,
    paddingTop: 72,
    paddingBottom: 72,
    paddingHorizontal: 72,
    color: '#1a1a1a',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#0a1c38',
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 8,
    color: '#4682b4',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Times-Bold',
    fontSize: 7,
    color: '#888',
  },
  senderBlock: {
    marginBottom: 24,
  },
  senderName: {
    fontFamily: 'Times-Bold',
    fontSize: 12,
  },
  senderAddress: {
    fontSize: 11,
    color: '#333',
  },
  date: {
    marginBottom: 20,
    fontSize: 11,
  },
  recipientBlock: {
    marginBottom: 20,
  },
  recipientName: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
  },
  reBlock: {
    backgroundColor: '#f0f4f8',
    padding: 10,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#0a1c38',
  },
  reLabel: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    marginBottom: 4,
  },
  reText: {
    fontSize: 10,
    color: '#333',
  },
  salutation: {
    marginBottom: 12,
    fontSize: 11,
  },
  paragraph: {
    marginBottom: 12,
    fontSize: 11,
    textAlign: 'justify',
  },
  demandsTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    marginBottom: 8,
    marginTop: 4,
  },
  demandItem: {
    fontSize: 10,
    marginBottom: 6,
    paddingLeft: 16,
    textAlign: 'justify',
  },
  demandNumber: {
    fontFamily: 'Times-Bold',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginVertical: 16,
  },
  closingParagraph: {
    marginBottom: 12,
    fontSize: 11,
    textAlign: 'justify',
  },
  signature: {
    marginTop: 36,
    marginBottom: 60,
  },
  sincerely: {
    fontSize: 11,
    marginBottom: 40,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    width: 200,
    marginBottom: 4,
  },
  signatureName: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
  },
  citationsSection: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 12,
  },
  citationsTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  citationItem: {
    fontSize: 8,
    color: '#555',
    marginBottom: 4,
  },
  citationAct: {
    fontFamily: 'Times-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 72,
    right: 72,
    textAlign: 'center',
    fontSize: 7,
    color: '#aaa',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 6,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 72,
    fontSize: 8,
    color: '#aaa',
  },
  warningBox: {
    backgroundColor: '#fff8ed',
    borderWidth: 1,
    borderColor: '#f97316',
    padding: 8,
    marginBottom: 16,
    borderRadius: 3,
  },
  warningText: {
    fontSize: 8,
    color: '#7c3c00',
    textAlign: 'center',
  },
});

interface Props {
  letter: GeneratedLetter;
}

export function LetterPDFDocument({ letter }: Props) {
  const letterLabel = LETTER_TYPE_LABELS[letter.letterType] ?? letter.letterType;

  return (
    <Document
      title={`DebtDispute — ${letterLabel}`}
      author="DebtDispute"
      subject={`${letterLabel} — ${letter.dateGenerated}`}
      keywords="debt collection, FDCPA, consumer rights, debt dispute"
      creator="DebtDispute (debtdispute.com)"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <Text style={styles.headerTitle}>DebtDispute — Know Your Rights</Text>
          <Text style={styles.headerSubtitle}>
            {letterLabel.toUpperCase()} — GENERATED {letter.dateGenerated.toUpperCase()}
          </Text>
        </View>

        {/* Sender */}
        <View style={styles.senderBlock}>
          <Text style={styles.senderName}>{letter.yourName || '[YOUR NAME]'}</Text>
          <Text style={styles.senderAddress}>{letter.yourAddress || '[YOUR ADDRESS]'}</Text>
        </View>

        {/* Date */}
        <Text style={styles.date}>{letter.dateGenerated}</Text>

        {/* Recipient */}
        <View style={styles.recipientBlock}>
          <Text style={styles.recipientName}>{letter.collectorName || 'Collection Agency'}</Text>
        </View>

        {/* RE block */}
        <View style={styles.reBlock}>
          <Text style={styles.reLabel}>RE: {letter.template.subject}</Text>
          {letter.originalCreditorName && (
            <Text style={styles.reText}>
              Alleged Original Creditor: {letter.originalCreditorName}
            </Text>
          )}
          {letter.approximateAmount && (
            <Text style={styles.reText}>
              Alleged Amount: ${letter.approximateAmount}
            </Text>
          )}
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>To Whom It May Concern:</Text>

        {/* Opening */}
        <Text style={styles.paragraph}>{letter.template.openingParagraph}</Text>

        {/* Body paragraphs */}
        {letter.template.bodyParagraphs.map((para, i) => (
          <Text key={i} style={styles.paragraph}>{para}</Text>
        ))}

        {/* Demands */}
        <Text style={styles.demandsTitle}>
          Pursuant to the foregoing, I demand that you:
        </Text>
        {letter.template.demands.map((demand, i) => (
          <Text key={i} style={styles.demandItem}>
            <Text style={styles.demandNumber}>{i + 1}. </Text>
            {demand}
          </Text>
        ))}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Consequences */}
        <Text style={styles.closingParagraph}>{letter.template.consequencesStatement}</Text>

        {/* Closing statement */}
        <Text style={styles.closingParagraph}>{letter.template.closingStatement}</Text>

        {/* Signature block */}
        <View style={styles.signature}>
          <Text style={styles.sincerely}>Sincerely,</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>{letter.yourName || '[YOUR NAME]'}</Text>
        </View>

        {/* Citations */}
        <View style={styles.citationsSection}>
          <Text style={styles.citationsTitle}>Applicable Law — Citations</Text>
          {letter.template.legalCitations.map((cite, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={[styles.citationItem, styles.citationAct]}>
                {cite.act} — {cite.section}
              </Text>
              <Text style={styles.citationItem}>{cite.description}</Text>
            </View>
          ))}
        </View>

        {/* Warning box */}
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            DebtDispute provides document preparation assistance and is not a law firm. This document
            does not constitute legal advice. Consult a licensed attorney for legal counsel specific to
            your situation.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer} fixed>
          DebtDispute — This document was prepared using information provided by the user. It is not
          legal advice. Consult a licensed attorney.
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
