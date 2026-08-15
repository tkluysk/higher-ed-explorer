// Melbourne higher education institutions dataset.
// Compiled from institution websites, August 2026 — verify program names,
// fees, and entry requirements directly with each institution before
// applying, as these shift between academic years.
// Each institution lists only the fields (fashion/chemistry/business/finance)
// it is actually strong in; `fields[x]` is an array of specific program names.
const INSTITUTIONS = [
  {
    id: "unimelb",
    name: "University of Melbourne",
    type: "University",
    location: "Parkville",
    lat: -37.7964,
    lng: 144.9612,
    website: "https://www.unimelb.edu.au",
    description:
      "Australia's #1 ranked university (QS/THE) and a Group of Eight member. No undergraduate fashion program, but the Faculty of Science and Faculty of Business & Economics are among the most selective and research-strong in the country.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major (CFA Institute Program Partner)"],
    },
    visit: {
      openDay: "Sun 16 Aug 2026, 10am–4pm (annual, typically mid-August)",
      openDayUrl: "https://study.unimelb.edu.au/openday",
      tours: "Free 1-hour guided walking tours of Parkville led by student ambassadors (school groups Yr 10–12, book 6+ weeks ahead); self-guided virtual tour available anytime.",
      toursUrl: "https://www.unimelb.edu.au/campustour",
    },
  },
  {
    id: "monash",
    name: "Monash University",
    type: "University",
    location: "Clayton & Caulfield",
    lat: -37.9105,
    lng: 145.1362,
    website: "https://www.monash.edu",
    description:
      "Group of Eight member and Australia's largest university. Strong science and business reputation. Fashion appears only as a design strand within the Bachelor of Design at Caulfield — not a dedicated fashion school like RMIT or Whitehouse.",
    fields: {
      fashion: ["Bachelor of Design (Monash Art, Design & Architecture) — fashion strand, Caulfield"],
      chemistry: ["Bachelor of Science — Chemistry major, Clayton"],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major"],
    },
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
    name: "RMIT University",
    type: "University",
    location: "Brunswick (fashion) & Melbourne CBD (business)",
    lat: -37.7679,
    lng: 144.9614,
    website: "https://www.rmit.edu.au",
    description:
      "Home to Australia's #1 and world top-20 ranked fashion school (Business of Fashion rankings), based at the Brunswick campus. Also holds a strong applied-science/chemistry reputation with RACI accreditation, and a large CBD business school.",
    fields: {
      fashion: [
        "Bachelor of Fashion (Design) — Brunswick",
        "Bachelor of Fashion (Enterprise) — retail/marketing/product management, Brunswick",
      ],
      chemistry: [
        "Bachelor of Science — Chemistry major (RACI-accredited)",
        "Bachelor of Science (Applied Chemistry) / Bachelor of Engineering (Chemical Engineering) Honours",
      ],
      business: ["Bachelor of Business (various majors)"],
    },
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
    name: "Deakin University",
    type: "University",
    location: "Burwood",
    lat: -37.8474,
    lng: 145.1148,
    website: "https://www.deakin.edu.au",
    description:
      "Large multi-campus university based at Burwood for Melbourne undergraduates. RACI-accredited chemistry and a CFA-recognised finance major. Only offers fashion at postgraduate level (Master of Fashion Design/Merchandising), so not an undergraduate fashion option.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major (RACI-accredited)"],
      finance: ["Bachelor of Commerce — Finance major (CFA Institute recognised)"],
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
    name: "Swinburne University of Technology",
    type: "University",
    location: "Hawthorn",
    lat: -37.8218,
    lng: 145.0387,
    website: "https://www.swinburne.edu.au",
    description:
      "Known for strong industry-integrated learning — all degrees include Work Integrated Learning placements. No dedicated fashion program.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      business: ["Bachelor of Business (Accounting, Business Administration, and other majors)"],
      finance: ["Bachelor of Business — Finance major (CFA-affiliated)"],
    },
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
    name: "La Trobe University",
    type: "University",
    location: "Bundoora",
    lat: -37.7196,
    lng: 145.0483,
    website: "https://www.latrobe.edu.au",
    description:
      "Main Melbourne undergraduate campus at Bundoora, with a CBD campus (Collins Street) for postgraduate business, health and law only. Around 70 major/minor combinations available in Commerce. No fashion program.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major"],
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
    name: "Victoria University",
    type: "University",
    location: "Footscray Park",
    lat: -37.7937,
    lng: 144.8985,
    website: "https://www.vu.edu.au",
    description:
      "Practically-oriented, accessible university. Note: its Bachelor of Science does not offer a Chemistry major (only Biotechnology and Ecology/Environmental Management) — chemistry appears only as first-year core units. No fashion program.",
    fields: {
      business: ["Bachelor of Business"],
      finance: ["Bachelor of Business — Banking and Finance major"],
    },
    visit: {
      openDay: "Sun 16 Aug 2026 (Footscray Park, typically mid-August)",
      openDayUrl: "https://study.vu.edu.au/openday",
      tours: "Monthly student-mentor \"walk and talk\" tours at Footscray Park; also an augmented-reality self-guided tour via mobile phone.",
      toursUrl: "https://www.vu.edu.au/study-at-vu/information-for/events-for-future-students",
    },
  },
  {
    id: "acu",
    name: "Australian Catholic University (Melbourne)",
    type: "University",
    location: "Fitzroy (St Patrick's campus)",
    lat: -37.8079,
    lng: 144.9762,
    website: "https://www.acu.edu.au",
    description:
      "Smaller, faith-based institution known for a supportive learning environment. Business/Commerce is its only clear match among the four fields — no confirmed chemistry major, finance specialisation, or fashion program at the Melbourne campus.",
    fields: {
      business: ["Bachelor of Commerce"],
    },
    visit: {
      openDay: "Sun 9 Aug 2026, 10am–3pm (Melbourne/Fitzroy, typically early-mid August)",
      openDayUrl: "https://openday.acu.edu.au/",
      tours: "Personalised ~60-minute campus tours bookable via the Melbourne campus page; group tours for school groups can also be arranged.",
      toursUrl: "https://www.acu.edu.au/student-life/experience-uni-before-you-start/explore-your-local-campus/campus-tours",
    },
  },
  {
    id: "boxhill",
    name: "Box Hill Institute",
    type: "TAFE",
    location: "Box Hill (Elgar campus)",
    lat: -37.8195,
    lng: 145.1214,
    website: "https://www.boxhill.edu.au",
    description:
      "Offers genuine Bachelor-level fashion degrees (not just vocational diplomas) — a real alternative to RMIT and Whitehouse at a different fee point, covering business, design thinking, and ethical/sustainable fashion practice.",
    fields: {
      fashion: [
        "Bachelor of Design (Fashion Design)",
        "Bachelor of Design (Fashion Enterprise)",
      ],
    },
    visit: {
      openDay: "\"Open Nights\" (not a single Open Day) — 2026: 20 Jan (Box Hill), 22 Jan (Lilydale), 18 Aug (Box Hill), 20 Aug (Lilydale), 26 Aug (City)",
      openDayUrl: "https://info.boxhill.edu.au/open-nights/",
      tours: "Open Nights (4–6:30pm) include tours, hands-on activities, and course advisor Q&A. Outside these, book an appointment at the Welcome Hub (Elgar campus, Mon–Fri 8:30am–4:45pm).",
      toursUrl: "https://info.boxhill.edu.au/open-nights/",
    },
  },
  {
    id: "kangan",
    name: "Kangan Institute",
    type: "TAFE",
    location: "Cremorne (Textile and Fashion Hub)",
    lat: -37.8279,
    lng: 144.9922,
    website: "https://www.kangan.edu.au",
    description:
      "Located in Melbourne's fashion/textile precinct with runway facilities, a retail training centre, and a textile manufacturing hub. Diploma-level only (no Bachelor degree) — a lower-cost vocational entry pathway rather than a degree.",
    fields: {
      fashion: [
        "Diploma of Applied Fashion Design and Merchandising — Design & Product Development or Fashion Business specialisation",
        "Diploma of Apparel, Fashion and Textiles",
      ],
    },
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
    name: "Whitehouse Institute of Design (Melbourne)",
    type: "Private College",
    location: "Melbourne CBD",
    lat: -37.8136,
    lng: 144.9569,
    website: "https://www.whitehouse-design.edu.au",
    description:
      "Specialist private design college in the historic Royal Mail Exchange Building. Accelerated 2-year, trimester-based, industry-styled and portfolio-driven pedagogy — a strong option for a design-first fashion pathway rather than a broad university degree.",
    fields: {
      fashion: ["Bachelor of Design — Fashion Design specialisation"],
    },
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
    name: "Melbourne Polytechnic",
    type: "TAFE",
    location: "Prahran",
    lat: -37.8497,
    lng: 144.9916,
    website: "https://www.melbournepolytechnic.edu.au",
    description:
      "Vocational-level fashion and textile courses (e.g. costume) at the Prahran campus — a lower-cost, lower-commitment entry point than RMIT, Whitehouse, or Box Hill, but no Bachelor-level fashion degree.",
    fields: {
      fashion: ["Diploma/Certificate-level fashion & textile design courses (incl. costume)"],
    },
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
    name: "Torrens University Australia (Melbourne)",
    type: "Private College",
    location: "Melbourne CBD",
    lat: -37.818,
    lng: 144.9671,
    website: "https://www.torrens.edu.au",
    description:
      "Private university opposite Flinders Street Station, positioned as a flexible, career-focused alternative to public universities. On-campus, online or blended study modes, including a 2-year accelerated option.",
    fields: {
      business: ["Bachelor of Business"],
    },
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
    name: "Holmesglen Institute",
    type: "TAFE",
    location: "Chadstone",
    lat: -37.8853,
    lng: 145.0784,
    website: "https://www.holmesglen.edu.au",
    description:
      "TAFE offering a genuine Bachelor-level fashion degree, with purpose-built patternmaking studios and manufacturing rooms reflecting industry environments — comparable to Box Hill, and design-focused rather than enterprise/business-focused.",
    fields: {
      fashion: ["Bachelor of Fashion Design"],
    },
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
    name: "LCI Melbourne",
    type: "Private College",
    location: "Collingwood",
    lat: -37.8033,
    lng: 144.9857,
    website: "https://melbourne.lcieducation.com",
    description:
      "Part of the international LCI Education network (French-origin design school group). Purpose-built fashion labs, runway/gallery space, and industry internships — smaller and less well-known than RMIT/Whitehouse but a legitimate specialist option.",
    fields: {
      fashion: [
        "Bachelor of Design Arts — Fashion & Costume Design major",
        "Diploma of Fashion Design",
      ],
    },
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
    name: "Melbourne School of Fashion (Fashionmasters / Holmes Institute)",
    type: "Private College",
    location: "Melbourne CBD (185 Spring Street)",
    lat: -37.8103,
    lng: 144.9721,
    website: "https://www.holmes.edu.au",
    description:
      "Established 1991, a smaller specialist provider next to the Princess Theatre. Its Bachelor of Fashion and Business unusually blends fashion and business coursework directly — worth a look for a student wanting both in one degree. Less internationally recognised than RMIT/Whitehouse; confirm current accreditation status directly.",
    fields: {
      fashion: [
        "Bachelor of Fashion and Business (delivered with Holmes Institute)",
        "Certificate–Diploma pathway courses in design, production, marketing, retail",
      ],
    },
    visit: {
      openDay: "Not found — no dedicated events/open day page located for this fashion arm",
      openDayUrl: "not found",
      tours: "No online tour booking found; direct phone/email contact via Holmes Institute appears to be the only path to arranging a visit.",
      toursUrl: "not found",
      notes: "The weakest-documented institution here — recommend contacting Holmes Institute directly before the trip to confirm any visit is even possible.",
    },
  },
];
