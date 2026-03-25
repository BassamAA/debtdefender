import { Jurisdiction, DebtType, JurisdictionStatute, StatuteEntry } from '@/types';

// Inline statute data to avoid async imports in client components
const STATUTE_DATA: Record<Jurisdiction, JurisdictionStatute> = {
  ontario: {
    jurisdiction: 'ontario',
    jurisdictionName: 'Ontario',
    country: 'CA',
    generalSOL: 2,
    generalCitation: 'Limitations Act, 2002, S.O. 2002, c. 24, Sched. B, s. 4',
    regulatoryBody: 'Consumer Protection Ontario',
    regulatoryBodyUrl: 'https://www.ontario.ca/page/collections-agencies',
    complaints: 'File at ontario.ca or call 1-800-889-9768. Regulated under Collection and Debt Settlement Services Act, R.S.O. 1990, c. C.14.',
    debtTypes: {
      'credit-card':        { years: 2, notes: "Ontario's 2-year basic limitation period applies from the date of last activity (payment or written acknowledgement).", citation: 'Limitations Act, 2002, S.O. 2002, c. 24, s. 4', lawName: 'Limitations Act, 2002' },
      'medical':            { years: 2, notes: 'Medical debts follow the standard 2-year limitation period from when the bill was due and unpaid.', citation: 'Limitations Act, 2002, S.O. 2002, c. 24, s. 4', lawName: 'Limitations Act, 2002' },
      'auto-loan':          { years: 2, notes: 'Auto loan deficiency balances follow the 2-year limitation from the deficiency notice date.', citation: 'Limitations Act, 2002, S.O. 2002, c. 24, s. 4', lawName: 'Limitations Act, 2002' },
      'personal-loan':      { years: 2, notes: 'Personal loans follow Ontario\'s standard 2-year limitation from last payment or acknowledgement.', citation: 'Limitations Act, 2002, S.O. 2002, c. 24, s. 4', lawName: 'Limitations Act, 2002' },
      'student-loan':       { years: 2, notes: 'Private student loans follow the 2-year period. Government OSAP loans may differ.', citation: 'Limitations Act, 2002, S.O. 2002, c. 24, s. 4', lawName: 'Limitations Act, 2002' },
      'mortgage-deficiency':{ years: 10, notes: 'Mortgage deficiency claims may be subject to a 10-year period under the Real Property Limitations Act. Consult a lawyer.', citation: 'Real Property Limitations Act, R.S.O. 1990, c. L.15, s. 4', lawName: 'Real Property Limitations Act' },
      'utility-bill':       { years: 2, notes: 'Utility bill debts follow the standard 2-year limitation.', citation: 'Limitations Act, 2002, S.O. 2002, c. 24, s. 4', lawName: 'Limitations Act, 2002' },
    },
  },
  quebec: {
    jurisdiction: 'quebec',
    jurisdictionName: 'Quebec',
    country: 'CA',
    generalSOL: 3,
    generalCitation: 'Civil Code of Quebec, CQLR c CCQ-1991, Art. 2925',
    regulatoryBody: 'Office de la protection du consommateur (OPC)',
    regulatoryBodyUrl: 'https://www.opc.gouv.qc.ca',
    complaints: 'File at opc.gouv.qc.ca or call 1-888-672-2556. Regulated under Consumer Protection Act, CQLR c P-40.1.',
    debtTypes: {
      'credit-card':        { years: 3, notes: "Quebec's 3-year prescription period applies to most personal debts.", citation: 'Civil Code of Quebec, Art. 2925', lawName: 'Civil Code of Quebec' },
      'medical':            { years: 3, notes: 'Medical debts owed to private providers follow the 3-year prescription.', citation: 'Civil Code of Quebec, Art. 2925', lawName: 'Civil Code of Quebec' },
      'auto-loan':          { years: 3, notes: 'Auto loan deficiency balances are subject to the 3-year civil prescription.', citation: 'Civil Code of Quebec, Art. 2925', lawName: 'Civil Code of Quebec' },
      'personal-loan':      { years: 3, notes: 'Personal loans follow Quebec\'s 3-year prescription. Any payment or written acknowledgement can restart the clock.', citation: 'Civil Code of Quebec, Art. 2925', lawName: 'Civil Code of Quebec' },
      'student-loan':       { years: 3, notes: 'Private student loans follow the 3-year prescription. Provincial AFE and federal loans may differ.', citation: 'Civil Code of Quebec, Art. 2925', lawName: 'Civil Code of Quebec' },
      'mortgage-deficiency':{ years: 3, notes: 'Mortgage deficiency claims generally follow the 3-year prescription. Consult a notary.', citation: 'Civil Code of Quebec, Art. 2925 and Art. 2923', lawName: 'Civil Code of Quebec' },
      'utility-bill':       { years: 3, notes: 'Utility bill debts follow the standard 3-year prescription period.', citation: 'Civil Code of Quebec, Art. 2925', lawName: 'Civil Code of Quebec' },
    },
  },
  'british-columbia': {
    jurisdiction: 'british-columbia',
    jurisdictionName: 'British Columbia',
    country: 'CA',
    generalSOL: 2,
    generalCitation: 'Limitation Act, SBC 2012, c 13, s 6',
    regulatoryBody: 'Consumer Protection BC',
    regulatoryBodyUrl: 'https://www.consumerprotectionbc.ca',
    complaints: 'File at consumerprotectionbc.ca or call 1-888-564-9963.',
    debtTypes: {
      'credit-card':        { years: 2, notes: "BC's 2-year limitation applies from the last date of activity. Making a small payment can restart the clock.", citation: 'Limitation Act, SBC 2012, c 13, s 6', lawName: 'Limitation Act, SBC 2012' },
      'medical':            { years: 2, notes: 'Private medical debts follow BC\'s 2-year limitation period.', citation: 'Limitation Act, SBC 2012, c 13, s 6', lawName: 'Limitation Act, SBC 2012' },
      'auto-loan':          { years: 2, notes: 'Auto loan deficiency balances follow BC\'s 2-year limitation from the deficiency date.', citation: 'Limitation Act, SBC 2012, c 13, s 6', lawName: 'Limitation Act, SBC 2012' },
      'personal-loan':      { years: 2, notes: 'Personal loans follow the standard 2-year limitation in BC.', citation: 'Limitation Act, SBC 2012, c 13, s 6', lawName: 'Limitation Act, SBC 2012' },
      'student-loan':       { years: 2, notes: 'Private student loans follow BC\'s 2-year limitation. Government loans may differ.', citation: 'Limitation Act, SBC 2012, c 13, s 6', lawName: 'Limitation Act, SBC 2012' },
      'mortgage-deficiency':{ years: 2, notes: 'Mortgage deficiency claims follow the 2-year limitation. A 15-year ultimate limitation also applies.', citation: 'Limitation Act, SBC 2012, c 13, s 6 and s 21', lawName: 'Limitation Act, SBC 2012' },
      'utility-bill':       { years: 2, notes: 'Utility bill debts follow BC\'s standard 2-year limitation.', citation: 'Limitation Act, SBC 2012, c 13, s 6', lawName: 'Limitation Act, SBC 2012' },
    },
  },
  alberta: {
    jurisdiction: 'alberta',
    jurisdictionName: 'Alberta',
    country: 'CA',
    generalSOL: 2,
    generalCitation: 'Limitations Act, RSA 2000, c L-12, s 3(1)',
    regulatoryBody: 'Service Alberta — Consumer Investigations Unit',
    regulatoryBodyUrl: 'https://www.alberta.ca/consumer-complaints.aspx',
    complaints: 'File at alberta.ca or call 1-877-427-4088. Regulated under Fair Trading Act, RSA 2000, c F-2.',
    debtTypes: {
      'credit-card':        { years: 2, notes: "Alberta's 2-year limitation applies. A 10-year ultimate limitation also applies.", citation: 'Limitations Act, RSA 2000, c L-12, s 3(1)', lawName: 'Limitations Act, RSA 2000' },
      'medical':            { years: 2, notes: 'Private medical debts follow Alberta\'s 2-year limitation.', citation: 'Limitations Act, RSA 2000, c L-12, s 3(1)', lawName: 'Limitations Act, RSA 2000' },
      'auto-loan':          { years: 2, notes: 'Auto loan deficiency balances follow Alberta\'s 2-year limitation.', citation: 'Limitations Act, RSA 2000, c L-12, s 3(1)', lawName: 'Limitations Act, RSA 2000' },
      'personal-loan':      { years: 2, notes: 'Personal loans follow the standard 2-year limitation in Alberta.', citation: 'Limitations Act, RSA 2000, c L-12, s 3(1)', lawName: 'Limitations Act, RSA 2000' },
      'student-loan':       { years: 2, notes: 'Private student loans follow Alberta\'s 2-year limitation.', citation: 'Limitations Act, RSA 2000, c L-12, s 3(1)', lawName: 'Limitations Act, RSA 2000' },
      'mortgage-deficiency':{ years: 2, notes: "Alberta's Judicature Act may restrict deficiency claims on residential mortgages.", citation: 'Limitations Act, RSA 2000, c L-12, s 3(1); Law of Property Act, RSA 2000, c L-7', lawName: 'Limitations Act, RSA 2000' },
      'utility-bill':       { years: 2, notes: 'Utility bill debts follow Alberta\'s standard 2-year limitation.', citation: 'Limitations Act, RSA 2000, c L-12, s 3(1)', lawName: 'Limitations Act, RSA 2000' },
    },
  },
  'new-york': {
    jurisdiction: 'new-york',
    jurisdictionName: 'New York',
    country: 'US',
    generalSOL: 6,
    generalCitation: 'N.Y. C.P.L.R. § 213(2)',
    regulatoryBody: 'NY Department of Financial Services (DFS)',
    regulatoryBodyUrl: 'https://www.dfs.ny.gov/consumers/file_complaint',
    complaints: 'File at dfs.ny.gov or ag.ny.gov. NY Debt Collection Procedures Law (Gen. Bus. Law § 601) applies.',
    debtTypes: {
      'credit-card':        { years: 6, notes: 'NY courts treat credit cards as written contracts. Any payment restarts the clock. As of 2022, suing on time-barred debt is prohibited.', citation: 'N.Y. C.P.L.R. § 213(2); N.Y. Gen. Bus. Law § 601-a', lawName: 'N.Y. C.P.L.R. § 213(2)' },
      'medical':            { years: 6, notes: 'Medical debt based on written agreements is 6 years. NY hospitals cannot report medical debt to credit bureaus for patients below 400% of the federal poverty level.', citation: 'N.Y. C.P.L.R. § 213(2)', lawName: 'N.Y. C.P.L.R. § 213(2)' },
      'auto-loan':          { years: 6, notes: 'Auto loan deficiency balances follow the 6-year written contract limitation.', citation: 'N.Y. C.P.L.R. § 213(2)', lawName: 'N.Y. C.P.L.R. § 213(2)' },
      'personal-loan':      { years: 6, notes: 'Personal loans under written agreements follow the 6-year limitation.', citation: 'N.Y. C.P.L.R. § 213(2)', lawName: 'N.Y. C.P.L.R. § 213(2)' },
      'student-loan':       { years: 6, notes: 'Private student loans follow the 6-year limitation. Federal loans are exempt from state SOL for government collection.', citation: 'N.Y. C.P.L.R. § 213(2)', lawName: 'N.Y. C.P.L.R. § 213(2)' },
      'mortgage-deficiency':{ years: 6, notes: 'Deficiency must be sought within 90 days of foreclosure sale under RPAPL § 1371; then judgment enforced for 20 years.', citation: 'N.Y. Real Property Actions and Proceedings Law § 1371', lawName: 'N.Y. RPAPL § 1371' },
      'utility-bill':       { years: 6, notes: 'Utility bill debts follow NY\'s 6-year limitation for written contracts.', citation: 'N.Y. C.P.L.R. § 213(2)', lawName: 'N.Y. C.P.L.R. § 213(2)' },
    },
  },
  california: {
    jurisdiction: 'california',
    jurisdictionName: 'California',
    country: 'US',
    generalSOL: 4,
    generalCitation: 'Cal. Code Civ. Proc. § 337',
    regulatoryBody: 'CA Dept. of Financial Protection and Innovation (DFPI)',
    regulatoryBodyUrl: 'https://dfpi.ca.gov/file-a-complaint/',
    complaints: "File at dfpi.ca.gov. California's Rosenthal FDCPA (Civ. Code § 1788) covers original creditors too.",
    debtTypes: {
      'credit-card':        { years: 4, notes: "CA treats credit card debt as a written contract. California's Rosenthal FDCPA applies to original creditors.", citation: 'Cal. Code Civ. Proc. § 337; Cal. Civ. Code §§ 1788–1788.33', lawName: 'Cal. Code Civ. Proc. § 337' },
      'medical':            { years: 4, notes: 'Medical debts are 4 years. SB 1061 (2022) prohibits reporting medical debt to credit bureaus.', citation: 'Cal. Code Civ. Proc. § 337', lawName: 'Cal. Code Civ. Proc. § 337' },
      'auto-loan':          { years: 4, notes: 'Auto loan deficiency balances follow the 4-year written contract limitation.', citation: 'Cal. Code Civ. Proc. § 337', lawName: 'Cal. Code Civ. Proc. § 337' },
      'personal-loan':      { years: 4, notes: 'Written personal loans are 4 years; oral agreements are 2 years (CCP § 339).', citation: 'Cal. Code Civ. Proc. § 337 (written) / § 339 (oral)', lawName: 'Cal. Code Civ. Proc. § 337' },
      'student-loan':       { years: 4, notes: 'Private student loans are 4 years. CA Student Loan Servicing Act provides additional protections.', citation: 'Cal. Code Civ. Proc. § 337', lawName: 'Cal. Code Civ. Proc. § 337' },
      'mortgage-deficiency':{ years: 3, notes: "Anti-deficiency laws (CCP §§ 580b, 580d) prohibit deficiency on purchase money mortgages and non-judicial foreclosures.", citation: 'Cal. Code Civ. Proc. § 580b; Cal. Code Civ. Proc. § 726(b)', lawName: 'Cal. Code Civ. Proc. § 580b' },
      'utility-bill':       { years: 4, notes: 'Utility bill debts based on written service agreements are 4 years.', citation: 'Cal. Code Civ. Proc. § 337', lawName: 'Cal. Code Civ. Proc. § 337' },
    },
  },
  texas: {
    jurisdiction: 'texas',
    jurisdictionName: 'Texas',
    country: 'US',
    generalSOL: 4,
    generalCitation: 'Tex. Civ. Prac. & Rem. Code § 16.004',
    regulatoryBody: 'Texas Office of Consumer Credit Commissioner (OCCC)',
    regulatoryBodyUrl: 'https://occc.texas.gov/consumers/file-a-complaint',
    complaints: 'File at occc.texas.gov. Texas Debt Collection Act (Finance Code Ch. 392) covers original creditors too.',
    debtTypes: {
      'credit-card':        { years: 4, notes: 'Texas applies 4 years to credit card debt. Texas Finance Code Chapter 392 (Texas Debt Collection Act) supplements FDCPA.', citation: 'Tex. Civ. Prac. & Rem. Code § 16.004; Tex. Fin. Code §§ 392.001–392.404', lawName: 'Tex. Civ. Prac. & Rem. Code § 16.004' },
      'medical':            { years: 4, notes: 'Medical debts follow the 4-year limitation. HB 1592 (2023) limits medical debt credit reporting.', citation: 'Tex. Civ. Prac. & Rem. Code § 16.004', lawName: 'Tex. Civ. Prac. & Rem. Code § 16.004' },
      'auto-loan':          { years: 4, notes: 'Auto loan deficiency balances follow the 4-year limitation from the deficiency date.', citation: 'Tex. Civ. Prac. & Rem. Code § 16.004', lawName: 'Tex. Civ. Prac. & Rem. Code § 16.004' },
      'personal-loan':      { years: 4, notes: 'Personal loans in Texas follow the 4-year limitation.', citation: 'Tex. Civ. Prac. & Rem. Code § 16.004', lawName: 'Tex. Civ. Prac. & Rem. Code § 16.004' },
      'student-loan':       { years: 4, notes: 'Private student loans follow the 4-year limitation. Federal loans are exempt from state SOL.', citation: 'Tex. Civ. Prac. & Rem. Code § 16.004', lawName: 'Tex. Civ. Prac. & Rem. Code § 16.004' },
      'mortgage-deficiency':{ years: 2, notes: 'Mortgage deficiency claims must be brought within 2 years of the foreclosure sale.', citation: 'Tex. Prop. Code § 51.003(a)', lawName: 'Tex. Prop. Code § 51.003' },
      'utility-bill':       { years: 4, notes: 'Utility bill debts follow the standard 4-year limitation.', citation: 'Tex. Civ. Prac. & Rem. Code § 16.004', lawName: 'Tex. Civ. Prac. & Rem. Code § 16.004' },
    },
  },
  florida: {
    jurisdiction: 'florida',
    jurisdictionName: 'Florida',
    country: 'US',
    generalSOL: 5,
    generalCitation: 'Fla. Stat. § 95.11(2)(b)',
    regulatoryBody: 'Florida Office of Financial Regulation (OFR)',
    regulatoryBodyUrl: 'https://www.flofr.gov/sitePages/ConsumerServices.htm',
    complaints: 'File at flofr.gov. Florida Consumer Collection Practices Act (Fla. Stat. § 559.55 et seq.) applies.',
    debtTypes: {
      'credit-card':        { years: 5, notes: 'Florida applies 5 years to credit card debt as a written contract. Note HB 837 (2023) may affect post-2023 agreements.', citation: 'Fla. Stat. § 95.11(2)(b)', lawName: 'Fla. Stat. § 95.11(2)(b)' },
      'medical':            { years: 4, notes: 'Medical billing debt (breach of contract for services) is generally 4 years for open accounts.', citation: 'Fla. Stat. § 95.11(3)(k)', lawName: 'Fla. Stat. § 95.11(3)(k)' },
      'auto-loan':          { years: 5, notes: 'Auto loan deficiency balances follow the 5-year written contract limitation.', citation: 'Fla. Stat. § 95.11(2)(b)', lawName: 'Fla. Stat. § 95.11(2)(b)' },
      'personal-loan':      { years: 5, notes: 'Written personal loans follow the 5-year limitation.', citation: 'Fla. Stat. § 95.11(2)(b)', lawName: 'Fla. Stat. § 95.11(2)(b)' },
      'student-loan':       { years: 5, notes: 'Private student loans follow the 5-year limitation. Federal loans are exempt from state SOL.', citation: 'Fla. Stat. § 95.11(2)(b)', lawName: 'Fla. Stat. § 95.11(2)(b)' },
      'mortgage-deficiency':{ years: 1, notes: 'Florida has a strict 1-year limitation on deficiency judgments after foreclosure — one of the strongest anti-deficiency protections.', citation: 'Fla. Stat. § 702.06', lawName: 'Fla. Stat. § 702.06' },
      'utility-bill':       { years: 4, notes: 'Utility bill debts treated as open accounts are subject to 4 years.', citation: 'Fla. Stat. § 95.11(3)(k)', lawName: 'Fla. Stat. § 95.11(3)(k)' },
    },
  },
  illinois: {
    jurisdiction: 'illinois',
    jurisdictionName: 'Illinois',
    country: 'US',
    generalSOL: 5,
    generalCitation: '735 ILCS 5/13-205',
    regulatoryBody: 'Illinois Dept. of Financial and Professional Regulation (IDFPR)',
    regulatoryBodyUrl: 'https://idfpr.illinois.gov/consumers/ConsumerComplaint.html',
    complaints: 'File at idfpr.illinois.gov. Illinois Collection Agency Act (225 ILCS 425) requires collectors to be licensed.',
    debtTypes: {
      'credit-card':        { years: 5, notes: 'Illinois applies 5 years to written contracts including credit cards.', citation: '735 ILCS 5/13-205; 225 ILCS 425/1 et seq.', lawName: '735 ILCS 5/13-205' },
      'medical':            { years: 5, notes: 'Medical debts based on written contracts follow the 5-year limitation.', citation: '735 ILCS 5/13-205', lawName: '735 ILCS 5/13-205' },
      'auto-loan':          { years: 5, notes: 'Auto loan deficiency balances follow the 5-year written contract limitation.', citation: '735 ILCS 5/13-205', lawName: '735 ILCS 5/13-205' },
      'personal-loan':      { years: 5, notes: 'Personal loans in Illinois follow the 5-year limitation for written contracts.', citation: '735 ILCS 5/13-205', lawName: '735 ILCS 5/13-205' },
      'student-loan':       { years: 5, notes: 'Private student loans follow the 5-year limitation. Federal loans are exempt from state SOL.', citation: '735 ILCS 5/13-205', lawName: '735 ILCS 5/13-205' },
      'mortgage-deficiency':{ years: 7, notes: 'Illinois has a 7-year limitation on certain real property claims. Consult an attorney for foreclosure-specific rules.', citation: '735 ILCS 5/13-206', lawName: '735 ILCS 5/13-206' },
      'utility-bill':       { years: 5, notes: 'Utility bill debts follow the standard 5-year limitation for written contracts.', citation: '735 ILCS 5/13-205', lawName: '735 ILCS 5/13-205' },
    },
  },
  ohio: {
    jurisdiction: 'ohio',
    jurisdictionName: 'Ohio',
    country: 'US',
    generalSOL: 6,
    generalCitation: 'Ohio Rev. Code § 2305.07',
    regulatoryBody: 'Ohio Attorney General Consumer Protection',
    regulatoryBodyUrl: 'https://www.ohioattorneygeneral.gov/Individuals-and-Families/Consumers',
    complaints: "File at ohioattorneygeneral.gov. Ohio's Consumer Sales Practices Act (ORC § 1345.01) also applies.",
    debtTypes: {
      'credit-card':        { years: 6, notes: 'Ohio applies 6 years to written contracts including credit card debt.', citation: 'Ohio Rev. Code § 2305.07', lawName: 'Ohio Rev. Code § 2305.07' },
      'medical':            { years: 6, notes: 'Medical debts based on written contracts follow the 6-year limitation.', citation: 'Ohio Rev. Code § 2305.07', lawName: 'Ohio Rev. Code § 2305.07' },
      'auto-loan':          { years: 6, notes: 'Auto loan deficiency balances follow the 6-year written contract limitation.', citation: 'Ohio Rev. Code § 2305.07', lawName: 'Ohio Rev. Code § 2305.07' },
      'personal-loan':      { years: 6, notes: 'Personal loans in Ohio follow the 6-year limitation.', citation: 'Ohio Rev. Code § 2305.07', lawName: 'Ohio Rev. Code § 2305.07' },
      'student-loan':       { years: 6, notes: 'Private student loans follow the 6-year limitation. Federal loans are exempt from state SOL.', citation: 'Ohio Rev. Code § 2305.07', lawName: 'Ohio Rev. Code § 2305.07' },
      'mortgage-deficiency':{ years: 6, notes: 'Mortgage deficiency claims follow the 6-year limitation from the foreclosure sale date.', citation: 'Ohio Rev. Code § 2305.07', lawName: 'Ohio Rev. Code § 2305.07' },
      'utility-bill':       { years: 6, notes: 'Utility bill debts follow the standard 6-year limitation for written contracts.', citation: 'Ohio Rev. Code § 2305.07', lawName: 'Ohio Rev. Code § 2305.07' },
    },
  },
  pennsylvania: {
    jurisdiction: 'pennsylvania',
    jurisdictionName: 'Pennsylvania',
    country: 'US',
    generalSOL: 4,
    generalCitation: '42 Pa. C.S. § 5525(a)',
    regulatoryBody: 'PA Dept. of Banking and Securities',
    regulatoryBodyUrl: 'https://www.dobs.pa.gov/Consumers/ConsumerComplaints/Pages/default.aspx',
    complaints: 'File at dobs.pa.gov. PA FCEUA (73 Pa. Stat. §§ 2270.1–2270.6) extends FDCPA to original creditors.',
    debtTypes: {
      'credit-card':        { years: 4, notes: 'PA applies 4 years to written contracts. PA FCEUA extends FDCPA-like protections to original creditors.', citation: '42 Pa. C.S. § 5525(a); 73 Pa. Stat. §§ 2270.1–2270.6', lawName: '42 Pa. C.S. § 5525' },
      'medical':            { years: 4, notes: 'Medical debts follow the 4-year limitation for written contracts.', citation: '42 Pa. C.S. § 5525(a)', lawName: '42 Pa. C.S. § 5525' },
      'auto-loan':          { years: 4, notes: 'Auto loan deficiency balances follow the 4-year written contract limitation.', citation: '42 Pa. C.S. § 5525(a)', lawName: '42 Pa. C.S. § 5525' },
      'personal-loan':      { years: 4, notes: 'Personal loans in Pennsylvania follow the 4-year limitation.', citation: '42 Pa. C.S. § 5525(a)', lawName: '42 Pa. C.S. § 5525' },
      'student-loan':       { years: 4, notes: 'Private student loans follow the 4-year limitation. Federal loans are exempt from state SOL.', citation: '42 Pa. C.S. § 5525(a)', lawName: '42 Pa. C.S. § 5525' },
      'mortgage-deficiency':{ years: 4, notes: 'Mortgage deficiency claims follow the 4-year limitation in Pennsylvania.', citation: '42 Pa. C.S. § 5525(a)', lawName: '42 Pa. C.S. § 5525' },
      'utility-bill':       { years: 4, notes: 'Utility bill debts follow the standard 4-year limitation.', citation: '42 Pa. C.S. § 5525(a)', lawName: '42 Pa. C.S. § 5525' },
    },
  },
  georgia: {
    jurisdiction: 'georgia',
    jurisdictionName: 'Georgia',
    country: 'US',
    generalSOL: 6,
    generalCitation: 'O.C.G.A. § 9-3-24',
    regulatoryBody: 'Georgia Dept. of Banking and Finance',
    regulatoryBodyUrl: 'https://dbf.georgia.gov/consumer-complaints',
    complaints: 'File at dbf.georgia.gov. GA Fair Business Practices Act (O.C.G.A. § 10-1-390 et seq.) also applies.',
    debtTypes: {
      'credit-card':        { years: 4, notes: 'GA courts often treat credit cards as open accounts (4 years), though some treat them as written contracts (6 years). The shorter 4-year period is safer to assume.', citation: 'O.C.G.A. § 9-3-25 (open account) / § 9-3-24 (written contract)', lawName: 'O.C.G.A. § 9-3-25' },
      'medical':            { years: 6, notes: 'Medical debts based on written contracts follow the 6-year limitation.', citation: 'O.C.G.A. § 9-3-24', lawName: 'O.C.G.A. § 9-3-24' },
      'auto-loan':          { years: 6, notes: 'Auto loan deficiency balances follow the 6-year written contract limitation.', citation: 'O.C.G.A. § 9-3-24', lawName: 'O.C.G.A. § 9-3-24' },
      'personal-loan':      { years: 6, notes: 'Personal loans follow the 6-year written contract limitation.', citation: 'O.C.G.A. § 9-3-24', lawName: 'O.C.G.A. § 9-3-24' },
      'student-loan':       { years: 6, notes: 'Private student loans follow the 6-year limitation. Federal loans are exempt from state SOL.', citation: 'O.C.G.A. § 9-3-24', lawName: 'O.C.G.A. § 9-3-24' },
      'mortgage-deficiency':{ years: 7, notes: 'Deficiency after non-judicial foreclosure must be brought within 30 days of the sale under O.C.G.A. § 44-14-161.', citation: 'O.C.G.A. § 9-3-23; O.C.G.A. § 44-14-161', lawName: 'O.C.G.A. § 44-14-161' },
      'utility-bill':       { years: 4, notes: 'Utility bill debts treated as open accounts follow the 4-year limitation.', citation: 'O.C.G.A. § 9-3-25', lawName: 'O.C.G.A. § 9-3-25' },
    },
  },
};

export function getStatuteByJurisdiction(jurisdiction: Jurisdiction): JurisdictionStatute | null {
  return STATUTE_DATA[jurisdiction] ?? null;
}

export function getStatuteEntry(
  jurisdiction: Jurisdiction,
  debtType: DebtType
): StatuteEntry | null {
  const data = STATUTE_DATA[jurisdiction];
  if (!data) return null;
  return data.debtTypes[debtType] ?? null;
}

export function isDebtTimeBarred(
  jurisdiction: Jurisdiction,
  debtType: DebtType,
  debtAgeYears: number
): boolean | null {
  const entry = getStatuteEntry(jurisdiction, debtType);
  if (!entry) return null;
  return debtAgeYears >= entry.years;
}

export function getAllStatutes(): Record<Jurisdiction, JurisdictionStatute> {
  return STATUTE_DATA;
}
