import React, { useEffect } from 'react';
import { 
  OUTCOME_TIERS, 
  calculateValuationEngine, 
  getValueKillers, 
  getCtaRouting 
} from '../data/questions';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  RotateCcw, 
  FileText, 
  Printer, 
  Zap, 
  Calendar,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OutcomeReport = ({ answers, rawScore, onRestart, _leadInfo }) => {
  const valEngine = calculateValuationEngine(answers, rawScore);
  const { primaryKiller, secondaryKillers } = getValueKillers(answers, valEngine.score);
  const cta = getCtaRouting(answers, valEngine.tierKey, valEngine.isBrokenEconomics);

  const tier = OUTCOME_TIERS[valEngine.tierKey] || OUTCOME_TIERS.TIER_1;

  useEffect(() => {
    if (valEngine.tierKey === 'TIER_4' || valEngine.tierKey === 'TIER_4_UNDER_1M') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [valEngine.tierKey]);

  const handlePrint = () => {
    window.print();
  };

  const formatGBP = (num) => {
    if (num >= 1000000) {
      return `£${(num / 1000000).toFixed(2).replace(/\.?0+$/, '')}m`;
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
        {/* Score Dial */}
        <div className="score-dial-box">
          <span className="score-number">{valEngine.score}</span>
          <span className="score-max">/ 100</span>
        </div>

        <div>
          <span className={`tier-badge ${tier.badgeClass}`}>
            {(valEngine.tierKey === 'TIER_4' || valEngine.tierKey === 'TIER_4_UNDER_1M') && <Trophy size={20} />}
            {valEngine.tierKey === 'TIER_3' && <CheckCircle2 size={20} />}
            {valEngine.tierKey === 'TIER_2' && <AlertTriangle size={20} />}
            {valEngine.tierKey === 'TIER_1' && <ShieldAlert size={20} />}
            {tier.title}
          </span>
        </div>

        <h1 className="outcome-title">{tier.headline}</h1>
        <p className="outcome-subtitle">
          {tier.description}
        </p>

        {/* VALUATION & MULTIPLE DIAGNOSTIC (OR BROKEN ECONOMICS NOTICE) */}
        {!valEngine.isBrokenEconomics ? (
          <div className="valuation-hero-container">
            <div className="valuation-header-title">
              <Sparkles size={20} color="var(--blue-contrast)" />
              <span className="valuation-headline">
                Your Number, Multiple & Gap
              </span>
            </div>

            <div className="valuation-grid">
              <div className="valuation-stat-card">
                <div className="valuation-stat-label">What a Buyer Would Pay Today</div>
                <div className="valuation-stat-value" style={{ color: '#0F172A' }}>
                  {formatGBP(valEngine.todaysValue)}
                </div>
                <div className="valuation-stat-sub">
                  Based on {valEngine.finalMultiple.toFixed(1)}x multiple (Adjusted EBITDA: {formatGBP(valEngine.adjustedEbitda)})
                </div>
              </div>

              <div className="valuation-stat-card valuation-stat-ceiling">
                <div className="valuation-stat-label">Size-Capped Ceiling</div>
                <div className="valuation-stat-value">
                  {formatGBP(valEngine.ceiling)}
                </div>
                <div className="valuation-stat-sub">
                  Ceiling multiple of {valEngine.sizeCap.toFixed(1)}x for your turnover band
                </div>
              </div>
            </div>

            {valEngine.valuationGap > 0 && (
              <div className="valuation-gap-banner">
                <div>
                  <div className="gap-banner-label">
                    Your Gap (Money Left on the Table)
                  </div>
                  <div className="gap-banner-desc">
                    The difference in pounds between what you would get today and the ceiling for a business your size.
                  </div>
                </div>
                <div className="gap-amount">
                  +{formatGBP(valEngine.valuationGap)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="broken-economics-box">
            <div className="broken-economics-header">
              <AlertTriangle size={24} />
              Broken Economics: Valuation Suppressed
            </div>
            <p className="broken-economics-text">
              Because your profit is negative or breakeven due to structural issues, there is no earnings multiple to apply. Any offer on the table would be for asset liquidation value only. This is a fundamental business problem to fix before exit planning.
            </p>
          </div>
        )}

        {/* OWNER DEPENDENT & LOGIC FLAGS */}
        <div className="flags-container">
          {valEngine.isOwnerDependent && (
            <div className="flag-card danger">
              <ShieldAlert size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">Owner Dependent Flag Active</div>
                <div className="flag-desc">
                  Sales stop if you disappear for three months. Buyers will view this as buying a job rather than a transferable asset, triggering heavy earnouts or deal walkaways.
                </div>
              </div>
            </div>
          )}

          {answers['q3']?.id === 'q3_a' && (
            <div className="flag-card danger">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">Score Capped at 55 (Turnover Going Backwards)</div>
                <div className="flag-desc">
                  Because turnover is contracting year on year, buyers price the next three years of profit as worse than the last three.
                </div>
              </div>
            </div>
          )}

          {valEngine.hasRecurringUplift && (
            <div className="flag-card multiplier">
              <Zap size={24} color="var(--blue-contrast)" style={{ flexShrink: 0 }} />
              <div>
                <div className="flag-title">+0.5x Recurring Revenue Uplift Added to Multiple</div>
                <div className="flag-desc">
                  Over 50% of your revenue is contracted or subscription-based, earning an explicit multiple boost.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PRIMARY #1 VALUE KILLER */}
      {primaryKiller && (
        <div className="value-killer-section">
          <div className="killer-tag">
            <AlertTriangle size={14} />
            Your #1 Value Killer
          </div>
          <h2 className="killer-title">{primaryKiller.title}</h2>
          <div className="killer-impact-pill">
            What it costs: {primaryKiller.cost}
          </div>
          <p className="killer-desc">{primaryKiller.diagnosis}</p>
          
          <div className="killer-remedy-box">
            <div className="remedy-label">What to do about it:</div>
            <div className="remedy-text">{primaryKiller.action}</div>
          </div>
        </div>
      )}

      {/* SECONDARY VALUE KILLERS (ALSO WORTH DEALING WITH) */}
      {secondaryKillers.length > 0 && (
        <div className="secondary-killers-card">
          <div className="secondary-killers-header">
            <Layers size={20} color="var(--blue-contrast)" />
            <h3 className="secondary-killers-title">
              Also Worth Dealing With
            </h3>
          </div>

          <div className="secondary-killers-list">
            {secondaryKillers.map((k, idx) => (
              <div key={idx} className="secondary-killer-item">
                <div className="secondary-killer-title">
                  {idx + 2}. {k.title}
                </div>
                <div className="secondary-killer-cost">
                  Cost: {k.cost}
                </div>
                <div className="secondary-killer-action">
                  {k.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ROADMAP BOX */}
      <div className="sop-section">
        <div className="sop-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={28} color="var(--blue-contrast)" />
            <h2 className="sop-title">The Roadmap to Fix Your Number</h2>
          </div>
          <p className="sop-subtitle">
            The order I would fix things in to capture your valuation gap:
          </p>
        </div>

        <div className="sop-grid">
          {tier.roadmap.map((step, idx) => (
            <div key={idx} className="sop-item">
              <div className="sop-number">{idx + 1}</div>
              <div className="sop-text">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC CALL TO ACTION ROUTED BY Q16 & TIER */}
      <div className="unfiltered-cta-card">
        <h2 className="unfiltered-cta-title">{cta.headline}</h2>
        <p className="unfiltered-cta-body">{cta.body}</p>

        <div className="outcome-cta-wrapper">
          <a
            href={cta.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-teal-cta outcome-cta-btn"
          >
            <Calendar size={20} />
            <span>{cta.buttonText}</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* DISCLAIMER NOTE */}
      <div className="outcome-disclaimer">
        This is an indicative range based on what you have told me, not a formal valuation, and not an offer. Real pricing depends on your sector, your accounts, and who is at the table.
      </div>

      {/* Action Buttons */}
      <div className="panel-actions report-actions">
        <button className="btn-secondary" onClick={handlePrint}>
          <Printer size={18} />
          <span>Print / Save PDF Report</span>
        </button>

        <button className="btn-teal-cta" onClick={onRestart}>
          <RotateCcw size={18} />
          <span>Retake Assessment</span>
        </button>
      </div>
    </div>
  );
};
