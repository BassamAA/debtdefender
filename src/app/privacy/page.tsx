import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DebtDispute privacy policy — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-5">
          <p><strong className="text-white">Last Updated:</strong> March 2025</p>
          <p>
            DebtDispute (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is committed to protecting your privacy. This
            policy describes what information we collect and how we use it.
          </p>
          <h2 className="text-white text-xl font-bold mt-6">Information We Collect</h2>
          <p>
            When you use our letter generator, we collect the information you provide in the wizard
            (jurisdiction, debt details, your name and address) solely to generate your dispute
            letter. This information is temporarily passed to our server for letter generation and
            is included in your Stripe payment session so we can generate your PDF after payment.
            We do not store this information in a database.
          </p>
          <p>
            The Interaction Tracker stores all data locally in your browser&apos;s localStorage. No
            tracker data is transmitted to our servers unless you use the PDF export feature.
          </p>
          <h2 className="text-white text-xl font-bold mt-6">Payment Information</h2>
          <p>
            Payment processing is handled entirely by Stripe. We do not receive or store your
            credit card information. Stripe&apos;s privacy policy governs their data handling.
          </p>
          <h2 className="text-white text-xl font-bold mt-6">Cookies and Analytics</h2>
          <p>
            We may use basic analytics to understand traffic patterns. We do not sell your data
            to third parties.
          </p>
          <h2 className="text-white text-xl font-bold mt-6">Contact</h2>
          <p>For privacy inquiries, contact us through the website.</p>
        </div>
      </div>
    </div>
  );
}
