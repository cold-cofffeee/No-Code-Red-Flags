import React from 'react';

const BroomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
    >
        <path d="M19.4 11.6 18.2 21H6.4l-1.2-9.4" />
        <path d="M14 12V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8" />
        <path d="M12 11h2" />
        <path d="M6 21h12" />
  </svg>
);

export default BroomIcon;