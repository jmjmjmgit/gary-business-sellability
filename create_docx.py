import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def create_document():
    doc = docx.Document()
    
    # Page Margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
    # Styles Setup
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B) # Slate dark
    
    # Primary Palette
    TEAL = RGBColor(0x2A, 0xBA, 0xD2)
    DARK_TITLE = RGBColor(0x0F, 0x17, 0x2A)
    MUTED = RGBColor(0x64, 0x74, 0x8B)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run("GARY ASHWORTH\nBUSINESS SELLABILITY ASSESSMENT TOOL")
    run_title.font.name = 'Arial'
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = DARK_TITLE
    
    # Subtitle
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = p_sub.add_run("Master Architecture, Question Flow, Scoring Engine & Outcome Specification")
    run_sub.font.name = 'Arial'
    run_sub.font.size = Pt(13)
    run_sub.font.italic = True
    run_sub.font.color.rgb = TEAL
    
    doc.add_paragraph() # Spacer

    # Helper function for H1
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

    # Helper function for H2
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

    # Helper function for H3
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

    # Callout Box Helper
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
        doc.add_paragraph() # Spacer after table

    # --- SECTION 1: LANDING PAGE COPY ---
    add_h1("1. Landing Page & Lead Capture Copy")
    
    p = doc.add_paragraph()
    p.add_run("Header Branding Pill: ").bold = True
    p.add_run("• GARY ASHWORTH • YOUR BUSINESS SELLABILITY ASSESSMENT")
    
    p = doc.add_paragraph()
    p.add_run("Duration Badge: ").bold = True
    p.add_run("⏱️ Takes just 2–3 minutes to complete")
    
    p = doc.add_paragraph()
    p.add_run("Main Headline: ").bold = True
    p.add_run("Is Your Business Transferable & Ready to Sell at a Premium Multiple?")
    
    p = doc.add_paragraph()
    p.add_run("Main Subtitle: ").bold = True
    p.add_run("Discover your custom exit readiness score, identify hidden buyer risks, and receive a transformational roadmap to maximize your enterprise value.")

    p = doc.add_paragraph()
    p.add_run("Credibility Banner: ").bold = True
    p.add_run("Based on my 40+ years of experience buying, scaling, and selling 30+ businesses, combined with proven M&A deal standards.")

    add_h2("Transformational Outcome Cards")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Your Sellability Score (1–100): ").bold = True
    p.add_run("Discover your exact exit readiness score and how acquirers value your business today.")
    
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Practical Recommendations: ").bold = True
    p.add_run("Receive custom, actionable tips to eliminate owner reliance and boost sellability.")
    
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Transformational Growth: ").bold = True
    p.add_run("Unlock a clear blueprint to turn your business into a high-multiple, self-sustaining exit asset.")

    add_h2("Lead Capture Form Inputs")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Full Name ").bold = True
    p.add_run("(Text field, required)")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Work Email Address ").bold = True
    p.add_run("(Email field, required)")
    p = doc.add_paragraph(style='List Bullet')
    p.add_run("Primary CTA Button: ").bold = True
    p.add_run("Begin Your Business Sellability Assessment →")

    # --- SECTION 2: QUESTION ARCHITECTURE ---
    add_h1("2. Complete Question Architecture & Logic Rules")

    # Helper for questions
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

    # SECTION 1: FINANCIAL FOUNDATIONS
    add_h2("SECTION 1: Financial Foundations")
    
    render_question(
        "1", 
        "What is your top line revenue over the trailing twelve months (TTM)?",
        "Higher revenue provides your business with a stronger valuation foundation and higher buyer interest.",
        [("Under $1 Million", "5 pts"), ("$1 Million to $3 Million", "10 pts"), ("$3 Million to $10 Million", "15 pts"), ("Over $10 Million", "20 pts")]
    )

    render_question(
        "2", 
        "What is your average net profit margin?",
        "Healthy net margins demonstrate your operational efficiency and cash flow reliability.",
        [("Negative or Breakeven", "0 pts - Triggers Conditional Q2B"), ("1% to 10%", "5 pts"), ("11% to 20%", "10 pts"), ("Over 20%", "15 pts")]
    )

    render_question(
        "2B (Conditional)", 
        "What is the primary reason for your negative or breakeven profit margin?",
        "Differentiating growth investment from systemic weakness helps assess your true business valuation potential.",
        [("Deliberate reinvestment for aggressive growth", "+3 pts restored"), ("Temporary market conditions", "+1 pt restored"), ("Poor pricing structure", "0 pts"), ("Structural business issues", "-5 pts penalty")]
    )

    render_question(
        "3", 
        "What is your revenue growth rate year over year (YoY)?",
        "Your growth rate signals market trajectory and future expansion potential to prospective buyers.",
        [("Declining", "0 pts"), ("Flat (0% growth)", "5 pts"), ("Growing 1% to 15%", "10 pts"), ("Growing over 15%", "15 pts")],
        logic_note="Selecting Declining sets a hard rule capping your maximum possible final score at 70/100. Buyers severely discount shrinking assets."
    )

    # SECTION 2: OWNER DEPENDENCE
    add_h2("SECTION 2: Owner Dependence")

    render_question(
        "4", 
        "How many hours a week do you spend on front-line daily operations?",
        "The more daily operations depend directly on you, the harder it is for a buyer to step in and take over.",
        [("Over 40 hours per week", "0 pts"), ("20 to 40 hours per week", "3 pts"), ("5 to 20 hours per week", "7 pts"), ("Under 5 hours per week", "10 pts")]
    )

    render_question(
        "5", 
        "What happens to your sales if you step away completely for 3 months?",
        "Tests how dependent your revenue engine is on your personal relationships and presence.",
        [("Sales drop to zero", "0 pts"), ("Sales decrease by half", "3 pts"), ("Sales stay flat", "7 pts"), ("Sales actually increase", "10 pts")],
        logic_note="Selecting Sales drop to zero triggers the Institutional Buyer Flag. This business is marked as highly difficult to sell to institutional buyers/private equity without major operational delegation."
    )

    render_question(
        "6", 
        "Do you have a second-in-command who can run daily operations autonomously?",
        "Having a leader run operations without you dramatically increases your business's transferable value.",
        [("No second-in-command", "0 pts"), ("Yes, but they are very new", "3 pts"), ("Yes, with some experience", "7 pts"), ("Yes, with a long proven track record", "12 pts (+12 Bonus Points)")]
    )

    # SECTION 3: CONCENTRATION RISKS
    add_h2("SECTION 3: Concentration Risks")

    render_question(
        "7", 
        "What percentage of your total revenue comes from your single largest customer?",
        "High customer concentration poses a major risk to your business if your top account leaves.",
        [("Under 5%", "10 pts"), ("5% to 15%", "7 pts"), ("16% to 30%", "3 pts"), ("Over 30%", "-5 pts penalty - Triggers Conditional Q7B")]
    )

    render_question(
        "7B (Conditional)", 
        "Is that major customer locked into a binding contract or agreement?",
        "Contractual terms determine how securely your concentrated revenue is protected.",
        [("Locked into a long-term binding contract", "+3 pts penalty softened"), ("Operates on a month-to-month basis", "0 pts"), ("Pays upfront in advance", "+1 pt"), ("Consistently pays late", "-3 pts penalty")]
    )

    render_question(
        "8", 
        "How easy would it be for you to replace your primary supplier or vendor?",
        "Single point of failure suppliers can derail your exit due diligence.",
        [("Impossible due to exclusive patents or single source", "0 pts"), ("Extremely difficult", "2 pts"), ("Moderately difficult but possible", "6 pts"), ("Very easy with multiple vendors available", "10 pts")]
    )

    render_question(
        "9", 
        "What would happen to your business if your top salesperson left tomorrow?",
        "Measures how dependent your revenue is on key staff versus your internal sales systems.",
        [("Catastrophic loss of revenue", "0 pts"), ("Significant revenue drop for months", "3 pts"), ("Temporary dip in sales", "7 pts"), ("Negligible impact because sales rely on automated marketing systems", "10 pts")]
    )

    # SECTION 4: REVENUE QUALITY
    add_h2("SECTION 4: Quality of Revenue & Operations")

    render_question(
        "10", 
        "What portion of your sales comes from automatic subscriptions or hard contracts?",
        "Predictable recurring revenue commands the highest buyer valuation multiples.",
        [("None (100% transactional)", "0 pts"), ("Under 20%", "4 pts"), ("21% to 50%", "8 pts"), ("Over 50%", "12 pts")],
        logic_note="Selecting Over 50% applies a 1.15x Multiplier to your total running score! Buyers pay top valuation premiums for guaranteed future cash flow."
    )

    render_question(
        "11", 
        "How would your customers react to a 10% price increase tomorrow?",
        "Tests your pricing power and how indispensable your offer is to your customers.",
        [("Massive customer defection", "0 pts"), ("Heavy complaints with some customer churn", "3 pts"), ("Minor complaints but mostly high customer retention", "7 pts"), ("Zero pushback because the product is highly specialized", "10 pts")]
    )

    render_question(
        "12", 
        "How do your gross margins compare to your industry average?",
        "High gross margins reflect your pricing leverage and competitive moat.",
        [("Significantly lower than industry average", "0 pts"), ("Slightly lower than industry average", "3 pts"), ("About the same as industry average", "7 pts"), ("Significantly higher than industry average", "10 pts")]
    )

    render_question(
        "13", 
        "When do your customers typically pay for your goods or services?",
        "Upfront customer payments eliminate cash flow stress and boost your business valuation.",
        [("Net 60 days or more", "0 pts"), ("Net 30 days", "3 pts"), ("Upon delivery", "6 pts"), ("Upfront before delivery", "10 pts")]
    )

    render_question(
        "14", 
        "How likely are your customers to refer a friend or leave a positive review?",
        "Customer loyalty indicates your brand equity and organic word-of-mouth strength.",
        [("Very unlikely", "0 pts"), ("Somewhat unlikely", "3 pts"), ("Neutral", "6 pts"), ("Highly likely (Strong NPS)", "10 pts")]
    )

    render_question(
        "15", 
        "How are your business financial records maintained?",
        "Clean financial records protect your valuation and ensure a smooth exit process.",
        [("No standard bookkeeping / shoebox accounting", "0 pts"), ("Standard internal software (e.g., QuickBooks, Xero)", "4 pts"), ("External CPA compilation & tax returns", "7 pts"), ("Full audited financials by independent accounting firm", "10 pts - Unlocks highest valuation tier")]
    )

    # --- SECTION 3: SCORING ENGINE ---
    add_h1("3. Scoring Engine Mathematics")
    
    add_callout(
        "1. Raw Points Tally = Sum of points from answered active questions.\n"
        "2. Normalized Baseline Score = Math.round((RawTotal / MaxPossibleActive) * 100)\n"
        "3. Recurring Multiplier Rule: If Q10 option 'Over 50%' selected ➔ BaseScore = Math.round(BaseScore * 1.15)\n"
        "4. Declining Growth Cap Rule: If Q3 option 'Declining' selected ➔ FinalScore = Math.min(FinalScore, 70)\n"
        "5. Final Score is clamped between 0 and 100.",
        title="Calculation Formula Summary:",
        border_color="2ABAD2",
        fill_color="F8FAFC"
    )

    # --- SECTION 4: OUTCOME TIERS ---
    add_h1("4. Outcome Tiers & Recommendations")

    def render_tier(title, range_str, headline, desc, steps, color_hex="2ABAD2"):
        add_h2(f"{title} (Score {range_str})")
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
        "Trophy Business Asset — You Have Achieved Elite Exit Valuation Potential",
        "Fewer than 3% of business owners achieve this tier. Your business features autonomous management, high-margin recurring cash flows, bulletproof contracts, and clean audited financials.",
        [
            "Run a targeted private auction through a tier-1 M&A advisory firm to maximize your enterprise valuation.",
            "Evaluate strategic buyers who can extract massive synergy value beyond standard market multiples.",
            "Structure tax-optimized exit strategies (e.g. rollover equity, installment structures, asset vs stock sale).",
            "Prepare key management retention packages to ensure zero disruption during your ownership transfer."
        ]
    )

    # --- SECTION 5: ADVISORY CTAs ---
    add_h1("5. Advisory & Lead Nurturing Call to Actions")
    
    p = doc.add_paragraph()
    p.add_run("Recommendations Section Heading: ").bold = True
    p.add_run("My General Recommendations Based on Your Answers")

    p = doc.add_paragraph()
    p.add_run("Advisory Call & Accelerator Subtext: ").bold = True
    p.add_run("If you want a more personalized assessment, schedule a 30-minute 1:1 advisory call with me or join my Business Accelerator: https://garyashworth.com/business-accelerator")

    p = doc.add_paragraph()
    p.add_run("Report Actions: ").bold = True
    p.add_run("Print / Save PDF Report button & Retake Assessment button.")

    output_path = "/Users/jamesmacintosh/.gemini/antigravity/scratch/Gary - Business Sellability/Business_Sellability_Assessment_Master_Architecture.docx"
    doc.save(output_path)
    print(f"Docx created successfully at {output_path}")

if __name__ == "__main__":
    create_document()
