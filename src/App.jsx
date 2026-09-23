import React, { useState } from 'react';
import { QUESTIONS, calculateValuationEngine, getValueKillers } from './data/questions';
import { BackgroundShapes } from './components/BackgroundShapes';
import { GlassTubeProgress } from './components/GlassTubeProgress';
import { QuestionCard } from './components/QuestionCard';
import { OutcomeReport } from './components/OutcomeReport';
import { ArrowRight, ShieldCheck, TrendingUp, RefreshCw, BarChart3, Clock } from 'lucide-react';
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

  // Calculate Raw Total Points
  const calculateTotalRawPoints = (currentAnswers = answers) => {
    let raw = 0;
    activeQuestions.forEach((q) => {
      const selected = currentAnswers[q.id];
      if (selected && selected.points) {
        raw += selected.points;
      }
    });
    return Math.max(0, raw);
  };

  const submitLeadData = async (status = "STARTED", finalAnswers = answers) => {
    try {
      const raw = calculateTotalRawPoints(finalAnswers);
      const val = calculateValuationEngine(finalAnswers, raw);
      const killers = getValueKillers(finalAnswers, val.score);

      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          company: leadCompany,
          status,
          rawScore: raw,
          score: val.score,
          tierKey: val.tierKey,
          valuationData: val,
          primaryKiller: killers.primaryKiller,
          secondaryKillers: killers.secondaryKillers
        })
      });

      // Client-side redundant submission to MailerLite Form 197317486398408585
      try {
        const mlParams = new URLSearchParams();
        mlParams.append("fields[name]", leadName);
        mlParams.append("fields[email]", leadEmail);
        if (leadCompany) mlParams.append("fields[company]", leadCompany);
        mlParams.append("ml-submit", "1");
        mlParams.append("anticsrf", "true");

        fetch("https://assets.mailerlite.com/jsonp/1848379/forms/197317486398408585/subscribe", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: mlParams.toString()
        }).catch(() => {});
      } catch {}
    } catch (err) {
      console.warn('Lead capture notification:', err);
    }
  };

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
      submitLeadData("COMPLETED", answers);
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
    submitLeadData("STARTED", answers);
  };

  const rawScore = calculateTotalRawPoints();

  return (
    <div className="app-container">
      {/* Animated Dark Abstract Shapes Canvas */}
      <BackgroundShapes />

      {/* Header Restart Action (only visible when started or completed) */}
      {(isStarted || isCompleted) && (
        <header className="header-brand">
          <button className="restart-btn" onClick={handleRestart} aria-label="Start Over">
            <RefreshCw size={14} />
            <span>Start Over</span>
          </button>
        </header>
      )}

      {/* Landing View */}
      {!isStarted && !isCompleted && (
        <main className="glass-panel water-surface-tension-enter landing-panel">
          {/* Banner Statistic */}
          <div className="banner-stat-warning">
            <span className="banner-stat-icon">⚠️</span>
            <div>
              <div className="banner-stat-text">Between 70% and 80% of businesses that go to market never sell.</div>
              <div className="banner-stat-sub">Source: Exit Planning Institute</div>
            </div>
          </div>

          <h1 className="landing-title">
            If you put your business on the market today, what would a buyer really pay for it?
          </h1>

          <p className="landing-subtitle">
            Answer sixteen questions and I will show you what a buyer would pay for your business today, the multiple you would get, and the single issue doing the most damage to your price.
          </p>

          <div className="landing-badge-wrapper">
            <div className="time-badge">
              <Clock size={15} />
              <span>2–3 minutes to complete</span>
            </div>
            <div className="strategic-guide-note">
              Spot and fix the price discounts before a buyer sits across the table from you.
            </div>
          </div>

          {/* What You Get at the End */}
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <TrendingUp size={24} className="feature-icon" style={{ color: 'var(--blue-contrast)' }} />
              <div className="landing-feature-title">
                Your Number
              </div>
              <div className="landing-feature-desc">
                What a buyer would likely pay today, and the multiple your business is earning.
              </div>
            </div>

            <div className="landing-feature-card">
              <ShieldCheck size={24} className="feature-icon" style={{ color: 'var(--blue-contrast)' }} />
              <div className="landing-feature-title">
                Your Biggest Value Killer
              </div>
              <div className="landing-feature-desc">
                The single risk taking the most money off your price, named and costed.
              </div>
            </div>

            <div className="landing-feature-card">
              <BarChart3 size={24} className="feature-icon" style={{ color: 'var(--blue-contrast)' }} />
              <div className="landing-feature-title">
                Your Gap
              </div>
              <div className="landing-feature-desc">
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
              <div className="form-error-msg">
                {formError}
              </div>
            )}

            <button 
              type="submit"
              className="btn-teal-cta landing-submit-btn"
            >
              <span>Start the assessment</span>
              <ArrowRight size={20} />
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
            sectionNumber={currentQuestion.sectionNumber}
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
