// Higher education institutions dataset (Melbourne, Sydney).
// Compiled from institution websites, August 2026 — verify program names,
// fees, and entry requirements directly with each institution before
// applying, as these shift between academic years.
// Each institution lists only the fields (fashion/chemistry/business/finance)
// it is actually strong in; `fields[x]` is an array of specific program names.
// `city` is a lowercase slug used by the city filter in the UI.
const INSTITUTIONS = [
  {
    id: "unimelb",
    city: "melbourne",
    name: "University of Melbourne",
    type: "University",
    location: "Parkville",
    lat: -37.7964,
    lng: 144.9612,
    website: "https://www.unimelb.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3, minimum 80 credits overall",
      english: "18 Level 3 credits in English (10+ at Merit or above)",
      feeStatus: "Domestic — CSPs available to eligible NZ citizens; must reside in Australia for duration of study. HELP loan access depends on long-term residency.",
      sourceNote: "study.unimelb.edu.au NCEA equivalency pages; ask.unimelb.edu.au.",
    },
    description:
      "Australia's #1 ranked university (QS/THE) and a Group of Eight member. No undergraduate fashion program, but the Faculty of Science and Faculty of Business & Economics are among the most selective and research-strong in the country.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: [
        "Bachelor of Science — several named majors (Ecology and Evolutionary Biology, Zoology, Marine Biology, Genetics, Microbiology, Cell and Developmental Biology) rather than one umbrella \"Biology\" major",
      ],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major (CFA Institute Program Partner)"],
    },
    entrepreneurshipNote:
      "Not a dedicated undergraduate major — folded into Bachelor of Commerce as elective subjects. Dedicated study exists only at postgraduate level (Master of Entrepreneurship, with the Wade Institute).",
    visit: {
      openDay: "Sun 16 Aug 2026, 10am–4pm (annual, typically mid-August)",
      openDayUrl: "https://study.unimelb.edu.au/openday",
      tours: "Free 1-hour guided walking tours of Parkville led by student ambassadors (school groups Yr 10–12, book 6+ weeks ahead); self-guided virtual tour available anytime.",
      toursUrl: "https://www.unimelb.edu.au/campustour",
    },
  },
  {
    id: "monash",
    city: "melbourne",
    name: "Monash University",
    type: "University",
    location: "Clayton & Caulfield",
    lat: -37.9105,
    lng: 145.1362,
    website: "https://www.monash.edu",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3",
      english: "18 credit points at NCEA Level 3 in English or an approved \"English-rich\" subject — Level 2 English does not satisfy this requirement",
      feeStatus: "Domestic — NZ citizens on SCV 444 charged domestic fees; HELP loan needs the standard 10-year long-term residency test.",
      sourceNote: "monash.edu/admissions/entry-requirements/nz-ncea; monash.edu/students/admin/enrolments/government-support/residency-requirements.",
    },
    description:
      "Group of Eight member and Australia's largest university. Strong science and business reputation. Fashion appears only as a design strand within the Bachelor of Design at Caulfield — not a dedicated fashion school like RMIT or Whitehouse.",
    fields: {
      fashion: ["Bachelor of Design (Monash Art, Design & Architecture) — fashion strand, Caulfield"],
      chemistry: ["Bachelor of Science — Chemistry major, Clayton"],
      biology: [
        "Bachelor of Science — School of Biological Sciences, several named majors (Genetics and Genomics, Zoology, Ecology and Conservation Biology, Plant Sciences)",
      ],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major"],
    },
    entrepreneurshipNote:
      "Not a dedicated undergraduate major — folded into Bachelor of Commerce/Business as elective units. Extracurricular support via the Fastrack program and Entrepreneurship and Innovation Hub (eiHub); Master of Business offers an entrepreneurship specialisation at postgrad level.",
    visit: {
      openDay: "Early Aug 2026 (Caulfield 1 Aug, Clayton 2 Aug, Parkville 16 Aug — dates vary by campus, typically early August)",
      openDayUrl: "https://www.monash.edu/open-day",
      tours: "Self-guided \"Pocket Explorer\" tours at Clayton; campus maps for Caulfield/Parkville/Peninsula; student-guided tours on request via Discover Monash.",
      toursUrl: "https://www.monash.edu/discover/resources/self-guided-tours",
      notes: "Monash Business School runs a separate \"Business Explorer\" day (Caulfield) for senior students with a Banking & Finance taster session in a simulated trading lab — worth checking for a 2027 date given the finance interest.",
    },
  },
  {
    id: "rmit",
    city: "melbourne",
    name: "RMIT University",
    type: "University",
    location: "Brunswick (fashion) & Melbourne CBD (business)",
    lat: -37.7679,
    lng: 144.9614,
    website: "https://www.rmit.edu.au",
    compare: { fashion: 5, sciTech: 5, business: 5, note: "Best overall fit — three distinct fashion pathways (design, materials/tech, enterprise) within one School of Fashion & Textiles." },
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3, meeting NZ University Entrance — RMIT maps NCEA achievement bands to VCE-equivalent scores case-by-case (e.g. Merit average ≈ 65% Australian standard, Excellence average ≈ 70-90%)",
      english: "Mapped to a VCE-equivalent English study score: 25+ (non-EAL) or 27+ (EAL) required at bachelor level — check RMIT's current NZ country-equivalency page for the exact NCEA credit mapping.",
      subjectPrerequisites: "No fixed named-subject prerequisites beyond English found; NCEA Level 3 general UE (18 credits at Level 3) is the baseline.",
      portfolio: "Yes, for all three fashion degrees. Bachelor of Fashion (Design): a 10-15 page folio (2-3 projects) plus a written design-approach statement, plus an AI-use disclosure if applicable — deadlines are chronological until places fill, so apply early. Enterprise and Fashion Sustainability also require a selection task (exact folio spec not independently confirmed — check RMIT's current-year selection-task PDFs).",
      feeStatus: "Domestic — NZ/AU citizens and PRs apply through RMIT's local (domestic) admissions channel, not the international selection pathway. CSP places available.",
      sourceNote: "rmit.edu.au course/admissions-transparency/selection-task pages. For reference, RMIT's 2026 admitted-student data for Fashion Enterprise (BP327) showed a median ATAR of 74.1 (selection rank 79.2) — actual outcomes, not a published cutoff.",
    },
    description:
      "Home to Australia's #1 and world top-20 ranked fashion school (Business of Fashion rankings), based at the Brunswick campus. Also holds a strong applied-science/chemistry reputation with RACI accreditation, and a large CBD business school. Uniquely offers three distinct fashion pathways — design, materials/technology, and enterprise — within one School of Fashion & Textiles.",
    fields: {
      fashion: [
        "Bachelor of Fashion (Design) — Brunswick",
        "Bachelor of Fashion (Enterprise) — retail/marketing/product management, Brunswick",
        "Bachelor of Fashion Sustainability — Brunswick",
      ],
      chemistry: [
        "Bachelor of Science — Chemistry major (RACI-accredited)",
        "Bachelor of Science (Applied Chemistry) / Bachelor of Engineering (Chemical Engineering) Honours",
      ],
      biology: ["Bachelor of Science — Biological Sciences major (BP350, distinct from RMIT's separate Biotechnology major)"],
      business: ["Bachelor of Business (various majors)"],
      entrepreneurship: ["Bachelor of Business — Entrepreneurship major (BP343), standalone major on launching, managing and growing ventures"],
    },
    hybrid: [
      {
        label: "Fashion + Materials Science",
        description:
          "Bachelor of Fashion Sustainability sits at the intersection of design and materials science, with majors/minors spanning Textile & Material Design, Fashion Innovation & Technology, Fashion Design, Materials Innovation, and Digital Fashion. Backed by a research centre combining fashion, textile engineering, materials science and chemistry (smart textiles, polymers, wearables, sensors), with industry partners including Australian Wool Innovation and Bruck Textiles.",
      },
      {
        label: "Fashion + Enterprise",
        description:
          "Bachelor of Fashion (Enterprise) teaches product management, marketing, retail and consumer behaviour specifically through the fashion industry, not generic business — with industry-partnered commercial projects. A postgraduate Master of Fashion (Entrepreneurship) extends this into fashion analytics, supply chains and brand-building.",
      },
    ],
    visit: {
      openDay: "Early-mid Aug 2026, varies by campus (Bundoora 2 Aug, Brunswick/City 9 Aug, Point Cook 16 Aug, Bendigo 23 Aug)",
      openDayUrl: "https://www.rmit.edu.au/events/all-events/rmit-open-day",
      tours: "Free interactive facility tours of City, Brunswick or Bundoora, with separate tracks for high-schoolers vs. mature-age visitors. Book via student.recruitment@rmit.edu.au.",
      toursUrl: "https://www.rmit.edu.au/about/our-locations-and-facilities/campus-tours",
      notes: "The School of Fashion & Textiles (Brunswick) runs its own public graduate exhibitions — \"Variegate\" (~July) and \"MOSAIC\" (~November) — ticketed but open to the public, and a great fashion-specific alternative if Open Day timing doesn't line up.",
    },
  },
  {
    id: "deakin",
    city: "melbourne",
    name: "Deakin University",
    type: "University",
    location: "Burwood",
    lat: -37.8474,
    lng: 145.1148,
    website: "https://www.deakin.edu.au",
    entryRequirements: {
      ncealLevel: "L2",
      academic: "NCEA Level 3 overall (60+ credits at Level 3 within 80 total)",
      english: "8 credits at NCEA Level 2 or higher (4 Writing + 4 Reading) — notably lower bar than Melbourne/Monash",
      feeStatus: "Domestic — Deakin's Commonwealth-supported eligibility explicitly lists NZ citizens (alongside PR/humanitarian/PEV visa holders) who study the whole course while in Australia.",
      sourceNote: "deakin.edu.au NCEA equivalency pages.",
    },
    description:
      "Large multi-campus university based at Burwood for Melbourne undergraduates. RACI-accredited chemistry and a CFA-recognised finance major. Only offers fashion at postgraduate level (Master of Fashion Design/Merchandising), so not an undergraduate fashion option.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major (RACI-accredited)"],
      biology: ["Bachelor of Science — Human Biology major", "Bachelor of Science — Cell Biology and Genomics major (also combinable with Bachelor of Arts)"],
      finance: ["Bachelor of Commerce — Finance major (CFA Institute recognised)"],
      entrepreneurship: [
        "Bachelor of Business — Entrepreneurship and Innovation major",
        "Entrepreneurship minor — addable to other degrees",
      ],
    },
    visit: {
      openDay: "Sun 23 Aug 2026, 9am–3pm (Burwood)",
      openDayUrl: "https://www.deakin.edu.au/open-day/melbourne-burwood",
      tours: "Free student-led guided tours typically run during April school holidays; registration recommended but walk-ups welcome. Separate accommodation tours run Tue/Thu.",
      toursUrl: "https://www.deakin.edu.au/student-life-and-services/events/campus-tours",
    },
  },
  {
    id: "swinburne",
    city: "melbourne",
    name: "Swinburne University of Technology",
    type: "University",
    location: "Hawthorn",
    lat: -37.8218,
    lng: 145.0387,
    website: "https://www.swinburne.edu.au",
    compare: { fashion: 3.5, sciTech: 5, business: 5, note: "Dark horse — tech-fashion wild card (AR/VR, generative AI, smart fabrics), but the fashion degree is new and lacks a long alumni track record." },
    entryRequirements: {
      ncealLevel: "L3",
      academic: "Not a hard ATAR/NCEA-score gate — admission is portfolio-based. General completion of Year 12 or equivalent (which NCEA Level 3/UE satisfies) is the baseline eligibility check, not a specific credit threshold. No ATAR needed to apply.",
      english: "Not separately specified for NZ/NCEA applicants — likely satisfied by the NCEA UE English component, not independently confirmed against a Swinburne-published NCEA page.",
      portfolio: "Yes — the primary and determinative selection mechanism: a 10-page portfolio of creative work plus a 250-word written response on the applicant's passion for design and fashion career goals. Portfolio quality matters more than grades for this program.",
      feeStatus: "Domestic — NZ/AU citizens and AU permanent residents classed as local students.",
      sourceNote: "swinburne.edu.au Bachelor of Design (Fashion) course page + \"How to Become a Fashion Designer\" guide. Structurally different from RMIT/UTS/UNSW — worth noting since it changes the whole admissions calculus (portfolio-first rather than ATAR/selection-rank-anchored).",
    },
    description:
      "Known for strong industry-integrated learning — all degrees include Work Integrated Learning placements. Its Bachelor of Design (Fashion) is a newer, deliberately tech-forward program — a strong option if she likes fashion but also has a technical/entrepreneurial streak, though it lacks the long alumni track record of RMIT or UTS fashion programs.",
    fields: {
      fashion: ["Bachelor of Design (Fashion), majoring in Fashion Design — Hawthorn"],
      chemistry: ["Bachelor of Science — Chemistry major"],
      business: ["Bachelor of Business (Accounting, Business Administration, and other majors)"],
      finance: ["Bachelor of Business — Finance major (CFA-affiliated)"],
      entrepreneurship: ["Bachelor of Business — Entrepreneurship major (also via Bachelor of Business (Professional))"],
    },
    biologyNote:
      "No general \"Biology\" major — closest options are Biochemistry or Biotechnology majors within Bachelor of Science; broader biology only appears within the separate Bachelor of Health Science (Biomedical Science).",
    hybrid: [
      {
        label: "Fashion + Technology",
        description:
          "Bachelor of Design (Fashion) is built around \"fashion futures\": dedicated units in Wearable Technology Design Studio, Emerging Technologies in Fashion and Textile Design, Sustainable Fashion Design Studio, plus digital fabrication and prototyping in the ProtoLAB. A Fashion Branding & Management unit in year 3 adds commercial/entrepreneurial grounding. Note: this specific fashion degree doesn't currently list a confirmed double-degree pairing with Business or Applied Innovation (those pairings exist for the general Bachelor of Design, not yet confirmed for the Fashion major) — verify directly if that combination matters.",
      },
    ],
    visit: {
      openDay: "Sun 26 Jul 2026 (Hawthorn, typically late July)",
      openDayUrl: "https://www.swinburne.edu.au/openday/",
      tours: "45-minute student-ambassador-led guided tours of Hawthorn (incl. Sky Lounge/Sky Garden), bookable online; 360° virtual tour also available.",
      toursUrl: "https://www.swinburne.edu.au/forms/campus-tour/",
      notes: "School groups can request study-area-specific workshop visits outside Open Day.",
    },
  },
  {
    id: "latrobe",
    city: "melbourne",
    name: "La Trobe University",
    type: "University",
    location: "Bundoora",
    lat: -37.7196,
    lng: 145.0483,
    website: "https://www.latrobe.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 (specific credit threshold not published — use La Trobe's equivalent-qualifications tool or contact admissions directly)",
      english: "No specific NCEA English subject/credit threshold published; only general guidance that proficiency must be shown if qualifications come from a non-English-instruction country (implying NZ schooling likely self-satisfies this)",
      feeStatus: "Domestic — NZ citizens confirmed as domestic students.",
      sourceNote: "latrobe.custhelp.com (confirms domestic status); uac.edu.au La Trobe pages (no NCEA-specific detail). Recommend contacting La Trobe (1300 135 045) for a precise figure.",
    },
    description:
      "Main Melbourne undergraduate campus at Bundoora, with a CBD campus (Collins Street) for postgraduate business, health and law only. Around 70 major/minor combinations available in Commerce. No fashion program.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: [
        "Bachelor of Biological Sciences — a standalone dedicated degree (not just a major within a general Bachelor of Science), with options including biochemistry, botany, ecology, genetics, human physiological sciences, microbiology, zoology",
      ],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major"],
      entrepreneurship: ["Bachelor of Business — Enterprise major (blends finance, consumer behaviour, digital literacy, entrepreneurship and innovation)"],
    },
    visit: {
      openDay: "Sun 2 Aug 2026, 10am–4pm (Bundoora, typically early August)",
      openDayUrl: "https://www.latrobe.edu.au/openday",
      tours: "Campus tours of Bundoora available (booking method not fully confirmed — check latrobe.edu.au directly); virtual tour lets you connect with current students.",
      toursUrl: "https://www.latrobe.edu.au/study",
      notes: "Tour booking details for La Trobe couldn't be fully verified online — worth a direct call/email before the trip.",
    },
  },
  {
    id: "vu",
    city: "melbourne",
    name: "Victoria University",
    type: "University",
    location: "Footscray Park",
    lat: -37.7937,
    lng: 144.8985,
    website: "https://www.vu.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "No explicit NCEA-specific threshold published — general Year-12-equivalent standard (VCE-equivalent completion) applies",
      english: "No NCEA-specific English credit threshold published; VU's VCE-based standard is a study score of 20 in English (25 in EAL) — no confirmed NCEA equivalent",
      feeStatus: "Domestic — NZ citizens/SCV444 visa holders confirmed domestic-equivalent for HECS-HELP eligibility.",
      sourceNote: "askvu.vu.edu.au (entry requirements + HECS-HELP process) — no NCEA-specific figure published; recommend contacting AskVU directly.",
    },
    description:
      "Practically-oriented, accessible university. Note: its Bachelor of Science does not offer a Chemistry major (only Biotechnology and Ecology/Environmental Management) — chemistry appears only as first-year core units. No fashion program.",
    fields: {
      business: ["Bachelor of Business"],
      finance: ["Bachelor of Business — Banking and Finance major"],
    },
    entrepreneurshipNote:
      "Not offered as a dedicated major — folded into Bachelor of Business as a core unit (\"Innovation and Entrepreneurship\"); closest major is \"Management & Innovation\".",
    biologyNote:
      "Not offered as a dedicated major — Bachelor of Science majors are limited to Biotechnology and Ecology/Environmental Management; biology appears only as first-year core units plus an optional Cell Biology/Microbiology minor.",
    visit: {
      openDay: "Sun 16 Aug 2026 (Footscray Park, typically mid-August)",
      openDayUrl: "https://study.vu.edu.au/openday",
      tours: "Monthly student-mentor \"walk and talk\" tours at Footscray Park; also an augmented-reality self-guided tour via mobile phone.",
      toursUrl: "https://www.vu.edu.au/study-at-vu/information-for/events-for-future-students",
    },
  },
  {
    id: "acu",
    city: "melbourne",
    name: "Australian Catholic University (Melbourne)",
    type: "University",
    location: "Fitzroy (St Patrick's campus)",
    lat: -37.8079,
    lng: 144.9762,
    website: "https://www.acu.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 (\"recent secondary education in New Zealand\" generates a selection rank alongside ATAR-equivalent applicants) — no specific credit count published",
      english: "No NCEA-specific English subject/credit threshold published; general rule requires proof of proficiency only if English wasn't the medium of Year 12+ study in an approved English-speaking country",
      feeStatus: "Domestic — ACU states domestic status is citizenship-based (NZ citizenship qualifies), with no residency-history requirement.",
      sourceNote: "acu.edu.au undergraduate entry requirements + uac.edu.au ACU international-students page — neither publishes NZ/NCEA-specific figures.",
    },
    description:
      "Smaller, faith-based institution known for a supportive learning environment. Business/Commerce is its only clear match among the four fields — no confirmed chemistry major, finance specialisation, or fashion program at the Melbourne campus.",
    fields: {
      business: ["Bachelor of Commerce"],
    },
    entrepreneurshipNote:
      "Weakest entrepreneurship offering among Melbourne institutions — only an elective unit and a minor addable to Bachelor of Commerce/Business Administration; no major at any level.",
    biologyNote:
      "No general Bachelor of Science — biology appears only as first-year core units within the Bachelor of Biomedical Science, whose only major is Physiological Pharmacology.",
    visit: {
      openDay: "Sun 9 Aug 2026, 10am–3pm (Melbourne/Fitzroy, typically early-mid August)",
      openDayUrl: "https://openday.acu.edu.au/",
      tours: "Personalised ~60-minute campus tours bookable via the Melbourne campus page; group tours for school groups can also be arranged.",
      toursUrl: "https://www.acu.edu.au/student-life/experience-uni-before-you-start/explore-your-local-campus/campus-tours",
    },
  },
  {
    id: "boxhill",
    city: "melbourne",
    name: "Box Hill Institute",
    type: "TAFE",
    location: "Box Hill (Elgar campus)",
    lat: -37.8195,
    lng: 145.1214,
    website: "https://www.boxhill.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "Not published as NCEA-specific — general \"completed Year 12 or equivalent\" standard; NZ citizens confirmed eligible for Commonwealth Supported Places and Victorian Free TAFE if living in Australia, implying domestic-equivalent treatment",
      english: "No NCEA English threshold or NZ-specific policy published",
      feeStatus: "Domestic — NZ citizens eligible for Commonwealth Supported Places and Victorian Free TAFE (for Priority Courses) alongside Australian citizens/PRs.",
      sourceNote: "No dedicated NCEA admissions page found — recommend contacting Box Hill admissions directly (1300 269 445).",
    },
    description:
      "Offers genuine Bachelor-level fashion degrees (not just vocational diplomas) — a real alternative to RMIT and Whitehouse at a different fee point, covering business, design thinking, and ethical/sustainable fashion practice.",
    fields: {
      fashion: [
        "Bachelor of Design (Fashion Design)",
        "Bachelor of Design (Fashion Enterprise)",
      ],
    },
    entrepreneurshipNote:
      "Not offered as a dedicated major — folded into Bachelor of Commerce (Applied)/Business Studies as general business content, no standalone entrepreneurship major or unit.",
    biologyNote:
      "No general Biology/Biological Sciences major — closest is the Bachelor of Biosecurity Science, which centres on biosecurity/pest-disease management rather than general biology.",
    visit: {
      openDay: "\"Open Nights\" (not a single Open Day) — 2026: 20 Jan (Box Hill), 22 Jan (Lilydale), 18 Aug (Box Hill), 20 Aug (Lilydale), 26 Aug (City)",
      openDayUrl: "https://info.boxhill.edu.au/open-nights/",
      tours: "Open Nights (4–6:30pm) include tours, hands-on activities, and course advisor Q&A. Outside these, book an appointment at the Welcome Hub (Elgar campus, Mon–Fri 8:30am–4:45pm).",
      toursUrl: "https://info.boxhill.edu.au/open-nights/",
    },
  },
  {
    id: "kangan",
    city: "melbourne",
    name: "Kangan Institute",
    type: "TAFE",
    location: "Cremorne (Textile and Fashion Hub)",
    lat: -37.8279,
    lng: 144.9922,
    website: "https://www.kangan.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "Not published as NCEA-specific — general \"Australian Year 12 or equivalent overseas qualification\" standard; domestic students without a qualifying certificate may sit an in-house literacy/numeracy assessment instead",
      english: "No NCEA English threshold published — may default to Kangan's in-house English/maths assessment if no equivalent certificate is presented",
      feeStatus: "Domestic — NZ citizens recognised as local students (Victorian TAFE sector pattern); some Free TAFE places have extra age/upskilling conditions, but base domestic classification applies.",
      sourceNote: "No NZ/NCEA-specific admissions page found on kangan.edu.au.",
    },
    description:
      "Located in Melbourne's fashion/textile precinct with runway facilities, a retail training centre, and a textile manufacturing hub. Diploma-level only (no Bachelor degree) — a lower-cost vocational entry pathway rather than a degree.",
    fields: {
      fashion: [
        "Diploma of Applied Fashion Design and Merchandising — Design & Product Development or Fashion Business specialisation",
        "Diploma of Apparel, Fashion and Textiles",
      ],
    },
    entrepreneurshipNote:
      "Not offered as a dedicated major — entrepreneurship is a skill theme within Business/Management/IT certificates and diplomas, not a named major or degree.",
    biologyNote:
      "Not offered — TAFE-only, no Bachelor-level Biology program; offers Certificate III/IV in Laboratory Techniques plus pathways into partner universities (La Trobe, Victoria University, RMIT) for bio degrees.",
    visit: {
      openDay: "\"Open Nights\" (Talk & Tour) — 2026: Thu 27 Aug 3–6pm, Thu 3 Sep 3–6:30pm",
      openDayUrl: "https://www.kangan.edu.au/study-with-us/what-s-on/ki-opennight/cremorne_opennight",
      tours: "\"Talk & Tour\" sessions explore facilities with course advice; casual campus visits are also welcomed without formal booking.",
      toursUrl: "https://www.kangan.edu.au/study-with-us/what-s-on",
      notes: "Cremorne also runs public-facing student Fashion Shows showcasing student work — a great fashion-specific event to look out for.",
    },
  },
  {
    id: "whitehouse",
    city: "melbourne",
    name: "Whitehouse Institute of Design (Melbourne)",
    type: "Private College",
    location: "Melbourne CBD",
    lat: -37.8136,
    lng: 144.9569,
    website: "https://www.whitehouse-design.edu.au",
    compare: { fashion: 4.5, sciTech: 1, business: 3, note: "Excellent if she becomes fully committed to fashion design specifically; not the pick while she's still intellectually interested in chemistry/science." },
    entryRequirements: {
      ncealLevel: "L3",
      academic: "General \"Year 12 (HSC/equivalent) completed within past 2 years\" standard, plus a mandatory portfolio review — the dominant selection factor. No NCEA-specific credit threshold published",
      english: "No separate NCEA English threshold — a literacy assessment (1000-word written task) applies mainly to adjustment/work-experience/international applicants, not stated as required for NZ/NCEA applicants",
      feeStatus: "Domestic — Whitehouse explicitly defines a domestic student as including New Zealand citizens.",
      sourceNote: "whitehouse-design.edu.au/apply-now/domestic-application-requirements — explicit NZ-as-domestic statement; portfolio quality is the dominant factor over academic credit thresholds.",
    },
    description:
      "Specialist private design college in the historic Royal Mail Exchange Building. Accelerated 2-year, trimester-based, industry-styled and portfolio-driven pedagogy — a strong option for a design-first fashion pathway rather than a broad university degree.",
    fields: {
      fashion: ["Bachelor of Design — Fashion Design specialisation"],
    },
    entrepreneurshipNote:
      "Not offered as a dedicated major — entrepreneurship/business content is woven into the Bachelor of Design curriculum as a philosophy rather than a named subject or major.",
    biologyNote: "Not offered — a pure design college with no science faculty or biology-related content.",
    visit: {
      openDay: "\"Open House\" — Sat 8 Aug 2026, 10am–2pm (typically early August)",
      openDayUrl: "https://www.whitehouse-design.edu.au/open-house",
      tours: "Personal campus tours where you meet staff/students and see studios; bookings preferred via phone/email.",
      toursUrl: "https://whitehouse-design.edu.au/schedule-a-tour/",
      notes: "Open House is essentially a fashion/design showcase itself — live workshops, demonstrations and student exhibitions — highly relevant given the fashion interest.",
    },
  },
  {
    id: "melbpoly",
    city: "melbourne",
    name: "Melbourne Polytechnic",
    type: "TAFE",
    location: "Prahran",
    lat: -37.8497,
    lng: 144.9916,
    website: "https://www.melbournepolytechnic.edu.au",
    entryRequirements: {
      ncealLevel: "L2",
      academic: "No NCEA-specific credit figure published, but NZ citizens are explicitly classified as \"local students\" (not international), so the general local-student Year 12/equivalent standard applies",
      english: "No separate English proficiency evidence required — NZ passport holders are explicitly exempted (grouped with UK/US/Canada/Ireland passport holders)",
      feeStatus: "Domestic (\"local student\") — the clearest, most explicit official statement found among all Melbourne TAFEs/colleges researched.",
      sourceNote: "melbournepolytechnic.edu.au/study/how-to-enrol/international-admissions/international-entry-requirements/ — explicitly states NZ citizens are local students and NZ passport holders are exempt from English proficiency evidence.",
    },
    description:
      "Vocational-level fashion and textile courses (e.g. costume) at the Prahran campus — a lower-cost, lower-commitment entry point than RMIT, Whitehouse, or Box Hill, but no Bachelor-level fashion degree.",
    fields: {
      fashion: ["Diploma/Certificate-level fashion & textile design courses (incl. costume)"],
    },
    entrepreneurshipNote:
      "Not a separate named specialisation — entrepreneurship exists as a core unit (\"Entrepreneurship\") within the Bachelor of Business (Preston campus, not Prahran); only a Marketing Specialisation stream is confirmed.",
    biologyNote: "Not offered — no biology or biological sciences bachelor degree found.",
    visit: {
      openDay: "Not confirmed for 2026 — official page did not return a date at time of research",
      openDayUrl: "https://www.melbournepolytechnic.edu.au/open-day/",
      tours: "Bookable \"Information Sessions\" for an in-depth look at a chosen study area; no separate self-guided/ambassador tour page found.",
      toursUrl: "https://www.melbournepolytechnic.edu.au/information-sessions/",
      notes: "Recommend contacting Melbourne Polytechnic directly to confirm visit options before the trip — the least documented of the major TAFEs here.",
    },
  },
  {
    id: "torrens",
    city: "melbourne",
    name: "Torrens University Australia (Melbourne)",
    type: "Private College",
    location: "Melbourne CBD",
    lat: -37.818,
    lng: 144.9671,
    website: "https://www.torrens.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 is recognised as an accepted qualification, but Torrens' UAC page states overseas-qualification applicants must contact the university directly to discuss eligibility before applying — no fully self-service NCEA pathway",
      english: "No NCEA-specific English threshold found. General requirement is IELTS 6.0 overall (min 5.5/band) for undergrad, applied to \"overseas secondary/tertiary qualifications from non-English-instruction countries\" — unclear whether NZ schooling is exempted",
      feeStatus: "Domestic (resolved — earlier research showed conflicting signals). Torrens states directly: eligible NZ citizens and permanent residents can enrol as Commonwealth Supported students, with FEE-HELP available to NZ SCV holders who meet standard residency requirements. The earlier ambiguity likely came from Torrens' international-facing marketing pages being indexed alongside its domestic-fee pages — no evidence NZ citizens are pushed into the international pathway.",
      sourceNote: "torrens.edu.au/how-to-apply/fees-scholarships/tuition-fees; torrens.edu.au/studying-with-us/faqs.",
    },
    description:
      "Private university opposite Flinders Street Station, positioned as a flexible, career-focused alternative to public universities. On-campus, online or blended study modes, including a 2-year accelerated option.",
    fields: {
      business: ["Bachelor of Business"],
      entrepreneurship: ["Bachelor of Business (Entrepreneurship) — standalone 3-year (or 2-year accelerated) degree, venture creation/funding/business planning, 300hrs industry experience"],
    },
    biologyNote:
      "No standalone Biology/Biological Sciences degree — closest is foundational biology/physiology within the Bachelor/Diploma of Health Science (naturopathy/nutritional medicine training).",
    visit: {
      openDay: "Sat 29 Aug 2026, 10:30am–1pm (Flinders St); Virtual Open Day also 2–3 Sep 2026",
      openDayUrl: "https://www.torrens.edu.au/whats-on/open-day/melbourne",
      tours: "Personal campus tours bookable online, Mon–Fri 10am–5pm, 15–45 minutes.",
      toursUrl: "https://www.torrens.edu.au/whats-on/campus-tours",
      notes: "Open Day includes bookable 1:1 sessions with a Future Student Advisor — useful for comparing business/finance pathways.",
    },
  },
  {
    id: "holmesglen",
    city: "melbourne",
    name: "Holmesglen Institute",
    type: "TAFE",
    location: "Chadstone",
    lat: -37.8853,
    lng: 145.0784,
    website: "https://www.holmesglen.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "Not published — Holmesglen's official admissions/policies page is silent on NZ/NCEA, focusing only on VCE/ATAR pathways",
      english: "Not published — page states \"English language proficiency\" is an assessment criterion but gives no NCEA threshold, IELTS score, or NZ exemption",
      feeStatus: "Likely domestic (Victorian TAFE sector pattern, consistent with Box Hill/Kangan/Melbourne Polytechnic) — not independently confirmed on Holmesglen's own site.",
      sourceNote: "holmesglen.edu.au higher-education admissions/policies page — genuinely silent on NZ/NCEA specifics.",
    },
    description:
      "TAFE offering a genuine Bachelor-level fashion degree, with purpose-built patternmaking studios and manufacturing rooms reflecting industry environments — comparable to Box Hill, and design-focused rather than enterprise/business-focused.",
    fields: {
      fashion: ["Bachelor of Fashion Design"],
    },
    entrepreneurshipNote:
      "Not offered as a dedicated major — folded into Bachelor of Business Administration via electives and a final-year \"New Venture Creation\" capstone project, no formally named Entrepreneurship major.",
    biologyNote:
      "Not offered at Bachelor level — vocational Certificate III/IV in Laboratory Techniques only; bachelor offerings skew toward Nursing and Health.",
    visit: {
      openDay: "2026 Open Days: 22 Jan, 12 Mar, 7 May, 18 Jun, 6 Aug, 17 Sep, 12 Nov (Chadstone) — next one is Thu 17 Sep, just before the NZ spring break window",
      openDayUrl: "https://www.holmesglen.edu.au/study-with-us/open-days",
      tours: "Online campus tour booking system separate from Open Days, plus pre-recorded virtual tours by study area/campus.",
      toursUrl: "https://www.holmesglen.edu.au/study-with-us/secondary-school-study/campus-tours",
      notes: "Runs a dedicated \"Arts and Design Open Day\" stream covering fashion specifically — worth checking for the next one.",
    },
  },
  {
    id: "lci",
    city: "melbourne",
    name: "LCI Melbourne",
    type: "Private College",
    location: "Collingwood",
    lat: -37.8033,
    lng: 144.9857,
    website: "https://melbourne.lcieducation.com",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "General \"satisfactory completion of Australian Year 12 or equivalent\" standard; Bachelor of Business and Innovation references an ATAR ≥60 (68+ guarantees entry) — no NCEA-specific credit count or NZ equivalence statement published",
      english: "No NCEA-specific threshold found. Published international-student requirement is IELTS 6.0 overall (no band below 5.5) — whether this applies to NZ applicants depends on domestic/international classification (see fee status)",
      feeStatus: "Likely domestic (moderate confidence, not ironclad). LCI is CRICOS-registered and offers FEE-HELP (a domestic-only scheme) plus a VTAC application pathway (Victoria's domestic admissions system) for its fashion degree — consistent with domestic treatment. However, unlike RMIT/ACU/Whitehouse, no LCI page explicitly states \"New Zealand citizens are domestic students.\" Recommend a direct email/call to LCI Melbourne admissions for written confirmation before relying on this.",
      sourceNote: "melbourne.lcieducation.com/en/admission-and-aid/loans-scholarships; teqsa.gov.au provider listing (CRICOS 02201G).",
    },
    description:
      "Part of the international LCI Education network (French-origin design school group). Purpose-built fashion labs, runway/gallery space, and industry internships — smaller and less well-known than RMIT/Whitehouse but a legitimate specialist option.",
    fields: {
      fashion: [
        "Bachelor of Design Arts — Fashion & Costume Design major",
        "Diploma of Fashion Design",
      ],
      entrepreneurship: ["Bachelor of Entrepreneurship (Creative Industries) — 2-year (6 trimester) degree combining business/management with creative-industries commercialisation, investor-ready business plans and industry pitching"],
    },
    biologyNote: "Not offered — a design/creative college (Business & Management, Art, Animation, Design) with no biology or science program.",
    hybrid: [
      {
        label: "Fashion + Entrepreneurship",
        description:
          "Bachelor of Entrepreneurship (Creative Industries) is purpose-built for creative-industries founders — combining core business/venture skills with commercialisation training specifically for design/fashion-adjacent businesses, including investor pitching. One of the most direct creative+entrepreneurship pairings in this dataset.",
      },
    ],
    visit: {
      openDay: "Sat 29 Aug 2026, 10am–3pm (Collingwood campus)",
      openDayUrl: "https://melbourne.lcieducation.com/en/news-and-events/events/open-day-2026",
      tours: "No dedicated self-guided/ambassador tour page found separate from Open Day — contact admissions directly to arrange an off-Open-Day visit.",
      toursUrl: "not found — contact admissions directly",
      notes: "LCI Melbourne presents an annual Graduate Runway show at the PayPal Melbourne Fashion Festival — a public, fashion-industry-facing showcase distinct from Open Day, well worth checking dates for.",
    },
  },
  {
    id: "fashionmasters",
    city: "melbourne",
    name: "Melbourne School of Fashion (Fashionmasters / Holmes Institute)",
    type: "Private College",
    location: "Melbourne CBD (185 Spring Street)",
    lat: -37.8103,
    lng: 144.9721,
    website: "https://www.holmes.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "Not found — this institution now appears to operate under \"The Masters Institute of Creative Education\" (tmice.edu.au); no published entry-requirements page specifies academic prerequisites in any detail",
      english: "Not found — no IELTS/TOEFL threshold, NCEA English requirement, or NZ-specific admissions information located",
      feeStatus: "Not found.",
      sourceNote: "Even the current institutional branding is ambiguous (Melbourne School of Fashion vs Fashionmasters vs Holmes Institute Fashion vs The Masters Institute) — strongly recommend contacting directly (hello@tmice.edu.au / +61 3 9945 9522) before relying on this listing at all.",
    },
    description:
      "Established 1991, a smaller specialist provider next to the Princess Theatre. Its Bachelor of Fashion and Business unusually blends fashion and business coursework directly — worth a look for a student wanting both in one degree. Less internationally recognised than RMIT/Whitehouse; confirm current accreditation status directly.",
    fields: {
      fashion: [
        "Bachelor of Fashion and Business (delivered with Holmes Institute)",
        "Certificate–Diploma pathway courses in design, production, marketing, retail",
      ],
    },
    entrepreneurshipNote:
      "Not a named major — the Bachelor of Fashion and Business targets \"fashion executives and entrepreneurs\" as a career outcome, but Holmes Institute's Bachelor of Business specialisations (Information Systems, Accounting, Marketing, Aviation Management, Management, Digital Business, Hospitality Management) don't include a standalone Entrepreneurship track; only covered via a unit within the Management specialisation.",
    biologyNote: "Not offered — a fashion/business-focused institution with no biology or science program.",
    visit: {
      openDay: "Not found — no dedicated events/open day page located for this fashion arm",
      openDayUrl: "not found",
      tours: "No online tour booking found; direct phone/email contact via Holmes Institute appears to be the only path to arranging a visit.",
      toursUrl: "not found",
      notes: "The weakest-documented institution here — recommend contacting Holmes Institute directly before the trip to confirm any visit is even possible.",
    },
  },
  {
    id: "usyd",
    city: "sydney",
    name: "University of Sydney",
    type: "University",
    location: "Camperdown/Darlington",
    lat: -33.8886,
    lng: 151.1873,
    website: "https://www.sydney.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 — Sydney calculates an ATAR-equivalent from NCEA Level 3 results (via NZQA/UAC), consistent with NZ University Entrance",
      english: "No NCEA-specific English subject/credit threshold — NZ/NCEA doesn't appear at all in Sydney's or UAC's English Language Proficiency tables (which cover IELTS/TOEFL/PTE/IB etc.), suggesting proficiency is satisfied automatically via NZ schooling rather than itemised",
      feeStatus: "Domestic — CSP places available to eligible NZ citizens who reside in Australia for the duration of study.",
      sourceNote: "sydney.edu.au recognised-qualifications page (NCEA→ATAR conversion); uac.edu.au Sydney ELP page (no NZ/NCEA row); sydney.edu.au CSP eligibility page.",
    },
    description:
      "Sandstone Group of Eight university. Business School ranked ~29th globally for Accounting & Finance (QS 2025). No dedicated fashion program.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: ["Bachelor of Science — Biology major (School of Life and Environmental Sciences, single-honours pathway available)"],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major", "Master of Finance"],
      entrepreneurship: ["Bachelor of Commerce — Innovation and Entrepreneurship major/minor, multidisciplinary (drawing units from Business, Arts, Engineering, Science, Architecture, Music)"],
    },
    visit: {
      openDay: "Sat 29 Aug 2026",
      openDayUrl: "https://openday.sydney.edu.au/",
      tours: "Monthly guided tours (first Thursday, 4–5pm) bookable via Eventbrite; heritage tours via Chau Chak Wing Museum on weekdays; 360° virtual tour also available.",
      toursUrl: "https://www.sydney.edu.au/engage/visit/campus-tours/book-a-campus-tour.html",
    },
  },
  {
    id: "unsw",
    city: "sydney",
    name: "University of New South Wales (UNSW)",
    type: "University",
    location: "Kensington (Art & Design campus in Paddington)",
    lat: -33.9173,
    lng: 151.2313,
    website: "https://www.unsw.edu.au",
    compare: { fashion: 3.5, sciTech: 5, business: 4, note: "Best academic hedge — strongest choice if she wants to stay broadly technical/scientific while keeping fashion/textiles as a substantial design focus, rather than committing to fashion as the primary identity." },
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 accepted as an equivalent Year 12 qualification — NZQA calculates and forwards an ATAR to UAC once NZQA's own University Entrance requirements are met (same mechanism as UTS). No prerequisites and no assumed knowledge required for the Bachelor of Design (Honours).",
      english: "No separate English proficiency proof required for Year-12-graduate-equivalent applicants (extends to NZ NCEA L3/UE completers) — distinct from the international/non-English-background IELTS/TOEFL pathway. Exact NCEA English credit count not separately published.",
      portfolio: "Optional but advantageous, not a strict gate — the ADA Portfolio Entry pathway offers an Early Conditional Offer with an adjusted selection rank up to 10 points below standard, as a bonus pathway alongside normal ATAR-rank admission (unlike Swinburne, where portfolio is mandatory and determinative).",
      feeStatus: "Domestic — standard UNSW domestic classification (NZ/AU citizens, AU PRs); domestic applicants apply through UAC.",
      sourceNote: "unsw.edu.au Bachelor of Design (Honours) course page publishes exact current-year figures directly: 2026 lowest selection rank 83.0, lowest ATAR 65.0 — the clearest published cutoff of any institution in this dataset.",
    },
    description:
      "Group of Eight university with a strong STEM and finance reputation across Asia-Pacific (Business School ranked ~10th globally for Accounting & Finance). Fashion isn't a dedicated program — the Art & Design campus in Paddington leans fine art/design — but its broad Bachelor of Design lets students combine textiles/fashion with computational or industrial design.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: ["Bachelor of Science — Biology major (one of 28 Science majors)", "Bachelor of Biotechnology (Honours) — more applied/industry-focused biology-adjacent degree"],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major", "Master of Finance"],
      entrepreneurship: ["Bachelor of Commerce — Innovation, Strategy and Entrepreneurship major, backed by UNSW Founders startup programs"],
    },
    hybrid: [
      {
        label: "Fashion + Computational Design",
        description:
          "Bachelor of Design (Paddington) is deliberately broad — students can work across Textiles & Fashion Design, Industrial Design, Computational Design, Integrated Design, and Robotic Fabrication, combining a specialisation with a minor or free electives. Best suited to someone who wants to be a multidisciplinary designer with a strong fashion interest, rather than fashion as the primary identity — pair with UNSW's substantial science/engineering faculties if she wants to keep options broadly technical.",
      },
    ],
    visit: {
      openDay: "Sat 5 Sep 2026, 9am–4pm",
      openDayUrl: "https://www.unsw.edu.au/openday",
      tours: "Fortnightly Saturday tours (1st and 3rd Saturday) at Kensington; Thursday evening tours at the Paddington Art & Design campus; 360° virtual tour also available.",
      toursUrl: "https://www.unsw.edu.au/study/discover/campus/campus-tours",
    },
  },
  {
    id: "uts",
    city: "sydney",
    name: "University of Technology Sydney (UTS)",
    type: "University",
    location: "Ultimo",
    lat: -33.883,
    lng: 151.1994,
    website: "https://www.uts.edu.au",
    compare: { fashion: 5, sciTech: 4.5, business: 4.5, note: "Excellent alternative to RMIT — very innovative, with the most direct fashion+business and fashion+innovation combined degrees of any Sydney school." },
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 — NZQA calculates an ATAR-equivalent (Interstate Transfer Index) submitted to UAC, contingent on meeting NZQA's own University Entrance requirements. NZ NCEA L3 is treated as a recognised qualification for UTS's standard domestic admission pathway.",
      english: "No NCEA-specific English credit threshold confirmed — UTS domestic admission via UAC generally relies on the NZQA-calculated ATAR (which already incorporates UE English/literacy) rather than a separately stated credit count.",
      portfolio: "Splits by program. Bachelor of Design in Fashion and Textiles: eligible under UTS's Design Portfolio Scheme — NZ citizens can apply via portfolio+interview if not completing NCEA in the current admissions year (a 6-page digital PDF portfolio plus a 150-200 word written submission is the general Design-course format). Bachelor of Fashion Business (in UTS Business, not Design): no portfolio found — appears to be standard ATAR/selection-rank academic entry only.",
      feeStatus: "Domestic — NZ citizens are explicitly eligible as domestic applicants, including via the Design Portfolio Scheme.",
      sourceNote: "uts.edu.au (course pages, Design Portfolio Scheme, admissions-stats-tool); uac.edu.au. Selection rank/ATAR for the specific fashion programs wasn't pinned to an exact figure — check UTS's live admissions-stats-tool.",
    },
    description:
      "Sydney's standout choice for fashion — ranked 28th globally for undergraduate fashion (Business of Fashion 2026), with purpose-built design facilities (3D printing, seamless knitting, digital design tech). Chemistry is not a UTS strength. Particularly notable for combining fashion directly with business and innovation degrees rather than treating them as separate faculties.",
    fields: {
      fashion: ["Bachelor of Design in Fashion and Textiles"],
      business: ["Bachelor of Business"],
      finance: ["Master of Finance"],
      entrepreneurship: ["Strategic Innovation and Entrepreneurship major — within Bachelor of Management or as an extension option within Bachelor of Business; plus a co-curricular Diploma in Innovation runnable alongside any degree"],
    },
    biologyNote:
      "No generalist Bachelor of Science with a plain Biology major — biology-related study is folded into named specialist degrees instead (Bachelor of Molecular Biotechnology, Bachelor of Science (Biotechnology/Medical Science), Bachelor of Environmental Biology), with a dedicated \"Biology\" major existing specifically inside the Bachelor of Forensic Science.",
    hybrid: [
      {
        label: "Fashion + Business",
        description:
          "Bachelor of Fashion Business is a joint School of Design + UTS Business School degree — genuine business training (finance, accounting, marketing, management) studied alongside fashion as an industry, with Fashion Business students working alongside design and business students specifically to encourage cross-disciplinary work. One of the most direct fashion+finance/business combinations available in Australia.",
      },
      {
        label: "Fashion + Innovation",
        description:
          "A four-year combined Fashion & Textiles + Bachelor of Creative Intelligence and Innovation degree, built around transdisciplinary problem-solving rather than a conventional design silo. UTS also runs live sustainable-materials research (e.g. a 2026 project on fully compostable plant-based 3D-knitted clothing) — a strong pick if she's drawn to fashion + technology + entrepreneurship + sustainability more than to conventional science/maths subjects.",
      },
    ],
    visit: {
      openDay: "Sat 29 Aug 2026 (also \"Experience UTS Day\" 15 Jul 2026)",
      openDayUrl: "https://www.uts.edu.au/events/open-day",
      tours: "Regular student-led tours departing UTS Tower Building 1 foyer, bookable via Humanitix (UTS Domestic Recruitment Team).",
      toursUrl: "https://events.humanitix.com",
      notes: "UTS Fashion and Textiles Honours Graduate Showcase (~mid-November annually) is part of the Faculty of Design and Society End of Year Student Showcase — a strong public fashion event distinct from Open Day.",
    },
  },
  {
    id: "macquarie",
    city: "sydney",
    name: "Macquarie University",
    type: "University",
    location: "North Ryde (Wallumattagal campus)",
    lat: -33.7739,
    lng: 151.1128,
    website: "https://www.mq.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 — current NZ students completing it apply via UAC and are assessed on that basis",
      english: "Unconfirmed. One search snippet suggested \"Level 3 University Entrance approved English\" credits, but this could not be verified on an official Macquarie or UAC page (key page returned a 403). May actually refer to the general NCEA University Entrance literacy standard (10 literacy credits at Level 2+) rather than a Macquarie-specific rule.",
      feeStatus: "Depends on visa/residency category — NZ citizens are domestic-classified for admission, but Macquarie has a dedicated \"Eligibility for New Zealand citizens\" fees page splitting NZ SCV holders who meet long-term residency (HELP-loan-eligible, can defer fees) from other NZ citizens who must pay fees fully upfront each period.",
      sourceNote: "mq.edu.au English requirements page returned 403 on fetch — recommend the parent access it directly or contact Macquarie admissions. Fee-status split: mq.edu.au/study/admissions-and-entry/fees-and-costs/eligibility-for-new-zealand-citizens.",
    },
    description:
      "No dedicated fashion program. Macquarie Business School is well regarded for finance, co-located with a major business/tech precinct of 300+ companies for strong industry connections.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: ["Bachelor of Science — Biology major (also combinable with Bachelor of Arts, Commerce, Advanced Science)", "Bachelor of Science — Human Biology major (medical/health focus)"],
      business: ["Bachelor of Commerce"],
      finance: ["Master of Applied Finance"],
      entrepreneurship: ["Bachelor of Business — Strategy, Innovation and Entrepreneurship major (also combinable with Bachelor of Commerce)"],
    },
    entrepreneurshipNote:
      "Macquarie's historically well-known standalone \"Bachelor of Entrepreneurship\" no longer appears as an active current offering (only legacy handbook references found) — entrepreneurship is now delivered as a major inside Bachelor of Business/Commerce; verify directly with Macquarie admissions if the standalone degree matters.",
    visit: {
      openDay: "Sat 15 Aug 2026, 10am–4pm",
      openDayUrl: "https://event.mq.edu.au/open-day/",
      tours: "\"Explore Your Options\" tours led by student advisers plus 1:1 consultations, bookable via Humanitix; virtual tours also available; school group tours via schools@mq.edu.au.",
      toursUrl: "https://events.humanitix.com/mqcampustours",
    },
  },
  {
    id: "westernsydney",
    city: "sydney",
    name: "Western Sydney University",
    type: "University",
    location: "Parramatta City (business programs) — Greater Western Sydney",
    lat: -33.8148,
    lng: 151.0011,
    website: "https://www.westernsydney.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 — NZ students apply via UAC International; admission is merit-based using an NZQA-calculated ATAR-equivalent",
      english: "Unconfirmed — the official Entry Qualifications PDF couldn't be parsed for NZ-specific detail. A general \"IELTS 6.5 (no band below 6.0)\" figure was found but appears to be the general international-student requirement rather than an NCEA-specific rule; unclear if NZ-schooled applicants are exempted.",
      feeStatus: "Depends on visa/residency category — domestic/CSP status is available to NZ citizens, but deferring fees via HECS-HELP/FEE-HELP requires the long-term residency test (8 of last 10 years + 18 of last 24 months in Australia); those who don't qualify pay the domestic contribution upfront rather than being pushed to international rates.",
      sourceNote: "westernsydney.edu.au official Entry Qualifications PDF (text extraction failed — recommend opening directly) and \"Changes to fees for New Zealand Citizens\" page. Verify directly with Western Sydney admissions.",
    },
    description:
      "Technically Greater Western Sydney rather than inner Sydney — worth flagging given commute distance. Strong applied/industry focus. No fashion or standalone chemistry major at the Sydney-proper campuses.",
    fields: {
      biology: ["Bachelor of Science — Biology major, combinable with ecology, zoology, environmental health or agriculture (availability varies by campus)"],
      business: ["Bachelor of Business — Applied Finance and Fintech major"],
      finance: ["Bachelor of Business — Applied Finance and Fintech major"],
      entrepreneurship: ["Bachelor of Entrepreneurship — companion/combined degree only, cannot be studied standalone (must pair with another WSU bachelor's degree)"],
    },
    visit: {
      openDay: "Sun 5 Jul 2026, 10am–4pm, Parramatta South campus (free transport included, or parking at Rosehill Racecourse)",
      openDayUrl: "https://www.westernsydney.edu.au/openday",
      tours: "Contact study@city.westernsydney.edu.au or +61 2 8236 8037 for the Sydney City/Parramatta City campus; \"Campus Experiences\" program available for Year 5–12 groups.",
      toursUrl: "https://city.westernsydney.edu.au/western/contact",
    },
  },
  {
    id: "acu-sydney",
    city: "sydney",
    name: "Australian Catholic University (North Sydney)",
    type: "University",
    location: "North Sydney (MacKillop campus)",
    lat: -33.8388,
    lng: 151.2073,
    website: "https://www.acu.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NZ NCEA Level 3 is explicitly listed by UAC as a recognised qualification, used to calculate a selection rank alongside other applicant types (course-specific minimum ranks apply)",
      english: "No NCEA-specific English subject/credit threshold found. General policy requires proficiency evidence only if English wasn't the applicant's first language or they didn't complete Year 12+ in English in an approved English-speaking country — likely exempts NZ-schooled applicants, but not explicitly stated for NZ.",
      feeStatus: "Domestic — ACU states domestic status is citizenship-based (NZ citizenship qualifies), with no residency-history requirement to be classed domestic.",
      sourceNote: "uac.edu.au ACU international-students page; acu.edu.au undergraduate entry requirements — neither names New Zealand/NCEA explicitly for English proficiency. Fee status: acu.edu.au/study-at-acu/fees-and-scholarships.",
    },
    description:
      "Smaller Catholic university with boutique class sizes. Business is the clearly relevant offering here; chemistry only appears incidentally via Biomedical/Nutrition Science units rather than as a standalone major — a weak/secondary match only. No fashion program.",
    fields: {
      business: ["Bachelor of Business"],
    },
    entrepreneurshipNote:
      "Not a major — a named 40-credit-point Entrepreneurship minor (new ventures, innovation, disruption, incl. family businesses and social enterprises) addable to a Commerce/Business degree.",
    biologyNote:
      "No generalist Bachelor of Science with a plain Biology major — life-sciences offering centres on Bachelor of Biomedical Science (human-biology/disease focus) plus separate Geography-Environment-Society and Sustainability majors.",
    visit: {
      openDay: "2026 date not confirmed — historically held Aug/Sep",
      openDayUrl: "https://openday.acu.edu.au/",
      tours: "Guided North Sydney campus tours — register interest via the campus tours page.",
      toursUrl: "https://www.acu.edu.au/student-life/experience-uni-before-you-start/explore-your-local-campus/campus-tours",
    },
  },
  {
    id: "notredame-sydney",
    city: "sydney",
    name: "University of Notre Dame Australia (Sydney)",
    type: "University",
    location: "Broadway/Chippendale",
    lat: -33.883,
    lng: 151.1998,
    website: "https://www.notredame.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3, treated as broadly equivalent to Australian Year 12 under the Australia–NZ mutual recognition arrangement (via ACTAC). If standard requirements aren't met, Notre Dame's Tertiary Pathway Program (offered at the Sydney campus) is an alternative entry route.",
      english: "No separate NCEA English threshold — Notre Dame's policy explicitly states applicants whose primary/secondary education was taught and assessed solely in English in a recognised country (New Zealand named explicitly) meet the English proficiency requirement automatically, no separate test or NCEA English subject/credit rule required. Note: some disciplines (Education, Nursing) have additional accrediting-body English requirements regardless.",
      feeStatus: "Domestic — CSP eligibility explicitly includes \"a New Zealand citizen, who will live and study in Australia for the whole course.\"",
      sourceNote: "notredame.edu.au English language proficiency requirements page (403 on direct fetch, relayed via search snippet — recommend verifying directly or calling 1800 878 916). Fee status: notredame.edu.au/study/fees-costs-and-scholarships.",
    },
    description:
      "Small, boutique Catholic university with strong ethics focus and small class sizes. Genuinely offers chemistry as part of its Bachelor of Science (not research-intensive like the Go8s). No fashion program.",
    fields: {
      chemistry: ["Bachelor of Science — core chemistry units across Science Streams (Biology & Environment, Human & Medical Science, Multidisciplinary Science)"],
      biology: ["Bachelor of Science (Major: Biology) — covers Animal Diversity, Microbiology, Aquatic Science (confirm directly whether timetabled at the Sydney/Broadway campus each intake, as some Notre Dame science majors are Fremantle-only)"],
      business: ["Bachelor of Business — School of Law & Business, Broadway"],
    },
    entrepreneurshipNote:
      "Not a dedicated major — folded into Bachelor of Business Administration (compulsory innovation and entrepreneurship area of study) or as elective content within Bachelor of Commerce (Management major); Commerce majors limited to Accounting, Advertising, Economics, Finance, HR Management, Management, Marketing, Public Relations.",
    visit: {
      openDay: "Sat 29 Aug 2026, 9am–3pm",
      openDayUrl: "https://www.notredame.edu.au/engage/visit-us/openday",
      tours: "No self-serve booking widget found — contact via the general Visit Us page.",
      toursUrl: "https://www.notredame.edu.au/engage/visit-us",
    },
  },
  {
    id: "tafensw-fds",
    city: "sydney",
    name: "TAFE NSW — Fashion Design Studio (Ultimo)",
    type: "TAFE",
    location: "Ultimo",
    lat: -33.8811,
    lng: 151.1989,
    website: "https://www.tafensw.edu.au",
    compare: { fashion: 5, sciTech: 1, business: 2.5, note: "Fantastic pure-fashion option with a distinguished industry pedigree (Australian Fashion Week showcase since 1999) — but weak for a science/tech hedge." },
    entryRequirements: {
      ncealLevel: "L3",
      academic: "\"NSW HSC or equivalent\" — NCEA Level 3 would be assessed as the equivalent pathway (not explicitly named). Diploma of Fashion only needs HSC/equivalent or Certificate IV, a lower bar than the Bachelor.",
      english: "Not explicitly stated for domestic NZ-schooled applicants — the international entry page has IELTS-style thresholds, but domestic applicants aren't addressed; likely satisfied automatically via NZ schooling but unconfirmed in writing.",
      portfolio: "Yes, for the Bachelor of Fashion Design — 12 examples of original fashion design work (max A3), a 550-word essay comparing two designers, plus a pre-admission interview. The Diploma of Fashion does not require a portfolio.",
      feeStatus: "Domestic — TAFE NSW's domestic-eligibility criteria explicitly list \"Australian or New Zealand citizen\" alongside PR/humanitarian visa holders, provided the applicant lives/works in NSW at enrolment. HELP-style loan deferral separately requires the long-term-residency test.",
      sourceNote: "tafensw.edu.au HE20506V02 course page; TAFE NSW domestic-eligibility criteria (general, not fashion-specific). No TAFE NSW page directly names NCEA — recommend confirming with TAFE NSW Student Services (131 601).",
    },
    description:
      "A specialist fashion school since 1955 — the only Australian fashion school with a standing showcase at Australian Fashion Week (since 1999). Pure design/garment-construction training with a distinguished industry pedigree, but little surrounding science/maths ecosystem.",
    fields: {
      fashion: [
        "Bachelor of Fashion Design (3-year — garment design, pattern-making, sewing)",
        "Diploma of Fashion",
        "Certificate IV in Design (Fashion Design)",
      ],
    },
    hybrid: [
      {
        label: "Pure fashion benchmark",
        description:
          "Worth using as the \"if she commits fully to fashion, what does a very industry-focused education look like\" comparison case against RMIT/UTS/Swinburne's hybrid programs — strongest industry pedigree and runway pathway of any Sydney fashion school, but not built around a science/tech/business crossover.",
      },
    ],
    visit: {
      openDay: "2026 date not confirmed for Ultimo — orientation sessions confirmed 15–16 Jul 2026 (Building B, Turner Hall)",
      openDayUrl: "https://www.tafensw.edu.au/events",
      tours: "Not clearly self-serve — check the events page for scheduled info sessions/open days closer to the date.",
      toursUrl: "https://www.tafensw.edu.au/events",
      notes: "\"The Innovators\" — FDS's graduate runway show at Australian Fashion Week (2026 show held 13 May) is a genuinely significant public event for a fashion-focused family, supported by \"The Next Garde\" industry incubator.",
    },
  },
  {
    id: "whitehouse-sydney",
    city: "sydney",
    name: "Whitehouse Institute of Design (Sydney)",
    type: "Private College",
    location: "Surry Hills",
    lat: -33.8853,
    lng: 151.2094,
    website: "https://www.whitehouse-design.edu.au",
    compare: { fashion: 4.5, sciTech: 1, business: 3, note: "Whitehouse's headquarters campus — excellent if she becomes fully committed to fashion design specifically; not the pick while she's still intellectually interested in chemistry/science." },
    entryRequirements: {
      ncealLevel: "L3",
      academic: "No NCEA-specific level or credit count published. General guidance: an ATAR of ~67.95 is \"desirable if applying with secondary education only, but not the only criterion\" — also assessed on portfolio, motivational statement and academic results generally.",
      english: "Not explicitly addressed for NZ/domestic applicants — likely satisfied automatically via NZ schooling but unconfirmed in writing.",
      portfolio: "Yes — a creative portfolio of 6-8 pieces (any medium: illustration, digital design, photography, film, textile design, fine art), plus a motivational statement and interview.",
      feeStatus: "Domestic — confirmed. Whitehouse's site-wide Domestic Application Requirements page (covering Sydney, Melbourne and Brisbane on one page) states verbatim: \"A domestic student is an Australian or New Zealand citizen, an Australian permanent resident or a holder of an Australian permanent humanitarian visa.\" HELP-loan access separately requires the Special Category Visa long-term-residency test.",
      sourceNote: "whitehouse-design.edu.au/apply-now/domestic-application-requirements (site-wide policy, same as the Melbourne campus); whitehouse-design.edu.au/courses/bachelor-of-design/fashion-design for portfolio detail.",
    },
    description:
      "Whitehouse's headquarters/original campus, in Sydney's fashion and design precinct in Surry Hills. Well regarded specifically for fashion design and creative direction/styling — a strong specialist option distinct from UTS's more business-hybrid offering. Excellent if she becomes fully committed to fashion design; doesn't offer a science/chemistry ecosystem.",
    fields: {
      fashion: [
        "Bachelor of Design — Fashion Design major",
        "Master of Design",
        "Advanced Diploma in Fashion Design",
        "Certificate/Diploma in Creative Direction & Styling",
      ],
    },
    visit: {
      openDay: "\"Open House 2026\" — August 2026 (exact date not pinned down; check the Whitehouse blog closer to the date)",
      openDayUrl: "https://www.whitehouse-design.edu.au/blog",
      tours: "Tours available by appointment — email enquiry@whitehouse-design.edu.au or call 1300 551 433.",
      toursUrl: "https://whitehouse-design.edu.au/schedule-a-tour/",
      notes: "Graduate Showcase — fashion design graduates present final collections on the runway, described by Whitehouse as \"the ultimate launchpad into a design career.\"",
    },
  },
  {
    id: "billyblue",
    city: "sydney",
    name: "Billy Blue College of Design (Ultimo)",
    type: "Private College",
    location: "Ultimo",
    lat: -33.8806,
    lng: 151.1978,
    website: "https://www.billyblue.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "\"Completion of an Australian Year 12 or equivalent, including the IB\" per general Torrens/UAC admission criteria — NCEA isn't named; overseas secondary qualifications from the last 2 years go to Torrens' International Admissions team for an equivalency review against NOOSR/NARIC guidelines (this applies even though NZ applicants are domestic for fee purposes — an academic-review/fee-status split).",
      english: "Not NCEA/NZ-specific. Torrens' general rule requires proficiency evidence only for overseas qualifications from non-English-instruction countries — NZ schooling wouldn't trigger this, so effectively satisfied automatically, though not stated as an explicit NZ carve-out.",
      portfolio: "Conditional, not blanket-required. If the ATAR-equivalent entry requirement is met, no portfolio is needed; if not met, evidence of industry/work experience or prior study can substitute, otherwise a 6-10 piece portfolio of original creative work is required.",
      feeStatus: "Domestic, consistent with Torrens Melbourne — Billy Blue shares the same Torrens admissions/fees infrastructure. NZ citizens/SCV holders are Commonwealth Supported Place-eligible but must pay their student contribution upfront by census date unless they separately qualify under the long-term-residency test.",
      sourceNote: "uac.edu.au Torrens admission-criteria page (covers Billy Blue); billyblue.edu.au portfolio-and-interviews page (redirects to the shared Torrens framework). No page names \"New Zealand\" specifically for Billy Blue — inferred via the shared Torrens policy already confirmed for Melbourne; recommend a quick confirmation call if certainty matters.",
    },
    description:
      "Part of Torrens University Australia. Practical, industry-oriented programs with a reported 94% graduate employment within 12 months. Ultimo is specifically the Design/Technology campus (business/hospitality Torrens courses are taught at a separate Surry Hills campus).",
    fields: {
      fashion: [
        "Bachelor of Branded Fashion Design (3-year — design, production, brand management, garment construction)",
        "Bachelor of Fashion Marketing and Enterprise (also offered accelerated)",
      ],
    },
    visit: {
      openDay: "Early Feb 2026 pattern (10:30am–1pm) confirmed historically — verify exact 2026 date directly",
      openDayUrl: "https://www.billyblue.edu.au",
      tours: "No dedicated self-serve tour page found — managed via the Torrens University enrolment/domestic team; open days are the primary in-person visit mechanism.",
      toursUrl: "https://www.torrens.edu.au",
    },
  },
  {
    id: "kent",
    city: "sydney",
    name: "Kent Institute Australia (Sydney)",
    type: "Private College",
    location: "Sydney CBD",
    lat: -33.8654,
    lng: 151.2058,
    website: "https://kent.edu.au",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "\"A formal qualification considered equivalent to an Australian Year 12\" — no NCEA-specific level or credit count published; minimum age 18 at commencement.",
      english: "No NCEA-specific rule. General standard is IELTS (Academic) 6.0 overall, no band below 5.5, \"or equivalent.\" Kent's domestic application form asks whether the applicant completed secondary/tertiary study with English as the language of instruction — a \"yes\" appears to be an accepted route NZ-schooled applicants would meet, though not stated as an explicit NCEA carve-out.",
      portfolio: "No — Kent is a business/IT/community-services college with no design/creative programs, so no portfolio requirement applies.",
      feeStatus: "Domestic — corrected from earlier ambiguity. Kent's public Fees page wording (\"Domestic (Australian)\" / \"International\") looks NZ-blind, but the actual official Application for Admission Form (Domestic Students only) explicitly lists \"New Zealand Citizen\" as one of four domestic citizenship categories, alongside Australian Citizen, Australian PR, and Permanent Humanitarian Visa Holder — so NZ applicants do use the domestic pathway. HELP-loan deferral still depends on the separate long-term-residency test.",
      sourceNote: "kent.edu.au official domestic Application for Admission Form (PDF, Version 17, 13 Feb 2026) — directly confirms the NZ Citizen checkbox; kent.edu.au/admission-criteria/. Recommend Kent admissions confirm the domestic fee schedule applies at the same rate to NZ citizens, since the fees page wording alone wouldn't have surfaced this.",
    },
    description:
      "A modest-profile private business college (est. 1989) — the weakest match on this list. Genuinely offers business but no distinct finance major, no chemistry, and no fashion. Included for completeness but not distinguished compared to the university options.",
    fields: {
      business: ["Bachelor of Business (8 specialisation options incl. Accounting, Marketing, Management; double-specialisation available)"],
    },
    visit: {
      openDay: "Not found — check kent.edu.au directly",
      openDayUrl: "https://kent.edu.au",
      tours: "Not found — likely via direct enquiry at the Sydney CBD campus.",
      toursUrl: "https://kent.edu.au",
    },
  },
];
