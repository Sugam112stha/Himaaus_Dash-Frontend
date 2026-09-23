import type { Partner } from "../types/partner";
import type { Milestone } from "../types/milestone";
import type { Testimonial } from "../types/testimonial";

// Partner logos
import aibiLogo from "../../../assets/partners/AIBI-LOGO.jpg";
import ecaLogo from "../../../assets/partners/ECA_LOGO.jpg";
import ihnaLogo from "../../../assets/partners/IHNA.jpg";
import skillAustraliaLogo from "../../../assets/partners/SKILL_AUSTRALIA.jpg";
import vuLogo from "../../../assets/partners/VU.jpg";
import whitehouseLogo from "../../../assets/partners/Whitehouse.jpg";

// Student photos
import bikkiGurungPhoto from "../../../assets/testimonials/bikki-gurung.jpg";
import sadhanaBasnetPhoto from "../../../assets/testimonials/sadhana-basnet.jpg";
import satishPahariPhoto from "../../../assets/testimonials/satish-pahari.jpg";
import seemaPandeyPhoto from "../../../assets/testimonials/seema-pandey.jpg";
import shankarUpretyPhoto from "../../../assets/testimonials/shankar-uprety.jpg";
import sunilThapaPhoto from "../../../assets/testimonials/sunil-thapa.jpg";

/**
 * Centralized mock data for the Testimonials / Partners / Milestones module.
 * Replace with real API responses when backend integration is ready — the
 * services layer is the only place that needs to change.
 */

// ---------------------------------------------------------------------------
// Partners
// ---------------------------------------------------------------------------
export const partnerCategories = [
  "University",
  "Higher Education",
  "Vocational Education (RTO)",
  "Nursing & Health Institute",
  "Design & Creative Institute",
];

export const partnerCountries = [
  "Australia",
  "Nepal",
  "USA",
  "United Kingdom",
  "Canada",
  "New Zealand",
  "Germany",
  "Japan",
];

export const partnersData: Partner[] = [
  {
    id: "ptn_001",
    logo: vuLogo,
    name: "Victoria University",
    country: "Australia",
    category: "University",
    website: "https://www.vu.edu.au",
    description:
      "A public university based in Melbourne offering a wide range of undergraduate and postgraduate degrees across business, IT, health, and engineering.",
    status: "Active",
    createdAt: "2025-01-14",
  },
  {
    id: "ptn_002",
    logo: aibiLogo,
    name: "AIBI Higher Education",
    country: "Australia",
    category: "Higher Education",
    website: "https://www.aibi.nsw.edu.au",
    description:
      "A higher education institution offering diploma and degree programs in business, accounting, and information technology.",
    status: "Active",
    createdAt: "2025-02-02",
  },
  {
    id: "ptn_003",
    logo: ihnaLogo,
    name: "IHNA — International Institute of Health and Nursing Australia",
    country: "Australia",
    category: "Nursing & Health Institute",
    website: "https://www.ihna.edu.au",
    description:
      "A specialist health and community services college offering nursing, aged care, and allied health qualifications across several Australian campuses.",
    status: "Active",
    createdAt: "2025-02-20",
  },
  {
    id: "ptn_004",
    logo: skillAustraliaLogo,
    name: "Skills Australia Institute",
    country: "Australia",
    category: "Vocational Education (RTO)",
    website: "https://www.skillsaustralia.edu.au",
    description:
      "A registered training organisation delivering vocational certificate and diploma courses in business, early childhood education, and community services.",
    status: "Active",
    createdAt: "2025-03-05",
  },
  {
    id: "ptn_005",
    logo: whitehouseLogo,
    name: "Whitehouse Institute of Design",
    country: "Australia",
    category: "Design & Creative Institute",
    website: "https://www.whitehouse-design.edu.au",
    description:
      "A leading creative institute offering diploma and degree programs in fashion design, interior design, and visual communication.",
    status: "Active",
    createdAt: "2025-03-22",
  },
  {
    id: "ptn_006",
    logo: ecaLogo,
    name: "ECA",
    country: "Australia",
    category: "Vocational Education (RTO)",
    website: "https://www.eca.edu.au",
    description:
      "An accredited college offering English language pathway programs alongside vocational certificate and diploma courses.",
    status: "Active",
    createdAt: "2025-04-10",
  },
];

// ---------------------------------------------------------------------------
// Milestones
// ---------------------------------------------------------------------------
export const milestoneIconOptions = [
  "Users",
  "GraduationCap",
  "Globe2",
  "Award",
  "Building2",
  "Plane",
  "BookOpen",
  "Trophy",
  "Briefcase",
  "Star",
  "Heart",
  "Target",
  "CheckCircle2",
  "TrendingUp",
  "MapPin",
  "Calendar",
];

export const milestonesData: Milestone[] = [
  {
    id: "mst_001",
    title: "Students Placed",
    value: 4500,
    suffix: "+",
    description:
      "Students successfully placed in universities and colleges across Australia.",
    icon: "GraduationCap",
    displayOrder: 1,
    status: "Visible",
    createdAt: "2025-01-10",
  },
  {
    id: "mst_002",
    title: "Partner Institutions",
    value: 120,
    suffix: "+",
    description: "Universities and colleges we actively partner with across Australia.",
    icon: "Building2",
    displayOrder: 2,
    status: "Visible",
    createdAt: "2025-01-15",
  },
  {
    id: "mst_003",
    title: "Years of Experience",
    value: 15,
    suffix: "+",
    description: "Years of trusted experience guiding students abroad.",
    icon: "Award",
    displayOrder: 3,
    status: "Visible",
    createdAt: "2025-01-20",
  },
  {
    id: "mst_004",
    title: "Visa Success Rate",
    value: 98,
    suffix: "%",
    description: "Average visa approval success rate for our applicants.",
    icon: "CheckCircle2",
    displayOrder: 4,
    status: "Hidden",
    createdAt: "2025-02-14",
  },
  {
    id: "mst_005",
    title: "Scholarships Secured",
    value: 320,
    suffix: "+",
    description: "Scholarships and financial aid packages secured for students.",
    icon: "Trophy",
    displayOrder: 5,
    status: "Visible",
    createdAt: "2025-03-06",
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export const testimonialsData: Testimonial[] = [
  {
    id: "t_001",
    name: "Bikki Gurung",
    position: "Bachelor of Information Technology",
    university: "Victoria University",
    country: "Australia",
    review:
      "Choosing Victoria University was the best decision for my career, and the guidance I got along the way made the whole process so much easier. Every step, from choosing my course to visa filing, was handled with real care.",
    image: bikkiGurungPhoto,
    rating: 5,
    featured: true,
    status: "Published",
    createdAt: "2026-06-02",
  },
  {
    id: "t_002",
    name: "Sadhana Basnet",
    position: "Diploma of Nursing",
    university: "IHNA — International Institute of Health and Nursing Australia",
    country: "Australia",
    review:
      "I always wanted to build a career in healthcare, and the team helped me find the right course and prepare a strong application from start to finish. I felt supported at every stage.",
    image: sadhanaBasnetPhoto,
    rating: 5,
    featured: true,
    status: "Published",
    createdAt: "2026-05-18",
  },
  {
    id: "t_003",
    name: "Satish Pahari",
    position: "Master of Business Administration",
    university: "AIBI Higher Education",
    country: "Australia",
    review:
      "The counseling process was thorough and honest — they helped me pick a program that actually matched my goals instead of just pushing the easiest option. My visa was approved without any issues.",
    image: satishPahariPhoto,
    rating: 4,
    featured: false,
    status: "Published",
    createdAt: "2026-05-05",
  },
  {
    id: "t_004",
    name: "Seema Pandey",
    position: "Diploma of Fashion Design",
    university: "Whitehouse Institute of Design",
    country: "Australia",
    review:
      "Studying design abroad felt like a huge leap, but the team broke everything down into manageable steps. I couldn't have navigated the application and visa process without their support.",
    image: seemaPandeyPhoto,
    rating: 5,
    featured: false,
    status: "Draft",
    createdAt: "2026-07-01",
  },
  {
    id: "t_005",
    name: "Shankar Uprety",
    position: "Certificate IV in Community Services",
    university: "Skills Australia Institute",
    country: "Australia",
    review:
      "From my first consultation to the day I landed in Australia, the support never stopped. They answered every question patiently, even the ones I asked more than once.",
    image: shankarUpretyPhoto,
    rating: 4,
    featured: false,
    status: "Published",
    createdAt: "2026-04-14",
  },
  {
    id: "t_006",
    name: "Sunil Thapa",
    position: "Diploma of Business",
    university: "ECA",
    country: "Australia",
    review:
      "I appreciated how clearly everything was explained, from course selection to documentation. The process felt organized and I always knew what to expect next.",
    image: sunilThapaPhoto,
    rating: 4,
    featured: false,
    status: "Draft",
    createdAt: "2026-03-20",
  },
];