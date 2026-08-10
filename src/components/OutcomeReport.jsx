import React, { useEffect } from 'react';
import { OUTCOME_TIERS } from '../data/questions';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  RotateCcw, 
  FileText, 
  Printer, 
  TrendingUp, 
  Users, 
  Zap, 
  DollarSign 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OutcomeReport = ({ score, answers, flags, breakdown, onRestart }) => {
  // Determine tier
  let tierKey = 'WARNING';
  if (score >= 90) tierKey = 'PREMIUM';
  else if (score >= 71) tierKey = 'STRONG';
  else if (score >= 51) tierKey = 'HIGH_RISK';
  else tierKey = 'WARNING';

  const tier = OUTCOME_TIERS[tierKey];

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

  return (
    <div className="outcome-container">
      {/* Hero Outcome Panel */}
      <div className="outcome-hero">
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
        <p className="outcome-subtitle">{tier.description}</p>

        {/* Dynamic Critical Flags Display */}
        <div className="flags-container">
          {flags.decliningCap && (
            <div className="flag-card danger">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">Score Capped at 70/100 (Declining Revenue)</div>
                <div className="flag-desc">
                  Because YoY revenue is declining, buyers severely discount enterprise valuation. Reversing revenue trajectory is required to unlock higher valuation tiers.
                </div>
              </div>
            </div>
          )}

          {flags.hardToSellInstitutional && (
            <div className="flag-card warning">
              <ShieldAlert size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">Institutional Buyer Flag (Owner Sales Dependency)</div>
                <div className="flag-desc">
                  Sales drop to zero if the owner disconnects for 3 months. Institutional buyers and private equity firms will view this as non-transferable without an internal sales team.
                </div>
              </div>
            </div>
          )}

          {flags.customerConcentration && (
            <div className="flag-card warning">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">High Customer Concentration (&gt;30% Revenue)</div>
                <div className="flag-desc">
                  A single customer accounts for over 30% of sales. If this account is lost post-acquisition, buyer cash flows are severely impacted.
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
                  Over 50% of your revenue comes from automated subscriptions or hard contracts. Buyers pay premium multiples for predictable future cash flow.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



      {/* SOP & Action Roadmap Box */}
      <div className="sop-section">
        <div className="sop-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={28} color="#2ABAD2" />
            <h2 className="sop-title">My General Recommendations Based on Your Answers</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.55, marginTop: '0.25rem' }}>
            If you want a more personalized assessment, schedule a 30-minute 1:1 advisory call with me or join my{' '}
            <a 
              href="https://garyashworth.com/business-accelerator" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#2ABAD2', fontWeight: 700, textDecoration: 'underline' }}
            >
              Business Accelerator &rarr;
            </a>
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
