import { Scholarship } from '../types';

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'aauw-international-fellowship',
    title: 'AAUW International Fellowships for Women',
    provider: 'American Association of University Women (AAUW)',
    amount: '$20,000 - $50,000 / year',
    amountValue: 50000,
    level: ['Graduate / Master\'s', 'PhD / Postdoctoral'],
    field: ['STEM (Science, Tech, Eng, Math)', 'Medicine & Public Health', 'Arts & Humanities', 'Law, Policy & Social Impact', 'Business & Entrepreneurship'],
    region: ['Global / All Countries'],
    deadline: 'November 15, 2026',
    deadlineDate: '2026-11-15',
    description: 'AAUW International Fellowships support women pursuing full-time graduate or postdoctoral study in the United States who are not U.S. citizens or permanent residents. Preference is given to women who show commitment to the advancement of women and girls through civic, community, or professional work.',
    eligibility: [
      'Must identify as female',
      'Must hold a citizenship in a country other than the U.S.',
      'Must hold an academic degree equivalent to a U.S. bachelor\'s degree',
      'Intend to devote themselves full-time to the proposed academic plan',
      'Plan to return to their home country to pursue a professional career'
    ],
    requirements: [
      'Official academic transcripts with English translations',
      'Three letters of recommendation',
      'Proof of English proficiency (TOEFL / IELTS)',
      'Personal narrative essay on commitment to women empowerment',
      'Proof of admission to accredited institution'
    ],
    tags: ['Fully Funded', 'Global Leaders', 'Graduate Study', 'Equity & Diversity'],
    isFullyFunded: true,
    websiteUrl: 'https://www.aauw.org/resources/programs/fellowships-grants/',
    targetAudience: 'International female graduate & doctoral scholars',
    applicationFee: 'Free',
    acceptanceRateEstimate: 'High Prestige (Competitive)',
    keyDates: [
      { event: 'Applications Open', date: 'August 1, 2026' },
      { event: 'Deadline', date: 'November 15, 2026' },
      { event: 'Winner Announcement', date: 'April 15, 2027' }
    ]
  },
  {
    id: 'google-women-techmakers',
    title: 'Google Women Techmakers Scholars Program',
    provider: 'Google Inc.',
    amount: '$10,000 USD (plus Global Retreat)',
    amountValue: 10000,
    level: ['Undergraduate', 'Graduate / Master\'s', 'PhD / Postdoctoral'],
    field: ['STEM (Science, Tech, Eng, Math)'],
    region: ['North America', 'Europe', 'Asia-Pacific', 'Latin America & Caribbean', 'Africa', 'Middle East'],
    deadline: 'December 1, 2026',
    deadlineDate: '2026-12-01',
    description: 'Through the Women Techmakers Scholars Program, Google furthers Dr. Anita Borg\'s vision of creating gender equality in computer science. Selected scholars receive funding, mentorship, and an invitation to the annual Google Scholar Retreat.',
    eligibility: [
      'Identify as a woman studying Computer Science, Computer Engineering, or related technical field',
      'Enrolled as a full-time student for the upcoming academic year',
      'Demonstrate a strong academic record and passion for technology',
      'Exemplify leadership and passion for increasing female representation in tech'
    ],
    requirements: [
      'Resume/CV focusing on technical projects and community initiatives',
      'Academic transcripts',
      'Responses to 4 short-answer leadership essay prompts',
      'One letter of recommendation from a professor or supervisor'
    ],
    tags: ['Tech & AI', 'Mentorship', 'Google Retreat', 'Underrepresented STEM'],
    isFullyFunded: false,
    websiteUrl: 'https://buildyourfuture.withgoogle.com/scholarships/women-techmakers-scholars-program',
    targetAudience: 'Women pursuing computer science & technical fields',
    applicationFee: 'Free',
    keyDates: [
      { event: 'Applications Open', date: 'September 15, 2026' },
      { event: 'Application Close', date: 'December 1, 2026' }
    ]
  },
  {
    id: 'schlumberger-faculty-for-the-future',
    title: 'Schlumberger Faculty for the Future Fellowships',
    provider: 'SLB Foundation',
    amount: 'Up to $50,000 USD / year (Renewable)',
    amountValue: 50000,
    level: ['PhD / Postdoctoral'],
    field: ['STEM (Science, Tech, Eng, Math)', 'Environmental & Agricultural Sciences'],
    region: ['Africa', 'Asia-Pacific', 'Latin America & Caribbean', 'Middle East'],
    deadline: 'November 10, 2026',
    deadlineDate: '2026-11-10',
    description: 'Grants funded by the SLB Foundation are awarded to women from developing and emerging economies who are preparing for PhD or post-doctoral research in physical sciences, engineering, and technology at top universities worldwide.',
    eligibility: [
      'Citizen of a developing country or emerging economy',
      'Female scientist or engineer preparing for PhD or Postdoc study',
      'Enrolled or accepted at a host university abroad',
      'Commitment to return to home country to teach and inspire future female scientists'
    ],
    requirements: [
      'Comprehensive research proposal & budget outline',
      'Curriculum Vitae highlighting publications and awards',
      '4 letters of recommendation (including home & host institution supervisors)',
      'Proof of university acceptance'
    ],
    tags: ['PhD & Postdoc', 'Developing Nations', 'STEM Research', 'Faculty Career'],
    isFullyFunded: true,
    websiteUrl: 'https://www.facultyforthefuture.net/',
    targetAudience: 'Female scientists from developing nations pursuing PhD/Postdoc',
    applicationFee: 'Free'
  },
  {
    id: 'adobe-women-in-technology',
    title: 'Adobe Research Women-in-Technology Scholarship',
    provider: 'Adobe Systems Inc.',
    amount: '$10,000 USD + Adobe Creative Cloud + Internship Offer',
    amountValue: 10000,
    level: ['Undergraduate', 'Graduate / Master\'s'],
    field: ['STEM (Science, Tech, Eng, Math)'],
    region: ['North America', 'Global / All Countries'],
    deadline: 'October 30, 2026',
    deadlineDate: '2026-10-30',
    description: 'Adobe Research Women-in-Technology Scholarship recognizes outstanding female undergraduate and master\'s students studying computer science, AI, data science, or mobile computing. Includes a 1-year Adobe Creative Cloud subscription and guaranteed interview for Adobe internship.',
    eligibility: [
      'Identifies as female',
      'Enrolled as an undergraduate or master\'s student in Computer Science or related field',
      'Demonstrates high academic standing and technical innovation',
      'Has not previously received the Adobe Women-in-Tech Scholarship'
    ],
    requirements: [
      'Resume showcasing research, GitHub projects, or hackathons',
      'Transcripts',
      'Letter of recommendation',
      'Short video introduction (60-90 seconds) detailing technical passion'
    ],
    tags: ['Artificial Intelligence', 'Software Dev', 'Internship Included', 'Creative Tech'],
    isFullyFunded: false,
    websiteUrl: 'https://research.adobe.com/scholarship/',
    targetAudience: 'Female undergrads & master\'s students in CS & AI',
    applicationFee: 'Free'
  },
  {
    id: 'loreal-unesco-women-in-science',
    title: 'L\'Oréal-UNESCO International For Women in Science Awards',
    provider: 'L\'Oréal Foundation & UNESCO',
    amount: '€15,000 - €100,000 EUR',
    amountValue: 45000,
    level: ['PhD / Postdoctoral'],
    field: ['STEM (Science, Tech, Eng, Math)', 'Medicine & Public Health', 'Environmental & Agricultural Sciences'],
    region: ['Global / All Countries'],
    deadline: 'January 20, 2027',
    deadlineDate: '2027-01-20',
    description: 'Created in 1998, the L\'Oréal-UNESCO For Women in Science program recognizes and supports eminent women researchers throughout their scientific careers in Life Sciences, Physical Sciences, Mathematics, and Computer Science.',
    eligibility: [
      'Active female researcher conducting doctoral or postdoctoral research',
      'Outstanding scientific performance and peer-reviewed contributions',
      'Nominated or self-applied according to national/regional fellowship rules'
    ],
    requirements: [
      'Detailed description of research project and scientific impact',
      'List of published peer-reviewed papers',
      'Two professional recommendation letters from senior scientists',
      'Ethics compliance statement'
    ],
    tags: ['Global Prestigious', 'Life Sciences', 'Public Health', 'Scientific Leadership'],
    isFullyFunded: true,
    websiteUrl: 'https://www.forwomeninscience.com/',
    targetAudience: 'Female doctoral and postdoctoral scientific researchers',
    applicationFee: 'Free'
  },
  {
    id: 'swe-society-women-engineers',
    title: 'Society of Women Engineers (SWE) Annual Scholarships',
    provider: 'Society of Women Engineers',
    amount: '$1,000 - $20,000 per award',
    amountValue: 15000,
    level: ['High School Senior', 'Undergraduate', 'Graduate / Master\'s', 'Adult & Re-entry Student'],
    field: ['STEM (Science, Tech, Eng, Math)'],
    region: ['North America', 'Global / All Countries'],
    deadline: 'February 15, 2027',
    deadlineDate: '2027-02-15',
    description: 'SWE Scholarships support women pursuing ABET-accredited bachelor or graduate degree programs in preparation for careers in engineering, engineering technology, and computer science.',
    eligibility: [
      'Identify as a woman preparing to enter or enrolled in engineering or computer science',
      'Minimum GPA requirement of 3.0 on a 4.0 scale',
      'Attending an accredited university'
    ],
    requirements: [
      'Single application applies to over 300+ individual SWE scholarships',
      'Official academic transcripts',
      'One resume and two recommendation letters',
      'Statement of engineering goals and community engagement'
    ],
    tags: ['Engineering', 'Multiple Awards', 'Re-Entry Friendly', 'Undergrad & Grad'],
    isFullyFunded: false,
    websiteUrl: 'https://swe.org/scholarships/',
    targetAudience: 'Women studying engineering and applied technology',
    applicationFee: 'Free'
  },
  {
    id: 'peo-international-peace-scholarship',
    title: 'P.E.O. International Peace Scholarship (IPS)',
    provider: 'P.E.O. International Sisterhood',
    amount: '$12,500 USD Grants',
    amountValue: 12500,
    level: ['Graduate / Master\'s', 'PhD / Postdoctoral'],
    field: ['All Fields', 'General Academic'],
    region: ['Global / All Countries'],
    deadline: 'December 15, 2026',
    deadlineDate: '2026-12-15',
    description: 'The International Peace Scholarship Fund provides grants for international women students to pursue graduate study in the United States and Canada, encouraging global peace and cross-cultural understanding.',
    eligibility: [
      'Must be a woman from outside the U.S. and Canada',
      'Enrolled in full-time graduate study in the U.S. or Canada',
      'Must have at least one full year of academic study remaining',
      'Promise to return to home country upon program completion'
    ],
    requirements: [
      'Proof of full-time enrollment in graduate program',
      'Financial need evaluation form signed by university international advisor',
      'Academic transcripts & letters of reference'
    ],
    tags: ['International Students', 'Peace & Diplomacy', 'Graduate Grant', 'Financial Need'],
    isFullyFunded: false,
    websiteUrl: 'https://www.peointernational.org/about-peo-international-peace-scholarship-ips/',
    targetAudience: 'International female graduate students in USA/Canada',
    applicationFee: 'Free'
  },
  {
    id: 'margaret-mcnamara-education-grants',
    title: 'Margaret McNamara Education Grants (MMEG)',
    provider: 'MMEG Board of Directors',
    amount: '$7,000 - $15,000 USD',
    amountValue: 15000,
    level: ['Undergraduate', 'Graduate / Master\'s', 'PhD / Postdoctoral', 'Vocational & Skill Training'],
    field: ['All Fields', 'Law, Policy & Social Impact', 'Medicine & Public Health', 'Arts & Humanities'],
    region: ['Africa', 'Latin America & Caribbean', 'Asia-Pacific'],
    deadline: 'January 15, 2027',
    deadlineDate: '2027-01-27',
    description: 'MMEG awards grants to exceptional women aged 25 or older from developing countries who are enrolled in accredited universities in the US, Canada, Latin America, South Africa, or France, and who demonstrate commitment to empowering women and children.',
    eligibility: [
      'Self-identify as a woman aged 25 or older at time of application',
      'Be a national of an eligible developing or middle-income country',
      'Be enrolled in an accredited higher education institution',
      'Plan to reside in a developing country after graduation'
    ],
    requirements: [
      'Proof of age and citizenship',
      'Official university registration document',
      'Personal essay on community service for women & children',
      'Two references from professors or NGO leaders'
    ],
    tags: ['Adult Learners', 'Women Aged 25+', 'Community Impact', 'Developing Countries'],
    isFullyFunded: false,
    websiteUrl: 'https://www.mmeg.org/',
    targetAudience: 'Women aged 25+ from developing nations committed to social progress',
    applicationFee: 'Free'
  },
  {
    id: 'jeannette-rankin-womens-scholarship',
    title: 'Jeannette Rankin Foundation Women\'s Education Fund',
    provider: 'Jeannette Rankin Foundation',
    amount: '$2,500 - $10,000 USD / year',
    amountValue: 10000,
    level: ['Undergraduate', 'Vocational & Skill Training', 'Adult & Re-entry Student'],
    field: ['All Fields', 'General Academic', 'Business & Entrepreneurship', 'Medicine & Public Health'],
    region: ['North America'],
    deadline: 'February 28, 2027',
    deadlineDate: '2027-02-28',
    description: 'Named after the first woman elected to the U.S. Congress, this fund provides scholarships and support for low-income women aged 35 and older, empowering them through associate degrees, bachelor\'s degrees, or technical skill certifications.',
    eligibility: [
      'Self-identify as a woman aged 35 or older',
      'Low-income status according to federal poverty guidelines',
      'U.S. citizen or permanent resident',
      'Pursuing first technical certification, associate\'s, or bachelor\'s degree'
    ],
    requirements: [
      'Tax return or proof of financial status',
      'High school diploma or GED transcript',
      'Personal story describing perseverance and career transformation goals',
      'Reference contact details'
    ],
    tags: ['Adult Re-entry', 'Women Aged 35+', 'Low-Income Support', 'Career Transformation'],
    isFullyFunded: false,
    websiteUrl: 'https://rankinfoundation.org/',
    targetAudience: 'Low-income women aged 35+ returning to college',
    applicationFee: 'Free'
  },
  {
    id: 'zonta-jane-klausman-women-in-business',
    title: 'Jane M. Klausman Women in Business Scholarship',
    provider: 'Zonta International',
    amount: '$5,000 - $10,000 USD International Awards',
    amountValue: 10000,
    level: ['Undergraduate', 'Graduate / Master\'s'],
    field: ['Business & Entrepreneurship'],
    region: ['Global / All Countries'],
    deadline: 'August 15, 2026',
    deadlineDate: '2026-08-15',
    description: 'Zonta International helps women pursue undergraduate and master\'s degrees in business management, economics, finance, technology, marketing, or entrepreneurship, positioning them to overcome leadership barriers in corporate and startup sectors.',
    eligibility: [
      'Women of any nationality studying business management, finance, accounting, or tech entrepreneurship',
      'Achieved outstanding academic standing (top 20% of class)',
      'Enrolled in 2nd year of undergrad through final year of master\'s program'
    ],
    requirements: [
      'Verification of enrollment in business program',
      '2 letters of recommendation from faculty or business mentors',
      'Essay on professional goals and overcoming gender disparity in executive roles'
    ],
    tags: ['Business Leaders', 'Finance & Startups', 'Zonta International', 'Executive Track'],
    isFullyFunded: false,
    websiteUrl: 'https://www.zonta.org/JMKScholarship',
    targetAudience: 'Female business, accounting, and finance students',
    applicationFee: 'Free'
  },
  {
    id: 'zonta-amelia-earhart-fellowship',
    title: 'Amelia Earhart Fellowship for Women in Aerospace',
    provider: 'Zonta International',
    amount: '$10,000 USD Fellowship',
    amountValue: 10000,
    level: ['PhD / Postdoctoral'],
    field: ['STEM (Science, Tech, Eng, Math)'],
    region: ['Global / All Countries'],
    deadline: 'November 15, 2026',
    deadlineDate: '2026-11-15',
    description: 'Established in 1938 in honor of legendary aviator Amelia Earhart, this fellowship assists women pursuing doctoral degrees in aerospace engineering, planetary sciences, space technology, and aeronautical physics.',
    eligibility: [
      'Women of any nationality registered in a full-time PhD program in aerospace engineering or space sciences',
      'Demonstrated superior academic record and research achievements',
      'Completed at least one year of doctoral study'
    ],
    requirements: [
      'Transcripts from all higher education institutions attended',
      'Detailed PhD dissertation research proposal',
      '3 recommendations from academic advisors and scientists'
    ],
    tags: ['Aerospace Engineering', 'Space Science', 'PhD Research', 'Pioneer Legacy'],
    isFullyFunded: false,
    websiteUrl: 'https://www.zonta.org/AEFellowship',
    targetAudience: 'Women pursuing PhDs in Aerospace Engineering & Space Sciences',
    applicationFee: 'Free'
  },
  {
    id: 'gladys-carol-scholarship-math-science',
    title: 'Gladys Carol Scholarship for Women in Pure & Applied Sciences',
    provider: 'Gladys Carol Scholarship Fund',
    amount: '$5,000 USD / year (Renewable up to 2 years)',
    amountValue: 5000,
    level: ['Undergraduate'],
    field: ['STEM (Science, Tech, Eng, Math)', 'Environmental & Agricultural Sciences'],
    region: ['North America'],
    deadline: 'March 31, 2027',
    deadlineDate: '2027-03-31',
    description: 'Designed to support full-time female undergraduate students pursuing STEM degrees at accredited colleges or universities, with an emphasis on pure mathematics, physics, chemistry, and environmental science.',
    eligibility: [
      'Identify as a woman enrolled full-time in a 4-year university',
      'Minimum cumulative GPA of 3.75 on a 4.0 scale',
      'Declared major in pure or applied sciences or mathematics'
    ],
    requirements: [
      'Official academic transcript',
      '500-word personal statement on passion for scientific discovery',
      'Letter of recommendation from science or math department head'
    ],
    tags: ['Pure Mathematics', 'High GPA', 'Undergraduate STEM', 'Renewable'],
    isFullyFunded: false,
    websiteUrl: 'http://gcenscholarship.com/',
    targetAudience: 'High-achieving female undergraduates in math, physics, chemistry',
    applicationFee: 'Free'
  },
  {
    id: 'global-women-leaders-healthcare-grant',
    title: 'Global Change Women Leaders in Healthcare & Nursing Fellowship',
    provider: 'International Women in Medicine Alliance',
    amount: '$18,000 USD + Mentorship Network',
    amountValue: 18000,
    level: ['Undergraduate', 'Graduate / Master\'s', 'PhD / Postdoctoral'],
    field: ['Medicine & Public Health'],
    region: ['Global / All Countries'],
    deadline: 'October 15, 2026',
    deadlineDate: '2026-10-15',
    description: 'A global grant aimed at equipping female medical students, clinical researchers, nurses, and public health practitioners with training funding and clinical equipment stipends to improve maternal health and epidemic defense.',
    eligibility: [
      'Female student or fellow in Medicine (MD/MBBS), Nursing, Dentistry, or Master of Public Health (MPH)',
      'Demonstrated commitment to rural or underserved community healthcare',
      'Enrolled in an accredited health sciences program'
    ],
    requirements: [
      'Academic credentials & clinical rotation reports',
      'Community healthcare action plan proposal',
      '2 clinical supervisor recommendation letters'
    ],
    tags: ['Healthcare & Nursing', 'Maternal Health', 'Public Health', 'Clinical Grant'],
    isFullyFunded: false,
    websiteUrl: 'https://www.womeninmedicine.org/grants',
    targetAudience: 'Women studying medicine, nursing, and global public health',
    applicationFee: 'Free'
  },
  {
    id: 'women-in-law-social-justice-fellowship',
    title: 'Ruth Bader Ginsburg Women in Law & Social Justice Grant',
    provider: 'Global Foundation for Equal Justice',
    amount: '$25,000 USD Annual Tuition Grant',
    amountValue: 25000,
    level: ['Graduate / Master\'s', 'PhD / Postdoctoral'],
    field: ['Law, Policy & Social Impact'],
    region: ['Global / All Countries'],
    deadline: 'November 30, 2026',
    deadlineDate: '2026-11-30',
    description: 'Honoring civil rights advocates, this fellowship provides tuition support to women law students (JD/LLM/SJD) working on gender equality litigation, human rights protection, reproductive rights, and domestic violence prevention legislation.',
    eligibility: [
      'Women pursuing law degrees (JD, LLM, or Doctorate in Law)',
      'Proven record of pro bono, legal clinic, or advocacy work for women\'s human rights',
      'Top tier academic standing'
    ],
    requirements: [
      'Law school transcript & class ranking statement',
      'Legal writing sample on gender equity case law or policy',
      'Two letters of recommendation from law professors or civil rights attorneys'
    ],
    tags: ['Law & Policy', 'Human Rights', 'Gender Equality', 'Legal Advocacy'],
    isFullyFunded: false,
    websiteUrl: 'https://www.womeninlawfoundation.org/grants',
    targetAudience: 'Female law students and legal scholars in human rights',
    applicationFee: 'Free'
  }
];
