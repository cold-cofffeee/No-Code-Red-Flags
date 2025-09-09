
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 animate-fade-in-up bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
      <h1 className="text-4xl font-extrabold text-white mb-6">About No-Code Red Flags</h1>
      <div className="space-y-6 text-slate-300">
        <p>
          In the fast-paced world of startups, a great idea is just the beginning. The journey from concept to a successful business is fraught with challenges, and many promising ventures fail due to overlooked pitfalls. That's where "No-Code Red Flags" comes in.
        </p>
        <p>
          Our mission is to empower aspiring entrepreneurs, hackathon teams, and pitch builders with the critical feedback they need, right when they need it most. We believe that identifying potential weaknesses early on is not a sign of failure, but a crucial step towards building a resilient and successful company.
        </p>
        <h2 className="text-2xl font-bold text-indigo-400 pt-4">How It Works</h2>
        <p>
          Using the power of Google's advanced generative AI, our platform provides an instant, unbiased analysis of your startup idea. Simply describe your concept, and our AI, trained to think like a seasoned venture capitalist, will:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Identify Common Red Flags:</strong> From market saturation and unclear monetization strategies to vague target audiences, we highlight key areas that need your attention.</li>
          <li><strong>Provide a Validation Score:</strong> Get a quantitative measure of your idea's initial strength, helping you to gauge its potential and track your progress as you refine it.</li>
          <li><strong>Offer Constructive Feedback:</strong> We don't just point out problems; we provide actionable insights and a summary to guide your next steps.</li>
        </ul>
        <p>
          "No-Code Red Flags" is your first line of defense against common startup mistakes. Use it to strengthen your business plan, refine your pitch, and build your venture on a solid foundation.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
