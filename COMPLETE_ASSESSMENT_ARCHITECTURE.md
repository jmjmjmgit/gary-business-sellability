# Business Sellability Assessment Tool
## Master Diagnostic Specification, Valuation Engine, Logic Rules & Outcome Architecture

---

### 1. Landing View & Lead Capture Copy

- **Header Branding Pill**: `• GARY ASHWORTH • YOUR BUSINESS SELLABILITY ASSESSMENT`
- **EPI Hard Fact Banner**: `⚠️ Fact: 70% to 80% of businesses prepared for sale NEVER actually sell. (Exit Planning Institute)`
- **Duration Badge**: `⏱️ Takes just 2–3 minutes to complete`
- **Main Headline**: `Would Anyone Really Want to Buy Your Business? And If They Do, What Is It Actually Worth?`
- **Main Subtitle**: `Take my 3-minute executive diagnostic to calculate your estimated £ valuation, discover your multiple tier, and pinpoint your #1 value killer before buyers do.`
- **Credibility Trust Banner**: `Based on my 40+ years of experience buying, scaling, and selling 30+ businesses, combined with proven M&A deal standards.`
- **Transformational Outcome Cards**:
  1. **Your £ Valuation & Multiple**: Discover what buyers would realistically pay today versus what a tier-90 business commands.
  2. **Your #1 Value Killer Diagnosed**: Pinpoint the exact single operational, founder, or concentration risk destroying your exit price.
  3. **The Valuation Gap Blueprint**: Calculate the exact £ money left on the table and unlock a roadmap to capture it.
- **Lead Capture Form Inputs**:
  - `Full Name` (text input, required)
  - `Work Email Address` (email input, required)
- **Primary CTA Button**: `Begin Your Business Sellability Diagnostic →`

---

### 2. Complete Question Architecture & Logic Rules

#### **SECTION 1: Financial Foundations**

##### **Q1**: What is your top line revenue over the trailing twelve months (TTM)?
- **Subtitle**: *Revenue scale establishes your baseline valuation tier and determines which buyer pools (strategic vs. private equity) will compete for your asset.*
- **Choices**:
  - `Under £1 Million` (5 pts) — *Estimated Median Revenue: £650k*
  - `£1 Million to £3 Million` (10 pts) — *Estimated Median Revenue: £2.0M*
  - `£3 Million to £10 Million` (15 pts) — *Estimated Median Revenue: £6.0M*
  - `Over £10 Million` (20 pts) — *Estimated Median Revenue: £15.0M*

##### **Q2**: What is your average net profit margin?
- **Subtitle**: *Healthy net margins demonstrate your operational efficiency and generate the transferable EBITDA buyers actually pay for.*
- **Choices**:
  - `Negative or Breakeven` (0 pts) **[Triggers Conditional Branch Q2B]** — *Estimated Margin: 3%*
  - `1% to 10%` (5 pts) — *Estimated Margin: 7.5%*
  - `11% to 20%` (10 pts) — *Estimated Margin: 15%*
  - `Over 20%` (15 pts) — *Estimated Margin: 25%*

##### **Q2B (Conditional Branch — Triggered if Q2 is Negative/Breakeven)**: What is the primary reason for your negative or breakeven profit margin?
- **Subtitle**: *Differentiating deliberate growth investment from systemic weakness determines whether buyers see upside or operational risk.*
- **Choices**:
  - `Deliberate reinvestment for aggressive growth` (+3 pts restored)
  - `Temporary market conditions` (+1 pt restored)
  - `Poor pricing structure` (0 pts)
  - `Structural business issues` (-5 pts penalty)

##### **Q3**: What is your revenue growth rate year over year (YoY)?
- **Subtitle**: *Growth trajectory is the ultimate multiplier. Acquirers severely discount or walk away from contracting businesses.*
- **Choices**:
  - `Declining` (0 pts) **[Triggers Hard Score Cap: Maximum Final Score Capped at 70/100]**
  - `Flat (0% growth)` (5 pts)
  - `Growing 1% to 15%` (10 pts)
  - `Growing over 15%` (15 pts)

---

#### **SECTION 2: Owner Dependence**

##### **Q4**: How many hours a week do you spend on front-line daily operations?
- **Subtitle**: *The more daily operations depend directly on you, the harder it is for a buyer to step in without you.*
- **Choices**:
  - `Over 40 hours per week` (0 pts)
  - `20 to 40 hours per week` (3 pts)
  - `5 to 20 hours per week` (7 pts)
  - `Under 5 hours per week` (10 pts)

##### **Q5**: What happens to your sales if you step away completely for 3 months?
- **Subtitle**: *Tests whether your revenue engine is an institutional machine or a personal rolodex.*
- **Choices**:
  - `Sales drop to zero` (0 pts) **[Triggers Flag: Hard to Sell to Institutional / PE Buyers]**
  - `Sales decrease by half` (3 pts)
  - `Sales stay flat` (7 pts)
  - `Sales actually increase` (10 pts)

##### **Q6**: Do you have a second-in-command who can run daily operations autonomously?
- **Subtitle**: *A proven management team transforms your business from a founder-dependent job into a high-multiple asset.*
- **Choices**:
  - `No second-in-command` (0 pts)
  - `Yes, but they are very new` (3 pts)
  - `Yes, with some experience` (7 pts)
  - `Yes, with a long proven track record` (+12 bonus pts)

---

#### **SECTION 3: Concentration Risks**

##### **Q7**: What percentage of your total revenue comes from your single largest customer?
- **Subtitle**: *High customer concentration is the #1 deal-killer during acquirer financing and due diligence.*
- **Choices**:
  - `Under 5%` (10 pts)
  - `5% to 15%` (7 pts)
  - `16% to 30%` (3 pts)
  - `Over 30%` (-5 pts penalty) **[Triggers Conditional Branch Q7B]**

##### **Q7B (Conditional Branch — Triggered if Q7 is Over 30%)**: Is that major customer locked into a binding contract or agreement?
- **Subtitle**: *Contractual terms determine how securely your concentrated cash flow is protected.*
- **Choices**:
  - `Locked into a long-term binding contract` (+3 pts penalty softened)
  - `Operates on a month-to-month basis` (0 pts)
  - `Pays upfront in advance` (+1 pt)
  - `Consistently pays late` (-3 pts penalty)

##### **Q8**: How easy would it be for you to replace your primary supplier or vendor?
- **Subtitle**: *Single-point-of-failure suppliers create operational fragility that buyers discount.*
- **Choices**:
  - `Impossible due to exclusive patents or single source` (0 pts)
  - `Extremely difficult` (2 pts)
  - `Moderately difficult but possible` (6 pts)
  - `Very easy with multiple vendors available` (10 pts)

##### **Q9**: What would happen to your business if your top salesperson left tomorrow?
- **Subtitle**: *Measures whether your sales system belongs to the business or resides in an individual's head.*
- **Choices**:
  - `Catastrophic loss of revenue` (0 pts)
  - `Significant revenue drop for months` (3 pts)
  - `Temporary dip in sales` (7 pts)
  - `Negligible impact because sales rely on automated marketing systems` (10 pts)

---

#### **SECTION 4: Quality of Revenue & Operations**

##### **Q10**: What portion of your sales comes from automatic subscriptions or hard contracts?
- **Subtitle**: *Predictable, guaranteed future cash flow commands the highest valuation multiples in the M&A market.*
- **Choices**:
  - `None (100% transactional)` (0 pts)
  - `Under 20%` (4 pts)
  - `21% to 50%` (8 pts)
  - `Over 50%` (+12 pts) **[Triggers 1.15x Recurring Revenue Multiplier to Running Score]**

##### **Q11**: How would your customers react to a 10% price increase tomorrow?
- **Subtitle**: *Pricing power demonstrates customer retention, brand defensibility, and competitive moat.*
- **Choices**:
  - `Massive customer defection` (0 pts)
  - `Heavy complaints with some customer churn` (3 pts)
  - `Minor complaints but mostly high customer retention` (7 pts)
  - `Zero pushback because the product is highly specialized` (10 pts)

##### **Q12**: How do your gross margins compare to your industry average?
- **Subtitle**: *Superior gross margins prove pricing leverage and protect profits during economic contractions.*
- **Choices**:
  - `Significantly lower than industry average` (0 pts)
  - `Slightly lower than industry average` (3 pts)
  - `About the same as industry average` (7 pts)
  - `Significantly higher than industry average` (10 pts)

##### **Q13**: When do your customers typically pay for your goods or services?
- **Subtitle**: *Negative working capital cycles eliminate buyer debt burden and drastically increase enterprise value.*
- **Choices**:
  - `Net 60 days or more` (0 pts)
  - `Net 30 days` (3 pts)
  - `Upon delivery` (6 pts)
  - `Upfront before delivery` (10 pts)

##### **Q14**: How likely are your customers to refer a friend or leave a positive review?
- **Subtitle**: *Customer loyalty indicates organic word-of-mouth momentum and lowers customer acquisition costs for acquirers.*
- **Choices**:
  - `Very unlikely` (0 pts)
  - `Somewhat unlikely` (3 pts)
  - `Neutral` (6 pts)
  - `Highly likely (Strong NPS)` (10 pts)

##### **Q15**: How are your business financial records maintained?
- **Subtitle**: *Clean, verified financial records shorten diligence timelines and prevent buyers from chipping away at your price.*
- **Choices**:
  - `No standard bookkeeping / shoebox accounting` (0 pts)
  - `Standard internal software (e.g., QuickBooks, Xero)` (4 pts)
  - `External CPA compilation & tax returns` (7 pts)
  - `Full audited financials by independent accounting firm` (10 pts)

---

### 3. Valuation & Multiple Calculation Engine

1. **Estimated Baseline EBITDA**:
   - `EstimatedEbitda = RevenueEstimate * MarginEstimate`
2. **Current Valuation Multiplier based on Score**:
   - Score 0–50: `~2.0x EBITDA` (Owner-dependent job)
   - Score 51–70: `~3.8x EBITDA` (Sellable with discounts)
   - Score 71–89: `~5.8x EBITDA` (Marketable asset)
   - Score 90–100: `~8.5x EBITDA` (Premium exit asset)
3. **Current Estimated Valuation**:
   - `CurrentValuation = EstimatedEbitda * CurrentMultiple`
4. **Tier 90+ Exit Potential Valuation**:
   - `PotentialValuation = EstimatedEbitda * 8.5`
5. **The Valuation Gap (Money Left on the Table)**:
   - `ValuationGap = Math.max(0, PotentialValuation - CurrentValuation)`

---

### 4. Dynamic #1 Primary Value Killer Diagnostic Logic

Instead of a generic tier blurb, the diagnostic identifies the single biggest bottleneck and provides a deep-dive diagnosis:

1. **Founder Trap (Severe Key-Person Risk)** (Triggered if Q5 = Sales drop to zero):
   - *Impact*: Cuts EBITDA multiple by up to 50% & triggers 3–5 year earnouts.
   - *Diagnosis*: Sales drop to zero if you step away for 3 months. In M&A, buyers do not buy jobs — they buy self-sustaining cash flow engines. Institutional buyers and private equity firms will either pass immediately or demand a grueling multi-year earnout.
   - *Remedy*: Immediately build documented standard operating procedures (SOPs) and install a second-in-command who owns customer fulfillment and sales pipelines.
2. **Severe Customer Concentration (>30% Revenue in One Account)** (Triggered if Q7 = Over 30%):
   - *Impact*: Triggers 2.0x–3.0x multiple penalty and bank financing refusal.
   - *Diagnosis*: Over 30% of your revenue is held by a single customer. If that client leaves post-sale, the buyer's debt service collapses. Bank lenders often refuse to finance acquisitions with over 25% single-customer exposure.
   - *Remedy*: Lock this major customer into a multi-year SLA and execute a targeted sales sprint to dilute their share below 15%.
3. **Contracting Revenue Trajectory** (Triggered if Q3 = Declining):
   - *Impact*: Hard score cap at 70/100 & heavy distressed acquisition discounts.
   - *Diagnosis*: Your revenue is contracting year-over-year. Buyers purchase future cash flow, not historical nostalgia. A declining business is treated as a turnaround risk.
   - *Remedy*: Eliminate low-margin product lines, restructure your pricing, and demonstrate 2 consecutive quarters of growth stabilization.
4. **Founder Bottleneck (40+ Weekly Front-Line Hours)** (Triggered if Q4 = Over 40 hours):
   - *Impact*: Reduces transferable enterprise value and delays exit timeline.
   - *Diagnosis*: You are spending 40+ hours per week working in the day-to-day operations rather than on strategic scale.
   - *Remedy*: Conduct a time audit, delegate all level-1/2 operational tasks, and empower middle managers.
5. **Transactional Revenue Drag** (Triggered if Q10 = None or Under 20%):
   - *Impact*: Depresses multiple to 3x–4x vs 7x–10x for recurring models.
   - *Diagnosis*: Over 80% of your revenue is transactional, meaning you start from zero every month.
   - *Remedy*: Package core services into recurring SLAs, monthly retainers, or subscription maintenance contracts.
6. **Key-Person Sales Vulnerability** (Triggered if Q9 = Catastrophic loss):
   - *Impact*: Creates severe post-closing flight risk and financing friction.
   - *Diagnosis*: If your top salesperson leaves, revenue collapses. Acquirers will view the salesperson as the true owner.
   - *Remedy*: Institutionalize sales playbooks, centralize lead gen into automated marketing systems, and install equity-like retention agreements.
7. **Financial Diligence Fragility** (Triggered if Q15 = No standard bookkeeping):
   - *Impact*: Causes over 50% of deal collapses during due diligence.
   - *Diagnosis*: Informal bookkeeping destroys buyer trust and causes due diligence to drag on until deals fall apart.
   - *Remedy*: Migrate immediately to cloud accounting (Xero/QuickBooks) and hire an external CPA for Quality of Earnings reviews.

---

### 5. Peer Percentile Benchmark Rankings

- Score < 45: Higher than 24% of tested businesses
- Score 45–59: Higher than 48% of tested businesses
- Score 60–74: Higher than 69% of tested businesses
- Score 75–87: Higher than 86% of tested businesses
- Score 88–94: Higher than 94% of tested businesses
- Score 95–100: Top 2% (Higher than 98% of tested businesses)

---

### 6. Unfiltered Advisory Call & Accelerator CTAs

- **Card Headline**: `This Is What’s Standing Between Where You Are Now and a Premium Exit.`
- **Body**: `If you want the unfiltered version — book thirty minutes with me. No sales pitch, no generic advice, just your numbers, your primary value killer, and a battle-tested roadmap to capture your £ valuation gap.`
- **Primary CTA Button**: `Book 30-Min Unfiltered Valuation Review With Gary →`
- **Secondary Link**: `Or join Gary's Business Accelerator (£/mo): https://garyashworth.com/business-accelerator`
