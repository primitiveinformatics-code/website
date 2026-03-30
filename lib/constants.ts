export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@primitiveinformatics"; // TODO: Update with actual channel URL
export const SAAS_APP_URL = "https://interviews.primitiveinformatics.com"; // TODO: Update with actual SaaS URL
export const CONTACT_EMAIL = "hello@primitiveinformatics.com";

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Primitive Informatics transformed how I prepare for technical interviews. The AI feedback is incredibly detailed and helped me land my dream role at a top tech company.",
    name: "Arjun Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    avatar: "AS",
  },
  {
    id: 2,
    quote:
      "As an educator, I use Primitive Informatics content to help my students understand real-world interview expectations. The depth of topics covered is outstanding.",
    name: "Priya Nair",
    role: "CS Professor",
    company: "IIT Bombay",
    avatar: "PN",
  },
  {
    id: 3,
    quote:
      "I went from failing every system design round to clearing 4 out of 5 interviews in a month. The mock interview platform is genuinely game-changing.",
    name: "Rahul Mehta",
    role: "Backend Engineer",
    company: "Stripe",
    avatar: "RM",
  },
  {
    id: 4,
    quote:
      "The YouTube content is hands-down the best free resource for interview prep. No fluff, all substance. I recommend it to every engineer in my team.",
    name: "Sneha Reddy",
    role: "Engineering Manager",
    company: "Microsoft",
    avatar: "SR",
  },
  {
    id: 5,
    quote:
      "Used the Pro plan for 3 months before switching jobs. The analytics dashboard showed exactly where I was weak, and I improved systematically. Worth every rupee.",
    name: "Kiran Patel",
    role: "Full Stack Developer",
    company: "Flipkart",
    avatar: "KP",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is the AI Mock Interview platform?",
    answer:
      "Our AI Mock Interview platform simulates realistic job interviews using advanced AI. You get asked questions relevant to your target role, and our AI evaluates your responses in real-time — giving you detailed feedback on content, structure, clarity, and delivery. It covers technical, behavioral, and domain-specific interviews.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! Our free tier gives you 3 mock interviews per month, access to basic feedback, and full access to our YouTube content library. No credit card required to get started.",
  },
  {
    question: "What types of interviews do you cover?",
    answer:
      "We cover 50+ interview categories including: Data Structures & Algorithms, System Design, Behavioral (STAR method), Product Sense, Machine Learning, Frontend/Backend/Full-Stack Engineering, SQL & Database design, and more. New categories are added regularly.",
  },
  {
    question: "How do I access the YouTube content?",
    answer:
      "All our YouTube content is completely free! Simply visit our YouTube channel through the link on our website or search 'Primitive Informatics' on YouTube. With a free account, you also get curated playlists and content recommendations based on your interview goals.",
  },
  {
    question: "Can I use this for my team or organization?",
    answer:
      "Absolutely. Our Enterprise plan is designed for teams and educational institutions. It includes custom interview tracks, team analytics, dedicated account management, and volume discounts. Contact us to discuss a custom plan for your organization.",
  },
  {
    question: "How do I report an issue or give feedback?",
    answer:
      "We love feedback! You can reach us at hello@primitiveinformatics.com, use the contact form on this page, or tweet at us @primitiveinformatics. We typically respond within 24 hours. Bug reports can be filed directly from inside the platform.",
  },
];

export const STATS = [
  { value: 10000, suffix: "+", label: "Professionals Trained" },
  { value: 500, suffix: "+", label: "Video Lessons" },
  { value: 95, suffix: "%", label: "Satisfaction Rate" },
  { value: 50, suffix: "+", label: "Interview Categories" },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    cta: "Get Started Free",
    ctaHref: SAAS_APP_URL,
    popular: false,
    features: [
      "3 mock interviews per month",
      "Basic AI feedback",
      "Access to YouTube content library",
      "Community forum access",
      "Email support",
    ],
    missingFeatures: [
      "Detailed analytics dashboard",
      "Unlimited interviews",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious career growth",
    cta: "Start Pro Trial",
    ctaHref: SAAS_APP_URL,
    popular: true,
    features: [
      "Unlimited mock interviews",
      "Detailed AI feedback & scoring",
      "Progress analytics dashboard",
      "All 50+ interview categories",
      "Audio & video content library",
      "Priority email support",
      "Interview performance reports",
    ],
    missingFeatures: [],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For teams & institutions",
    cta: "Contact Sales",
    ctaHref: "/contact",
    popular: false,
    features: [
      "Everything in Pro",
      "Custom interview tracks",
      "Team analytics & reporting",
      "Dedicated account manager",
      "SSO & custom integrations",
      "Volume discounts",
      "SLA guarantees",
    ],
    missingFeatures: [],
  },
];
