
import React from 'react';

const TosPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 animate-fade-in-up bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 prose prose-invert prose-p:text-slate-300 prose-headings:text-white prose-a:text-indigo-400">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <p>Please read these terms and conditions carefully before using Our Service.</p>
      
      <h2>Acknowledgment</h2>
      <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
      <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
      
      <h2>Disclaimer of Warranties and Limitation of Liability</h2>
      <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. The analysis, scores, and feedback provided by the AI are for informational purposes only and should not be considered as financial, legal, or professional advice. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the service or the information, products, services, or related graphics contained on the service for any purpose.</p>
      <p>You acknowledge that you are using the service at your own risk. The Company shall not be liable for any business decisions, losses, or damages of any kind resulting from the use of, or reliance on, the information and feedback provided by the Service.</p>

      <h2>Intellectual Property</h2>
      <p>The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.</p>
      
      <h2>Termination</h2>
      <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
      
      <h2>Governing Law</h2>
      <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.</p>
      
      <h2>Changes to These Terms and Conditions</h2>
      <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about these Terms and Conditions, You can contact us by email: hiranmay.roy@yahoo.com</p>
    </div>
  );
};

export default TosPage;
