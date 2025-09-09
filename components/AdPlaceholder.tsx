
import React from 'react';

interface AdPlaceholderProps {
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center h-24 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700 text-slate-500 ${className}`}>
      <div className="text-center">
        <p className="font-semibold">Advertisement</p>
        <p className="text-sm">Your Ad Here</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
