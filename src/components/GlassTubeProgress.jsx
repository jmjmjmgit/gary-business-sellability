import React from 'react';

export const GlassTubeProgress = ({ currentStepIndex, totalSteps, currentSection, sectionNumber }) => {
  const percentage = Math.min(100, Math.round(((currentStepIndex + 1) / totalSteps) * 100));

  return (
    <div className="progress-container">
      <div className="progress-header">
        <div className="progress-section-title">
          <span className="progress-section-badge">Section {sectionNumber}</span>
          {currentSection}
        </div>
        <div className="progress-counter">
          {percentage}% Complete &nbsp;({currentStepIndex + 1}/{totalSteps})
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
