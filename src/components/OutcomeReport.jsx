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
  TrendingUp, 
  Zap, 
  Calendar,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OutcomeReport = ({ answers, rawScore, onRestart, leadInfo }) => {
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
          {leadInfo?.name ? `${leadInfo.name} — ` : ''}{tier.description}
        </p>

        {/* VALUATION & MULTIPLE DIAGNOSTIC (OR BROKEN ECONOMICS NOTICE) */}
        {!valEngine.isBrokenEconomics ? (
          <div className="valuation-hero-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={20} color="#2ABAD2" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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

              <div className="valuation-stat-card" style={{ border: '2px solid rgba(42, 187, 210, 0.4)', background: 'rgba(240, 253, 250, 0.7)' }}>
                <div className="valuation-stat-label" style={{ color: '#0D9488' }}>Size-Capped Ceiling</div>
                <div className="valuation-stat-value" style={{ color: '#0D9488' }}>
                  {formatGBP(valEngine.ceiling)}
                </div>
                <div className="valuation-stat-sub" style={{ color: '#0F766E' }}>
                  Ceiling multiple of {valEngine.sizeCap.toFixed(1)}x for your turnover band
                </div>
              </div>
            </div>

            {valEngine.valuationGap > 0 && (
              <div className="valuation-gap-banner">
                <div>
                  <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', color: '#94A3B8' }}>
                    Your Gap (Money Left on the Table)
                  </div>
                  <div style={{ fontSize: '0.98rem', color: '#E2E8F0', marginTop: '0.2rem' }}>
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
          <div style={{ background: '#FEF2F2', border: '2px solid #F87171', borderRadius: '20px', padding: '1.75rem', margin: '2rem 0', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991B1B', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              <AlertTriangle size={24} />
              Broken Economics: Valuation Suppressed
            </div>
            <p style={{ color: '#7F1D1D', fontSize: '0.96rem', lineHeight: 1.5, margin: 0 }}>
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
              <Zap size={24} color="#2ABAD2" style={{ flexShrink: 0 }} />
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
        <div style={{ background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '20px', padding: '1.75rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Layers size={20} color="#2ABAD2" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: '#0F172A', margin: 0 }}>
              Also Worth Dealing With
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {secondaryKillers.map((k, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.1rem' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem', marginBottom: '0.25rem' }}>
                  {idx + 2}. {k.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#DC2626', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Cost: {k.cost}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.45 }}>
                  {k.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ROADMAP BOX */}
      <div className="sop-section">
        <div className="sop-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={28} color="#2ABAD2" />
            <h2 className="sop-title">The Roadmap to Fix Your Number</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.55, marginTop: '0.25rem' }}>
            The order Gary would fix things in to capture your valuation gap:
          </p>
        </div>

        <div className="sop-grid" style={{ marginTop: '1.5rem' }}>
          {tier.roadmap.map((step, idx) => (
            <div key={idx} className="sop-item">
              <div className="sop-number">{idx + 1}</div>
              <div className="sop-text">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECONDARY CREDIBILITY STORY BLOCK */}
      <div style={{ 
        background: 'rgba(42, 187, 210, 0.06)', 
        border: '1px solid rgba(42, 187, 210, 0.25)', 
        borderRadius: '20px', 
        padding: '1.75rem', 
        textAlign: 'left' 
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', marginBottom: '0.5rem' }}>
          Why This Gap Matters
        </div>
        <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          "I assumed my tech recruitment business would sell for eight to ten times EBITDA, because that is what the sector had always achieved. By the time I came to sell, the going rate was five. Nobody had told me the market had moved, and that gap cost me millions. This assessment exists so it does not happen to you."
        </p>
        <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 700, marginTop: '0.5rem' }}>
          — Gary Ashworth
        </div>
      </div>

      {/* DYNAMIC CALL TO ACTION ROUTED BY Q16 & TIER */}
      <div className="unfiltered-cta-card">
        <h2 className="unfiltered-cta-title">{cta.headline}</h2>
        <p className="unfiltered-cta-body">{cta.body}</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <a
            href={cta.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-teal-cta"
            style={{ textDecoration: 'none', padding: '1.1rem 2.5rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <Calendar size={22} />
            {cta.buttonText}
            <ArrowRight size={20} />
          </a>
        </div>
      </div>

      {/* DISCLAIMER NOTE */}
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.45, maxWidth: '650px', margin: '0 auto' }}>
        This is an indicative range based on what you have told me, not a formal valuation and not an offer. Real pricing depends on your sector, your accounts and who is at the table.
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
