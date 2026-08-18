import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, AlertTriangle, Sparkles, ShieldAlert } from 'lucide-react';

export const QuestionCard = ({
  question,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  isAnimating
}) => {
  const [animClass, setAnimClass] = useState('water-surface-tension-enter');

  useEffect(() => {
    setAnimClass('water-surface-tension-enter');
  }, [question.id]);

  const handleNextClick = () => {
    setAnimClass('water-surface-tension-exit');
    setTimeout(() => {
      onNext();
    }, 320);
  };

  const handlePrevClick = () => {
    setAnimClass('water-surface-tension-exit');
    setTimeout(() => {
      onPrev();
    }, 320);
  };

  return (
    <div className={`glass-panel ${animClass}`}>
      {/* Category Pill */}
      <span className="stark-category">
        Diagnostic Phase {question.sectionNumber}: {question.section}
      </span>

      {/* Question Title & Subtitle */}
      <h2 className="stark-title">
        {question.questionNumber}. {question.title}
      </h2>
      <p className="stark-subtitle">{question.subtitle}</p>

      {/* Options List */}
      <div className="options-grid" role="radiogroup" aria-label={question.title}>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <div
              key={option.id}
              className={`glass-option ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectOption(question.id, option)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectOption(question.id, option);
                }
              }}
            >
              <div className="option-radio">
                <div className="radio-inner" />
              </div>

              <div className="option-content">
                <div className="option-label">{option.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Panel Action Buttons */}
      <div className="panel-actions">
        <button
          className="btn-secondary"
          onClick={handlePrevClick}
          disabled={isFirst}
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        <button
          className="btn-teal-cta"
          onClick={handleNextClick}
          disabled={!selectedOptionId}
        >
          {isLast ? 'Generate Full Valuation & Diagnostic' : 'Continue Diagnostic'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
