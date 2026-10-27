// Higher education institutions dataset (Melbourne, Sydney, and the NZ universities on the medicine routes).
// Compiled from institution websites, August 2026 — verify program names,
// fees, and entry requirements directly with each institution before
// applying, as these shift between academic years.
// Each institution lists only the fields (fashion/chemistry/business/finance)
// it is actually strong in; `fields[x]` is an array of specific program names.
// `city` is a lowercase slug used by the city filter in the UI.
//
// CITY_APPLICATION_PROCESS holds admissions-portal info shared by every
// institution in a city (e.g. VTAC covers all Victorian universities), so it
// isn't repeated per institution. An institution can still set its own
// `entryRequirements.applicationProcess` to override this default.
const CITY_APPLICATION_PROCESS = {
  nz:
    "No central admissions centre: apply to each university directly, through its own online application. Halls of residence take separate applications, and they open early (around August of Year 13). For a 2028 start, check each university's 2027 closing dates; Auckland's limited-entry programmes closed 8 Dec 2026 for 2027 entry. NZ citizens study as domestic students, with StudyLink loans available.",
  melbourne:
    "Applications go through VTAC (Victorian Tertiary Admissions Centre), the shared domestic admissions portal for Victorian universities and colleges. Applying to more than one Victorian provider means applying through VTAC: Swinburne and RMIT push direct applicants with a VTAC account back to VTAC. One fee covers up to 8 course preferences (courses, not universities). For a 2028 start she applies during NZ Year 13: applications open early August 2027 and the on-time window closes late September. Late applications cost more but are otherwise treated the same, except some equity schemes (e.g. Access Melbourne) and arts and music courses. NCEA results reach VTAC in January, so she'll be in the January offer rounds, and preferences can be changed after results. NZ citizens are domestic and get a Commonwealth supported place, but without HECS-HELP the student contribution is paid upfront each semester. Confirmed by both the Swinburne (28 Sep 2026) and UniMelb (2 Oct 2026) interviews; dates from vtac.edu.au.",
};

// Campus-visit questions that apply to any institution, shown beneath each
// institution's own `visitQuestions` in the detail view.
const GENERAL_VISIT_QUESTIONS = [
  { q: "If you only had time to see one lab or studio today, which should it be?" },
  { q: "Can we sit in on a class, or talk to a current student in this area?" },
  { q: "What do students wish they'd known before starting?" },
];


// Shared NZ-citizen caveat for MD (medical degree) pathways: NZ citizens on
// an ordinary Special Category Visa (subclass 444) are domestic-equivalent
// for standard CSP medicine places, but NOT eligible for Bonded Medical
// Places (a subset of most CSP medicine cohorts) unless they hold Australian
// permanent residency. Confirmed via health.gov.au/our-work/bonded-medical-program.
// Once an MD is completed, the postgraduate specialist-college pathway (e.g.
// RANZCOG for O&G, RACS for surgery/ENT) is identical regardless of which
// university awarded the MD — confirmed via surgeons.org's generic
// eligibility criteria (citizenship/PR + AHPRA registration + exam, no
// mention of originating medical school).
const MD_NZ_CAVEAT =
  "NZ citizens on a standard Special Category Visa (444) are domestic-equivalent for regular CSP medicine places, but are NOT eligible for Bonded Medical Places (a subset of most CSP medicine cohorts) unless they hold Australian permanent residency. Once the MD is completed, the pathway into a specialty college (e.g. RANZCOG for O&G, RACS for surgery/ENT) is the same nationally-standardised process regardless of which university awarded the MD.";

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
      subjectPrerequisites: "Bachelor of Biomedicine: English, Mathematics (NCEA Mathematics with Calculus) and Chemistry, all three mandatory. Bachelor of Science: the same, except the science subject can be any one of Biology, Chemistry or Physics. Without Calculus, the maths prerequisite can be met through a pre-approved online course instead: UniLearn Senior Mathematics (self-paced, ~18–26 weeks, with exams), the Calculus and Probability online subject (~9 weeks, or a 6-week summer intensive Jan–Feb), or the University of Queensland's Pure Mathematics online bridging program. Passing one of these satisfies the prerequisite on its own. Whether other universities accept them is not confirmed, so check each (Prospective Students team, 2 Oct 2026).",
      feeStatus: "Domestic. Bachelor's degrees are Commonwealth supported (CSP) for NZ citizens. Science and health subjects mostly sit in band 2: $1,192 per standard subject, about $9,537 a year full-time (2026 student contribution table; the 2027 table is due around Oct–Nov). Staff said students not on a Special Category Visa pay this upfront each semester; HELP loan access depends on visa and long-term residency. Without a CSP it would be about $5k per subject. Must reside in Australia for the duration of study.",
      ncealScoring:
        "Changing from 2027 entry, so it applies to a 2028 start: UniMelb will assess NCEA applicants on the converted ATAR that VTAC receives, rather than its own calculation. Subject prerequisites stay the same. Staff mentioned the conversion uses the best 90 credits, following NZQA's ranking for Australian universities, but this was still being confirmed with admissions and the website had not been updated yet (2 Oct 2026). UniMelb runs online information sessions for NZ students around April–May, which are worth registering for. Previous method (up to 2026 entry): best 80 Level 3 credits from up to 5 approved subjects, Excellence 4 points, Merit 3, Achieved 2, giving a score out of 320 that UniMelb converted itself. Lowest selection ranks for 2026 domestic entry were roughly Biomedicine 90, Commerce 92 and Agriculture 72.",
      sourceNote: "Prospective Students team, Stop 1, Parkville — in-person meeting 2 Oct 2026 (NCEA change, prerequisites, maths alternatives, fees); study.unimelb.edu.au — NCEA entry-scores page (recognised-vce-equivalent-qualifications/qualifications/new-zealand-national-certificate-in-educational-achievement-ncea) and how-youre-selected-applicants-with-ncea page; ask.unimelb.edu.au; vtac.edu.au.",
    },
    mdPathway: {
      hasProgram: "Yes — Doctor of Medicine (MD), graduate-entry.",
      entry:
        "Standard route is graduate-entry only: apply after any completed bachelor's degree via GEMSAS. UniMelb accepts any bachelor's, even Arts, though a science degree builds the foundation for the GAMSAT. Biomedicine students aiming for medicine are often also targeting dentistry or optometry. A guaranteed school-leaver pathway (\"Chancellor's Scholars\") exists for students entering with an ATAR of 99.90 or above, but only after completing Australian Year 12 or the IB in Australia. It is NOT available to NCEA applicants (confirmed by Prospective Students, 2 Oct 2026). MD fees: CSP $13,558 a year (about $52k over 4 years). Postgraduate CSP places are merit-based, and applicants not competitive for one are offered a full-fee place. After the MD comes provisional registration and a one-year hospital internship. For NZ registration, check with the Medical Council of New Zealand.",
      requirements:
        "GAMSAT ≥50 in each of the three sections; GPA ≥5.0/7.0 (calculated on final 3 years, weighted 1:2:2); MMI interview. Selection weighting: Interview 50% / GPA 25% / GAMSAT 25%. (Staff described GPA and GAMSAT as weighted 50/50 to shortlist for the MMI, with offers then made on MMI performance.)",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "handbook.unimelb.edu.au/2026/courses/mc-dmed/entry-participation-requirements; study.unimelb.edu.au/find/courses/graduate/doctor-of-medicine/entry-requirements.",
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
      medicalSciences: [
        "Bachelor of Biomedicine — dedicated degree (Parkville, Melbourne Model), ~14-16 majors incl. Human Structure and Function, Pathology, Pharmacology, Neuroscience, Microbiology and Immunology",
      ],
    },
    entrepreneurshipNote:
      "Not a dedicated undergraduate major — folded into Bachelor of Commerce as elective subjects. Dedicated study exists only at postgraduate level (Master of Entrepreneurship, with the Wade Institute).",
    hybrid: [
      {
        label: "Medical Sciences + Engineering",
        description:
          "\"Biomedical Engineering Systems\" is a genuine undergraduate major within the Bachelor of Biomedicine — biology/chemistry/physics combined with engineering systems modelling, with a direct pathway to the Master of Biomedical Engineering. A true medtech crossover embedded in the core degree, not a separate add-on. (Note: \"BioDesign Innovation Melbourne\", pairing engineering and MBA students on real clinical device problems, is a strong medtech-entrepreneurship program but is graduate-level only — not accessible to Bachelor of Biomedicine undergrads.)",
      },
    ],
    visit: {
      openDay: "Sun 16 Aug 2026, 10am–4pm (annual, typically mid-August)",
      openDayUrl: "https://study.unimelb.edu.au/openday",
      tours: "Free 1-hour guided walking tours of Parkville led by student ambassadors (school groups Yr 10–12, book 6+ weeks ahead); self-guided virtual tour available anytime.",
      toursUrl: "https://www.unimelb.edu.au/campustour",
      webinar:
        "\"Discover Melbourne\" webinar series, 13–16 Oct 2026 (AEDT, Melbourne time): Tue 13 — The Essentials 7:30–8pm, How to apply (international) 8–8:30pm, Discover STEM 8:30–9:15pm; Wed 14 — Discover Creative Fields 8–8:45pm, Discover Humanities & Social Science 9–10:15pm; Thu 15 (repeats) — Discover STEM 9:30–10:15am, The Essentials 10:30–11am, How to apply (international) 11–11:30am; Fri 16 (repeats) — Discover Creative Fields 9:30–10:15am, Discover Humanities & Social Science 10:30–11:15am. Register via the booking link.",
      webinarUrl: "https://study.unimelb.edu.au/student-life/events/discover-melbourne-webinar-series-october-sessions",
      webinarBookingUrl: "https://bookings.events.unimelb.edu.au/M1Z5a3",
      webinarVideos: [
        "https://www.youtube.com/watch?v=-_LBokgBW6c",
        "https://www.youtube.com/watch?v=n-LuWnudq5Q",
      ],
      notes:
        "NZ citizens should attend \"How to apply as a domestic student\" (VTAC session), not \"How to apply as an international student\" — per study.unimelb.edu.au/student-life/events/international-webinar. Date/time for the domestic/VTAC session not yet confirmed for the Oct 2026 series; check study.unimelb.edu.au/student-life/events/interstate-webinars or booking link bookings.events.unimelb.edu.au/ug-web-vtac closer to the date.",
    },
    // Prioritised list prepared for a timed meeting with the Prospective
    // Students team, with the answers given at the meeting (2 Oct 2026,
    // Stop 1, Parkville). `answer` records what staff said; `gap` stays on
    // questions that weren't answered.
    meetingQuestions: {
      title: "Prospective Students meeting — 2 Oct 2026",
      transcriptUrl: "https://github.com/tkluysk/higher-ed-explorer/blob/main/transcripts/2026-10-02-unimelb-prospective-students.md",
      recordingUrl: "https://drive.google.com/file/d/1lrd22IeKZDwsILx8hLW86atebWwBryg5/view",
      date: "2026-10-02",
      context: "About 30 minutes with the Prospective Students team at Stop 1 (planned as 15). They assumed a 2028 start, so she would apply through VTAC in Aug–Sep 2027. Answers below are what staff said, not official policy.",
      groups: [
        {
          label: "Must ask",
          questions: [
            { q: "Using her actual subjects and results, what selection rank would she be on, and how does that compare with Biomedicine, Science and Commerce?", gap: true, answer: "Not calculated. NCEA assessment changes from 2027 entry: UniMelb will use the converted ATAR VTAC receives (reportedly the best 90 credits; being confirmed). Register for the NZ online info sessions around April–May 2027.", links: [{ label: "Biomedicine entry requirements", url: "https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/entry-requirements/" }] },
            { q: "NCEA results come out in mid-January. Which VTAC offer round would she realistically be in, and does that put her behind VCE students?", gap: true, answer: "Results arrive early to mid-January. Staff didn't say whether that costs places; after results there's a change-of-preference window. The earliest offers students wait on are in December.", links: [{ label: "VTAC key dates", url: "https://vtac.edu.au/dates.html" }] },
            { q: "Do the published ATAR guarantees also apply to an NCEA-based rank?", gap: true, answer: "Not answered directly. With the switch to a VTAC-converted ATAR, ask again at the NZ info session.", links: [{ label: "ATAR entry score guide", url: "https://study.unimelb.edu.au/study-with-us/undergraduate-courses/change-of-preference/atar-guarantees" }] },
            { q: "Is a late VTAC application a disadvantage beyond the higher fee?", answer: "Generally not. The exceptions are Fine Arts and Music, which must be in the timely window, and the Access Melbourne equity scheme, which must also be submitted in that window. One VTAC fee covers up to 8 preferences.", links: [{ label: "VTAC key dates", url: "https://vtac.edu.au/dates.html" }] },
          ],
        },
        {
          label: "Money & housing",
          questions: [
            { q: "What would we actually pay for Biomedicine, Science or Commerce as an NZ citizen?", answer: "Bachelor's degrees are CSP. Science and health subjects are mostly band 2: $1,192 per subject, about $9,537 a year (2026 table). Staff said that without a Special Category Visa it's paid upfront each semester. Full fee would be about $5k per subject. A medicine CSP is $13,558 a year.", links: [{ label: "Student contribution amounts", url: "https://study.unimelb.edu.au/how-to-apply/fees/student-contribution-amounts" }, { label: "Study Assist: non-citizens", url: "https://www.studyassist.gov.au/loan-eligibility/non-australian-citizens" }] },
            { q: "University housing: when should we apply, and can we apply before a course offer?", answer: "Start around July 2027 for a 2028 start. Residential colleges are largely full by September and interview shortlisted applicants. You can secure a room before a course offer (many do), with a withdrawal date and a cancellation/refund process if no offer comes. University Accommodation is three self-catered apartment houses. The colleges (two run by UniMelb, the rest affiliated) include three meals a day and tutoring, and take many interstate and NZ students.", links: [{ label: "Student accommodation", url: "https://study.unimelb.edu.au/accommodation" }, { label: "How to apply", url: "https://study.unimelb.edu.au/accommodation/how-to-apply" }] },
            { q: "Which scholarships can an NZ citizen apply for?", gap: true, answer: "Not covered beyond the Access Melbourne equity scheme (timely VTAC window).", links: [{ label: "Find a scholarship", url: "https://scholarships.unimelb.edu.au/" }] },
          ],
        },
        {
          label: "If there's time",
          questions: [
            { q: "Can an NCEA rank qualify for Chancellor's Scholar status (the guaranteed MD pathway)?", answer: "No. It requires an ATAR of 99.90 or above from Australian Year 12 or the IB completed in Australia. NCEA applicants take the standard route: any bachelor's, then GPA plus GAMSAT, then the MMI.", links: [{ label: "Chancellor's Scholarship", url: "https://scholarships.unimelb.edu.au/awards/melbourne-chancellors-scholarship" }] },
            { q: "How easy is it to move between Science, Biomedicine and Commerce after first year?", answer: "Through an internal transfer after at least one semester and three completed subjects. It's assessed on the ATAR, prerequisites and first-semester results, and isn't guaranteed. Most moves are between Biomedicine and Science.", links: [{ label: "Course transfers", url: "https://study.unimelb.edu.au/how-to-apply/transferring-courses" }] },
            { q: "Who should we contact from here on?", answer: "Call the Stop 1 number and choose 'future/prospective student' to reach the same team, or email an enquiry. Guided tours only run on Open Day (a Sunday in August); self-guided walks anytime. Science and Biomedicine are both at Parkville." },
          ],
        },
        {
          label: "Also learned",
          questions: [
            { q: "Biomedicine vs Science: majors largely overlap. Public Health and Epidemiology is Biomedicine-only. Biomedicine is a smaller, more structured cohort with electives limited to the degree; Science allows wider electives plus breadth subjects in other faculties (languages, design, arts)." },
            { q: "Biomedicine prerequisites: English, NCEA Mathematics with Calculus, and Chemistry. Science accepts Biology, Chemistry or Physics as the science subject. Without Calculus, a pre-approved online maths course satisfies the prerequisite (see 'Subjects' under entry requirements)." },
          ],
        },
      ],
      followUps: [
        "Consider the Calculus and Probability summer intensive (Jan–Feb 2027) to clear the maths prerequisite before Year 13",
        "Check whether other universities (Monash, RMIT etc.) accept the same maths bridging courses",
        "Register for UniMelb's NZ online information sessions (~April–May 2027)",
        "Check the official NCEA→ATAR conversion once the website is updated (best 80 vs 90 credits)",
        "Plan housing applications from ~July 2027; colleges fill by September",
        "Open Day is a Sunday in August 2027, the only time guided tours and faculty staff are available",
      ],
    },
    visitQuestions: {
      student: [
        { q: "Biomedicine vs Science: which is the better base if I'm undecided between medicine, research and medtech?", links: [{ label: "Bachelor of Biomedicine", url: "https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/" }, { label: "Biomedicine structure", url: "https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/structure/" }] },
        { q: "Can I do the Biomedical Engineering Systems major without Specialist Maths? What are the prerequisites?", links: [{ label: "Biomedical Engineering Systems major", url: "https://study.unimelb.edu.au/find/courses/major/biomedical-engineering-systems/structure/" }, { label: "Biomedicine entry requirements", url: "https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/entry-requirements/" }] },
        { q: "Melbourne Model breadth: could I take Commerce or entrepreneurship subjects as breadth?", links: [{ label: "Breadth subjects", url: "https://students.unimelb.edu.au/course-admin/planning-your-course-and-subjects/breadth-subjects" }, { label: "Commerce as breadth", url: "https://fbe.unimelb.edu.au/study/commerce-as-breadth" }] },
        { q: "Entrepreneurship is postgrad-only as a course — what's there for undergrads (clubs, hackathons, accelerator)?", links: [{ label: "Entrepreneurship study options", url: "https://study.unimelb.edu.au/find/study-areas/entrepreneurship/" }, { label: "Melbourne Entrepreneurial Centre", url: "https://www.unimelb.edu.au/mec" }, { label: "MAP Accelerator", url: "https://www.unimelb.edu.au/mec/MECPrograms/melbourne-accelerator-program" }] },
        { q: "What's the real workload, and how big are first-year lectures?", links: [{ label: "Biomedicine student experience", url: "https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/student-experience/" }] },
        { q: "How do undergrads get research experience — summer research, lab placements?", links: [{ label: "UROP (Biomedicine)", url: "https://biomedicalsciences.unimelb.edu.au/study/current-student-information/plan-your-bachelor-of-biomedicine/urop" }, { label: "Science research subjects", url: "https://science.unimelb.edu.au/students/research-project-subjects" }] },
        { q: "If I'm aiming for the MD later, what do successful applicants do during the bachelor's? Any GAMSAT/MMI support?", links: [{ label: "How to become a doctor", url: "https://study.unimelb.edu.au/find/pathways/doctor/" }, { label: "MD entry requirements", url: "https://study.unimelb.edu.au/find/courses/graduate/doctor-of-medicine/entry-requirements/" }] },
      ],
      parent: [
        { q: "NCEA rank: walk us through the /320 → selection-rank conversion with a worked example using her actual subjects.", gap: true, links: [{ label: "How you're selected (NCEA)", url: "https://study.unimelb.edu.au/how-to-apply/undergraduate-study/domestic-applications/entry-requirements/how-youre-selected-applicants-with-ncea" }, { label: "NCEA entry scores", url: "https://study.unimelb.edu.au/how-to-apply/undergraduate-study/international-applications/entry-requirements/indicative-entry-scores-international-students/qualifications/new-zealand-national-certificate-in-educational-achievement-ncea" }] },
        { q: "What NCEA-based ranks have actually got people into Biomedicine (~90) and Commerce (~92) recently?", links: [{ label: "Biomedicine entry requirements", url: "https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/entry-requirements/" }, { label: "Bachelor of Commerce", url: "https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-commerce/" }] },
        { q: "MD for NZ citizens: CSP or full-fee? (NZ citizens can't take Bonded Medical Places.) Can an NCEA rank qualify for Chancellor's Scholar status?", links: [{ label: "MD fees", url: "https://study.unimelb.edu.au/find/courses/graduate/doctor-of-medicine/fees/" }, { label: "Chancellor's Scholarship", url: "https://scholarships.unimelb.edu.au/awards/melbourne-chancellors-scholarship" }, { label: "Graduate course guarantees", url: "https://scholarships.unimelb.edu.au/about-scholarships/melbourne-chancellors-scholarship/graduate-course-guarantees" }] },
        { q: "CSP requires living in Australia while studying — what exactly does that mean, and what's the HELP loan position for an NZ citizen?", links: [{ label: "Undergrad fees (domestic)", url: "https://study.unimelb.edu.au/how-to-apply/undergraduate-study/domestic-applications/fees-and-payments" }, { label: "Student contribution amounts", url: "https://study.unimelb.edu.au/how-to-apply/fees/student-contribution-amounts" }, { label: "Study Assist: non-citizens", url: "https://www.studyassist.gov.au/loan-eligibility/non-australian-citizens" }] },
        { q: "Confirm NZ applicants apply via VTAC as domestic — and the key dates for a 2027 start.", links: [{ label: "VTAC key dates", url: "https://vtac.edu.au/dates.html" }, { label: "Domestic entry requirements", url: "https://study.unimelb.edu.au/how-to-apply/undergraduate-study/domestic-applications/entry-requirements" }] },
        { q: "First-year housing: is it guaranteed? College vs university housing — cost per year?", links: [{ label: "Student accommodation", url: "https://study.unimelb.edu.au/accommodation" }, { label: "Residential colleges FAQ", url: "https://www.colleges.unimelb.edu.au/frequently-asked-questions/" }] },
        { q: "Which scholarships can NZ citizens apply for (merit, relocation, access)?", links: [{ label: "Find a scholarship", url: "https://scholarships.unimelb.edu.au/" }] },
        { q: "How easy is it to switch between Science, Biomedicine and Commerce after first year?", links: [{ label: "Course transfers", url: "https://study.unimelb.edu.au/how-to-apply/transferring-courses" }] },
      ],
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
    mdPathway: {
      hasProgram: "Yes — Bachelor of Medical Science/Doctor of Medicine (M6011), one of the few Australian med schools offering direct undergraduate entry.",
      entry:
        "Both undergraduate-direct and graduate entry exist. Direct entry (M6011) is a 5-year combined degree straight from Year 12, restricted to applicants within 2 years of Year 12 with no prior tertiary study.",
      requirements:
        "ATAR ≥90 minimum, competitive offers ~99; UCAT ANZ required; Chemistry ≥30, English ≥30 (or EAL ≥35); three-stage selection on ATAR/UCAT/MMI interview.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "monash.edu/study/courses/find-a-course/medical-science-and-medicine-direct-entry-m6011; monash.edu 2026 Entry Schemes for Domestic Students PDF.",
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
      medicalSciences: ["Bachelor of Biomedical Science — Clayton (anatomy, biochemistry, immunology, pharmacology, physiology)"],
    },
    entrepreneurshipNote:
      "Not a dedicated undergraduate major — folded into Bachelor of Commerce/Business as elective units. Extracurricular support via the Fastrack program and Entrepreneurship and Innovation Hub (eiHub); Master of Business offers an entrepreneurship specialisation at postgrad level.",
    medicalSciencesNote:
      "Monash Engineering (Clayton) also offers a Biomedical Engineering specialisation within the Bachelor of Engineering (Honours). Genuinely strong undergrad-accessible medtech-entrepreneurship ecosystem layered on top via the Monash Institute of Medical Engineering (MIME) and student-run Monash Young Medtech Innovators (MYMI) — biodesign-innovation training, med-tech startup support, and competitions (Heart Hack, SUMMIT, Future MedTech Leaders Program). Not a for-credit major, but a notable co-curricular crossover, more accessible than most other Melbourne universities' equivalents.",
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
      medicalSciences: [
        "Bachelor of Biomedical Science (Honours) BH130 — Bundoora campus, with a Medical Biotechnology minor option",
        "Bachelor of Engineering (Biomedical Engineering) (Honours) BH069 — Melbourne City campus, biomechanics/medical electronics/device design",
      ],
    },
    medicalSciencesNote:
      "Two separate dedicated degrees rather than majors-within-a-degree. No entrepreneurship/innovation crossover program found for medical sciences specifically (unlike Monash's MYMI or UniMelb's BioDesign) — RMIT's innovation/design strengths are concentrated in its broader engineering/design faculties rather than a medtech-specific incubator.",
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
    mdPathway: {
      hasProgram: "Yes — Doctor of Medicine (MD), graduate-entry only.",
      entry: "No school-leaver/direct-entry route found — apply after a completed bachelor's via GEMSAS.",
      requirements:
        "GAMSAT ≥50 in each section and overall; GPA ≥5.0/7.0 (2026 intake averaged GPA 6.72, GAMSAT 65.9 — highly competitive in practice); MMI interview (6 stations). MCAT accepted as an alternative for international applicants.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "deakin.edu.au Doctor of Medicine course pages; GEMSAS.",
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
      medicalSciences: [
        "Bachelor of Biomedical Science — 6 specialisations: Cellular Biomedicine, Environmental Health, Infection and Immunity, Medical Biotechnology, Medical Genomics, Pharmaceutical Science",
      ],
    },
    medicalSciencesNote:
      "No standalone medtech/digital-health degree, but Burwood's $26M Innovation in Technology, Science and Health precinct hosts the Health E-technologies Assessment Lab (digital health app evaluation) and wearable biosensor research (smart textiles, ML-enhanced biosensing) — research/lab infrastructure and postgrad scholarship areas rather than an undergraduate crossover major.",
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
      english: "Bachelor's prerequisites are a VCE English study score (20 for most courses, 25 for professional degrees), with NZ equivalents assessed via VTAC. Student HQ (28 Sep 2026) strongly expects NZ Year 12 UE Literacy will NOT be enough — plan on an English subject in Year 13 and send the end-of-2026 results transcript for an admissions check. The NCEA Level 2 English rule on Swinburne's admissions page is for UniLink diplomas only.",
      portfolio: "Yes — the primary and determinative selection mechanism: a 10-page portfolio of creative work plus a 250-word written response on the applicant's passion for design and fashion career goals. Portfolio quality matters more than grades for this program.",
      feeStatus: "Domestic (local) student: an NZ citizen living in Australia for the whole course is eligible for a Commonwealth supported place. No HECS-HELP without a Special Category Visa, so fees are paid upfront each semester (due ~weeks 2–3, around March and August), plus the separate Student Services and Amenities Fee. An NZ permanent resident who is not a citizen is international.",
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
      medicalSciences: [
        "Bachelor of Engineering (Honours) — Biomedical Engineering major (medical device design, imaging, prosthetics)",
        "Bachelor of Health Science — Artificial Intelligence and Digital Health major",
        "Bachelor of Biomedical Science — standalone degree, set structure (anatomy, physiology, biochemistry); a route to graduate-entry medicine elsewhere (Swinburne has no medical school)",
        "Bachelor of Health Science — Biomedical Science major (more flexible alternative to the standalone degree)",
      ],
    },
    biologyNote:
      "No general \"Biology\" major — the closest options are the Biochemistry or Biotechnology majors in the Bachelor of Science (science-only, no humanities breadth; Biotechnology and Biochemistry can't be combined as a double major), or the Bachelor of Biomedical Science / Health Science (Biomedical Science) for human biology.",
    hybrid: [
      {
        label: "Fashion + Technology",
        description:
          "Bachelor of Design (Fashion) is built around \"fashion futures\": dedicated units in Wearable Technology Design Studio, Emerging Technologies in Fashion and Textile Design, Sustainable Fashion Design Studio, plus digital fabrication and prototyping in the ProtoLAB. A Fashion Branding & Management unit in year 3 adds commercial/entrepreneurial grounding. Note: this specific fashion degree doesn't currently list a confirmed double-degree pairing with Business or Applied Innovation (those pairings exist for the general Bachelor of Design, not yet confirmed for the Fashion major) — verify directly if that combination matters.",
      },
      {
        label: "Medical Sciences + AI/Innovation",
        description:
          "The Artificial Intelligence and Digital Health major (Bachelor of Health Science) applies AI to diagnostics, imaging, monitoring and personalised care with human-centred design content — no prior programming required. The Biomedical Engineering major (Bachelor of Engineering Honours) separately blends electrical/electronics engineering with medicine (device design, imaging, prosthetics) and includes an Engineering Technology Innovation Project plus industry-linked design projects each semester. Both are strong innovation-flavoured medtech crossovers, though majors within broader degrees rather than standalone bachelor's titles.",
      },
    ],
    visit: {
      openDay: "Sun 26 Jul 2026 (Hawthorn, typically late July)",
      openDayUrl: "https://www.swinburne.edu.au/openday/",
      tours: "45-minute student-ambassador-led guided tours of Hawthorn (incl. Sky Lounge/Sky Garden), bookable online; 360° virtual tour also available.",
      toursUrl: "https://www.swinburne.edu.au/forms/campus-tour/",
      notes: "School groups can request study-area-specific workshop visits outside Open Day.",
    },
    meetingQuestions: {
      title: "Student HQ conversation — 28 Sep 2026",
      transcriptUrl: "https://github.com/tkluysk/higher-ed-explorer/blob/main/transcripts/2026-09-28-swinburne-student-hq.md",
      recordingUrl: "https://drive.google.com/file/d/1tM7sur7f_EgvRWHvl-MfjgrKI8Ej2gQQ/view",
      date: "2026-09-28",
      context: "About 1h 35m with a Student HQ adviser at Hawthorn (no guided tour available that day). They assumed a 2028 start, so she would apply through VTAC in Aug–Dec 2027. Answers below are what staff said, not official policy.",
      groups: [
        {
          label: "Admission & English",
          questions: [
            { q: "When and how does she apply?", answer: "During NZ Year 13, through VTAC (Aug–Dec 2027) for a 2028 start. Applying to several universities means VTAC, not a direct application. 8 course preferences; apply without results and change preferences once NZ results arrive in January.", links: [{ label: "VTAC key dates", url: "https://vtac.edu.au/dates.html" }, { label: "Swinburne on VTAC", url: "https://www.swinburne.edu.au/courses/applying/information-on-vtac/" }] },
            { q: "Does NCEA Year 12 UE Literacy satisfy the English requirement?", gap: true, answer: "Probably not — the adviser strongly expects she'll need an English subject in Year 13. Send the end-of-2026 results transcript and they'll have admissions check it.", links: [{ label: "Admission requirements", url: "https://www.swinburne.edu.au/courses/planning-your-future/admission-requirements/" }] },
            { q: "Portfolio: what stands out, and can we see past examples?", gap: true, answer: "No example entry portfolios (confidential). For inspiration, look at graduate work in the School of Design's GradX exhibition. Selection weighs the portfolio with results; there's no published ATAR, and the course hasn't been capped so far.", links: [{ label: "Fashion course page", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-design-fashion/" }, { label: "GradX", url: "https://www.swinburne.edu.au/news/2022/11/2022-gradx-evolve-showcases-design-and-architecture-talent/" }] },
          ],
        },
        {
          label: "Money",
          questions: [
            { q: "What would we pay, and can fees be deferred?", answer: "Domestic CSP rates as an NZ citizen living in Australia — Fashion is $9,537 a year (2026). No HECS-HELP without a Special Category Visa, so fees are paid upfront each semester (around March and August), plus the separate Student Services and Amenities Fee.", links: [{ label: "Fees for local students", url: "https://www.swinburne.edu.au/courses/fees/fees-for-local-students/" }, { label: "Study Assist: non-citizens", url: "https://www.studyassist.gov.au/loan-eligibility/non-australian-citizens" }] },
            { q: "Which scholarships are open to NZ citizens or fashion students?", gap: true, answer: "Over 100 scholarships with varying eligibility — some via VTAC, some direct, some only once enrolled. The adviser couldn't confirm fashion- or NZ-specific ones; link to follow by email. Also look for NZ scholarships.", links: [{ label: "Scholarships", url: "https://www.swinburne.edu.au/study/options/scholarships/" }] },
          ],
        },
        {
          label: "The fashion course",
          questions: [
            { q: "Can she add business or entrepreneurship?", answer: "Yes, through the 8 electives (100 credit points): a co-major, two minors, an advanced minor, a placement or study abroad. Some electives have prerequisites, and popular ones fill first-come, first-served.", links: [{ label: "Fashion handbook", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-design-fashion/handbook/" }, { label: "Co-majors", url: "https://www.swinburne.edu.au/courses/co-majors/" }] },
            { q: "The course is new — what's the track record?", answer: "First intake 2025, first graduates end of 2027, so no outcome data yet. It sits in the long-established School of Design and Architecture. Industry briefs so far include the Woolmark Performance Challenge and Rising festival merchandise; hands-on with industrial machines from day one, with a strong wearable-tech focus.", links: [{ label: "Woolmark Performance Challenge", url: "https://www.woolmarkchallenge.com/" }] },
            { q: "How do placements work?", answer: "Every bachelor's includes at least one Work Integrated Learning experience (placement, internship or industry project). A 12-month placement adds a year, usually between years 2 and 3; eligible after 150 credit points. Start applying early — finding one can take 6–12 months. Which companies take fashion students wasn't known.", links: [{ label: "Placements", url: "https://www.swinburne.edu.au/life-at-swinburne/work-integrated-learning/placements/" }] },
            { q: "Who pays for materials and fabric?", gap: true, answer: "Not known — the adviser noted it to ask the school." },
          ],
        },
        {
          label: "Science & medicine",
          questions: [
            { q: "Which degrees suit a later move into medicine?", answer: "Swinburne has no medical school, so staff can't officially say any degree leads there. The adviser pointed to the Bachelor of Biomedical Science or Health Science (Biomedical Science major); work backwards from each medical school's prerequisites. Biochemistry and Biotechnology are Bachelor of Science majors.", links: [{ label: "Biomedical Science", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-biomedical-science/" }, { label: "Biochemistry major", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-science/biochemistry/" }] },
          ],
        },
      ],
      followUps: [
        "Watch for the adviser's summary email (within ~5 days) and reply from her own account",
        "Send the end-of-2026 NCEA results transcript for the English check",
        "Book a (virtual) session with the fashion academics: materials, placements, comparison with RMIT",
        "Plan to pay fees upfront each semester",
      ],
    },
    visitQuestions: {
      student: [
        { q: "Portfolio: what makes a 10-page portfolio stand out? Can I see strong past examples — and do they want finished pieces or process/sketch work?", gap: true, links: [{ label: "Fashion course — how to apply", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-design-fashion/" }, { label: "How to become a fashion designer", url: "https://www.swinburne.edu.au/courses/find-a-course/design/fashion-design/how-to-become-a-fashion-designer/" }] },
        { q: "How much weight does the 250-word written response carry versus the portfolio itself?", links: [{ label: "Fashion course page", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-design-fashion/" }] },
        { q: "Can I combine Fashion with Business or Entrepreneurship — double degree or minor? (Only confirmed for the general Bachelor of Design.)", gap: true, links: [{ label: "Fashion handbook", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-design-fashion/handbook/" }, { label: "Business / Applied Innovation", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-business-bachelor-of-applied-innovation/" }] },
        { q: "The fashion degree is new — where have the first students ended up, and which industry partners take them?", links: [{ label: "Course launch (2024)", url: "https://www.swinburne.edu.au/news/2024/07/the-future-of-fashion-Swinburne-launches-groundbreaking-tech-focused-fashion-course/" }, { label: "Student work (2025)", url: "https://www.swinburne.edu.au/news/2025/06/Swinburnes-fashion-students-stitch-together-future-ready-skills/" }] },
        { q: "When do I get hands-on access to the ProtoLAB and wearable-tech studios — first year or later?", links: [{ label: "ProtoLAB", url: "https://www.swinburne.edu.au/research/facilities-equipment/protolab/" }] },
        { q: "Work Integrated Learning: do you find my placement or do I? Is it paid? Could it be at a startup?", links: [{ label: "WIL overview", url: "https://www.swinburne.edu.au/life-at-swinburne/work-integrated-learning/" }, { label: "Placements", url: "https://www.swinburne.edu.au/life-at-swinburne/work-integrated-learning/placements/" }] },
        { q: "Medtech: what's day-to-day like in AI & Digital Health vs Biomedical Engineering? Do I need Specialist Maths or Physics for the engineering one?", links: [{ label: "AI & Digital Health major", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-health-science/artificial-intelligence-and-digital-health/" }, { label: "Biomedical Engineering major", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-engineering-honours/biomedical/" }] },
        { q: "How big are first-year classes, and how much is project-based vs exam-based?" },
        { q: "Is there a student entrepreneurship program or incubator I can join as an undergrad?", links: [{ label: "Entrepreneurship major", url: "https://www.swinburne.edu.au/course/undergraduate/bachelor-of-business/entrepreneurship/" }, { label: "Innovation Precinct", url: "https://www.swinburne.edu.au/innovation-precinct/" }, { label: "Pre-accelerator", url: "https://www.swinburne.edu.au/innovation-precinct/get-involved/pre-accelerator-program/" }] },
      ],
      parent: [
        { q: "NCEA: confirm NCEA L3 + UE is sufficient, and that NCEA English credits satisfy the English requirement.", gap: true, links: [{ label: "How to apply (local)", url: "https://www.swinburne.edu.au/courses/applying/how-to-apply-local/" }] },
        { q: "Fees: as an NZ citizen, will she get a CSP? What's the real annual cost — and is HECS-HELP available, or is it upfront? (HELP for NZ citizens needs 10+ years' residency from childhood.)", links: [{ label: "Fees for local students", url: "https://www.swinburne.edu.au/courses/fees/fees-for-local-students/" }, { label: "HECS-HELP at Swinburne", url: "https://www.swinburne.edu.au/courses/fees/loans-discounts-local-students/hecs-help-loan/" }, { label: "Study Assist: non-citizens", url: "https://www.studyassist.gov.au/loan-eligibility/non-australian-citizens" }] },
        { q: "Timeline: VTAC or direct application? When is the portfolio due?", links: [{ label: "Swinburne on VTAC", url: "https://www.swinburne.edu.au/courses/applying/information-on-vtac/" }, { label: "VTAC key dates", url: "https://vtac.edu.au/dates.html" }] },
        { q: "Housing for first-years moving from overseas/interstate — options, cost, is a place guaranteed?", links: [{ label: "On-campus residences", url: "https://www.swinburne.edu.au/life-at-swinburne/student-support-services/accommodation/on-campus-accommodation/" }, { label: "Compare options & costs", url: "https://www.swinburne.edu.au/life-at-swinburne/student-support-services/accommodation/compare-your-options/" }] },
        { q: "What support is there for students living away from home — mentoring, wellbeing, first-year transition?", links: [{ label: "Find a student mentor", url: "https://www.swinburne.edu.au/life-at-swinburne/student-support-services/find-a-mentor/" }, { label: "Support services", url: "https://www.swinburne.edu.au/life-at-swinburne/student-support-services/" }] },
        { q: "Graduate employment rates at 4 months — specifically for design/fashion?", links: [{ label: "ComparED (QILT)", url: "https://www.compared.edu.au/" }] },
        { q: "How easy is it to switch degree if fashion isn't the one?", links: [{ label: "Changing course (student stories)", url: "https://www.swinburne.edu.au/news/2026/03/course-changers-meet-students-who-found-their-path-by-changing-their-studies/" }] },
        { q: "Which scholarships are open to NZ citizens?", links: [{ label: "Scholarships", url: "https://www.swinburne.edu.au/study/options/scholarships/" }] },
      ],
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
    mdPathway: {
      hasProgram: "No — La Trobe has no medical school of its own.",
      entry:
        "Feeder pathway only: Bachelor of Biomedical Science (Medical) at La Trobe → if WAM ≥70, guaranteed provisional entry to the University of Melbourne's Doctor of Medicine via its Rural Pathway.",
      requirements: "WAM ≥70 in the La Trobe Bachelor of Biomedical Science (Medical); UniMelb's MD entry requirements then apply (see UniMelb entry).",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "Findings reconstructed from search-engine snippets (WebFetch of the primary La Trobe/UniMelb pathway page was not obtained) — verify current WAM threshold and pathway name directly with La Trobe before relying on it.",
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
      medicalSciences: [
        "Bachelor of Biomedicine — Bundoora, majors in Cancer/Heart and Brain Diseases, Immunology and Infectious Disease, Physiology and Pharmacology, Molecular and Cellular Biochemistry, tied to the La Trobe Institute for Molecular Science",
      ],
    },
    medicalSciencesNote:
      "Note: La Trobe's separately-named \"Bachelor of Biomedical Science\" is offered only at Bendigo/West Wodonga, not Bundoora — don't conflate the two. No undergraduate biomedical engineering or medtech/digital-health innovation major found at Bundoora; La Trobe's digital health offering (Master/Grad Cert in Digital Health) is postgraduate-only.",
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
    medicalSciencesNote:
      "At Footscray Park specifically, biomedical science is folded into the dual-disciplinary Bachelor of Biomedical and Exercise Science (anatomy, physiology, pathophysiology, biochemistry combined with exercise/sport science) rather than existing as a pure biomedical science degree — VU's dedicated biomedical science degrees (Bachelor of Biomedical Science, Bachelor of Science (Honours) Biomedical Sciences) are based at the St Albans campus instead, not Footscray Park. No medtech/digital-health innovation crossover found.",
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
    mdPathway: {
      hasProgram: "No — ACU has no medical school of its own.",
      entry:
        "Feeder pathway: Bachelor of Biomedical Science on-campus at ACU → Facilitated Interview Pathway to Notre Dame Sydney's MD, guaranteeing an interview (not an offer). The published eligibility wording says \"on-campus at ACU\" without naming a specific campus, and ACU runs Biomedical Science on-campus at Melbourne (Fitzroy), Brisbane and North Sydney — so this likely extends to Melbourne graduates too, but that wasn't confirmed against a directly-fetched Notre Dame page (site blocked automated fetches).",
      requirements:
        "GPA ≥6.0/7.0, GAMSAT ≥55 overall, Casper test, ranked in the top 5 of ACU Biomedical Science applicants who didn't already secure an interview via standard GEMSAS, and must list Notre Dame Sydney as first GEMSAS preference.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "Search-derived, not fully primary-source-verified for the Melbourne campus specifically (confirmed directly for ACU North Sydney) — see notredame.edu.au/study/applications-and-admissions/pathways/pathways-to-medicine.",
    },
    description:
      "Smaller, faith-based institution known for a supportive learning environment. No confirmed chemistry major, finance specialisation, or fashion program at the Melbourne campus — Business/Commerce and Biomedical Science are its clearest matches.",
    fields: {
      business: ["Bachelor of Commerce"],
      medicalSciences: ["Bachelor of Biomedical Science — major in Physiological Pharmacology, Honours pathway available (chemistry, biochemistry, cell biology, anatomy/physiology, genetics, microbiology, immunology)"],
    },
    medicalSciencesNote:
      "No entrepreneurship/innovation/tech crossover at undergraduate level — ACU's digital health offerings (Grad Cert/Grad Dip in Digital Health) exist only at postgraduate level.",
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
      subjectPrerequisites: "B Science (Medical Science): no subject prerequisites for 2027 entry, only assumed knowledge of Biology, Chemistry and Mathematics Advanced. An offer is possible without them; USyd recommends a bridging course to catch up. USyd's separate Mathematics prerequisite (HSC Mathematics Advanced, Band 4) applies to degrees such as engineering, mathematical sciences and pharmacy, not to B Science (Medical Science). Bridging courses don't satisfy USyd prerequisites, only assumed knowledge (2027 Admission Guide).",
      sourceNote: "sydney.edu.au recognised-qualifications page (NCEA→ATAR conversion); uac.edu.au Sydney ELP page (no NZ/NCEA row); sydney.edu.au CSP eligibility page.; sydney.edu.au/content/dam/corporate/documents/study/guides/usyd-admission-guide.pdf (2027 entry; prerequisites vs assumed knowledge)",
    },
    mdPathway: {
      hasProgram: "Yes — Doctor of Medicine (MD), graduate-entry only.",
      entry: "No school-leaver/direct-entry route — apply after a completed bachelor's.",
      requirements:
        "GAMSAT ≥50 in all 3 sections (from a defined list of eligible recent sittings); GPA ≥5.0/7.0. No interview for standard applicants since 2021 — GAMSAT score alone decides offers. Note: 2026-entry applications had already closed by mid-2026, with March 2026 GAMSAT as the final eligible sitting — a point-in-time detail, not a permanent structural limitation.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "sydney.edu.au Doctor of Medicine course/admissions pages.",
    },
    description:
      "Sandstone Group of Eight university. Business School ranked ~29th globally for Accounting & Finance (QS 2025). No dedicated fashion program.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: ["Bachelor of Science — Biology major (School of Life and Environmental Sciences, single-honours pathway available)"],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major", "Master of Finance"],
      entrepreneurship: ["Bachelor of Commerce — Innovation and Entrepreneurship major/minor, multidisciplinary (drawing units from Business, Arts, Engineering, Science, Architecture, Music)"],
      medicalSciences: [
        "Bachelor of Science (Medical Science) — also offered as Bachelor of Science and Bachelor of Advanced Studies (Medical Science): anatomy, physiology, pharmacology, immunology, neuroscience",
        "Bachelor of Engineering Honours (Biomedical Engineering) — separate 4-year medtech/device-design degree",
      ],
    },
    medicalSciencesNote:
      "No specific innovation/entrepreneurship crossover stream found paired with either program — these are traditional science/engineering tracks without a distinct design-innovation or digital-health-entrepreneurship layer.",
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
      subjectPrerequisites: "Bachelor of Medical Science: no prerequisites, only assumed knowledge of Chemistry and Mathematics Advanced (UAC listing, 2027 entry).",
      sourceNote: "unsw.edu.au Bachelor of Design (Honours) course page publishes exact current-year figures directly: 2026 lowest selection rank 83.0, lowest ATAR 65.0 — the clearest published cutoff of any institution in this dataset.; uac.edu.au/course-search/search/undergraduate/course/429700 (Medical Science assumed knowledge)",
    },
    mdPathway: {
      hasProgram: "Yes — Bachelor of Medical Studies/Doctor of Medicine (BMed/MD), undergraduate-direct entry (6-year combined degree at Kensington, straight from Year 12).",
      entry: "Undergraduate-direct only — no separate graduate-entry stream found in this research.",
      requirements:
        "ATAR ≥96.00 general entry, without EAS adjustments (EAS points don't lower this 96.00 bar — they apply only after it's independently met). A separate, lower ATAR ≥91.00 threshold applies to the distinct Rural Entry Pathway and Gateway Entry Scheme, not general entry. UCAT ANZ required; interview offers based on academic rank + UCAT score only.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "unsw.edu.au/medicine-health/study-with-us/undergraduate/domestic-applicants — directly fetched and verified.",
    },
    description:
      "Group of Eight university with a strong STEM and finance reputation across Asia-Pacific (Business School ranked ~10th globally for Accounting & Finance). Fashion isn't a dedicated program — the Art & Design campus in Paddington leans fine art/design — but its broad Bachelor of Design lets students combine textiles/fashion with computational or industrial design.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: ["Bachelor of Science — Biology major (one of 28 Science majors)", "Bachelor of Biotechnology (Honours) — more applied/industry-focused biology-adjacent degree"],
      business: ["Bachelor of Commerce"],
      finance: ["Bachelor of Commerce — Finance major", "Master of Finance"],
      entrepreneurship: ["Bachelor of Commerce — Innovation, Strategy and Entrepreneurship major, backed by UNSW Founders startup programs"],
      medicalSciences: [
        "Bachelor of Medical Science — 3-year, majors in neuroscience, microbiology, immunology etc., jointly run by UNSW Science and Medicine",
        "Bachelor of Engineering (Honours) — Biomedical Engineering",
      ],
    },
    hybrid: [
      {
        label: "Fashion + Computational Design",
        description:
          "Bachelor of Design (Paddington) is deliberately broad — students can work across Textiles & Fashion Design, Industrial Design, Computational Design, Integrated Design, and Robotic Fabrication, combining a specialisation with a minor or free electives. Best suited to someone who wants to be a multidisciplinary designer with a strong fashion interest, rather than fashion as the primary identity — pair with UNSW's substantial science/engineering faculties if she wants to keep options broadly technical.",
      },
      {
        label: "Medical Sciences + Innovation",
        description:
          "UNSW's Tyree IHealthE institute embeds genuine innovation content directly into the undergraduate Biomedical Engineering degree — notably \"Health Technology Innovation: Clinical Immersion\" (BIOM9910), which places engineering students in hospitals/clinics with clinicians to co-design solutions to unmet clinical needs, plus a \"Connected Health\" Vertically Integrated Project focused on wearable/smartphone-based health monitoring tech. A strong, verified match for a genuine medtech-innovation crossover at undergraduate level — one of the clearest finds in this dataset.",
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
      subjectPrerequisites: "Bachelor of Medical Science: no prerequisites. Assumed knowledge is Mathematics Advanced plus any 2 units of English and of science; Chemistry and Mathematics Extension 1 are recommended (UAC listing).",
      sourceNote: "uts.edu.au (course pages, Design Portfolio Scheme, admissions-stats-tool); uac.edu.au. Selection rank/ATAR for the specific fashion programs wasn't pinned to an exact figure — check UTS's live admissions-stats-tool.; uac.edu.au/course-search/search/undergraduate/course/607051 (Medical Science assumed knowledge)",
    },
    mdPathway: {
      hasProgram: "No — UTS has no medical school (confirmed).",
      entry: "N/A — no MD/MBBS program or named guaranteed-pathway feeder scheme was found for UTS.",
      requirements: "N/A",
      nzNote: "",
      sourceNote: "Confirmed via search that UTS's Bachelor of Medical Science/Biotechnology are science degrees only, not a route to a clinical MD.",
    },
    description:
      "Sydney's standout choice for fashion — ranked 28th globally for undergraduate fashion (Business of Fashion 2026), with purpose-built design facilities (3D printing, seamless knitting, digital design tech). Chemistry is not a UTS strength. Particularly notable for combining fashion directly with business and innovation degrees rather than treating them as separate faculties.",
    fields: {
      fashion: ["Bachelor of Design in Fashion and Textiles"],
      business: ["Bachelor of Business"],
      finance: ["Master of Finance"],
      entrepreneurship: ["Strategic Innovation and Entrepreneurship major — within Bachelor of Management or as an extension option within Bachelor of Business; plus a co-curricular Diploma in Innovation runnable alongside any degree"],
      medicalSciences: [
        "Bachelor of Medical Science — standalone degree, Medical and Health-related Sciences or Pathology major",
        "Bachelor of Science — Medical Science or Biotechnology major",
        "Bachelor of Engineering (Honours) — Biomedical, covering bioinstrumentation, tissue engineering, microfluidics, biomedical polymers, health economics",
      ],
    },
    biologyNote:
      "No generalist Bachelor of Science with a plain Biology major — biology-related study is folded into named specialist degrees instead (Bachelor of Molecular Biotechnology, Bachelor of Science (Biotechnology/Medical Science), Bachelor of Environmental Biology), with a dedicated \"Biology\" major existing specifically inside the Bachelor of Forensic Science.",
    medicalSciencesNote:
      "UTS's Medical Science marketing emphasises \"blending science and technology\" but without formal entrepreneurship coursework confirmed. A possible crossover via the Bachelor of Science + Bachelor of Creative Intelligence and Innovation combined degree couldn't be confirmed — searches didn't verify whether Medical Science/Biotechnology is selectable as the Science component of that specific combination. Worth a direct UTS Handbook check; UNSW's Tyree IHealthE crossover is the more solidly verified find among Sydney universities.",
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
      subjectPrerequisites: "Bachelor of Medical Sciences: no assumed knowledge; HSC Mathematics Advanced and Chemistry are recommended (Macquarie program sheet, Aug 2024, so check for 2028).",
      sourceNote: "mq.edu.au English requirements page returned 403 on fetch — recommend the parent access it directly or contact Macquarie admissions. Fee-status split: mq.edu.au/study/admissions-and-entry/fees-and-costs/eligibility-for-new-zealand-citizens.; mq.edu.au Bachelor of Medical Sciences program sheets (Aug 2024)",
    },
    mdPathway: {
      hasProgram: "Yes — Macquarie MD (4-year graduate-entry degree), with an undergraduate feeder pathway.",
      entry:
        "Both graduate-entry (standard route, open to any bachelor's holder) and an undergraduate pathway: Bachelor of Clinical Science (2 years) → Macquarie MD (4 years) = 6 years total for school leavers. This is an \"advantaged\" pathway, not a full guarantee — a GEMSAS application is still required after finishing the Bachelor of Clinical Science.",
      requirements:
        "Standard graduate-entry needs GPA/GAMSAT + MMI via GEMSAS. Bachelor of Clinical Science graduates get a +3% GPA bonus and 20 reserved MMI interview places when applying to the Macquarie MD, but still compete rather than being guaranteed a place.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "mq.edu.au course pages (Bachelor of Clinical Science, Doctor of Medicine); GEMSAS.",
    },
    description:
      "No dedicated fashion program. Macquarie Business School is well regarded for finance, co-located with a major business/tech precinct of 300+ companies for strong industry connections.",
    fields: {
      chemistry: ["Bachelor of Science — Chemistry major"],
      biology: ["Bachelor of Science — Biology major (also combinable with Bachelor of Arts, Commerce, Advanced Science)", "Bachelor of Science — Human Biology major (medical/health focus)"],
      business: ["Bachelor of Commerce"],
      finance: ["Master of Applied Finance"],
      entrepreneurship: ["Bachelor of Business — Strategy, Innovation and Entrepreneurship major (also combinable with Bachelor of Commerce)"],
      medicalSciences: [
        "Bachelor of Medical Sciences — lab/research-oriented (not clinical), specialisations in anatomy & physiology, genomics & precision medicine, infectious disease/diagnostics, medicinal chemistry, neuroscience",
      ],
    },
    entrepreneurshipNote:
      "Macquarie's historically well-known standalone \"Bachelor of Entrepreneurship\" no longer appears as an active current offering (only legacy handbook references found) — entrepreneurship is now delivered as a major inside Bachelor of Business/Commerce; verify directly with Macquarie admissions if the standalone degree matters.",
    medicalSciencesNote:
      "Note: Macquarie's separate \"Bachelor of Clinical Science\" is explicitly a fast-track pathway into Medicine/MD, Physiotherapy, Audiology, Speech Pathology — out of scope here. A Digital Health major (within the new Bachelor of Health Sciences) covers health data/informatics/digital health systems — a genuine health-tech crossover — but sits in a separate degree, not integrated with Medical Sciences or entrepreneurship programs. No undergraduate biomedical engineering degree exists (only a postgraduate Master of Engineering).",
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
      subjectPrerequisites: "Bachelor of Medical Science: no prerequisites. Assumed knowledge is any 2 units each of English, science and mathematics; at least two of Biology, Chemistry, Physics and Mathematics Advanced are recommended (UAC listing).",
      sourceNote: "westernsydney.edu.au official Entry Qualifications PDF (text extraction failed — recommend opening directly) and \"Changes to fees for New Zealand Citizens\" page. Verify directly with Western Sydney admissions.; uac.edu.au/course-search/search/international/course/728145 (Medical Science assumed knowledge)",
    },
    mdPathway: {
      hasProgram: "Yes — Bachelor of Clinical Science (Medicine)/Doctor of Medicine (MD), undergraduate-direct entry is the primary route.",
      entry:
        "Direct entry from Year 12 (or with an incomplete prior degree). Confirmed via direct fetch of westernsydney.edu.au: entry categories are General school-leaver ATAR entry, Rural Entry Admission Scheme, Aboriginal and Torres Strait Islander pathway, GWS subquota, and transfer for students already enrolled elsewhere in medicine. No named guaranteed/provisional pathway (of the UniMelb Chancellor's Scholars or Notre Dame Assured Pathway type) for graduates of a separate feeder degree exists here.",
      requirements: "ATAR ≥95.5 standard / 93.5 Greater Western Sydney subquota / 91.5 Rural Entry Admission Scheme; UCAT ANZ required; interview. Selection = academic merit + UCAT + interview.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "westernsydney.edu.au/future/study/how-to-apply/md-applicants — directly fetched and verified.",
    },
    description:
      "Technically Greater Western Sydney rather than inner Sydney — worth flagging given commute distance. Strong applied/industry focus. No fashion or standalone chemistry major at the Sydney-proper campuses.",
    fields: {
      biology: ["Bachelor of Science — Biology major, combinable with ecology, zoology, environmental health or agriculture (availability varies by campus)"],
      business: ["Bachelor of Business — Applied Finance and Fintech major"],
      finance: ["Bachelor of Business — Applied Finance and Fintech major"],
      entrepreneurship: ["Bachelor of Entrepreneurship — companion/combined degree only, cannot be studied standalone (must pair with another WSU bachelor's degree)"],
      medicalSciences: ["Bachelor of Medical Science — Biomedical Science major (also Human Nutrition and Anatomy and Physiology majors), covering cellular/molecular/genetic biology of health and disease with sequencing, mass spectrometry and molecular biology lab access"],
    },
    medicalSciencesNote:
      "A Biomedical Engineering minor (not a standalone major since a 2024 downgrade) is available within the Bachelor of Engineering (Honours) — combining electronics/mechanical/mechatronic engineering with life sciences. A postgraduate-only Master of Health Science (Digital Health) explicitly covers \"innovation and entrepreneurship\" in digital health, but isn't integrated with the undergraduate Medical Science degree.",
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
    mdPathway: {
      hasProgram: "No — ACU has no medical school of its own.",
      entry:
        "Feeder pathway: Bachelor of Biomedical Science at ACU North Sydney → Facilitated Interview Pathway to Notre Dame Sydney's MD. Guarantees an interview, not an admission offer.",
      requirements:
        "GPA ≥6.0/7.0, GAMSAT ≥55 overall, Casper test, ranked in the top 5 of ACU Biomedical Science applicants who didn't already secure an interview via standard GEMSAS, and must list Notre Dame Sydney as first GEMSAS preference.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "notredame.edu.au/study/applications-and-admissions/pathways/pathways-to-medicine (search-verified; direct fetch blocked with 403).",
    },
    description:
      "Smaller Catholic university with boutique class sizes. Business and Biomedical Science are the clearest matches here; chemistry only appears incidentally via Biomedical/Nutrition Science units rather than as a standalone major. No fashion program.",
    fields: {
      business: ["Bachelor of Business"],
      medicalSciences: ["Bachelor of Biomedical Science — major in Physiological Pharmacology, minor in Pharmacology, Honours available (confirmed offered at North Sydney, distinct from ACU's Nursing/Midwifery/Paramedicine offerings there)"],
    },
    medicalSciencesNote:
      "No entrepreneurship/medtech/innovation crossover found beyond postgraduate-only Digital Health certificates.",
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
    mdPathway: {
      hasProgram: "Yes — Doctor of Medicine (MD), the clearest true guaranteed school-leaver pathway of all 12 universities researched.",
      entry:
        "Both undergraduate and graduate routes, explicitly named. (1) \"Assured Pathway\": top school leavers admitted to the Bachelor of Biomedical Science (Assured) are guaranteed an MD place on completion, provided GPA ≥2.5 every semester — up to 10 places reserved for rural entry and 10 for Indigenous students (2026 intake). (2) Standard graduate-entry: 4-year MD open to holders of any bachelor's (within 10 years, or final year).",
      requirements:
        "Assured Pathway: UCAT + interview at entry to the Bachelor of Biomedical Science (Assured); GPA ≥2.5/semester to keep the guaranteed place. Standard graduate-entry: GPA + GAMSAT + Casper + interview, cutoffs advertised annually.",
      nzNote: MD_NZ_CAVEAT,
      sourceNote: "notredame.edu.au/programs/school-of-health-sciences/undergraduate/bachelor-of-biomedical-science-assured — directly fetched and verified.",
    },
    description:
      "Small, boutique Catholic university with strong ethics focus and small class sizes. Genuinely offers chemistry as part of its Bachelor of Science (not research-intensive like the Go8s). No fashion program.",
    fields: {
      chemistry: ["Bachelor of Science — core chemistry units across Science Streams (Biology & Environment, Human & Medical Science, Multidisciplinary Science)"],
      biology: ["Bachelor of Science (Major: Biology) — covers Animal Diversity, Microbiology, Aquatic Science (confirm directly whether timetabled at the Sydney/Broadway campus each intake, as some Notre Dame science majors are Fremantle-only)"],
      business: ["Bachelor of Business — School of Law & Business, Broadway"],
      medicalSciences: [
        "Bachelor of Biomedical Science — School of Health Sciences, Darlinghurst site (anatomy, molecular/cell biology, microbiology, biochemistry, genetics, pathology, physiology, immunology, neuroscience) with a 150-hour research/lab placement",
        "Bachelor of Advanced Biomedical Science (Honours)",
      ],
    },
    medicalSciencesNote:
      "Also offered as a Bachelor of Biomedical Science \"Assured Pathway\" into the Doctor of Medicine (that clinical pathway itself is out of scope here). Notre Dame Sydney's Primary Care Research group does digital-health/self-monitoring device research, but this is a research-centre activity, not an undergraduate medtech/innovation degree — no genuine crossover program at the degree level.",
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
  {
    id: "otago",
    city: "nz",
    name: "University of Otago",
    type: "University",
    location: "Dunedin",
    lat: -45.8648,
    lng: 170.514,
    website: "https://www.otago.ac.nz",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 with University Entrance. No subject requirements for Health Sciences First Year.",
      english: "University Entrance literacy (10 Level 2+ credits in reading and writing).",
      feeStatus: "Domestic (NZ citizen): government-subsidised fees, StudyLink loan available.",
      subjectPrerequisites: "Health Sciences First Year: no subject requirements, but Otago strongly recommends Chemistry, Physics and Calculus to NCEA Level 3, plus an English-rich subject. JumpStart Physics (3 weeks in February, NZ$990 in 2027) is for students with under 14 Level 2 Physics credits.",
      sourceNote: "otago.ac.nz Health Sciences First Year: preparing to study and admission FAQs; otago.ac.nz JumpStart Physics page.",
    },
    mdPathway: {
      hasProgram: "Yes — Bachelor of Medicine and Bachelor of Surgery (MB ChB), 6 years including the first year.",
      entry: "Three admission categories into second year. Health Sciences First Year (HSFY, Dunedin) is the main one: about 70% of the places left after the Alternative category. Graduate category: a first degree completed within the three years before applying. Alternative category: domestic applicants only (for example older graduates and health professionals). Equity pathways (the Mirror on Society policy) give priority to Māori, Pacific, rural-origin, low-socioeconomic and refugee-background applicants, who still have to meet the academic standard.",
      requirements: "HSFY: all seven first-year papers (chemistry, biochemistry, cell biology, physics, two human body systems papers, population health) passed, with at least a 65% average in the best seven; offers need far more. UCAT ANZ sat in the application year (July). Applications open around 1 July and closed 13 Aug in 2026. Without an offer, the year counts towards a BSc, BBiomedSc or other health degree.",
      sourceNote: "otago.ac.nz MB ChB qualification page and Medicine admissions pages (official pages block automated reads; category detail cross-checked with secondary guides).",
    },
    description:
      "NZ's oldest medical school and the main route into medicine for school leavers, through Health Sciences First Year in Dunedin. Clinical years are taught in Dunedin, Christchurch and Wellington.",
    fields: {
      medicalSciences: [
        "Health Sciences First Year, then MB ChB (6 years in total)",
        "Bachelor of Biomedical Sciences (BBiomedSc), often started through Health Sciences First Year",
      ],
      biology: ["Bachelor of Science — biological science majors"],
      chemistry: ["Bachelor of Science — Chemistry major"],
      business: ["Bachelor of Commerce"],
    },
  },
  {
    id: "auckland",
    city: "nz",
    name: "University of Auckland",
    type: "University",
    location: "Auckland (City campus, Grafton for medicine)",
    lat: -36.8523,
    lng: 174.7691,
    website: "https://www.auckland.ac.nz",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 with University Entrance. Entry uses a rank score: the best 80 Level 3 credits from up to 5 approved subjects (max 24 per subject), Excellence 4, Merit 3, Achieved 2, out of 320. A guaranteed entry score of 200 applies across the health programmes.",
      english: "University Entrance literacy.",
      feeStatus: "Domestic (NZ citizen): government-subsidised fees, StudyLink loan available.",
      subjectPrerequisites: "Bachelor of Biomedical Science and Bachelor of Health Sciences: no named NCEA subjects found on the course pages.",
      sourceNote: "auckland.ac.nz NCEA rank score page; Bachelor of Biomedical Science page; health programmes news release, 19 May 2026.",
    },
    mdPathway: {
      hasProgram: "Yes — Bachelor of Medicine and Bachelor of Surgery (MBChB), 6 years including the first year. 317 domestic places a year.",
      entry: "First Year entry (the school-leaver route): a full-time first year of the Bachelor of Biomedical Science, the Bachelor of Health Sciences (Community Health or Health Systems and Data Analytics) or a health-related BSc major (Cell and Molecular Bioscience, Exercise Sciences, Medicinal Chemistry, Nutrition, Pharmacology, Physiology), then entry to MBChB Year 2. Graduate entry: a NZ degree with a GPA of 6.0 (B+), completed in minimum time within five years. Special entry schemes exist for Māori, Pacific and rural applicants.",
      requirements: "From 2028 entry: a GPA of 6.0 across BIOSCI 107, CHEM 190, MEDSCI 142 and POPLHLTH 111, no grade below B in the eight required courses, first attempts only. Casper (an online situational-judgement test) in the application year replaces the UCAT; final ranking is the MMI (recorded, asynchronous) 50% and Casper 50%. Applications close 1 July of the first year.",
      sourceNote: "auckland.ac.nz MBChB programme page (2027 and 2028 entry requirements); health programmes news release, 19 May 2026.",
    },
    description:
      "NZ's largest university. Medicine is entered after one first year in biomedical science, health sciences or a health BSc major; the first year counts towards that degree if medicine doesn't follow.",
    fields: {
      medicalSciences: [
        "Bachelor of Biomedical Science (new 2027) — a first-year route into MBChB Year 2",
        "Bachelor of Health Sciences — also a first-year route into MBChB",
        "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
      ],
      biology: ["Bachelor of Science — Cell and Molecular Bioscience, Physiology, Pharmacology majors"],
      chemistry: ["Bachelor of Science — Medicinal Chemistry major"],
      business: ["Bachelor of Commerce"],
    },
  },
  {
    id: "victoria-wgtn",
    city: "nz",
    name: "Victoria University of Wellington | Te Herenga Waka",
    type: "University",
    location: "Wellington (Kelburn)",
    lat: -41.2902,
    lng: 174.7681,
    website: "https://www.wgtn.ac.nz",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 with University Entrance.",
      english: "University Entrance literacy.",
      feeStatus: "Domestic (NZ citizen): government-subsidised fees, StudyLink loan available.",
      subjectPrerequisites: "Bachelor of Biomedical Science: University Entrance; biology, chemistry and maths are useful background, and Level 3 Chemistry is strongly recommended. Introductory courses cover gaps.",
      sourceNote: "wgtn.ac.nz Bachelor of Biomedical Science and NZ University Entrance pages; careers.govt.nz qualification listing.",
    },
    mdPathway: {
      hasProgram: "No medical school. A home-city degree that leads to graduate-entry medicine elsewhere.",
      entry: "After the 3-year Bachelor of Biomedical Science: Otago's Graduate category (degree within three years, UCAT), Auckland's graduate entry (GPA 6.0, Casper, MMI), or Waikato's 4-year graduate MD (B average, GAMSAT, interview).",
      requirements: "Grades across the whole degree count, so the first year matters as much as the last.",
      sourceNote: "Entry rules from the Otago, Auckland and Waikato medicine pages; see those institutions.",
    },
    description:
      "Wellington's university: study from home, then apply to graduate-entry medicine. Otago also teaches medical students in Wellington in their clinical years.",
    fields: {
      medicalSciences: ["Bachelor of Biomedical Science (3 years): molecular and cell biology, biochemistry, genetics, neuroscience, reproduction"],
      biology: ["Bachelor of Science — biology majors"],
      chemistry: ["Bachelor of Science — Chemistry major"],
      business: ["Bachelor of Commerce"],
    },
  },
  {
    id: "waikato",
    city: "nz",
    name: "University of Waikato",
    type: "University",
    location: "Hamilton",
    lat: -37.7876,
    lng: 175.3175,
    website: "https://www.waikato.ac.nz",
    entryRequirements: {
      ncealLevel: "L3",
      academic: "NCEA Level 3 with University Entrance for undergraduate study. The MD itself is graduate-entry.",
      english: "University Entrance literacy.",
      feeStatus: "Domestic (NZ citizen): government-subsidised fees, StudyLink loan available.",
      sourceNote: "waikato.ac.nz New Zealand Graduate School of Medicine page.",
    },
    mdPathway: {
      hasProgram: "Yes, from 2028 — Doctor of Medicine (MD) at the New Zealand Graduate School of Medicine: 4 years, graduate-entry, first intake of 120 in 2028. Not yet accredited (as of Oct 2026).",
      entry: "Graduate entry only: a bachelor's degree in any field (or in its final year) with a B average, a passing GAMSAT and an admissions interview. Year 1 is in Hamilton; Years 2–4 are clinical placements in Waikato, Bay of Plenty, Taranaki/Whanganui, Hawke's Bay or Nelson/Marlborough.",
      requirements: "Indicative, until accreditation: GAMSAT pass (guides say 50 overall with no section under 50), B average, interview. For the first 2028 intake the GAMSAT had to be sat by March 2027 and applications open mid-2027; for a later intake, the same pattern a year before entry. Focus on rural and regional medicine and primary care.",
      sourceNote: "waikato.ac.nz New Zealand Graduate School of Medicine page; cutline.nz graduate-entry guide (GAMSAT threshold).",
    },
    description:
      "Hamilton university opening NZ's third medical school: a graduate-entry MD from 2028, training doctors for regional and rural New Zealand.",
    fields: {
      medicalSciences: ["Doctor of Medicine (MD), graduate entry, from 2028 — New Zealand Graduate School of Medicine"],
      biology: ["Bachelor of Science — biological sciences"],
    },
  },
];
