// Business Sellability Assessment Questions & Conditional Logic Configuration

export const SECTIONS = {
  FINANCIAL: "Financial Foundations",
  OWNER: "Owner Dependence",
  RISKS: "Concentration Risks",
  REVENUE_QUALITY: "Quality of Revenue & Operations"
};

export const QUESTIONS = [
  // SECTION 1: FINANCIAL FOUNDATIONS
  {
    id: "q1",
    section: SECTIONS.FINANCIAL,
    sectionNumber: 1,
    questionNumber: 1,
    title: "What is your top line revenue over the trailing twelve months (TTM)?",
    subtitle: "Higher revenue provides your business with a stronger valuation foundation and higher buyer interest.",
    options: [
      { id: "q1_a", label: "Under $1 Million", points: 5 },
      { id: "q1_b", label: "$1 Million to $3 Million", points: 10 },
      { id: "q1_c", label: "$3 Million to $10 Million", points: 15 },
      { id: "q1_d", label: "Over $10 Million", points: 20 }
    ]
  },
  {
    id: "q2",
    section: SECTIONS.FINANCIAL,
    sectionNumber: 1,
    questionNumber: 2,
    title: "What is your average net profit margin?",
    subtitle: "Healthy net margins demonstrate your operational efficiency and cash flow reliability.",
    options: [
      { id: "q2_a", label: "Negative or Breakeven", points: 0, triggersConditional: "q2b" },
      { id: "q2_b", label: "1% to 10%", points: 5 },
      { id: "q2_c", label: "11% to 20%", points: 10 },
      { id: "q2_d", label: "Over 20%", points: 15 }
    ]
  },
  // CONDITIONAL BRANCH Q2B
  {
    id: "q2b",
    isConditional: true,
    parentQuestionId: "q2",
    section: SECTIONS.FINANCIAL,
    sectionNumber: 1,
    questionNumber: "2B",
    title: "What is the primary reason for your negative or breakeven profit margin?",
    subtitle: "Differentiating growth investment from systemic weakness helps assess your true business valuation potential.",
    options: [
      { id: "q2b_a", label: "Deliberate reinvestment for aggressive growth", points: 3 },
      { id: "q2b_b", label: "Temporary market conditions", points: 1 },
      { id: "q2b_c", label: "Poor pricing structure", points: 0 },
      { id: "q2b_d", label: "Structural business issues", points: -5 }
    ]
  },
  {
    id: "q3",
    section: SECTIONS.FINANCIAL,
    sectionNumber: 1,
    questionNumber: 3,
    title: "What is your revenue growth rate year over year (YoY)?",
    subtitle: "Your growth rate signals market trajectory and future expansion potential to prospective buyers.",
    options: [
      { id: "q3_a", label: "Declining", points: 0, capsScore: 70, flag: "declining_revenue_cap" },
      { id: "q3_b", label: "Flat (0% growth)", points: 5 },
      { id: "q3_c", label: "Growing 1% to 15%", points: 10 },
      { id: "q3_d", label: "Growing over 15%", points: 15 }
    ]
  },

  // SECTION 2: OWNER DEPENDENCE
  {
    id: "q4",
    section: SECTIONS.OWNER,
    sectionNumber: 2,
    questionNumber: 4,
    title: "How many hours a week do you spend on front-line daily operations?",
    subtitle: "The more daily operations depend directly on you, the harder it is for a buyer to step in and take over.",
    options: [
      { id: "q4_a", label: "Over 40 hours per week", points: 0 },
      { id: "q4_b", label: "20 to 40 hours per week", points: 3 },
      { id: "q4_c", label: "5 to 20 hours per week", points: 7 },
      { id: "q4_d", label: "Under 5 hours per week", points: 10 }
    ]
  },
  {
    id: "q5",
    section: SECTIONS.OWNER,
    sectionNumber: 2,
    questionNumber: 5,
    title: "What happens to your sales if you step away completely for 3 months?",
    subtitle: "Tests how dependent your revenue engine is on your personal relationships and presence.",
    options: [
      { id: "q5_a", label: "Sales drop to zero", points: 0, flag: "hard_to_sell_institutional" },
      { id: "q5_b", label: "Sales decrease by half", points: 3 },
      { id: "q5_c", label: "Sales stay flat", points: 7 },
      { id: "q5_d", label: "Sales actually increase", points: 10 }
    ]
  },
  {
    id: "q6",
    section: SECTIONS.OWNER,
    sectionNumber: 2,
    questionNumber: 6,
    title: "Do you have a second-in-command who can run daily operations autonomously?",
    subtitle: "Having a leader run operations without you dramatically increases your business's transferable value.",
    options: [
      { id: "q6_a", label: "No second-in-command", points: 0 },
      { id: "q6_b", label: "Yes, but they are very new", points: 3 },
      { id: "q6_c", label: "Yes, with some experience", points: 7 },
      { id: "q6_d", label: "Yes, with a long proven track record", points: 12 }
    ]
  },

  // SECTION 3: CONCENTRATION RISKS
  {
    id: "q7",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: 7,
    title: "What percentage of your total revenue comes from your single largest customer?",
    subtitle: "High customer concentration poses a major risk to your business if your top account leaves.",
    options: [
      { id: "q7_a", label: "Under 5%", points: 10 },
      { id: "q7_b", label: "5% to 15%", points: 7 },
      { id: "q7_c", label: "16% to 30%", points: 3 },
      { id: "q7_d", label: "Over 30%", points: -5, triggersConditional: "q7b" }
    ]
  },
  // CONDITIONAL BRANCH Q7B
  {
    id: "q7b",
    isConditional: true,
    parentQuestionId: "q7",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: "7B",
    title: "Is that major customer locked into a binding contract or agreement?",
    subtitle: "Contractual terms determine how securely your concentrated revenue is protected.",
    options: [
      { id: "q7b_a", label: "Locked into a long-term binding contract", points: 3 },
      { id: "q7b_b", label: "Operates on a month-to-month basis", points: 0 },
      { id: "q7b_c", label: "Pays upfront in advance", points: 1 },
      { id: "q7b_d", label: "Consistently pays late", points: -3 }
    ]
  },
  {
    id: "q8",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: 8,
    title: "How easy would it be for you to replace your primary supplier or vendor?",
    subtitle: "Single point of failure suppliers can derail your exit due diligence.",
    options: [
      { id: "q8_a", label: "Impossible due to exclusive patents or single source", points: 0 },
      { id: "q8_b", label: "Extremely difficult", points: 2 },
      { id: "q8_c", label: "Moderately difficult but possible", points: 6 },
      { id: "q8_d", label: "Very easy with multiple vendors available", points: 10 }
    ]
  },
  {
    id: "q9",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: 9,
    title: "What would happen to your business if your top salesperson left tomorrow?",
    subtitle: "Measures how dependent your revenue is on key staff versus your internal sales systems.",
    options: [
      { id: "q9_a", label: "Catastrophic loss of revenue", points: 0 },
      { id: "q9_b", label: "Significant revenue drop for months", points: 3 },
      { id: "q9_c", label: "Temporary dip in sales", points: 7 },
      { id: "q9_d", label: "Negligible impact because sales rely on automated marketing systems", points: 10 }
    ]
  },

  // SECTION 4: QUALITY OF REVENUE & OPERATIONS
  {
    id: "q10",
    section: SECTIONS.REVENUE_QUALITY,
    sectionNumber: 4,
    questionNumber: 10,
    title: "What portion of your sales comes from automatic subscriptions or hard contracts?",
    subtitle: "Predictable recurring revenue commands the highest buyer valuation multiples.",
    options: [
      { id: "q10_a", label: "None (100% transactional)", points: 0 },
      { id: "q10_b", label: "Under 20%", points: 4 },
      { id: "q10_c", label: "21% to 50%", points: 8 },
      { id: "q10_d", label: "Over 50%", points: 12, multiplier: 1.15 }
    ]
  },
  {
    id: "q11",
    section: SECTIONS.REVENUE_QUALITY,
    sectionNumber: 4,
    questionNumber: 11,
    title: "How would your customers react to a 10% price increase tomorrow?",
    subtitle: "Tests your pricing power and how indispensable your offer is to your customers.",
    options: [
      { id: "q11_a", label: "Massive customer defection", points: 0 },
      { id: "q11_b", label: "Heavy complaints with some customer churn", points: 3 },
      { id: "q11_c", label: "Minor complaints but mostly high customer retention", points: 7 },
      { id: "q11_d", label: "Zero pushback because the product is highly specialized", points: 10 }
    ]
  },
  {
    id: "q12",
    section: SECTIONS.REVENUE_QUALITY,
    sectionNumber: 4,
    questionNumber: 12,
    title: "How do your gross margins compare to your industry average?",
    subtitle: "High gross margins reflect your pricing leverage and competitive moat.",
    options: [
      { id: "q12_a", label: "Significantly lower than industry average", points: 0 },
      { id: "q12_b", label: "Slightly lower than industry average", points: 3 },
      { id: "q12_c", label: "About the same as industry average", points: 7 },
      { id: "q12_d", label: "Significantly higher than industry average", points: 10 }
    ]
  },
  {
    id: "q13",
    section: SECTIONS.REVENUE_QUALITY,
    sectionNumber: 4,
    questionNumber: 13,
    title: "When do your customers typically pay for your goods or services?",
    subtitle: "Upfront customer payments eliminate cash flow stress and boost your business valuation.",
    options: [
      { id: "q13_a", label: "Net 60 days or more", points: 0 },
      { id: "q13_b", label: "Net 30 days", points: 3 },
      { id: "q13_c", label: "Upon delivery", points: 6 },
      { id: "q13_d", label: "Upfront before delivery", points: 10 }
    ]
  },
  {
    id: "q14",
    section: SECTIONS.REVENUE_QUALITY,
    sectionNumber: 4,
    questionNumber: 14,
    title: "How likely are your customers to refer a friend or leave a positive review?",
    subtitle: "Customer loyalty indicates your brand equity and organic word-of-mouth strength.",
    options: [
      { id: "q14_a", label: "Very unlikely", points: 0 },
      { id: "q14_b", label: "Somewhat unlikely", points: 3 },
      { id: "q14_c", label: "Neutral", points: 6 },
      { id: "q14_d", label: "Highly likely (Strong NPS)", points: 10 }
    ]
  },
  {
    id: "q15",
    section: SECTIONS.REVENUE_QUALITY,
    sectionNumber: 4,
    questionNumber: 15,
    title: "How are your business financial records maintained?",
    subtitle: "Clean financial records protect your valuation and ensure a smooth exit process.",
    options: [
      { id: "q15_a", label: "No standard bookkeeping / shoebox accounting", points: 0 },
      { id: "q15_b", label: "Standard internal software (e.g., QuickBooks, Xero)", points: 4 },
      { id: "q15_c", label: "External CPA compilation & tax returns", points: 7 },
      { id: "q15_d", label: "Full audited financials by independent accounting firm", points: 10 }
    ]
  }
];

export const OUTCOME_TIERS = {
  WARNING: {
    minScore: 0,
    maxScore: 50,
    title: "Owner-Dependent Job Warning",
    subtitle: "Your business is currently structured like a job for you rather than a transferable asset.",
    color: "#EF4444", // Red
    badgeClass: "badge-danger",
    headline: "High Founder Dependency — Action Plan to Build Your SOP Infrastructure",
    description: "Acquirers look for businesses that run smoothly without the founder. At your current score, a buyer would view purchasing your business as buying a demanding job rather than a self-sustaining asset.",
    sopSteps: [
      "Document all of your core daily operations into standardized step-by-step operating procedures (SOPs).",
      "Promote or hire an operational manager to handle your day-to-day client fulfillment and team oversight.",
      "Systematize your lead generation and sales calls so revenue isn't dependent on your personal effort.",
      "Transition your key client relationships to your team members over a 6-month period."
    ]
  },
  HIGH_RISK: {
    minScore: 51,
    maxScore: 70,
    title: "High-Risk Asset with Potential",
    subtitle: "Your business has solid foundational value but carries key buyer risk factors.",
    color: "#F59E0B", // Amber
    badgeClass: "badge-warning",
    headline: "Sellable with Valuation Discounts — Your Risk Mitigation Roadmap",
    description: "Your business is sellable, but buyers will likely apply valuation discounts to protect against key risk factors (such as customer concentration, lack of long-term contracts, or reliance on you).",
    sopSteps: [
      "Diversify your customer base so no single client represents over 15% of your annual revenue.",
      "Lock your top accounts into 1 to 3 year binding contracts with clear renewal terms.",
      "Formalize employee non-competes and retention incentives for your key team members.",
      "Clean up your internal accounting records to prepare for buyer due diligence."
    ]
  },
  STRONG: {
    minScore: 71,
    maxScore: 89,
    title: "Strong Valuation & Highly Marketable",
    subtitle: "Your business is highly attractive to buyers with strong, scalable operations.",
    color: "#2ABAD2", // Teal
    badgeClass: "badge-success",
    headline: "Highly Marketable Business — You Are Ready for Competitive Offers",
    description: "You have built a clean, scalable business with strong profit margins, solid management, and diversified revenue. Buyers will actively compete for a business with your profile.",
    sopSteps: [
      "Engage a Quality of Earnings (QofE) auditor to pre-verify your EBITDA calculations.",
      "Optimize your recurring revenue models to convert transactional sales into subscription or long-term contracts.",
      "Build a clear 3-year growth narrative showing your untapped expansion channels for an acquirer.",
      "Interview top M&A brokers or investment bankers to structure a competitive bidding process for your exit."
    ]
  },
  PREMIUM: {
    minScore: 90,
    maxScore: 100,
    title: "Premium Exit Asset",
    subtitle: "A rare, top-tier turn-key business that can command above-market valuation multiples.",
    color: "#10B981", // Emerald Green
    badgeClass: "badge-premium",
    headline: "Trophy Business Asset — You Have Achieved Elite Exit Valuation Potential",
    description: "Fewer than 3% of business owners achieve this tier. Your business features autonomous management, high-margin recurring cash flows, bulletproof contracts, and clean audited financials.",
    sopSteps: [
      "Run a targeted private auction through a tier-1 M&A advisory firm to maximize your enterprise valuation.",
      "Evaluate strategic buyers who can extract massive synergy value beyond standard market multiples.",
      "Structure tax-optimized exit strategies (e.g. rollover equity, installment structures, asset vs stock sale).",
      "Prepare key management retention packages to ensure zero disruption during your ownership transfer."
    ]
  }
};
