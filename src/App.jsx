import React, { useState } from 'react';
import { QUESTIONS, SECTIONS, MAX_RAW_POINTS } from './data/questions';
import { BackgroundShapes } from './components/BackgroundShapes';
import { GlassTubeProgress } from './components/GlassTubeProgress';
import { QuestionCard } from './components/QuestionCard';
import { OutcomeReport } from './components/OutcomeReport';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, RefreshCw, BarChart3, Award, Building2 } from 'lucide-react';
import './styles/liquid-glass.css';

export default function App() {
  const [answers, setAnswers] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Lead Generation Capture State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [formError, setFormError] = useState('');

  // Compute active questions flow dynamically based on conditional triggers
  const getActiveQuestions = () => {
    const active = [];

    QUESTIONS.forEach((q) => {
      if (q.isConditional) {
        // Only include if parent answer triggered it
        if (q.id === 'q2b' && answers['q2']?.id === 'q2_a') {
          active.push(q);
        } else if (q.id === 'q7b' && answers['q7']?.id === 'q7_d') {
          active.push(q);
        } else if (q.id === 'q8b' && answers['q8']?.id === 'q8_a') {
          active.push(q);
        }
      } else {
        active.push(q);
      }
    });

    return active;
  };

  const activeQuestions = getActiveQuestions();
  const currentQuestion = activeQuestions[currentStepIndex] || activeQuestions[0];

  const handleSelectOption = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < activeQuestions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setIsCompleted(false);
    setIsStarted(false);
  };

  const handleStartAssessment = (e) => {
    e?.preventDefault();
    if (!leadName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!leadEmail.trim() || !leadEmail.includes('@')) {
      setFormError('Please enter a valid work email address.');
      return;
    }
    setFormError('');
    setIsStarted(true);
  };

  // Calculate Raw Total Points
  const calculateTotalRawPoints = () => {
    let raw = 0;
    activeQuestions.forEach((q) => {
      const selected = answers[q.id];
      if (selected && selected.points) {
        raw += selected.points;
      }
    });
    return Math.max(0, raw);
  };

  const rawScore = calculateTotalRawPoints();

  return (
    <div className="app-container">
      {/* Animated Dark Abstract Shapes Canvas */}
      <BackgroundShapes />

      {/* Header Branding */}
      <header className="header-brand">
        <div className="brand-badge">
          <span className="teal-dot" />
          GARY ASHWORTH &bull; BUSINESS SELLABILITY DIAGNOSTIC
        </div>

        {(isStarted || isCompleted) && (
          <button className="restart-btn" onClick={handleRestart}>
            <RefreshCw size={14} />
            Start Over
          </button>
        )}
      </header>

      {/* Landing View */}
      {!isStarted && !isCompleted && (
        <main className="glass-panel water-surface-tension-enter" style={{ textAlign: 'center', maxWidth: '820px' }}>
          {/* Banner Statistic */}
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.12)', 
            border: '1px solid rgba(239, 68, 68, 0.35)', 
            borderRadius: '100px', 
            padding: '0.5rem 1.35rem', 
            color: '#B91C1C', 
            fontSize: '0.88rem', 
            fontWeight: 800, 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1.35rem' 
          }}>
            <span>⚠️</span>
            <span>Between 70% and 80% of businesses that go to market never sell. (Source: Exit Planning Institute)</span>
          </div>

          <h1 className="stark-title" style={{ fontSize: '2.5rem', marginBottom: '1.1rem', lineHeight: 1.25 }}>
            If you put your business on the market next Monday, what would a buyer really pay for it?
          </h1>

          <p className="stark-subtitle" style={{ maxWidth: '680px', margin: '0 auto 1.5rem auto', fontSize: '1.08rem' }}>
            Answer sixteen questions and I will show you the number, the multiple your business earns today, and the one thing doing the most damage to your price.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1.1rem', background: 'rgba(42, 187, 210, 0.12)', border: '1px solid rgba(42, 187, 210, 0.3)', borderRadius: '100px', color: '#2ABAD2', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.75rem' }}>
            ⏱️ About four minutes. No jargon.
          </div>

          {/* Credibility Block */}
          <div style={{ 
            background: 'rgba(42, 187, 210, 0.08)', 
            border: '1px solid rgba(42, 187, 210, 0.25)', 
            borderRadius: '16px', 
            padding: '1rem 1.35rem', 
            marginBottom: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.85rem', 
            textAlign: 'left' 
          }}>
            <Award size={30} color="#2ABAD2" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.95rem', color: '#0B0F19', fontWeight: 600, lineHeight: 1.5 }}>
              Forty years of buying, building and selling businesses. Thirty of them, give or take, and a fair few lessons I paid for the hard way.
            </div>
          </div>

          {/* What You Get at the End */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1.25rem', borderRadius: '16px' }}>
              <TrendingUp size={24} color="#2ABAD2" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0B0F19', marginBottom: '0.25rem' }}>
                Your Number
              </div>
              <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                What a buyer would likely pay today, and the multiple your business is earning.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1.25rem', borderRadius: '16px' }}>
              <ShieldCheck size={24} color="#2ABAD2" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0B0F19', marginBottom: '0.25rem' }}>
                Your Biggest Value Killer
              </div>
              <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                The single risk taking the most money off your price, named and costed.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1.25rem', borderRadius: '16px' }}>
              <BarChart3 size={24} color="#2ABAD2" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0B0F19', marginBottom: '0.25rem' }}>
                Your Gap
              </div>
              <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                The difference in pounds between what you would get today and the ceiling for your size.
              </div>
            </div>
          </div>

          {/* Lead Capture Form */}
          <form onSubmit={handleStartAssessment} className="lead-form-container">
            <div className="glass-input-row">
              <div className="glass-input-group">
                <label className="glass-input-label">Full Name *</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Gary Ashworth"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-input-label">Work Email *</label>
                <input
                  type="email"
                  className="glass-input"
                  placeholder="e.g. gary@company.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="glass-input-group" style={{ marginTop: '1rem' }}>
              <label className="glass-input-label">Company Name (Optional)</label>
              <input
                type="text"
                className="glass-input"
                placeholder="e.g. Ashworth Enterprise Ltd"
                value={leadCompany}
                onChange={(e) => setLeadCompany(e.target.value)}
              />
            </div>

            {formError && (
              <div style={{ color: '#DC2626', fontWeight: 700, fontSize: '0.88rem', margin: '1rem 0 0 0', textAlign: 'center' }}>
                {formError}
              </div>
            )}

            <button 
              type="submit"
              className="btn-teal-cta" 
              style={{ width: '100%', justifyContent: 'center', padding: '1.1rem 2rem', marginTop: '1.5rem' }}
            >
              Start the diagnostic
              <ArrowRight size={22} />
            </button>
          </form>
        </main>
      )}

      {/* Questions Flow */}
      {isStarted && !isCompleted && currentQuestion && (
        <div style={{ width: '100%', maxWidth: '820px' }}>
          <GlassTubeProgress
            currentStep={currentStepIndex + 1}
            totalSteps={activeQuestions.length}
            currentSection={currentQuestion.section}
          />

          <QuestionCard
            question={currentQuestion}
            selectedOptionId={answers[currentQuestion.id]?.id}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentStepIndex === 0}
            isLast={currentStepIndex === activeQuestions.length - 1}
          />
        </div>
      )}

      {/* Outcome Report View */}
      {isCompleted && (
        <OutcomeReport
          answers={answers}
          rawScore={rawScore}
          leadInfo={{ name: leadName, email: leadEmail, company: leadCompany }}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
