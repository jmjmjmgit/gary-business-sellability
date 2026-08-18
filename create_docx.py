import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def create_document():
    doc = docx.Document()
    
    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
    # Styles Setup
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    
    TEAL = RGBColor(0x2A, 0xBA, 0xD2)
    DARK_TITLE = RGBColor(0x0F, 0x17, 0x2A)
    MUTED = RGBColor(0x64, 0x74, 0x8B)
    RED_ACCENT = RGBColor(0xDC, 0x26, 0x26)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run("GARY ASHWORTH\nBUSINESS SELLABILITY DIAGNOSTIC")
    run_title.font.name = 'Arial'
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = DARK_TITLE
    
    # Subtitle
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = p_sub.add_run("Valuation Multiplier Engine, #1 Value Killer Diagnosis & Master Specification")
    run_sub.font.name = 'Arial'
    run_sub.font.size = Pt(13)
    run_sub.font.italic = True
    run_sub.font.color.rgb = TEAL
    
    doc.add_paragraph()

    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(8)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Arial'
        run.font.size = Pt(16)
        run.font.bold = True
        run.font.color.rgb = TEAL
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Arial'
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = DARK_TITLE
        return p

    def add_h3(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Arial'
        run.font.size = Pt(11.5)
        run.font.bold = True
        run.font.color.rgb = DARK_TITLE
        return p

    def add_callout(text, title=None, border_color="2ABAD2", fill_color="F0FDF4"):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = table.cell(0, 0)
        
        tcPr = cell._tc.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_color}"/>')
        tcPr.append(shd)
        
        borders = parse_xml(f'''
            <w:tcBorders {nsdecls("w")}>
                <w:top w:val="none"/>
                <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>
                <w:bottom w:val="none"/>
                <w:right w:val="none"/>
            </w:tcBorders>
        ''')
        tcPr.append(borders)
        
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        if title:
            run_t = p.add_run(title + "\n")
            run_t.font.bold = True
            run_t.font.size = Pt(11)
            run_t.font.color.rgb = DARK_TITLE
        run_b = p.add_run(text)
        run_b.font.size = Pt(10.5)
        run_b.font.color.rgb = DARK_TITLE
        doc.add_paragraph()

    # --- SECTION 1: LANDING PAGE COPY ---
    add_h1("1. Landing Page & Lead Capture Copy")
    
    add_callout(
        "Fact: 70% to 80% of businesses prepared for sale NEVER actually sell. (Exit Planning Institute)",
        title="⚠️ Hard Exit Statistic Banner:",
        border_color="DC2626",
        fill_color="FEF2F2"
    )

    p = doc.add_paragraph()
    p.add_run("Main Headline: ").bold = True
    p.add_run("Would Anyone Really Want to Buy Your Business? And If They Do, What Is It Actually Worth?")
    
    p = doc.add_paragraph()
    p.add_run("Main Subtitle: ").bold = True
    p.add_run("Take my 3-minute executive diagnostic to calculate your estimated £ valuation, discover your multiple tier, and pinpoint your #1 value killer before buyers do.")

    p = doc.add_paragraph()
    p.add_run("Duration Badge: ").bold = True
    p.add_run("⏱️ Takes just 2–3 minutes to complete")

    p = doc.add_paragraph()
    p.add_run("Credibility Banner: ").bold = True
    p.add_run("Based on my 40+ years of experience buying, scaling, and selling 30+ businesses, combined with proven M&A deal standards.")

    add_h2("Transformational Outcome Cards")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Your £ Valuation & Multiple: ").bold = True
    p.add_run("Discover what buyers would realistically pay today versus what a tier-90 business commands.")
    
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Your #1 Value Killer Diagnosed: ").bold = True
    p.add_run("Pinpoint the exact single operational, founder, or concentration risk destroying your exit price.")
    
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("The Valuation Gap Blueprint: ").bold = True
    p.add_run("Calculate the exact £ money left on the table and unlock a roadmap to capture it.")

    add_h2("Lead Capture Form Inputs")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Full Name ").bold = True
    p.add_run("(Text field, required)")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Work Email Address ").bold = True
    p.add_run("(Email field, required)")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Primary CTA Button: ").bold = True
    p.add_run("Begin Your Business Sellability Diagnostic →")

    # --- SECTION 2: QUESTION ARCHITECTURE ---
    add_h1("2. Complete Question Architecture & Logic Rules")

    def render_question(q_num, title, subtitle, choices, logic_note=None):
        add_h3(f"Question {q_num}: {title}")
        p_sub = doc.add_paragraph()
        run_s = p_sub.add_run(f"Subtitle / Context: {subtitle}")
        run_s.font.italic = True
        run_s.font.color.rgb = MUTED
        
        for choice, pts in choices:
            p_c = doc.add_paragraph(style='List Bullet')
            p_c.add_run(f"{choice} ").bold = True
            p_c.add_run(f"({pts})")
            
        if logic_note:
            add_callout(logic_note, title="Backend Logic Rule:", border_color="2ABAD2", fill_color="F0F9FF")

    add_h2("SECTION 1: Financial Foundations")
    
    render_question(
        "1", 
        "What is your top line revenue over the trailing twelve months (TTM)?",
        "Revenue scale establishes your baseline valuation tier and determines which buyer pools will compete for your asset.",
        [("Under £1 Million", "5 pts - Est. £650k"), ("£1 Million to £3 Million", "10 pts - Est. £2.0M"), ("£3 Million to £10 Million", "15 pts - Est. £6.0M"), ("Over £10 Million", "20 pts - Est. £15.0M")]
    )

    render_question(
        "2", 
        "What is your average net profit margin?",
        "Healthy net margins demonstrate operational efficiency and generate the transferable EBITDA buyers actually pay for.",
        [("Negative or Breakeven", "0 pts - Triggers Conditional Q2B (Est. 3%)"), ("1% to 10%", "5 pts - Est. 7.5%"), ("11% to 20%", "10 pts - Est. 15%"), ("Over 20%", "15 pts - Est. 25%")]
    )

    render_question(
        "2B (Conditional)", 
        "What is the primary reason for your negative or breakeven profit margin?",
        "Differentiating deliberate growth investment from systemic weakness determines whether buyers see upside or operational risk.",
        [("Deliberate reinvestment for aggressive growth", "+3 pts restored"), ("Temporary market conditions", "+1 pt restored"), ("Poor pricing structure", "0 pts"), ("Structural business issues", "-5 pts penalty")]
    )

    render_question(
        "3", 
        "What is your revenue growth rate year over year (YoY)?",
        "Growth trajectory is the ultimate multiplier. Acquirers severely discount or walk away from contracting businesses.",
        [("Declining", "0 pts"), ("Flat (0% growth)", "5 pts"), ("Growing 1% to 15%", "10 pts"), ("Growing over 15%", "15 pts")],
        logic_note="Selecting Declining sets a hard rule capping your maximum possible final score at 70/100. Buyers severely discount shrinking assets."
    )

    add_h2("SECTION 2: Owner Dependence")

    render_question(
        "4", 
        "How many hours a week do you spend on front-line daily operations?",
        "The more daily operations depend directly on you, the harder it is for a buyer to step in without you.",
        [("Over 40 hours per week", "0 pts"), ("20 to 40 hours per week", "3 pts"), ("5 to 20 hours per week", "7 pts"), ("Under 5 hours per week", "10 pts")]
    )

    render_question(
        "5", 
        "What happens to your sales if you step away completely for 3 months?",
        "Tests whether your revenue engine is an institutional machine or a personal rolodex.",
        [("Sales drop to zero", "0 pts"), ("Sales decrease by half", "3 pts"), ("Sales stay flat", "7 pts"), ("Sales actually increase", "10 pts")],
        logic_note="Selecting Sales drop to zero triggers the Institutional Buyer Flag. Marked as non-transferable without an autonomous sales engine."
    )

    render_question(
        "6", 
        "Do you have a second-in-command who can run daily operations autonomously?",
        "A proven management team transforms your business from a founder-dependent job into a high-multiple asset.",
        [("No second-in-command", "0 pts"), ("Yes, but they are very new", "3 pts"), ("Yes, with some experience", "7 pts"), ("Yes, with a long proven track record", "12 pts (+12 Bonus Points)")]
    )

    add_h2("SECTION 3: Concentration Risks")

    render_question(
        "7", 
        "What percentage of your total revenue comes from your single largest customer?",
        "High customer concentration is the #1 deal-killer during acquirer financing and due diligence.",
        [("Under 5%", "10 pts"), ("5% to 15%", "7 pts"), ("16% to 30%", "3 pts"), ("Over 30%", "-5 pts penalty - Triggers Conditional Q7B")]
    )

    render_question(
        "7B (Conditional)", 
        "Is that major customer locked into a binding contract or agreement?",
        "Contractual terms determine how securely your concentrated cash flow is protected.",
        [("Locked into a long-term binding contract", "+3 pts penalty softened"), ("Operates on a month-to-month basis", "0 pts"), ("Pays upfront in advance", "+1 pt"), ("Consistently pays late", "-3 pts penalty")]
    )

    render_question(
        "8", 
        "How easy would it be for you to replace your primary supplier or vendor?",
        "Single-point-of-failure suppliers create operational fragility that buyers discount.",
        [("Impossible due to exclusive patents or single source", "0 pts"), ("Extremely difficult", "2 pts"), ("Moderately difficult but possible", "6 pts"), ("Very easy with multiple vendors available", "10 pts")]
    )

    render_question(
        "9", 
        "What would happen to your business if your top salesperson left tomorrow?",
        "Measures whether your sales system belongs to the business or resides in an individual's head.",
        [("Catastrophic loss of revenue", "0 pts"), ("Significant revenue drop for months", "3 pts"), ("Temporary dip in sales", "7 pts"), ("Negligible impact because sales rely on automated marketing systems", "10 pts")]
    )

    add_h2("SECTION 4: Quality of Revenue & Operations")

    render_question(
        "10", 
        "What portion of your sales comes from automatic subscriptions or hard contracts?",
        "Predictable, guaranteed future cash flow commands the highest valuation multiples in the M&A market.",
        [("None (100% transactional)", "0 pts"), ("Under 20%", "4 pts"), ("21% to 50%", "8 pts"), ("Over 50%", "12 pts")],
        logic_note="Selecting Over 50% applies a 1.15x Multiplier to your total running score! Buyers pay top valuation premiums for contracted future cash flow."
    )

    render_question(
        "11", 
        "How would your customers react to a 10% price increase tomorrow?",
        "Pricing power demonstrates customer retention, brand defensibility, and competitive moat.",
        [("Massive customer defection", "0 pts"), ("Heavy complaints with some customer churn", "3 pts"), ("Minor complaints but mostly high customer retention", "7 pts"), ("Zero pushback because the product is highly specialized", "10 pts")]
    )

    render_question(
        "12", 
        "How do your gross margins compare to your industry average?",
        "Superior gross margins prove pricing leverage and protect profits during economic contractions.",
        [("Significantly lower than industry average", "0 pts"), ("Slightly lower than industry average", "3 pts"), ("About the same as industry average", "7 pts"), ("Significantly higher than industry average", "10 pts")]
    )

    render_question(
        "13", 
        "When do your customers typically pay for your goods or services?",
        "Negative working capital cycles eliminate buyer debt burden and drastically increase enterprise value.",
        [("Net 60 days or more", "0 pts"), ("Net 30 days", "3 pts"), ("Upon delivery", "6 pts"), ("Upfront before delivery", "10 pts")]
    )

    render_question(
        "14", 
        "How likely are your customers to refer a friend or leave a positive review?",
        "Customer loyalty indicates organic word-of-mouth momentum and lowers customer acquisition costs for acquirers.",
        [("Very unlikely", "0 pts"), ("Somewhat unlikely", "3 pts"), ("Neutral", "6 pts"), ("Highly likely (Strong NPS)", "10 pts")]
    )

    render_question(
        "15", 
        "How are your business financial records maintained?",
        "Clean, verified financial records shorten diligence timelines and prevent buyers from chipping away at your price.",
        [("No standard bookkeeping / shoebox accounting", "0 pts"), ("Standard internal software (e.g., QuickBooks, Xero)", "4 pts"), ("External CPA compilation & tax returns", "7 pts"), ("Full audited financials by independent accounting firm", "10 pts - Unlocks highest valuation tier")]
    )

    # --- SECTION 3: VALUATION & MULTIPLIER ENGINE ---
    add_h1("3. Valuation Multiplier & Gap Engine")
    
    add_callout(
        "• Baseline EBITDA = Revenue Estimate (Q1) × Net Margin Estimate (Q2)\n"
        "• Current Multiple Tiers:\n"
        "   - Score 0–50: ~2.0x EBITDA (Owner-Dependent Job)\n"
        "   - Score 51–70: ~3.8x EBITDA (Sellable with Discounts)\n"
        "   - Score 71–89: ~5.8x EBITDA (Marketable Asset)\n"
        "   - Score 90–100: ~8.5x EBITDA (Premium Exit Asset)\n"
        "• Estimated Current Valuation = Baseline EBITDA × Current Multiple\n"
        "• Tier-90+ Exit Potential = Baseline EBITDA × 8.5x Multiple\n"
        "• The Valuation Gap = Potential Valuation − Current Valuation (Money left on the table)",
        title="Valuation Calculation Model:",
        border_color="2ABAD2",
        fill_color="F0FDFA"
    )

    # --- SECTION 4: #1 VALUE KILLER DIAGNOSTICS ---
    add_h1("4. Dynamic #1 Value Killer Diagnostics")
    
    def render_killer(name, trigger, impact, diag, remedy):
        add_h2(name)
        p = doc.add_paragraph()
        p.add_run("Trigger: ").bold = True
        p.add_run(trigger)
        p = doc.add_paragraph()
        p.add_run("Valuation Impact: ").bold = True
        p.add_run(impact)
        p = doc.add_paragraph()
        p.add_run("Diagnosis: ").bold = True
        p.add_run(diag)
        p = doc.add_paragraph()
        p.add_run("Tactical Remedy: ").bold = True
        p.add_run(remedy)
        doc.add_paragraph()

    render_killer(
        "1. Founder Trap (Severe Key-Person Risk)",
        "Q5 = Sales drop to zero if owner leaves for 3 months",
        "Cuts EBITDA multiple by up to 50% & triggers grueling 3–5 year earnouts",
        "Sales drop to zero if you step away. In M&A, buyers do not buy jobs — they buy self-sustaining cash flow engines. Institutional buyers will pass immediately or demand a multi-year earnout tied to your personal presence.",
        "Immediately build documented SOPs and install a second-in-command who owns customer fulfillment and sales pipelines."
    )

    render_killer(
        "2. Severe Customer Concentration (>30% Revenue)",
        "Q7 = Over 30% of revenue in single largest account",
        "Triggers 2.0x–3.0x multiple penalty and bank acquisition financing refusal",
        "A single client generates over 30% of turnover. If that customer churns post-sale, the buyer's debt service collapses. Bank lenders often refuse to finance acquisitions with over 25% single-customer exposure.",
        "Lock this major customer into a multi-year SLA and execute a targeted sales sprint to dilute their share below 15%."
    )

    render_killer(
        "3. Contracting Revenue Trajectory",
        "Q3 = Declining YoY growth",
        "Hard score cap at 70/100 & heavy distressed acquisition discounts",
        "Your top-line revenue is shrinking year-over-year. Buyers purchase future cash flow, not historical nostalgia. A declining business is treated as a turnaround risk, slashing multiples.",
        "Eliminate low-margin product lines, restructure pricing, and establish 2 consecutive quarters of growth stabilization before going to market."
    )

    # --- SECTION 5: OUTCOME TIERS ---
    add_h1("5. Outcome Tiers & Actionable Recommendations")

    def render_tier(title, range_str, mult_str, headline, desc, steps):
        add_h2(f"{title} (Score {range_str} • {mult_str})")
        p_h = doc.add_paragraph()
        p_h.add_run("Headline: ").bold = True
        p_h.add_run(headline)
        
        p_d = doc.add_paragraph()
        p_d.add_run("Description: ").bold = True
        p_d.add_run(desc)
        
        add_h3("Actionable Recommendations Roadmap:")
        for idx, step in enumerate(steps, 1):
            p_s = doc.add_paragraph(style='List Bullet')
            p_s.add_run(f"Step {idx}: ").bold = True
            p_s.add_run(step)
        doc.add_paragraph()

    render_tier(
        "TIER 1: Owner-Dependent Job Warning",
        "0 – 50",
        "~2.0x EBITDA",
        "High Founder Dependency — Action Plan to Build Your SOP Infrastructure",
        "Acquirers look for businesses that run smoothly without the founder. At your current score, a buyer would view purchasing your business as buying a demanding job rather than a self-sustaining asset.",
        [
            "Document all of your core daily operations into standardized step-by-step operating procedures (SOPs).",
            "Promote or hire an operational manager to handle your day-to-day client fulfillment and team oversight.",
            "Systematize your lead generation and sales calls so revenue isn't dependent on your personal effort.",
            "Transition your key client relationships to your team members over a 6-month period."
        ]
    )

    render_tier(
        "TIER 2: High-Risk Asset with Potential",
        "51 – 70",
        "~3.8x EBITDA",
        "Sellable with Valuation Discounts — Your Risk Mitigation Roadmap",
        "Your business is sellable, but buyers will likely apply valuation discounts to protect against key risk factors (such as customer concentration, lack of long-term contracts, or reliance on you).",
        [
            "Diversify your customer base so no single client represents over 15% of your annual revenue.",
            "Lock your top accounts into 1 to 3 year binding contracts with clear renewal terms.",
            "Formalize employee non-competes and retention incentives for your key team members.",
            "Clean up your internal accounting records to prepare for buyer due diligence."
        ]
    )

    render_tier(
        "TIER 3: Strong Valuation & Highly Marketable",
        "71 – 89",
        "~5.8x EBITDA",
        "Highly Marketable Business — You Are Ready for Competitive Offers",
        "You have built a clean, scalable business with strong profit margins, solid management, and diversified revenue. Buyers will actively compete for a business with your profile.",
        [
            "Engage a Quality of Earnings (QofE) auditor to pre-verify your EBITDA calculations.",
            "Optimize your recurring revenue models to convert transactional sales into subscription or long-term contracts.",
            "Build a clear 3-year growth narrative showing your untapped expansion channels for an acquirer.",
            "Interview top M&A brokers or investment bankers to structure a competitive bidding process for your exit."
        ]
    )

    render_tier(
        "TIER 4: Premium Exit Asset",
        "90 – 100",
        "~8.5x EBITDA",
        "Trophy Business Asset — You Have Achieved Elite Exit Valuation Potential",
        "Fewer than 3% of business owners achieve this tier. Your business features autonomous management, high-margin recurring cash flows, bulletproof contracts, and clean audited financials.",
        [
            "Run a targeted private auction through a tier-1 M&A advisory firm to maximize your enterprise valuation.",
            "Evaluate strategic buyers who can extract massive synergy value beyond standard market multiples.",
            "Structure tax-optimized exit strategies (e.g. rollover equity, installment structures, asset vs stock sale).",
            "Prepare key management retention packages to ensure zero disruption during your ownership transfer."
        ]
    )

    # --- SECTION 6: UNFILTERED CTA ---
    add_h1("6. Unfiltered Advisory Call & Accelerator CTAs")
    
    add_callout(
        "Headline: 'This Is What’s Standing Between Where You Are Now and a Premium Exit.'\n\n"
        "Body: 'If you want the unfiltered version — book thirty minutes with me. No sales pitch, no generic advice, just your numbers, your primary value killer, and a battle-tested roadmap to capture your £ valuation gap.'\n\n"
        "Primary Action Button: Book 30-Min Unfiltered Valuation Review With Gary →\n"
        "Secondary Link: Join Gary's Business Accelerator (£/mo): https://garyashworth.com/business-accelerator",
        title="Closing High-Converting Call to Action:",
        border_color="2ABAD2",
        fill_color="F8FAFC"
    )

    output_path = "/Users/jamesmacintosh/.gemini/antigravity/scratch/Gary - Business Sellability/Business_Sellability_Assessment_Master_Architecture.docx"
    doc.save(output_path)
    print(f"Docx created successfully at {output_path}")

if __name__ == "__main__":
    create_document()
