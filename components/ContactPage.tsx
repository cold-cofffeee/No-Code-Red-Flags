
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 animate-fade-in-up bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
      <h1 className="text-4xl font-extrabold text-white mb-6">Get In Touch</h1>
      <div className="space-y-6 text-slate-300">
        <p>
          We'd love to hear from you! Whether you have questions, feedback, or partnership inquiries, please feel free to reach out.
        </p>
        
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold text-indigo-400">General Inquiries</h2>
                <p>For any general questions about our platform, please email us at:</p>
                <a href="mailto:hiranmay.roy@yahoo.com" className="text-indigo-300 hover:underline">hiranmay.roy@yahoo.com</a>
            </div>
            <div>
                <h2 className="text-xl font-bold text-indigo-400">Support</h2>
                <p>If you're experiencing technical issues, our support team is here to help.</p>
                <a href="mailto:hiranmayroy183@gmail.com" className="text-indigo-300 hover:underline">hiranmayroy183@gmail.com</a>
            </div>
            <div>
                <h2 className="text-xl font-bold text-indigo-400">Advertising & Partnerships</h2>
                <p>Interested in advertising on our platform or exploring partnership opportunities?</p>
                <a href="mailto:hiranmayroy183@gmail.com" className="text-indigo-300 hover:underline">hiranmayroy183@gmail.com</a>
            </div>
        </div>

        <p className="pt-4">
          We do our best to respond to all inquiries within 48 business hours.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
