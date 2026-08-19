import React from 'react';

export const GlassTubeProgress = ({ currentStep, totalSteps, sectionNumber }) => {
  const step = currentStep || 1;
  const total = totalSteps || 16;
  const percentage = Math.min(100, Math.round((step / total) * 100)) || 0;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <div className="progress-section-title">
          <span className="progress-section-badge">Section {sectionNumber || 1}</span>
        </div>
        <div className="progress-counter">
          {percentage}% Complete &nbsp;({step}/{total})
        </div>
      </div>
      
      {/* 3D Glass Tube */}
      <div className="glass-tube">
        <div 
          className="liquid-fill" 
          style={{ width: `${percentage}%` }} 
          aria-label={`Progress: ${percentage}%`}
        />
      </div>
    </div>
  );
};
