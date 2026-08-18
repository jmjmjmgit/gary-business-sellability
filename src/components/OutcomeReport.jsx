import React, { useEffect } from 'react';
import { 
  OUTCOME_TIERS, 
  calculateValuation, 
  calculatePercentile, 
  diagnosePrimaryValueKiller 
} from '../data/questions';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  RotateCcw, 
  FileText, 
  Printer, 
  TrendingUp, 
  Zap, 
  Award,
  ArrowRight,
  TrendingDown,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OutcomeReport = ({ score, answers, flags, onRestart, leadInfo }) => {
  // Determine tier
  let tierKey = 'WARNING';
  if (score >= 90) tierKey = 'PREMIUM';
  else if (score >= 71) tierKey = 'STRONG';
  else if (score >= 51) tierKey = 'HIGH_RISK';
  else tierKey = 'WARNING';

  const tier = OUTCOME_TIERS[tierKey];

  // Calculate valuation, multiple, and gap
  const valData = calculateValuation(answers, score);
  const percentile = calculatePercentile(score);
  const valueKiller = diagnosePrimaryValueKiller(answers, score);

  useEffect(() => {
    if (tierKey === 'PREMIUM') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [tierKey]);

  const handlePrint = () => {
    window.print();
  };

  const formatGBP = (num) => {
    if (num >= 1000000) {
      return `£${(num / 1000000).toFixed(1).replace('.0', '')}M`;
    }
    if (num >= 1000) {
      return `£${Math.round(num / 1000)}k`;
    }
    return `£${num.toLocaleString('en-GB')}`;
  };

  return (
    <div className="outcome-container">
      {/* Hero Outcome Panel */}
      <div className="outcome-hero">
        {/* Peer Benchmark Percentile */}
        <div>
          <div className="percentile-badge">
            <Award size={18} color="#2ABAD2" />
            <span>Benchmark: You scored higher than <strong>{percentile}%</strong> of the 1,420+ business owners assessed</span>
          </div>
        </div>

        {/* Score Dial */}
        <div className="score-dial-box">
          <span className="score-number">{score}</span>
          <span className="score-max">/ 100</span>
        </div>

        <div>
          <span className={`tier-badge ${tier.badgeClass}`}>
            {tierKey === 'PREMIUM' && <Trophy size={20} />}
            {tierKey === 'STRONG' && <CheckCircle2 size={20} />}
            {tierKey === 'HIGH_RISK' && <AlertTriangle size={20} />}
            {tierKey === 'WARNING' && <ShieldAlert size={20} />}
            {tier.title}
          </span>
        </div>

        <h1 className="outcome-title">{tier.headline}</h1>
        <p className="outcome-subtitle">
          {leadInfo?.name ? `${leadInfo.name}, ` : ''}{tier.description}
        </p>

        {/* HERO VALUATION & VALUATION GAP CARD (Screenshot Ready) */}
        <div className="valuation-hero-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sparkles size={20} color="#2ABAD2" />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Business Valuation & Multiple Diagnostic
            </span>
          </div>

          <div className="valuation-grid">
            <div className="valuation-stat-card">
              <div className="valuation-stat-label">Estimated Current Valuation</div>
              <div className="valuation-stat-value" style={{ color: '#0F172A' }}>
                {formatGBP(valData.currentValuation)}
              </div>
              <div className="valuation-stat-sub">
                Based on ~{valData.currentMultiple}x EBITDA ({formatGBP(valData.estimatedEbitda)} est.)
              </div>
            </div>

            <div className="valuation-stat-card" style={{ border: '2px solid rgba(42, 187, 210, 0.4)', background: 'rgba(240, 253, 250, 0.7)' }}>
              <div className="valuation-stat-label" style={{ color: '#0D9488' }}>Tier-90+ Exit Potential</div>
              <div className="valuation-stat-value" style={{ color: '#0D9488' }}>
                {formatGBP(valData.potentialValuation)}
              </div>
              <div className="valuation-stat-sub" style={{ color: '#0F766E' }}>
                Commands ~{valData.potentialMultiple}x Premium Multiple
              </div>
            </div>
          </div>

          {valData.valuationGap > 0 && (
            <div className="valuation-gap-banner">
              <div>
                <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', color: '#94A3B8' }}>
                  The Valuation Gap (Money Left on the Table)
                </div>
                <div style={{ fontSize: '0.98rem', color: '#E2E8F0', marginTop: '0.2rem' }}>
                  Difference between your current valuation and what a 90+ tier business of your size commands.
                </div>
              </div>
              <div className="gap-amount">
                +{formatGBP(valData.valuationGap)}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Critical Flags Display */}
        <div className="flags-container">
          {flags.decliningCap && (
            <div className="flag-card danger">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">Score Capped at 70/100 (Declining Revenue Trajectory)</div>
                <div className="flag-desc">
                  Because YoY revenue is declining, acquirers treat your business as a turnaround risk and discount enterprise multiples.
                </div>
              </div>
            </div>
          )}

          {flags.hardToSellInstitutional && (
            <div className="flag-card warning">
              <ShieldAlert size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">Institutional Buyer Flag (Severe Owner Sales Reliance)</div>
                <div className="flag-desc">
                  Sales drop to zero if you step away for 3 months. Institutional buyers and private equity firms will view this as non-transferable without an autonomous sales engine.
                </div>
              </div>
            </div>
          )}

          {flags.customerConcentration && (
            <div className="flag-card warning">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">Customer Concentration Vulnerability (&gt;30% Revenue in One Account)</div>
                <div className="flag-desc">
                  A single customer accounts for over 30% of turnover. If this account churns post-acquisition, cash flows and debt service are severely disrupted.
                </div>
              </div>
            </div>
          )}

          {flags.recurringMultiplier && (
            <div className="flag-card multiplier">
              <Zap size={24} color="#2ABAD2" style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">1.15x Recurring Revenue Valuation Multiplier Applied</div>
                <div className="flag-desc">
                  Over 50% of your revenue comes from automated subscriptions or hard contracts. Buyers pay top-tier valuation premiums for contracted future cash flow.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DYNAMIC #1 PRIMARY VALUE KILLER DIAGNOSIS */}
      <div className="value-killer-section">
        <div className="killer-tag">
          <AlertTriangle size={14} />
          Primary Value Killer Diagnosed
        </div>
        <h2 className="killer-title">{valueKiller.category}</h2>
        <div className="killer-impact-pill">
          Valuation Impact: {valueKiller.impact}
        </div>
        <p className="killer-desc">{valueKiller.diagnosis}</p>
        
        <div className="killer-remedy-box">
          <div className="remedy-label">Gary's Tactical Remedy:</div>
          <div className="remedy-text">{valueKiller.remedy}</div>
        </div>
      </div>

      {/* Recommendations Box */}
      <div className="sop-section">
        <div className="sop-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={28} color="#2ABAD2" />
            <h2 className="sop-title">My General Recommendations Based on Your Answers</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.55, marginTop: '0.25rem' }}>
            Here are the foundational steps to begin bridging your valuation gap:
          </p>
        </div>

        <div className="sop-grid" style={{ marginTop: '1.5rem' }}>
          {tier.sopSteps.map((step, idx) => (
            <div key={idx} className="sop-item">
              <div className="sop-number">{idx + 1}</div>
              <div className="sop-text">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* UNFILTERED HIGH-CONVERTING 1:1 ADVISORY CALL CTA BOX */}
      <div className="unfiltered-cta-card">
        <h2 className="unfiltered-cta-title">
          This Is What’s Standing Between Where You Are Now and a Premium Exit.
        </h2>
        <p className="unfiltered-cta-body">
          If you want an unfiltered review, book thirty minutes directly with me. We will examine your specific numbers, address your primary value killer, and build a practical plan to capture your {formatGBP(valData.valuationGap)} valuation gap.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <a
            href="https://garyashworth.com/business-accelerator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-teal-cta"
            style={{ textDecoration: 'none', padding: '1.1rem 2.5rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <Calendar size={22} />
            Book 30-Min Unfiltered Valuation Review With Gary
            <ArrowRight size={20} />
          </a>

          <div style={{ fontSize: '0.92rem', color: '#94A3B8', marginTop: '0.5rem' }}>
            Or join Gary's Business Accelerator:{' '}
            <a
              href="https://garyashworth.com/business-accelerator"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2ABAD2', fontWeight: 700, textDecoration: 'underline' }}
            >
              garyashworth.com/business-accelerator &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="panel-actions" style={{ justifyContent: 'center', gap: '1.5rem', background: 'none', border: 'none' }}>
        <button className="btn-secondary" onClick={handlePrint}>
          <Printer size={18} />
          Print / Save PDF Report
        </button>

        <button className="btn-teal-cta" onClick={onRestart}>
          <RotateCcw size={18} />
          Retake Assessment
        </button>
      </div>
    </div>
  );
};
