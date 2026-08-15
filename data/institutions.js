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
  },
  {
    id: "lci",
    name: "LCI Melbourne",
    type: "Private College",
    location: "Melbourne CBD (exact address unconfirmed — verify directly)",
    lat: -37.8136,
    lng: 144.9631,
    website: "https://melbourne.lcieducation.com",
    description:
      "Part of the international LCI Education network (French-origin design school group). Purpose-built fashion labs, runway/gallery space, and industry internships — smaller and less well-known than RMIT/Whitehouse but a legitimate specialist option. Campus coordinates are approximate; confirm the exact address directly with the institute.",
    fields: {
      fashion: [
        "Bachelor of Design Arts — Fashion & Costume Design major",
        "Diploma of Fashion Design",
      ],
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
  },
];
