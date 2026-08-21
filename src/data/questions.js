// BUSINESS SELLABILITY ASSESSMENT — Master Specification Version 2
// Scoring Engine, Valuation Model, Diagnosis Logic & Copy

export const SECTIONS = {
  MONEY: "The money",
  OWNER: "How much of it is you",
  RISKS: "Where it could all go wrong",
  QUALITY: "Quality of the earnings",
  YOU: "You"
};

export const MAX_RAW_POINTS = 174;

export const QUESTIONS = [
  // SECTION 1: THE MONEY
  {
    id: "q1",
    section: SECTIONS.MONEY,
    sectionNumber: 1,
    questionNumber: 1,
    title: "What was your turnover over the last twelve months?",
    subtitle: "Revenue decides which buyers will look at you at all, and it sets the ceiling on what any of them will pay.",
    options: [
      { id: "q1_a", label: "Under 1 million", points: 5, revenueEstimate: 650000, sizeCap: 4.0 },
      { id: "q1_b", label: "1 million to 3 million", points: 10, revenueEstimate: 2000000, sizeCap: 5.5 },
      { id: "q1_c", label: "3 million to 10 million", points: 15, revenueEstimate: 6000000, sizeCap: 7.0 },
      { id: "q1_d", label: "Over 10 million", points: 20, revenueEstimate: 15000000, sizeCap: 8.5 }
    ]
  },
  {
    id: "q2",
    section: SECTIONS.MONEY,
    sectionNumber: 1,
    questionNumber: 2,
    title: "What is your net profit margin before your own salary, interest, and tax?",
    subtitle: "This is your Adjusted EBITDA margin—the underlying earnings figure buyers price off. Turnover is for dinner conversation; margin is what somebody buys.",
    options: [
      { id: "q2_a", label: "Negative or breakeven", points: 0, marginEstimate: 0.03, triggersConditional: "q2b" },
      { id: "q2_b", label: "1% to 10%", points: 5, marginEstimate: 0.075 },
      { id: "q2_c", label: "11% to 20%", points: 10, marginEstimate: 0.15 },
      { id: "q2_d", label: "Over 20%", points: 15, marginEstimate: 0.25 }
    ]
  },
  // CONDITIONAL Q2B
  {
    id: "q2b",
    isConditional: true,
    parentQuestionId: "q2",
    section: SECTIONS.MONEY,
    sectionNumber: 1,
    questionNumber: "2B",
    title: "Why is the business not making money?",
    subtitle: "Losing money on purpose whilst you grow is a very different conversation to losing money because something is broken.",
    options: [
      { id: "q2b_a", label: "Deliberate reinvestment to grow faster", points: 3 },
      { id: "q2b_b", label: "Temporary market conditions", points: 1 },
      { id: "q2b_c", label: "Pricing is wrong", points: 0 },
      { id: "q2b_d", label: "Structural problems in the business", points: -5, flag: "broken_economics" }
    ]
  },
  {
    id: "q3",
    section: SECTIONS.MONEY,
    sectionNumber: 1,
    questionNumber: 3,
    title: "How is turnover moving year on year?",
    subtitle: "Buyers are paying for the next three years of profit, and a falling line tells them the next three will be worse than the last three.",
    options: [
      { id: "q3_a", label: "Going backwards", points: 0, capsScore: 55, flag: "declining_revenue_cap" },
      { id: "q3_b", label: "Flat", points: 5 },
      { id: "q3_c", label: "Growing 1% to 15%", points: 10 },
      { id: "q3_d", label: "Growing more than 15%", points: 15 }
    ]
  },

  // SECTION 2: HOW MUCH OF IT IS YOU
  {
    id: "q4",
    section: SECTIONS.OWNER,
    sectionNumber: 2,
    questionNumber: 4,
    title: "How many hours a week do you spend on the day to day work?",
    subtitle: "The more of the daily running that goes through you, the harder it is for anyone else to take over.",
    options: [
      { id: "q4_a", label: "More than 40", points: 0 },
      { id: "q4_b", label: "20 to 40", points: 3 },
      { id: "q4_c", label: "5 to 20", points: 7 },
      { id: "q4_d", label: "Under 5", points: 10 }
    ]
  },
  {
    id: "q5",
    section: SECTIONS.OWNER,
    sectionNumber: 2,
    questionNumber: 5,
    title: "What happens to sales if you disappear for three months?",
    subtitle: "This is the question that separates a business from a well paid job.",
    options: [
      { id: "q5_a", label: "They stop", points: 0, flag: "owner_dependent" },
      { id: "q5_b", label: "They halve", points: 3 },
      { id: "q5_c", label: "They hold steady", points: 7 },
      { id: "q5_d", label: "They keep growing, because the team runs it", points: 10 }
    ]
  },
  {
    id: "q6",
    section: SECTIONS.OWNER,
    sectionNumber: 2,
    questionNumber: 6,
    title: "Do you have a number two who can run the place without you?",
    subtitle: "A proper second in command moves your final price more than almost anything else on this list.",
    options: [
      { id: "q6_a", label: "No", points: 0 },
      { id: "q6_b", label: "Yes, but they are new", points: 3 },
      { id: "q6_c", label: "Yes, with some experience", points: 7 },
      { id: "q6_d", label: "Yes, and they have a long track record", points: 12 }
    ]
  },

  // SECTION 3: WHERE IT COULD ALL GO WRONG
  {
    id: "q7",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: 7,
    title: "What share of turnover comes from your largest customer?",
    subtitle: "One big customer is the thing that most often kills a deal at the last minute, usually the week the buyer's bank gets involved.",
    options: [
      { id: "q7_a", label: "Under 5%", points: 10 },
      { id: "q7_b", label: "5% to 15%", points: 7 },
      { id: "q7_c", label: "16% to 30%", points: 3 },
      { id: "q7_d", label: "Over 30%", points: -5, triggersConditional: "q7b" }
    ]
  },
  // CONDITIONAL Q7B
  {
    id: "q7b",
    isConditional: true,
    parentQuestionId: "q7",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: "7B",
    title: "Is that customer on a contract?",
    subtitle: "A signed long term agreement changes how a buyer views the same concentration.",
    options: [
      { id: "q7b_a", label: "Long term binding contract", points: 3 },
      { id: "q7b_b", label: "Rolling month to month", points: 0 },
      { id: "q7b_c", label: "Pays upfront", points: 1 },
      { id: "q7b_d", label: "Pays late, every time", points: -3 }
    ]
  },
  {
    id: "q8",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: 8,
    title: "How easily could you replace your main supplier?",
    subtitle: "A supplier you cannot replace is somebody else's hand on your margin.",
    options: [
      { id: "q8_a", label: "One supplier, no realistic alternative", points: 0, triggersConditional: "q8b" },
      { id: "q8_b", label: "Very difficult, it would cost us time and margin", points: 2 },
      { id: "q8_c", label: "Doable with some disruption", points: 6 },
      { id: "q8_d", label: "Easy, several suppliers compete for our business", points: 10 }
    ]
  },
  // CONDITIONAL Q8B
  {
    id: "q8b",
    isConditional: true,
    parentQuestionId: "q8",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: "8B",
    title: "Is that single source something you own or control, such as an exclusive licence, a patent, or an agreement nobody else can get?",
    subtitle: "Owning the only route to market is an asset. Being hostage to somebody else's is a risk.",
    options: [
      { id: "q8b_a", label: "Yes, we own or control it", points: 8 },
      { id: "q8b_b", label: "No, we are dependent on them", points: 0 }
    ]
  },
  {
    id: "q9",
    section: SECTIONS.RISKS,
    sectionNumber: 3,
    questionNumber: 9,
    title: "What happens if your best salesperson resigns tomorrow?",
    subtitle: "This tells a buyer whether the sales system belongs to the business or lives in one person's head.",
    options: [
      { id: "q9_a", label: "We would lose a serious chunk of revenue", points: 0 },
      { id: "q9_b", label: "A big drop for several months whilst we recover", points: 3 },
      { id: "q9_c", label: "A dip, then back to normal", points: 7 },
      { id: "q9_d", label: "Barely noticed, the leads and the process belong to the business", points: 10 }
    ]
  },

  // SECTION 4: QUALITY OF THE EARNINGS
  {
    id: "q10",
    section: SECTIONS.QUALITY,
    sectionNumber: 4,
    questionNumber: 10,
    title: "How much of your revenue is recurring or contracted?",
    subtitle: "Contracted income is the closest thing to guaranteed money a buyer can see, and they pay a premium for it.",
    options: [
      { id: "q10_a", label: "None, every sale starts from scratch", points: 0 },
      { id: "q10_b", label: "Under 20%", points: 4 },
      { id: "q10_c", label: "21% to 50%", points: 8 },
      { id: "q10_d", label: "Over 50%", points: 12, recurringUplift: 0.5 }
    ]
  },
  {
    id: "q11",
    section: SECTIONS.QUALITY,
    sectionNumber: 4,
    questionNumber: 11,
    title: "How would your customers react to a 10% price rise tomorrow?",
    subtitle: "If you can put prices up without losing people, you have something they cannot get elsewhere.",
    options: [
      { id: "q11_a", label: "We would lose a lot of them", points: 0 },
      { id: "q11_b", label: "Plenty of complaints and some would go", points: 3 },
      { id: "q11_c", label: "Some grumbling, most would stay", points: 7 },
      { id: "q11_d", label: "Nobody would blink", points: 10 }
    ]
  },
  {
    id: "q12",
    section: SECTIONS.QUALITY,
    sectionNumber: 4,
    questionNumber: 12,
    title: "How do your gross margins compare with others in your sector?",
    subtitle: "Margin above your sector average tells a buyer you have pricing power and room to absorb a bad year.",
    options: [
      { id: "q12_a", label: "Well below average", points: 0 },
      { id: "q12_b", label: "Slightly below", points: 3 },
      { id: "q12_c", label: "About the same", points: 7 },
      { id: "q12_d", label: "Well above average", points: 10 }
    ]
  },
  {
    id: "q13",
    section: SECTIONS.QUALITY,
    sectionNumber: 4,
    questionNumber: 13,
    title: "When do your customers pay you?",
    subtitle: "Getting paid before you deliver means a buyer needs less cash to run the place, and that shows up in the price.",
    options: [
      { id: "q13_a", label: "60 days or more", points: 0 },
      { id: "q13_b", label: "30 days", points: 3 },
      { id: "q13_c", label: "On delivery", points: 6 },
      { id: "q13_d", label: "Upfront, before we do the work", points: 10 }
    ]
  },
  {
    id: "q14",
    section: SECTIONS.QUALITY,
    sectionNumber: 4,
    questionNumber: 14,
    title: "How likely are your customers to recommend you?",
    subtitle: "Customers who bring you more customers keep your acquisition cost down, and a buyer will notice.",
    options: [
      { id: "q14_a", label: "Very unlikely", points: 0 },
      { id: "q14_b", label: "Unlikely", points: 3 },
      { id: "q14_c", label: "Neither one way nor the other", points: 6 },
      { id: "q14_d", label: "Very likely, they do it already", points: 10 }
    ]
  },
  {
    id: "q15",
    section: SECTIONS.QUALITY,
    sectionNumber: 4,
    questionNumber: 15,
    title: "How are your accounts kept?",
    subtitle: "Messy books give a buyer an excuse to chip away at your price during due diligence, and they will take it.",
    options: [
      { id: "q15_a", label: "Shoebox, or whatever the accountant can piece together", points: 0 },
      { id: "q15_b", label: "Xero or QuickBooks, kept up to date", points: 4 },
      { id: "q15_c", label: "Accountant prepared and filed each year", points: 7 },
      { id: "q15_d", label: "Fully audited by an independent firm", points: 10 }
    ]
  },

  // SECTION 5: YOU (ROUTING ONLY, NO POINTS)
  {
    id: "q16",
    section: SECTIONS.YOU,
    sectionNumber: 5,
    questionNumber: 16,
    isScored: false,
    title: "When do you want to be out?",
    subtitle: "This one carries no points. It changes what I would tell you to do first.",
    options: [
      { id: "q16_a", label: "Inside twelve months", points: 0, route: "call" },
      { id: "q16_b", label: "One to three years", points: 0, route: "tier" },
      { id: "q16_c", label: "Three to five years", points: 0, route: "tier" },
      { id: "q16_d", label: "No fixed plan, I just want to know where I stand", points: 0, route: "tier" }
    ]
  }
];

export const OUTCOME_TIERS = {
  TIER_1: {
    key: "TIER_1",
    minScore: 0,
    maxScore: 39.9,
    title: "You own a job",
    multipleLabel: "around 2.0x",
    baseMultiple: 2.0,
    color: "#EF4444",
    badgeClass: "badge-danger",
    headline: "Right now a buyer sees a demanding job with your name on it",
    description: "Buyers want a business that runs whether or not you turn up. At this score they would be buying themselves a job, and most of them already have one. That is a fixable problem, and it is the one owners fix too late. The work below is unglamorous, it takes six to twelve months, and it moves your number more than any sales push will.",
    roadmap: [
      "Write down how the core work gets done, one process at a time, starting with whatever only you know.",
      "Promote or hire somebody to run delivery and the team day to day.",
      "Get leads coming in through a system rather than through your phone.",
      "Move your key client relationships onto your people over six months, and stay off the calls."
    ]
  },
  TIER_2: {
    key: "TIER_2",
    minScore: 40,
    maxScore: 61.9,
    title: "Sellable, and the price gets chipped",
    multipleLabel: "around 3.8x",
    baseMultiple: 3.8,
    color: "#F59E0B",
    badgeClass: "badge-warning",
    headline: "You could sell this, and you would watch a buyer take money off you for six weeks",
    description: "There is a real business here and somebody would buy it. You would also spend the back end of the process watching a buyer knock the price down for risks you could have dealt with beforehand. Every item below is a discount you are currently handing over.",
    roadmap: [
      "Bring your largest customer under fifteen percent of turnover.",
      "Get your top accounts onto one to three year agreements with clear renewal terms.",
      "Sort out contracts, notice periods, and retention for the people a buyer would worry about losing.",
      "Clean up two years of accounts now, whilst you have time, rather than during diligence."
    ]
  },
  TIER_3: {
    key: "TIER_3",
    minScore: 62,
    maxScore: 79.9,
    title: "Buyers will compete for this",
    multipleLabel: "around 5.8x",
    baseMultiple: 5.8,
    color: "#2ABAD2",
    badgeClass: "badge-success",
    headline: "You have built something clean, and the job now is running a proper process",
    description: "Margins hold up, somebody else can run it, and the revenue does not hang on one client or one person. Businesses like yours get bid for. What loses money at this stage is selling to the first buyer who calls, because a single bidder sets the price and knows it.",
    roadmap: [
      "Get a quality of earnings review done before a buyer does one to you.",
      "Convert whatever you can from one off work to contracted income, because it is worth more than the revenue it replaces.",
      "Write the three year growth story, with the channels you have not touched yet and what they are worth.",
      "Interview three advisers and pick the one who will get more than one buyer to the table."
    ]
  },
  TIER_4: {
    key: "TIER_4",
    minScore: 80,
    maxScore: 100,
    title: "Top of the market",
    multipleLabel: "around 8.5x",
    baseMultiple: 8.5,
    color: "#10B981",
    badgeClass: "badge-premium",
    headline: "Very few owners get here",
    description: "The management runs it, the income renews, the books stand up, and the contracts hold. Your job now is making sure you do not leave money on the table by taking the first approach that lands in your inbox, which is how most owners at your level end up underpaid.",
    roadmap: [
      "Run a proper private auction through an adviser who works in your sector.",
      "Look hard at trade buyers who gain something from owning you, because they pay above the market rate.",
      "Get the tax structuring done early, and by somebody who does this for a living.",
      "Lock in your key people with retention packages before anybody knows the business is for sale."
    ]
  },
  TIER_4_UNDER_1M: {
    key: "TIER_4_UNDER_1M",
    minScore: 80,
    maxScore: 100,
    title: "As good as it gets at your size",
    multipleLabel: "4.0x size cap",
    baseMultiple: 4.0,
    color: "#10B981",
    badgeClass: "badge-premium",
    headline: "As good as it gets at your size",
    description: "The fundamentals here are as strong as I see them. Scale is the only thing holding the multiple down, because the buyers who pay the highest multiples do not look below a few million in turnover. Growth is worth more to your final number now than any further tidying up, and you already have the machine to grow with.",
    roadmap: [
      "Put everything into growth for the next two years, since the fundamentals are already right.",
      "Keep the recurring revenue percentage climbing whilst you scale.",
      "Revisit this assessment when you cross three million, because the ceiling on your multiple moves at that point."
    ]
  }
};

// VALUATION & MULTIPLE CALCULATION ENGINE
export const calculateValuationEngine = (answers, rawScore) => {
  const revOption = answers['q1'];
  const marginOption = answers['q2'];

  const revenue = revOption?.revenueEstimate || 2000000;
  const sizeCap = revOption?.sizeCap || 5.5;
  const margin = marginOption?.marginEstimate || 0.15;
  
  // Step 1: Adjusted EBITDA
  const adjustedEbitda = Math.max(20000, Math.round(revenue * margin));

  // Step 2: Score calculation & Q3 Cap
  let score = (rawScore / MAX_RAW_POINTS) * 100;
  score = Math.min(100, Math.max(0, score));
  
  const isDeclining = answers['q3']?.id === 'q3_a';
  if (isDeclining) {
    score = Math.min(score, 55);
  }
  score = Math.round(score * 10) / 10;

  // Step 3: Base Multiple
  let baseMultiple = 2.0;
  let tierKey = 'TIER_1';

  if (score >= 80) {
    baseMultiple = 8.5;
    tierKey = (revOption?.id === 'q1_a') ? 'TIER_4_UNDER_1M' : 'TIER_4';
  } else if (score >= 62) {
    baseMultiple = 5.8;
    tierKey = 'TIER_3';
  } else if (score >= 40) {
    baseMultiple = 3.8;
    tierKey = 'TIER_2';
  } else {
    baseMultiple = 2.0;
    tierKey = 'TIER_1';
  }

  // Step 4: Recurring Uplift (+0.5x if Q10 Over 50%)
  const hasRecurringUplift = answers['q10']?.id === 'q10_d';
  let multipleWithRecurring = baseMultiple + (hasRecurringUplift ? 0.5 : 0);

  // Step 5: Size Cap Applied
  const finalMultiple = Math.min(multipleWithRecurring, sizeCap);

  // Step 6: Today's Value
  const todaysValue = Math.round(adjustedEbitda * finalMultiple);

  // Step 7: Ceiling
  const ceiling = Math.round(adjustedEbitda * sizeCap);

  // Step 8: The Gap
  const valuationGap = Math.max(0, ceiling - todaysValue);

  // Broken Economics Check
  const isBrokenEconomics = answers['q2']?.id === 'q2_a' && answers['q2b']?.id === 'q2b_d';
  const isOwnerDependent = answers['q5']?.id === 'q5_a';

  return {
    revenue,
    margin,
    adjustedEbitda,
    score,
    tierKey,
    baseMultiple,
    hasRecurringUplift,
    sizeCap,
    finalMultiple,
    todaysValue,
    ceiling,
    valuationGap,
    isBrokenEconomics,
    isOwnerDependent
  };
};

// ORDERED #1 VALUE KILLER ENGINE + SECONDARY VALUE KILLERS
export const getValueKillers = (answers, score) => {
  const allKillers = [];

  // 1. You are the business (Q5 = sales stop)
  if (answers['q5']?.id === 'q5_a') {
    allKillers.push({
      id: "owner_dependent",
      title: "You are the business",
      trigger: "Q5 = sales stop",
      cost: "Halves the multiple and puts you on an earn out for three to five years",
      diagnosis: "Sales stop if you step away for three months, which means the business is you, and nobody can buy you. A trade buyer will walk. A private equity buyer will make you an offer with most of the money tied to an earn out that keeps you working for another three to five years to collect it. I have watched owners sign those deals in a good mood and regret it by month four.",
      action: "Write down how the work gets done, one process at a time. Hand your ten biggest accounts to somebody else over the next six months. Get one person owning delivery and one owning the pipeline, and stay out of both."
    });
  }

  // 2. One customer holds the keys (Q7 = over 30%)
  if (answers['q7']?.id === 'q7_d') {
    allKillers.push({
      id: "customer_concentration",
      title: "One customer holds the keys",
      trigger: "Q7 = over 30%",
      cost: "Two to three turns off the multiple, and most lenders will not fund the deal at all",
      diagnosis: "More than thirty percent of your turnover sits in one account. Ask yourself what happens to a buyer if that client leaves the month after completion, because the buyer's bank will ask exactly that, and most lenders refuse to fund a deal with more than a quarter of revenue in one place. This is the most common reason a deal falls over after heads of terms are signed.",
      action: "Get that client onto a multi year agreement with proper notice periods, and put a serious push behind new business until they sit under fifteen percent. Both jobs, not one or the other."
    });
  }

  // 3. The line is going backwards (Q3 = declining)
  if (answers['q3']?.id === 'q3_a') {
    allKillers.push({
      id: "declining_revenue",
      title: "The line is going backwards",
      trigger: "Q3 = declining",
      cost: "Score capped at 55 and a turnaround discount on top",
      diagnosis: "Turnover is going backwards. Buyers price the next three years, and a falling line tells them the next three are worse than the last three. They will treat you as a turnaround and pay you like one, if they bid at all. Fix the direction before you go anywhere near a broker.",
      action: "Cut the lines that make no money, put prices up where the market lets you, and get two consecutive quarters of growth on the board before you speak to a single buyer."
    });
  }

  // 4. The numbers do not work (Q2 = negative/breakeven AND Q2B = structural problems)
  if (answers['q2']?.id === 'q2_a' && answers['q2b']?.id === 'q2b_d') {
    allKillers.push({
      id: "broken_economics",
      title: "The numbers do not work",
      trigger: "Q2 = negative or breakeven and Q2B = structural problems",
      cost: "No earnings multiple applies. Asset value only",
      diagnosis: "The business is not making money and you have told me the reason is structural rather than deliberate. There is no earnings multiple to apply to a business that does not earn, so the only offer on the table would be for the assets. That is a business problem before it is an exit problem.",
      action: "Work out which customers and which product lines make you money, and be willing to lose the ones that do not. Get to a positive number for two quarters before anything else on this list matters."
    });
  }

  // 5. There is nobody behind you (Q6 = no number two)
  if (answers['q6']?.id === 'q6_a') {
    allKillers.push({
      id: "no_number_two",
      title: "There is nobody behind you",
      trigger: "Q6 = no number two",
      cost: "One to two turns off the multiple",
      diagnosis: "There is nobody who can run the place without you. That one hire usually moves the final price more than a year of extra sales does, and most owners leave it far too late because they cannot see how to afford it. The maths says you cannot afford not to.",
      action: "Hire or promote somebody into the number two seat this quarter, give them real authority rather than the title, and let them make a few expensive mistakes whilst you are still there to catch them."
    });
  }

  // 6. Your books will not survive diligence (Q15 = shoebox)
  if (answers['q15']?.id === 'q15_a') {
    allKillers.push({
      id: "shoebox_accounts",
      title: "Your books will not survive diligence",
      trigger: "Q15 = shoebox",
      cost: "Five to fifteen percent knocked off during diligence, plus months of delay",
      diagnosis: "Your records will not stand up to a proper look. Every number a buyer cannot trace becomes a reason to pay you less, and buyers are very good at finding them. This is the cheapest thing on the list to fix and the one most owners put off.",
      action: "Get twenty four months of clean, reconciled accounts prepared properly, separate anything personal that is running through the business, and have your accountant produce a set that a stranger could follow."
    });
  }

  // 7. Every pound has to be won again (Q10 = none)
  if (answers['q10']?.id === 'q10_a') {
    allKillers.push({
      id: "no_recurring",
      title: "Every pound has to be won again",
      trigger: "Q10 = none",
      cost: "One to two turns off the multiple",
      diagnosis: "None of your revenue renews on its own, so every year starts at zero. Buyers pay a great deal more for income that arrives whether or not anybody sells anything, because it is the difference between buying a business and buying a treadmill.",
      action: "Find the part of what you do that customers need every month, price it separately, and put your best accounts onto twelve month agreements."
    });
  }

  // 8. You cannot move your prices (Q11 = we would lose a lot of them)
  if (answers['q11']?.id === 'q11_a') {
    allKillers.push({
      id: "no_pricing_power",
      title: "You cannot move your prices",
      trigger: "Q11 = we would lose a lot of them",
      cost: "Signals a commodity position, which caps the multiple",
      diagnosis: "A ten percent price rise would cost you customers, which tells a buyer you are competing on price against people who can undercut you. That caps what anybody will pay, because they can see the margin has nowhere to go.",
      action: "Work out what you do that the cheap option does not, put it in front of customers, and test a price rise on your ten best accounts before you touch the rest."
    });
  }

  // Fallback if none of the 8 explicit triggers fired
  if (allKillers.length === 0) {
    allKillers.push({
      id: "operational_refinement",
      title: "Operational multiple optimization",
      trigger: "Continuous improvement across operations",
      cost: "Leaving 0.5x to 1.5x multiple expansion on the table",
      diagnosis: "Your foundational operations and management structure are solid. Small improvements in contracted revenue, customer diversification, and middle-management autonomy will bridge your remaining gap to the ceiling multiple.",
      action: "Convert ongoing client engagements to multi-year contracts, institutionalize management reporting, and prepare for a structured private auction."
    });
  }

  const primaryKiller = allKillers[0];
  const secondaryKillers = allKillers.slice(1, 3);

  return {
    primaryKiller,
    secondaryKillers
  };
};

// CALL TO ACTION ENGINE (Directs all respondents to the 30-minute advisory call)
export const getCtaRouting = () => {
  return {
    type: "CALL",
    headline: "Next Step: Book a 1:1 Private Advisory Call",
    body: "If you want the unvarnished version, book half an hour with me and bring your figures. We will go through what is costing you the most, what it is worth in pounds/dollars, and the order I would fix it in if this were my business.",
    buttonText: "Book your thirty minute review with Gary",
    buttonLink: "https://www.cal.eu/garyashworth/advisory-30-min?overlayCalendar=true"
  };
};
