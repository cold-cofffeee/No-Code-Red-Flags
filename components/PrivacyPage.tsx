
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 animate-fade-in-up bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 prose prose-invert prose-p:text-slate-300 prose-headings:text-white prose-a:text-indigo-400">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
      
      <h2>Interpretation and Definitions</h2>
      <h3>Interpretation</h3>
      <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
      
      <h2>Collecting and Using Your Personal Data</h2>
      <h3>Types of Data Collected</h3>
      <h4>Personal Data</h4>
      <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, Usage Data.</p>
      
      <h4>Usage Data</h4>
      <p>Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
      
      <h4>Startup Idea Submissions</h4>
      <p>The startup ideas you submit for analysis are sent to a third-party AI service (Google Gemini) for processing. We do not store your ideas on our servers after the analysis is complete. However, we cannot guarantee how the third-party service handles this data. We advise against submitting any sensitive or confidential information.</p>
      
      <h2>Use of Your Personal Data</h2>
      <p>The Company may use Personal Data for the following purposes:</p>
      <ul>
        <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
        <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
        <li><strong>For other purposes:</strong> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
      </ul>
      
      <h2>Changes to this Privacy Policy</h2>
      <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, You can contact us by email: hiranmay.roy@yahoo.com</p>
    </div>
  );
};

export default PrivacyPage;
