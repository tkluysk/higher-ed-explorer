// Inputs for the fees calculator (fees.html).
//
// Student contribution bands: the maximum a university can charge per
// equivalent full-time study load (EFTSL = one full-time year, 8 standard
// subjects) for a Commonwealth supported place, 2026, non-grandfathered.
// Source: Dept of Education, "Commonwealth supported places by discipline —
// 2026 indexed rates" (PDF). Universities charge the maximum in practice, and
// UniMelb's Prospective Students team quoted the same figures (2 Oct 2026).
const FEE_SOURCE_YEAR = 2026;

const CSP_BANDS = [
  { id: "low", label: "Low band", amount: 4738, covers: "Maths & statistics, English, education, nursing, languages, agriculture" },
  { id: "standard", label: "Standard band", amount: 9537, covers: "Science, health, engineering, computing, built environment, visual & performing arts (incl. fashion design)" },
  { id: "medicine", label: "Medicine band", amount: 13558, covers: "Medicine, dentistry, veterinary science" },
  { id: "high", label: "High band", amount: 17399, covers: "Commerce, economics, accounting, law, communications, humanities & social sciences" },
];

// Maximum Student Services and Amenities Fee, charged per study period on top
// of tuition (2026; same source).
const SSAF_MAX = 373;

// Course presets: the share of a full-time year that falls in each band.
// These are estimates from each course structure (core + major + electives);
// the real bill depends on the actual subjects chosen, especially electives
// and UniMelb breadth subjects. Every share is editable on the page.
const COURSE_PRESETS = [
  { id: "unimelb-biomed", label: "UniMelb — Bachelor of Biomedicine", years: 3,
    mix: { standard: 1 },
    note: "Science and health subjects throughout; UniMelb staff put it in the standard band, about $9,537 a year (2026)." },
  { id: "unimelb-bsc", label: "UniMelb — Bachelor of Science (e.g. Biotechnology)", years: 3,
    mix: { standard: 0.75, low: 0.125, high: 0.125 },
    note: "Mostly science; assumes one maths/statistics subject a year and one breadth subject a year from the humanities/commerce band. Breadth in science or maths would cost less." },
  { id: "unimelb-commerce", label: "UniMelb — Bachelor of Commerce", years: 3,
    mix: { high: 0.875, low: 0.125 },
    note: "Commerce subjects are in the high band; assumes one statistics/maths subject a year." },
  { id: "rmit-fashion-design", label: "RMIT — Bachelor of Fashion (Design)", years: 3,
    mix: { standard: 1 },
    note: "Fashion design is visual & performing arts: standard band." },
  { id: "rmit-fashion-enterprise", label: "RMIT — Bachelor of Fashion (Enterprise)", years: 3,
    mix: { standard: 0.5, high: 0.5 },
    note: "Assumes about half fashion/design and half business/marketing subjects." },
  { id: "swinburne-fashion", label: "Swinburne — Bachelor of Design (Fashion)", years: 3,
    mix: { standard: 1 },
    note: "Design core plus 8 electives; assumes the electives are also design or science. Business electives would move part of it to the high band." },
  { id: "swinburne-biomed", label: "Swinburne — Bachelor of Biomedical Science", years: 3,
    mix: { standard: 1 },
    note: "Science and health subjects: standard band." },
  { id: "custom", label: "Custom mix", years: 3, mix: { standard: 1 }, note: "Set the share of each band yourself." },
];

// Weekly living-cost defaults (AUD), from Study Australia's cost-of-living
// ranges for a student in Melbourne, rounded. All editable on the page.
const LIVING_DEFAULTS = {
  food: 150,       // groceries + some eating out
  transport: 35,   // NZ citizens can't get the PTV student concession, but can get the International Student Travel Pass (50% off)
  phone: 20,       // phone + mobile data
  other: 70,       // entertainment, clothes, personal
  study: 15,       // books and course materials (fashion materials may be more)
};

const FEE_LINKS = [
  { label: "Dept of Education: 2026 indexed rates (PDF)", url: "https://www.education.gov.au/download/19201/2026-indexed-rates/41481/document/pdf" },
  { label: "Study Assist: student contribution amounts", url: "https://www.studyassist.gov.au/financial-and-study-support/commonwealth-supported-places/student-contribution-amounts" },
  { label: "Study Assist: HELP loans for non-Australian citizens", url: "https://www.studyassist.gov.au/loan-eligibility/non-australian-citizens" },
  { label: "Study Australia: cost of living calculator", url: "https://costofliving.studyaustralia.gov.au/" },
  { label: "PTV: tertiary student concessions (NZ citizens not eligible)", url: "https://www.ptv.vic.gov.au/tickets/myki/concessions-and-free-travel/children-and-students/tertiary-students" },
  { label: "UniMelb: International Student Travel Pass (open to NZ citizens)", url: "https://students.unimelb.edu.au/student-life/campuses-and-facilities/transport-and-parking/public-transport/international-student-travel-pass" },
];
