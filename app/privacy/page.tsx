'use client';
import Head from 'next/head';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string|null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy | G&M Direct Hire Ltd</title>
        <meta name="description" content="Privacy Policy for G&M Direct Hire Ltd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 opacity-90">Last Updated: 25/08/2025</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <p className="text-lg text-gray-700">
              G&M Direct Hire Ltd ("we", "our", "us") is committed to protecting and respecting your privacy. 
              This Privacy Policy explains how we collect, use, store, and protect your personal information 
              when you use our mobile application and related services.
            </p>
            <p className="mt-4 font-medium text-gray-800">
              By using our application, you agree to the practices described in this policy.
            </p>
          </div>

          <div className="lg:hidden bg-gray-100 p-4">
            <h2 className="font-bold text-gray-800">Jump to Section</h2>
            <select 
              className="mt-2 w-full p-2 border border-gray-300 rounded"
              onChange={(e) => {
                const element = document.getElementById(e.target.value);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <option value="">Select a section</option>
              <option value="who-we-are">Who We Are</option>
              <option value="information-we-collect">Information We Collect</option>
              <option value="how-we-use">How We Use Your Information</option>
              <option value="data-sharing">Data Sharing and Disclosure</option>
              <option value="data-retention">Data Retention</option>
              <option value="security">Security of Your Data</option>
              <option value="your-rights">Your Rights Under UK GDPR</option>
              <option value="children-privacy">Children's Privacy</option>
              <option value="policy-changes">Changes to This Policy</option>
              <option value="contact-us">Contact Us</option>
            </select>
          </div>

          <div className="p-6">
            <div id="who-we-are" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">1.</span> Who We Are
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('who-we-are')}
                >
                  {activeSection === 'who-we-are' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'who-we-are' ? 'block' : 'hidden'} lg:block`}>
                <p className="mb-2"><strong>Legal Entity:</strong> G&M Direct Hire Ltd</p>
                <p className="mb-2"><strong>Contact:</strong></p>
                <ul className="list-disc pl-5 mb-2">
                  <li>Phone: 0208 900 9574</li>
                  <li>Email: info@gmdirecthire.co.uk</li>
                </ul>
                <p><strong>Data Protection Officer / Responsible Person:</strong> Najmulhaid Najeem</p>
              </div>
            </div>

            <div id="information-we-collect" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">2.</span> Information We Collect
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('information-we-collect')}
                >
                  {activeSection === 'information-we-collect' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'information-we-collect' ? 'block' : 'hidden'} lg:block`}>
                <p className="mb-3">We may collect the following types of personal information:</p>
                <ul className="list-disc pl-5 grid md:grid-cols-2 gap-2">
                  <li>Full name</li>
                  <li>Date of birth</li>
                  <li>Driving licence details</li>
                  <li>PCO licence details</li>
                  <li>Email address</li>
                  <li>Driver DVLA check code</li>
                  <li>National Insurance number</li>
                  <li>Home address</li>
                  <li>Photo (for identification purposes)</li>
                  <li>Location data (via car trackers and dashcam devices)</li>
                  <li>Automatically collected data (via analytics tools, crash logs, performance monitoring, etc.)</li>
                  <li>Information about your interaction with our website and mobile application</li>
                </ul>
              </div>
            </div>

            <div id="how-we-use" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">3.</span> How We Use Your Information
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('how-we-use')}
                >
                  {activeSection === 'how-we-use' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'how-we-use' ? 'block' : 'hidden'} lg:block`}>
                <p className="mb-3">We collect and process your personal data for the following purposes:</p>
                <ul className="list-disc pl-5">
                  <li>To provide and operate our taxi and hire services</li>
                  <li>To verify driver identity and compliance with licensing requirements</li>
                  <li>To improve our app performance and customer experience</li>
                  <li>To monitor and analyse your interaction with our website and mobile application to enhance and personalise our services</li>
                  <li>To monitor vehicle location and ensure service safety</li>
                  <li>For fraud prevention and security purposes</li>
                  <li>For marketing and service updates (where you have consented)</li>
                </ul>
              </div>
            </div>

            <div id="data-sharing" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">4.</span> Data Sharing and Disclosure
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('data-sharing')}
                >
                  {activeSection === 'data-sharing' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'data-sharing' ? 'block' : 'hidden'} lg:block`}>
                <p className="mb-3">We do <strong>not</strong> sell or share personal data with third parties for marketing purposes.</p>
                <ul className="list-disc pl-5">
                  <li>Data may be shared internally within our platform to deliver services effectively.</li>
                  <li>We may use third-party service providers (e.g., analytics, hosting, IT support) solely for operational purposes, under strict confidentiality agreements.</li>
                  <li>We do <strong>not</strong> transfer your data outside the UK or EEA.</li>
                </ul>
              </div>
            </div>

            <div id="data-retention" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">5.</span> Data Retention
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('data-retention')}
                >
                  {activeSection === 'data-retention' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'data-retention' ? 'block' : 'hidden'} lg:block`}>
                <p>
                  We will retain your personal data only for as long as necessary to fulfil the purposes 
                  outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements.
                </p>
              </div>
            </div>

            <div id="security" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">6.</span> Security of Your Data
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('security')}
                >
                  {activeSection === 'security' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'security' ? 'block' : 'hidden'} lg:block`}>
                <p>
                  We implement appropriate technical and organisational measures to protect your data, 
                  including encryption, secure servers, and restricted access. However, no system is 
                  completely secure, and we cannot guarantee absolute security of your data.
                </p>
              </div>
            </div>

            <div id="your-rights" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">7.</span> Your Rights Under UK GDPR
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('your-rights')}
                >
                  {activeSection === 'your-rights' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'your-rights' ? 'block' : 'hidden'} lg:block`}>
                <p className="mb-3">You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-5">
                  <li><strong>Right of access</strong> – request a copy of the personal data we hold about you.</li>
                  <li><strong>Right to rectification</strong> – request corrections to any inaccurate or incomplete information.</li>
                  <li><strong>Right to erasure</strong> – request deletion of your data where applicable.</li>
                  <li><strong>Right to restrict processing</strong> – request limits on how we use your data.</li>
                  <li><strong>Right to object</strong> – object to our use of your data in certain circumstances.</li>
                  <li><strong>Right to data portability</strong> – request a copy of your data in a structured, machine-readable format.</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, please contact us at{" "}
                  <a href="mailto:info@gmdirecthire.co.uk" className="text-blue-600 hover:underline">
                    info@gmdirecthire.co.uk
                  </a>.
                </p>
              </div>
            </div>

            <div id="children-privacy" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">8.</span> Children's Privacy
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('children-privacy')}
                >
                  {activeSection === 'children-privacy' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'children-privacy' ? 'block' : 'hidden'} lg:block`}>
                <p>
                  Our services are intended for adults. We do not knowingly collect or process personal 
                  information from children under the age of 13.
                </p>
              </div>
            </div>

            <div id="policy-changes" className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">9.</span> Changes to This Policy
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('policy-changes')}
                >
                  {activeSection === 'policy-changes' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'policy-changes' ? 'block' : 'hidden'} lg:block`}>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted within 
                  the app and/or on our website. Continued use of our services after updates indicates 
                  your acceptance of the revised policy.
                </p>
              </div>
            </div>

            <div id="contact-us">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">10.</span> Contact Us
                <button 
                  className="lg:hidden ml-2 text-blue-600"
                  onClick={() => toggleSection('contact-us')}
                >
                  {activeSection === 'contact-us' ? '▲' : '▼'}
                </button>
              </h2>
              <div className={`${activeSection === 'contact-us' ? 'block' : 'hidden'} lg:block`}>
                <p className="mb-3">If you have any questions about this Privacy Policy or your personal data, please contact us:</p>
                <p className="mb-1"><strong>G&M Direct Hire Ltd</strong></p>
                <p className="mb-1">Phone: 0208 900 9574</p>
                <p className="mb-1">
                  Email:{" "}
                  <a href="mailto:info@gmdirecthire.co.uk" className="text-blue-600 hover:underline">
                    info@gmdirecthire.co.uk
                  </a>
                </p>
                <p>Responsible Person: Najmulhaid Najeem</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}