# BUSINESS SELLABILITY DIAGNOSTIC

**Gary Ashworth** · Master build specification, version 2. Scoring engine, valuation model, diagnosis logic and final copy.

_Prepared 18 August 2026. Supersedes the version 1 master architecture. All customer facing copy in this document is final and written to be pasted straight into the build._

---

## 0. How the engine works

Read this before building anything else. The scoring in version 1 did not add up to 100, which meant roughly half of all respondents would have been told they owned a trophy business. Everything below assumes the corrected model.

### Scoring

- Fifteen scored questions plus three conditionals. Raw points total 174 at maximum.
- Final score = (raw points / 174) x 100, rounded to one decimal, then clamped between 0 and 100.
- The recurring revenue bonus is applied to the valuation multiple, not to the score. Version 1 applied a 1.15x multiplier to the score on top of the 12 points already awarded for the same answer, which counted it twice and pushed scores past 100.
- Question 16 carries no points. It routes the call to action only.
- The estimated revenue and margin figures attached to each answer are backend values. They must never appear on screen next to the answer options, or people will work out how to game the result.

### Hard rules

| Trigger | Rule |
|---|---|
| Q3 = Declining | Final score capped at 55. This puts a shrinking business at the top of Tier 2 at best. |
| Q5 = Sales drop to zero | Sets the Owner Dependent flag. Suppresses all ready to sell language in the result, whatever the score. |
| Q2 = Negative or breakeven AND Q2B = Structural issues | Suppress the pound valuation entirely. Show the Broken Economics result instead. |
| Q10 = Over 50% | Adds 0.5x to the valuation multiple, after the size cap is applied. |
| Q1 = Under 1 million | Multiple capped at 4.0x regardless of score. |

- **Header Branding Pill**: `• GARY ASHWORTH'S BUSINESS SELLABILITY ASSESSMENT`
- **Banner Statistic**: `⚠️ Between 70% and 80% of businesses that go to market never sell. Source: Exit Planning Institute.`
- **Headline**: `If you put your business on the market next Monday, what would a buyer really pay for it?`
- **Subheadline**: `Answer sixteen questions and I will show you the number, the multiple your business earns today, and the one thing doing the most damage to your price. Includes tailored recommendations`
- **Duration Badge**: `2–3 minutes to complete`

---

## 1. Landing page and lead capture

> **Banner statistic: Between 70% and 80% of businesses that go to market never sell. Source: Exit Planning Institute.**

**HEADLINE**
> If you put your business on the market next Monday, what would a buyer really pay for it?

**SUBHEADLINE**
> Answer sixteen questions and I will show you the number, the multiple your business earns today, and the one thing doing the most damage to your price. Includes tailored recommendations

**DURATION BADGE**
> 2–3 minutes to complete

**WHAT YOU GET AT THE END**
- Your number. What a buyer would likely pay today, and the multiple your business is earning.
- Your biggest value killer. The single risk taking the most money off your price, named, and costed.
- Your gap. The difference in pounds between what you would get today and the ceiling for a business your size, with the order I would fix things in.

**FORM FIELDS**
- Full name, required.
- Work email, required.
- Company name, optional.
- Button copy: Start the diagnostic

---

## 2. Questions and logic

### Section 1: The money

#### Q1. What was your turnover over the last twelve months?
_Revenue decides which buyers will look at you at all, and it sets the ceiling on what any of them will pay._
- Under 1 million (5 pts, backend estimate 650k)
- 1 million to 3 million (10 pts, backend estimate 2.0m)
- 3 million to 10 million (15 pts, backend estimate 6.0m)
- Over 10 million (20 pts, backend estimate 15.0m)

#### Q2. What is your net profit margin before your own salary, interest and tax?
_This is the number buyers price off. Turnover is what you tell people at dinner, margin is what somebody buys._
- Negative or breakeven (0 pts, triggers Q2B, backend estimate 3%)
- 1% to 10% (5 pts, backend estimate 7.5%)
- 11% to 20% (10 pts, backend estimate 15%)
- Over 20% (15 pts, backend estimate 25%)

#### Q2B (conditional). Why is the business not making money?
_Losing money on purpose whilst you grow is a very different conversation to losing money because something is broken._
- Deliberate reinvestment to grow faster (+3 pts)
- Temporary market conditions (+1 pt)
- Pricing is wrong (0 pts)
- Structural problems in the business (-5 pts, suppresses the pound valuation)

#### Q3. How is turnover moving year on year?
_Buyers are paying for the next three years of profit, and a falling line tells them the next three will be worse than the last three._
- Going backwards (0 pts, caps final score at 55)
- Flat (5 pts)
- Growing 1% to 15% (10 pts)
- Growing more than 15% (15 pts)

### Section 2: How much of it is you

#### Q4. How many hours a week do you spend on the day to day work?
_The more of the daily running that goes through you, the harder it is for anyone else to take over._
- More than 40 (0 pts)
- 20 to 40 (3 pts)
- 5 to 20 (7 pts)
- Under 5 (10 pts)

#### Q5. What happens to sales if you disappear for three months?
_This is the question that separates a business from a well paid job._
- They stop (0 pts, sets Owner Dependent flag)
- They halve (3 pts)
- They hold steady (7 pts)
- They keep growing, because the team runs it (10 pts)

#### Q6. Do you have a number two who can run the place without you?
_A proper second in command moves your final price more than almost anything else on this list._
- No (0 pts)
- Yes, but they are new (3 pts)
- Yes, with some experience (7 pts)
- Yes, and they have a long track record (12 pts)

### Section 3: Where it could all go wrong

#### Q7. What share of turnover comes from your largest customer?
_One big customer is the thing that most often kills a deal at the last minute, usually the week the buyer's bank gets involved._
- Under 5% (10 pts)
- 5% to 15% (7 pts)
- 16% to 30% (3 pts)
- Over 30% (-5 pts, triggers Q7B)

#### Q7B (conditional). Is that customer on a contract?
_A signed long term agreement changes how a buyer views the same concentration._
- Long term binding contract (+3 pts)
- Rolling month to month (0 pts)
- Pays upfront (+1 pt)
- Pays late, every time (-3 pts)

#### Q8. How easily could you replace your main supplier?
_A supplier you cannot replace is somebody else's hand on your margin._
- One supplier, no realistic alternative (0 pts, triggers Q8B)
- Very difficult, it would cost us time and margin (2 pts)
- Doable with some disruption (6 pts)
- Easy, several suppliers compete for our business (10 pts)

#### Q8B (conditional). Is that single source something you own or control, such as an exclusive licence, a patent or an agreement nobody else can get?
_Owning the only route to market is an asset. Being hostage to somebody else's is a risk._
- Yes, we own or control it (+8 pts)
- No, we are dependent on them (0 pts)

#### Q9. What happens if your best salesperson resigns tomorrow?
_This tells a buyer whether the sales system belongs to the business or lives in one person's head._
- We would lose a serious chunk of revenue (0 pts)
- A big drop for several months whilst we recover (3 pts)
- A dip, then back to normal (7 pts)
- Barely noticed, the leads and the process belong to the business (10 pts)

### Section 4: Quality of the earnings

#### Q10. How much of your revenue is on subscription or contract?
_Contracted income is the closest thing to guaranteed money a buyer can see, and they pay a premium for it._
- None, every sale starts from scratch (0 pts)
- Under 20% (4 pts)
- 21% to 50% (8 pts)
- Over 50% (12 pts, adds 0.5x to the multiple)

#### Q11. How would your customers react to a 10% price rise tomorrow?
_If you can put prices up without losing people, you have something they cannot get elsewhere._
- We would lose a lot of them (0 pts)
- Plenty of complaints and some would go (3 pts)
- Some grumbling, most would stay (7 pts)
- Nobody would blink (10 pts)

#### Q12. How do your gross margins compare with others in your sector?
_Margin above your sector average tells a buyer you have pricing power and room to absorb a bad year._
- Well below average (0 pts)
- Slightly below (3 pts)
- About the same (7 pts)
- Well above average (10 pts)

#### Q13. When do your customers pay you?
_Getting paid before you deliver means a buyer needs less cash to run the place, and that shows up in the price._
- 60 days or more (0 pts)
- 30 days (3 pts)
- On delivery (6 pts)
- Upfront, before we do the work (10 pts)

#### Q14. How likely are your customers to recommend you?
_Customers who bring you more customers keep your acquisition cost down, and a buyer will notice._
- Very unlikely (0 pts)
- Unlikely (3 pts)
- Neither one way nor the other (6 pts)
- Very likely, they do it already (10 pts)

#### Q15. How are your accounts kept?
_Messy books give a buyer an excuse to chip away at your price during due diligence, and they will take it._
- Shoebox, or whatever the accountant can piece together (0 pts)
- Xero or QuickBooks, kept up to date (4 pts)
- Accountant prepared and filed each year (7 pts)
- Fully audited by an independent firm (10 pts)

### Section 5: You

#### Q16. When do you want to be out?
_This one carries no points. It changes what I would tell you to do first._
- Inside twelve months (routes to call)
- One to three years (routes by tier)
- Three to five years (routes by tier)
- No fixed plan, I just want to know where I stand (routes by tier)

---

## 3. Valuation engine

1. **Earnings**: Adjusted EBITDA = revenue estimate from Q1 x margin estimate from Q2
2. **Score**: (raw points / 174) x 100, clamped 0 to 100, then apply the Q3 cap of 55 if it fires
3. **Base multiple**: 0 to 39.9 = 2.0x, 40 to 61.9 = 3.8x, 62 to 79.9 = 5.8x, 80 to 100 = 8.5x
4. **Recurring uplift**: Add 0.5x if Q10 = over 50%
5. **Size cap**: Under 1m capped at 4.0x, 1m to 3m at 5.5x, 3m to 10m at 7.0x, over 10m at 8.5x
6. **Today's value**: Adjusted EBITDA x final multiple
7. **Ceiling**: Adjusted EBITDA x the size cap for their revenue band
8. **The gap**: Ceiling minus today's value

---

## 4. The number one value killer (Ordered priority)

1. **You are the business** (Q5 = sales stop)
   - *Cost*: Halves the multiple and puts you on an earn out for three to five years
   - *Diagnosis*: Sales stop if you step away for three months, which means the business is you, and nobody can buy you. A trade buyer will walk. A private equity buyer will make you an offer with most of the money tied to an earn out that keeps you working for another three to five years to collect it.
   - *Fix*: Write down how the work gets done, one process at a time. Hand your ten biggest accounts to somebody else over the next six months. Get one person owning delivery and one owning the pipeline, and stay out of both.
2. **One customer holds the keys** (Q7 = over 30%)
   - *Cost*: Two to three turns off the multiple, and most lenders will not fund the deal at all
   - *Diagnosis*: More than thirty percent of your turnover sits in one account. Ask yourself what happens to a buyer if that client leaves the month after completion.
   - *Fix*: Get that client onto a multi year agreement with proper notice periods, and put a serious push behind new business until they sit under fifteen percent.
3. **The line is going backwards** (Q3 = declining)
   - *Cost*: Score capped at 55 and a turnaround discount on top
   - *Diagnosis*: Turnover is going backwards. Buyers price the next three years, and a falling line tells them the next three are worse than the last three.
   - *Fix*: Cut the lines that make no money, put prices up where the market lets you, and get two consecutive quarters of growth on the board.
4. **The numbers do not work** (Q2 = negative/breakeven AND Q2B = structural problems)
   - *Cost*: No earnings multiple applies. Asset value only
   - *Diagnosis*: The business is not making money and the reason is structural. There is no earnings multiple to apply to a business that does not earn.
   - *Fix*: Work out which customers and which product lines make you money, and be willing to lose the ones that do not.
5. **There is nobody behind you** (Q6 = no number two)
   - *Cost*: One to two turns off the multiple
   - *Diagnosis*: There is nobody who can run the place without you. That one hire usually moves the final price more than a year of extra sales does.
   - *Fix*: Hire or promote somebody into the number two seat this quarter, give them real authority rather than the title.
6. **Your books will not survive diligence** (Q15 = shoebox)
   - *Cost*: Five to fifteen percent knocked off during diligence, plus months of delay
   - *Diagnosis*: Your records will not stand up to a proper look. Every number a buyer cannot trace becomes a reason to pay you less.
   - *Fix*: Get twenty four months of clean, reconciled accounts prepared properly.
7. **Every pound has to be won again** (Q10 = none)
   - *Cost*: One to two turns off the multiple
   - *Diagnosis*: None of your revenue renews on its own, so every year starts at zero.
   - *Fix*: Find the part of what you do that customers need every month, price it separately, and put your best accounts onto twelve month agreements.
8. **You cannot move your prices** (Q11 = we would lose a lot of them)
   - *Cost*: Signals a commodity position, which caps the multiple
   - *Diagnosis*: A ten percent price rise would cost you customers, which tells a buyer you are competing on price against people who can undercut you.
   - *Fix*: Work out what you do that the cheap option does not, put it in front of customers, and test a price rise on your ten best accounts.

---

## 5. Result tiers

### Tier 1. You own a job (score 0 to 39.9, around 2.0x)
**Right now a buyer sees a demanding job with your name on it**
Buyers want a business that runs whether or not you turn up. At this score they would be buying themselves a job, and most of them already have one.

**Roadmap**:
1. Write down how the core work gets done, one process at a time, starting with whatever only you know.
2. Promote or hire somebody to run delivery and the team day to day.
3. Get leads coming in through a system rather than through your phone.
4. Move your key client relationships onto your people over six months, and stay off the calls.

### Tier 2. Sellable, and the price gets chipped (score 40 to 61.9, around 3.8x)
**You could sell this, and you would watch a buyer take money off you for six weeks**
There is a real business here and somebody would buy it. You would also spend the back end of the process watching a buyer knock the price down for risks you could have dealt with beforehand.

**Roadmap**:
1. Bring your largest customer under fifteen percent of turnover.
2. Get your top accounts onto one to three year agreements with clear renewal terms.
3. Sort out contracts, notice periods and retention for the people a buyer would worry about losing.
4. Clean up two years of accounts now, whilst you have time, rather than during diligence.

### Tier 3. Buyers will compete for this (score 62 to 79.9, around 5.8x)
**You have built something clean, and the job now is running a proper process**
Margins hold up, somebody else can run it, and the revenue does not hang on one client or one person. Businesses like yours get bid for.

**Roadmap**:
1. Get a quality of earnings review done before a buyer does one to you.
2. Convert whatever you can from one off work to contracted income, because it is worth more than the revenue it replaces.
3. Write the three year growth story, with the channels you have not touched yet and what they are worth.
4. Interview three advisers and pick the one who will get more than one buyer to the table.

### Tier 4. Top of the market (score 80 to 100, around 8.5x)
**Very few owners get here**
The management runs it, the income renews, the books stand up and the contracts hold. Your job now is making sure you do not leave money on the table.

**Roadmap**:
1. Run a proper private auction through an adviser who works in your sector.
2. Look hard at trade buyers who gain something from owning you, because they pay above the market rate.
3. Get the tax structuring done early, and by somebody who does this for a living.
4. Lock in your key people with retention packages before anybody knows the business is for sale.

### Tier 4 variant, for businesses under 1m turnover
**As good as it gets at your size**
The fundamentals here are as strong as I see them. Scale is the only thing holding the multiple down.

**Roadmap**:
1. Put everything into growth for the next two years, since the fundamentals are already right.
2. Keep the recurring revenue percentage climbing whilst you scale.
3. Revisit this diagnostic when you cross three million, because the ceiling on your multiple moves at that point.

---

## 6. Where each result leads (Call to Action Routing)

**All respondents in all cases**:
- **Headline**: Next Step: Book a 1:1 Private Advisory Call
- **Body**: If you want the unvarnished version, book half an hour with me and bring your figures. We will go through what is costing you the most, what it is worth in pounds/dollars, and the order I would fix it in if this were my business.
- **Button**: Book your thirty minute review with Gary
- **Destination Link**: `https://www.cal.eu/garyashworth/advisory-30-min?overlayCalendar=true`
