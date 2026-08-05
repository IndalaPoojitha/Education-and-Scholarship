import { MentorshipProgram, EducationalGuide } from '../types';

export const MENTORSHIP_PROGRAMS: MentorshipProgram[] = [
  {
    id: 'women-in-tech-mentors',
    title: 'Global Women in Tech Peer & Executive Mentorship',
    organization: 'Women Tech Network',
    description: '1-on-1 monthly mentoring pairing female software engineers, data scientists, and product managers with senior female executives at companies like Google, Microsoft, and Adobe.',
    targetAudience: 'Undergraduate and graduate female students in STEM & AI fields',
    duration: '6 Months (Virtual)',
    locationType: 'Online / Global',
    websiteUrl: 'https://www.womentech.net/mentorship-program',
    tags: ['STEM', 'Tech Executives', '1-on-1 Mentoring', 'Career Guidance']
  },
  {
    id: 'aauw-stem-empowerment',
    title: 'AAUW Career Development & Academic Advisory Circle',
    organization: 'American Association of University Women',
    description: 'Specialized group circles for international female scholars navigating North American higher education, scholarship application strategy, and tenure-track university careers.',
    targetAudience: 'Female Master\'s and PhD candidates across all disciplines',
    duration: '1 Year Program',
    locationType: 'Online / Global',
    websiteUrl: 'https://www.aauw.org/',
    tags: ['Academic Careers', 'PhD Mentorship', 'Fellowship Prep']
  },
  {
    id: 'she-leads-business',
    title: 'She Leads Business & Entrepreneurship Catalyst',
    organization: 'International Women\'s Leadership Forum',
    description: 'Connects aspiring female founders, MBA students, and financial analysts with venture capital partners and women CEOs for pitching, leadership development, and grant acquisition.',
    targetAudience: 'Women studying Business, Economics, Finance & Startups',
    duration: '4 Months cohort',
    locationType: 'Hybrid',
    websiteUrl: 'https://www.womenleadershipforum.org',
    tags: ['Business', 'Startups & VC', 'MBA Mentors', 'Financial Aid Advice']
  },
  {
    id: 'global-health-women-mentors',
    title: 'Women in Global Health & Clinical Medicine Network',
    organization: 'Women in Global Health (WGH)',
    description: 'Pairings for female medical students, clinical researchers, and nursing scholars with global health diplomats, surgeons, and public health professors.',
    targetAudience: 'Medical, Nursing, and Public Health Female Students',
    duration: '9 Months cohort',
    locationType: 'Online / Global',
    websiteUrl: 'https://www.womeningh.org',
    tags: ['Healthcare', 'Medical Research', 'Clinical Mentors']
  }
];

export const EDUCATIONAL_GUIDES: EducationalGuide[] = [
  {
    id: 'winning-scholarship-essay',
    title: 'How to Write a Powerful Women\'s Leadership & Impact Essay',
    category: 'Essay Writing',
    readTime: '6 min read',
    excerpt: 'Learn how to structure your scholarship personal statement to showcase resilience, leadership, and tangible commitment to advancing gender equality in your field.',
    keyTakeaways: [
      'Focus on a pivotal moment that shaped your dedication to your field',
      'Quantify your community impact (e.g., mentored 25 younger girls in robotics)',
      'Connect your degree goals explicitly to solving gender disparities in your country/industry',
      'Avoid cliché hardships; emphasize your agency, resourcefulness, and future vision'
    ],
    content: [
      'Scholarship selection committees read hundreds of personal statements. What sets top female candidates apart is not just academic excellence, but a clear narrative connecting their personal journey with broader impact.',
      'Start with a compelling scene or moment: Describe the precise experience—whether troubleshooting a line of code alone in a lab or noticing the lack of female doctors in your village—that ignited your mission.',
      'Highlight concrete leadership actions: Instead of saying "I am passionate about helping women in STEM", write "I organized a weekly python coding club for 15 high school girls, leading to 3 regional competition wins."',
      'Address financial need with dignity and clarity: Clearly state how funding will remove barriers, allowing you to focus 100% on research, thesis work, or clinical rotations without carrying crippling debt.'
    ]
  },
  {
    id: 'securing-strong-recommendation-letters',
    title: 'Strategic Guide to Securing Impactful Recommendation Letters',
    category: 'Recommendation Letters',
    readTime: '5 min read',
    excerpt: 'Step-by-step framework for requesting, preparing bullet sheets, and guiding your professors and mentors to write glowing, specific recommendation letters.',
    keyTakeaways: [
      'Request letters at least 4 to 6 weeks before the deadline',
      'Provide your recommender with a "Brag Sheet" containing your transcript, resume, and key project highlights',
      'Highlight specific scholarship criteria so recommenders can align their praise with what evaluators look for',
      'Send gentle reminder emails 2 weeks and 3 days before submission dates'
    ],
    content: [
      'A recommendation letter should not just repeat your grades—it should vouch for your character, intellectual curiosity, resilience, and potential as a future leader.',
      'When approaching a professor or supervisor, ask explicitly: "Do you feel you know my academic work and leadership well enough to write a strong letter of recommendation for the AAUW International Fellowship?"',
      'If they agree, send them a organized package including: 1) The scholarship description and mission, 2) Your draft essay, 3) Bullet points of your key achievements in their class or research lab, and 4) Clear submission instructions and deadlines.'
    ]
  },
  {
    id: 'financial-need-statement-framework',
    title: 'Writing an Honest & Dignified Financial Need Statement',
    category: 'Financial Planning',
    readTime: '4 min read',
    excerpt: 'How to present your financial circumstances transparently while emphasizing your academic potential and financial responsibility.',
    keyTakeaways: [
      'Be specific about expenses: tuition, lab fees, books, housing, and dependent care',
      'Outline any existing funding, family contributions, or part-time work already secured',
      'Explain how the scholarship bridge funding will transform your academic focus'
    ],
    content: [
      'Many scholarships require a financial need statement. Evaluators want to understand your real budget gap without making you feel uncomfortable.',
      'Structure your statement into three clear parts: 1) Current financial status and family background, 2) Itemized annual education cost vs current resources, and 3) Impact of receiving this grant on your concentration and graduation timeline.'
    ]
  },
  {
    id: 'acing-scholarship-interviews',
    title: 'Acing Your Scholarship & Fellowship Interview',
    category: 'Interview Prep',
    readTime: '7 min read',
    excerpt: 'Master the common interview questions for major international fellowships, articulate your research clearly, and convey confidence.',
    keyTakeaways: [
      'Prepare a 60-second elevator pitch summarizing your research and vision',
      'Practice answering "Tell us about a time you faced a significant obstacle and how you overcame it"',
      'Research the scholarship founding body and reference their core mission in your answers',
      'Prepare 2-3 thoughtful questions to ask the interview panel at the end'
    ],
    content: [
      'Scholarship interview panels want to meet the person behind the paper application. They look for authenticity, poise, enthusiasm, and alignment with the foundation\'s values.',
      'Use the STAR method (Situation, Task, Action, Result) when answering situational questions. Keep technical explanations accessible to intelligent non-experts unless interviewed by a specialized scientific panel.'
    ]
  }
];

export const WOMEN_EDUCATION_STATS = [
  { metric: '$28 Trillion', label: 'Potential boost to global GDP by closing gender gaps in education & workforce' },
  { metric: '50%+', label: 'Higher earning potential for women with completed higher education degrees' },
  { metric: '90%', label: 'Of female income re-invested into family nutrition, healthcare, and children\'s education' },
  { metric: '1 in 3', label: 'STEM researchers globally are women — scholarships actively bridge this gap' }
];
