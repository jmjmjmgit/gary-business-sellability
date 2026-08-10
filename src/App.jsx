import React, { useState } from 'react';
import { QUESTIONS, SECTIONS } from './data/questions';
import { BackgroundShapes } from './components/BackgroundShapes';
import { GlassTubeProgress } from './components/GlassTubeProgress';
import { QuestionCard } from './components/QuestionCard';
import { OutcomeReport } from './components/OutcomeReport';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, RefreshCw, BarChart3, Award, User, Mail } from 'lucide-react';
import './styles/liquid-glass.css';

export default function App() {
  const [answers, setAnswers] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Lead Generation Capture State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
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

  // Score & Breakdown Calculation Logic
  const computeFinalAssessment = () => {
    let financialPoints = 0, financialMax = 50;
    let ownerPoints = 0, ownerMax = 32;
    let risksPoints = 0, risksMax = 33;
    let qualityPoints = 0, qualityMax = 62;

    let totalRawPoints = 0;
    let totalMaxPossible = 0;

    activeQuestions.forEach((q) => {
      const selected = answers[q.id];
      const pts = selected ? selected.points : 0;
      
      const maxPts = Math.max(...q.options.map(o => o.points));
      
      totalRawPoints += pts;
      totalMaxPossible += Math.max(1, maxPts);

      if (q.section === SECTIONS.FINANCIAL) financialPoints += Math.max(0, pts);
      if (q.section === SECTIONS.OWNER) ownerPoints += Math.max(0, pts);
      if (q.section === SECTIONS.RISKS) risksPoints += Math.max(0, pts);
      if (q.section === SECTIONS.REVENUE_QUALITY) qualityPoints += Math.max(0, pts);
    });

    let baseScore = Math.round((totalRawPoints / totalMaxPossible) * 100);
    baseScore = Math.max(0, baseScore);

    const hasRecurringMultiplier = answers['q10']?.id === 'q10_d';
    if (hasRecurringMultiplier) {
      baseScore = Math.round(baseScore * 1.15);
    }

    const hasDecliningCap = answers['q3']?.id === 'q3_a';
    if (hasDecliningCap) {
      baseScore = Math.min(baseScore, 70);
    }

    const finalScore = Math.min(100, Math.max(0, baseScore));

    const breakdown = {
      financial: Math.min(100, Math.round((financialPoints / financialMax) * 100)),
      owner: Math.min(100, Math.round((ownerPoints / ownerMax) * 100)),
      risks: Math.min(100, Math.round((risksPoints / risksMax) * 100)),
      quality: Math.min(100, Math.round((qualityPoints / qualityMax) * 100))
    };

    const flags = {
      decliningCap: hasDecliningCap,
      hardToSellInstitutional: answers['q5']?.id === 'q5_a',
      customerConcentration: answers['q7']?.id === 'q7_d',
      recurringMultiplier: hasRecurringMultiplier
    };

    return { finalScore, breakdown, flags };
  };

  const { finalScore, breakdown, flags } = computeFinalAssessment();

  return (
    <div className="app-container">
      {/* Animated Dark Abstract Shapes Canvas */}
      <BackgroundShapes />

      {/* Header Branding */}
      <header className="header-brand">
        <div className="brand-badge">
          <span className="teal-dot" />
          GARY ASHWORTH &bull; YOUR BUSINESS SELLABILITY ASSESSMENT
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
        <main className="glass-panel water-surface-tension-enter" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', background: 'rgba(42, 187, 210, 0.12)', border: '1px solid rgba(42, 187, 210, 0.3)', borderRadius: '100px', color: '#2ABAD2', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            ⏱️ Takes just 2–3 minutes to complete
          </div>

          <h1 className="stark-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Is Your Business Transferable & Ready to Sell at a Premium Multiple?
          </h1>

          <p className="stark-subtitle" style={{ maxWidth: '640px', margin: '0 auto 1.5rem auto', fontSize: '1.08rem' }}>
            Discover your custom exit readiness score, identify hidden buyer risks, and receive a transformational roadmap to maximize your enterprise value.
          </p>

          {/* Credibility Trust Banner */}
          <div style={{ 
            background: 'rgba(42, 187, 210, 0.08)', 
            border: '1px solid rgba(42, 187, 210, 0.25)', 
            borderRadius: '16px', 
            padding: '0.9rem 1.25rem', 
            marginBottom: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            textAlign: 'left' 
          }}>
            <Award size={28} color="#2ABAD2" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.92rem', color: '#0B0F19', fontWeight: 600, lineHeight: 1.45 }}>
              Based on my 40+ years of experience buying, scaling, and selling 30+ businesses, combined with proven M&A deal standards.
            </div>
          </div>

          {/* Transformational Outcomes Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.65)', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1.1rem', borderRadius: '16px' }}>
              <TrendingUp size={24} color="#2ABAD2" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0B0F19', marginBottom: '0.25rem' }}>
                Your Sellability Score (1–100)
              </div>
              <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                Discover your exact exit readiness score and how acquirers value your business today.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.65)', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1.1rem', borderRadius: '16px' }}>
              <ShieldCheck size={24} color="#2ABAD2" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0B0F19', marginBottom: '0.25rem' }}>
                Practical Recommendations
              </div>
              <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                Receive custom, actionable tips to eliminate owner reliance and boost sellability.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.65)', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1.1rem', borderRadius: '16px' }}>
              <BarChart3 size={24} color="#2ABAD2" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0B0F19', marginBottom: '0.25rem' }}>
                Transformational Growth
              </div>
              <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                Unlock a clear blueprint to turn your business into a high-multiple, self-sustaining exit asset.
              </div>
            </div>
          </div>

          {/* Lead Capture Form */}
          <form onSubmit={handleStartAssessment} className="lead-form-container">
            <div className="glass-input-row">
              <div className="glass-input-group">
                <label className="glass-input-label">Full Name</label>
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
                <label className="glass-input-label">Work Email Address</label>
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

            {formError && (
              <div style={{ color: '#DC2626', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1rem', textAlign: 'center' }}>
                {formError}
              </div>
            )}

            <button 
              type="submit"
              className="btn-teal-cta" 
              style={{ width: '100%', justifyContent: 'center', padding: '1.1rem 2rem' }}
            >
              Begin Your Business Sellability Assessment
              <ArrowRight size={22} />
            </button>
          </form>
        </main>
      )}

      {/* Assessment Question Flow */}
      {isStarted && !isCompleted && currentQuestion && (
        <main style={{ width: '100%', maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <GlassTubeProgress
            currentStepIndex={currentStepIndex}
            totalSteps={activeQuestions.length}
            currentSection={currentQuestion.section}
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
        </main>
      )}

      {/* Assessment Final Outcome Dashboard */}
      {isCompleted && (
        <OutcomeReport
          score={finalScore}
          answers={answers}
          flags={flags}
          breakdown={breakdown}
          onRestart={handleRestart}
          leadInfo={{ name: leadName, email: leadEmail }}
        />
      )}
    </div>
  );
}
