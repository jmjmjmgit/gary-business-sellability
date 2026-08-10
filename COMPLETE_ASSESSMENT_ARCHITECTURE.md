# Business Sellability Assessment Tool
## Complete Copy, Question Flow, Logic Architecture & Outcome Documentation

---

### 1. Landing View & Lead Capture Copy

- **Header Branding Pill**: `• GARY ASHWORTH • YOUR BUSINESS SELLABILITY ASSESSMENT`
- **Duration Badge**: `⏱️ Takes just 2–3 minutes to complete`
- **Main Headline**: `Is Your Business Transferable & Ready to Sell at a Premium Multiple?`
- **Main Subtitle**: `Discover your custom exit readiness score, identify hidden buyer risks, and receive a transformational roadmap to maximize your enterprise value.`
- **Credibility Trust Banner**: `Based on my 40+ years of experience buying, scaling, and selling 30+ businesses, combined with proven M&A deal standards.`
- **Transformational Outcome Cards**:
  1. **Your Sellability Score (1–100)**: Discover your exact exit readiness score and how acquirers value your business today.
  2. **Practical Recommendations**: Receive custom, actionable tips to eliminate owner reliance and boost sellability.
  3. **Transformational Growth**: Unlock a clear blueprint to turn your business into a high-multiple, self-sustaining exit asset.
- **Lead Capture Inputs**:
  - `Full Name` (text input, required)
  - `Work Email Address` (email input, required)
- **Primary CTA Button**: `Begin Your Business Sellability Assessment →`

---

### 2. Complete Question Architecture & Logic Rules

#### **SECTION 1: Financial Foundations**

##### **Q1**: What is your top line revenue over the trailing twelve months (TTM)?
- **Subtitle**: *Higher revenue provides your business with a stronger valuation foundation and higher buyer interest.*
- **Choices**:
  - `Under $1 Million` (5 pts)
  - `$1 Million to $3 Million` (10 pts)
  - `$3 Million to $10 Million` (15 pts)
  - `Over $10 Million` (20 pts)

##### **Q2**: What is your average net profit margin?
- **Subtitle**: *Healthy net margins demonstrate your operational efficiency and cash flow reliability.*
- **Choices**:
  - `Negative or Breakeven` (0 pts) **[Triggers Conditional Branch Q2B]**
  - `1% to 10%` (5 pts)
  - `11% to 20%` (10 pts)
  - `Over 20%` (15 pts)

##### **Q2B (Conditional Branch — Triggered if Q2 is Negative/Breakeven)**: What is the primary reason for your negative or breakeven profit margin?
- **Subtitle**: *Differentiating growth investment from systemic weakness helps assess your true business valuation potential.*
- **Choices**:
  - `Deliberate reinvestment for aggressive growth` (+3 pts restored)
  - `Temporary market conditions` (+1 pt restored)
  - `Poor pricing structure` (0 pts)
  - `Structural business issues` (-5 pts penalty)

##### **Q3**: What is your revenue growth rate year over year (YoY)?
- **Subtitle**: *Your growth rate signals market trajectory and future expansion potential to prospective buyers.*
- **Choices**:
  - `Declining` (0 pts) **[Triggers Score Cap Rule: Maximum Final Score Capped at 70/100]**
  - `Flat (0% growth)` (5 pts)
  - `Growing 1% to 15%` (10 pts)
  - `Growing over 15%` (15 pts)

---

#### **SECTION 2: Owner Dependence**

##### **Q4**: How many hours a week do you spend on front-line daily operations?
- **Subtitle**: *The more daily operations depend directly on you, the harder it is for a buyer to step in and take over.*
- **Choices**:
  - `Over 40 hours per week` (0 pts)
  - `20 to 40 hours per week` (3 pts)
  - `5 to 20 hours per week` (7 pts)
  - `Under 5 hours per week` (10 pts)

##### **Q5**: What happens to your sales if you step away completely for 3 months?
- **Subtitle**: *Tests how dependent your revenue engine is on your personal relationships and presence.*
- **Choices**:
  - `Sales drop to zero` (0 pts) **[Triggers Flag: Hard to Sell to Institutional Buyers]**
  - `Sales decrease by half` (3 pts)
  - `Sales stay flat` (7 pts)
  - `Sales actually increase` (10 pts)

##### **Q6**: Do you have a second-in-command who can run daily operations autonomously?
- **Subtitle**: *Having a leader run operations without you dramatically increases your business's transferable value.*
- **Choices**:
  - `No second-in-command` (0 pts)
  - `Yes, but they are very new` (3 pts)
  - `Yes, with some experience` (7 pts)
  - `Yes, with a long proven track record` (+12 bonus pts)

---

#### **SECTION 3: Concentration Risks**

##### **Q7**: What percentage of your total revenue comes from your single largest customer?
- **Subtitle**: *High customer concentration poses a major risk to your business if your top account leaves.*
- **Choices**:
  - `Under 5%` (10 pts)
  - `5% to 15%` (7 pts)
  - `16% to 30%` (3 pts)
  - `Over 30%` (-5 pts penalty) **[Triggers Conditional Branch Q7B]**

##### **Q7B (Conditional Branch — Triggered if Q7 is Over 30%)**: Is that major customer locked into a binding contract or agreement?
- **Subtitle**: *Contractual terms determine how securely your concentrated revenue is protected.*
- **Choices**:
  - `Locked into a long-term binding contract` (+3 pts penalty softened)
  - `Operates on a month-to-month basis` (0 pts)
  - `Pays upfront in advance` (+1 pt)
  - `Consistently pays late` (-3 pts penalty)

##### **Q8**: How easy would it be for you to replace your primary supplier or vendor?
- **Subtitle**: *Single point of failure suppliers can derail your exit due diligence.*
- **Choices**:
  - `Impossible due to exclusive patents or single source` (0 pts)
  - `Extremely difficult` (2 pts)
  - `Moderately difficult but possible` (6 pts)
  - `Very easy with multiple vendors available` (10 pts)

##### **Q9**: What would happen to your business if your top salesperson left tomorrow?
- **Subtitle**: *Measures how dependent your revenue is on key staff versus your internal sales systems.*
- **Choices**:
  - `Catastrophic loss of revenue` (0 pts)
  - `Significant revenue drop for months` (3 pts)
  - `Temporary dip in sales` (7 pts)
  - `Negligible impact because sales rely on automated marketing systems` (10 pts)

---

#### **SECTION 4: Quality of Revenue & Operations**

##### **Q10**: What portion of your sales comes from automatic subscriptions or hard contracts?
- **Subtitle**: *Predictable recurring revenue commands the highest buyer valuation multiples.*
- **Choices**:
  - `None (100% transactional)` (0 pts)
  - `Under 20%` (4 pts)
  - `21% to 50%` (8 pts)
  - `Over 50%` (+12 pts) **[Triggers 1.15x Recurring Revenue Multiplier to Running Score]**

##### **Q11**: How would your customers react to a 10% price increase tomorrow?
- **Subtitle**: *Tests your pricing power and how indispensable your offer is to your customers.*
- **Choices**:
  - `Massive customer defection` (0 pts)
  - `Heavy complaints with some customer churn` (3 pts)
  - `Minor complaints but mostly high customer retention` (7 pts)
  - `Zero pushback because the product is highly specialized` (10 pts)

##### **Q12**: How do your gross margins compare to your industry average?
- **Subtitle**: *High gross margins reflect your pricing leverage and competitive moat.*
- **Choices**:
  - `Significantly lower than industry average` (0 pts)
  - `Slightly lower than industry average` (3 pts)
  - `About the same as industry average` (7 pts)
  - `Significantly higher than industry average` (10 pts)

##### **Q13**: When do your customers typically pay for your goods or services?
- **Subtitle**: *Upfront customer payments eliminate cash flow stress and boost your business valuation.*
- **Choices**:
  - `Net 60 days or more` (0 pts)
  - `Net 30 days` (3 pts)
  - `Upon delivery` (6 pts)
  - `Upfront before delivery` (10 pts)

##### **Q14**: How likely are your customers to refer a friend or leave a positive review?
- **Subtitle**: *Customer loyalty indicates your brand equity and organic word-of-mouth strength.*
- **Choices**:
  - `Very unlikely` (0 pts)
  - `Somewhat unlikely` (3 pts)
  - `Neutral` (6 pts)
  - `Highly likely (Strong NPS)` (10 pts)

##### **Q15**: How are your business financial records maintained?
- **Subtitle**: *Clean financial records protect your valuation and ensure a smooth exit process.*
- **Choices**:
  - `No standard bookkeeping / shoebox accounting` (0 pts)
  - `Standard internal software (e.g., QuickBooks, Xero)` (4 pts)
  - `External CPA compilation & tax returns` (7 pts)
  - `Full audited financials by independent accounting firm` (10 pts)

---

### 3. Scoring & Mathematical Rules

1. **Baseline Tally**: Sum total raw points from answered active questions.
2. **Normalization**: `baseScore = Math.round((totalRawPoints / totalActiveMaxPossible) * 100)`
3. **Recurring Revenue Multiplier**: If Q10 option `Over 50%` selected: `scoreAfterMultiplier = Math.round(baseScore * 1.15)`
4. **Declining Growth Cap**: If Q3 option `Declining` selected: `finalScore = Math.min(scoreAfterMultiplier, 70)`
5. **Clamping**: Final score bounded between `0` and `100`.

---

### 4. Outcome Tiers & Recommendation Roadmaps

#### **TIER 1: Score 0 – 50 — Owner-Dependent Job Warning**
- **Badge**: `Owner-Dependent Job Warning` (Red)
- **Headline**: `High Founder Dependency — Action Plan to Build Your SOP Infrastructure`
- **Description**: Acquirers look for businesses that run smoothly without the founder. At your current score, a buyer would view purchasing your business as buying a demanding job rather than a self-sustaining asset.
- **Actionable Steps**:
  1. Document all of your core daily operations into standardized step-by-step operating procedures (SOPs).
  2. Promote or hire an operational manager to handle your day-to-day client fulfillment and team oversight.
  3. Systematize your lead generation and sales calls so revenue isn't dependent on your personal effort.
  4. Transition your key client relationships to your team members over a 6-month period.

#### **TIER 2: Score 51 – 70 — High-Risk Asset with Potential**
- **Badge**: `High-Risk Asset with Potential` (Amber)
- **Headline**: `Sellable with Valuation Discounts — Your Risk Mitigation Roadmap`
- **Description**: Your business is sellable, but buyers will likely apply valuation discounts to protect against key risk factors (such as customer concentration, lack of long-term contracts, or reliance on you).
- **Actionable Steps**:
  1. Diversify your customer base so no single client represents over 15% of your annual revenue.
  2. Lock your top accounts into 1 to 3 year binding contracts with clear renewal terms.
  3. Formalize employee non-competes and retention incentives for your key team members.
  4. Clean up your internal accounting records to prepare for buyer due diligence.

#### **TIER 3: Score 71 – 89 — Strong Valuation & Highly Marketable**
- **Badge**: `Strong Valuation & Highly Marketable` (Teal `#2ABAD2`)
- **Headline**: `Highly Marketable Business — You Are Ready for Competitive Offers`
- **Description**: You have built a clean, scalable business with strong profit margins, solid management, and diversified revenue. Buyers will actively compete for a business with your profile.
- **Actionable Steps**:
  1. Engage a Quality of Earnings (QofE) auditor to pre-verify your EBITDA calculations.
  2. Optimize your recurring revenue models to convert transactional sales into subscription or long-term contracts.
  3. Build a clear 3-year growth narrative showing your untapped expansion channels for an acquirer.
  4. Interview top M&A brokers or investment bankers to structure a competitive bidding process for your exit.

#### **TIER 4: Score 90 – 100 — Premium Exit Asset**
- **Badge**: `Premium Exit Asset` (Emerald Green)
- **Headline**: `Trophy Business Asset — You Have Achieved Elite Exit Valuation Potential`
- **Description**: Fewer than 3% of business owners achieve this tier. Your business features autonomous management, high-margin recurring cash flows, bulletproof contracts, and clean audited financials.
- **Actionable Steps**:
  1. Run a targeted private auction through a tier-1 M&A advisory firm to maximize your enterprise valuation.
  2. Evaluate strategic buyers who can extract massive synergy value beyond standard market multiples.
  3. Structure tax-optimized exit strategies (e.g. rollover equity, installment structures, asset vs stock sale).
  4. Prepare key management retention packages to ensure zero disruption during your ownership transfer.

---

### 5. Advisory & Lead Nurturing Call to Actions

- **Recommendations Section Title**: `My General Recommendations Based on Your Answers`
- **Personal Advisory CTA**: `If you want a more personalized assessment, schedule a 30-minute 1:1 advisory call with me or join my Business Accelerator:`
- **Accelerator Link**: [https://garyashworth.com/business-accelerator](https://garyashworth.com/business-accelerator)
- **Report Actions**: `Print / Save PDF Report` & `Retake Assessment` buttons.
