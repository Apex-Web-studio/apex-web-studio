import type {
  Project,
  ProcessStep,
  Service,
  Testimonial,
  FAQItem,
  Stat,
  Technology,
} from "@/types";

export const APP_NAME = "Apex Web Studio";
export const INSTAGRAM_URL =
  "https://www.instagram.com/apexwebstudio2026/?hl=en";
export const INSTAGRAM_HANDLE = "@apexwebstudio";
export const TAGLINE = "We design websites that win.";
export const HERO_SUBTITLE =
  "Award-caliber digital experiences crafted with precision, strategy, and obsessive attention to detail.";

export const MARQUEE_ITEMS = [
  "Web Design",
  "Branding",
  "Development",
  "UI·UX",
  "Strategy",
  "Motion",
  "Identity",
  "E-commerce",
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Meridian Studios",
    category: "Brand & Web Design",
    description:
      "A complete digital rebrand for a creative production studio, featuring immersive scroll experiences and cinematic transitions.",
    image: "/projects/meridian.jpg",
    color: "#6775E0",
    year: "2026",
  },
  {
    id: "02",
    title: "Solara Beauty",
    category: "E-commerce Design",
    description:
      "Luxury skincare e-commerce platform with 3D product visualizations and a conversion-optimized checkout flow.",
    image: "/projects/solara.jpg",
    color: "#E06775",
    year: "2026",
  },
  {
    id: "03",
    title: "Vantage Capital",
    category: "Web Application",
    description:
      "Real-time financial dashboard with data-driven animations and enterprise-grade performance.",
    image: "/projects/vantage.jpg",
    color: "#4ECDC4",
    year: "2025",
  },
  {
    id: "04",
    title: "Atlas Ventures",
    category: "Brand Identity",
    description:
      "Bold venture capital identity system with a dynamic web presence that adapts to their portfolio companies.",
    image: "/projects/atlas.jpg",
    color: "#E0C767",
    year: "2025",
  },
  {
    id: "05",
    title: "Nova Fitness",
    category: "Web Design & Development",
    description:
      "High-energy fitness platform featuring real-time class scheduling, trainer profiles, and member dashboards.",
    image: "/projects/nova.jpg",
    color: "#FF6B6B",
    year: "2025",
  },
  {
    id: "06",
    title: "Prism Architecture",
    category: "Portfolio & Branding",
    description:
      "Minimalist architectural portfolio with full-screen project showcases and smooth page transitions.",
    image: "/projects/prism.jpg",
    color: "#A78BFA",
    year: "2024",
  },
];

export const SERVICES: Service[] = [
  {
    title: "Web Design",
    description:
      "Pixel-perfect interfaces that balance beauty with usability. Every interaction is intentional, every layout is considered.",
    icon: "layout",
  },
  {
    title: "Brand Identity",
    description:
      "Complete visual systems — from logo to color palette to typography — that make your brand unmistakable.",
    icon: "palette",
  },
  {
    title: "Frontend Development",
    description:
      "Production-grade code built on modern frameworks. Fast, accessible, and engineered to scale.",
    icon: "code",
  },
  {
    title: "UI/UX Design",
    description:
      "Research-driven design that puts users first. We map journeys, test assumptions, and iterate until it feels effortless.",
    icon: "figma",
  },
  {
    title: "Motion Design",
    description:
      "Purposeful animations that guide attention and add personality. Never decorative, always functional.",
    icon: "sparkles",
  },
  {
    title: "Design Systems",
    description:
      "Scalable component libraries and design tokens that keep your product consistent as it grows.",
    icon: "blocks",
  },
];

export const STATS: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "+", label: "Brands Elevated" },
  { value: 8, suffix: "yrs", label: "Of Craft" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Deep-dive into your brand, audience, and objectives. We audit competitors, map user journeys, and define the strategic foundation.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Transform insights into pixel-perfect mockups. Iterative design sprints with your feedback woven into every revision.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Clean, performant code built with modern frameworks. Every interaction is smooth, every page loads fast.",
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Rigorous QA across devices and browsers. We launch with confidence and provide ongoing optimization support.",
  },
];

export const TECHNOLOGIES: Technology[] = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "GSAP", category: "Animation" },
  { name: "Figma", category: "Design" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Vercel", category: "Hosting" },
  { name: "Prisma", category: "ORM" },
  { name: "Stripe", category: "Payments" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "CEO",
    company: "Meridian Studios",
    quote:
      "Apex transformed our digital presence entirely. The attention to detail and the quality of animations made our site feel like a premium product in itself.",
    avatar: "SC",
  },
  {
    name: "James Walker",
    role: "Founder",
    company: "Vantage Capital",
    quote:
      "Working with Apex was a masterclass in design thinking. They didn't just build a website — they built an experience that our clients actually talk about.",
    avatar: "JW",
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    company: "Solara Beauty",
    quote:
      "The level of craft is unmatched. Every hover state, every transition, every pixel was considered. Our conversion rate increased 40% within the first month.",
    avatar: "ER",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Most projects run 6-10 weeks from kickoff to launch. Complex web applications or large e-commerce builds may take 12-16 weeks. We'll provide a detailed timeline during our discovery phase.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We use a combination of scheduled check-ins and async updates via Instagram DM. You'll receive weekly progress reports with design previews, and we're always available for quick questions.",
  },
  {
    question: "Do you work with startups or only established brands?",
    answer:
      "We work with both. Whether you're launching your first product or refreshing an established brand, our process adapts to your stage and budget. What matters most is that you care about quality.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our core stack is Next.js, React, TypeScript, and Tailwind CSS for web development, paired with Figma for design. We also work with Node.js, PostgreSQL, and various CMS platforms depending on project needs.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. Every project includes 30 days of post-launch support. We also offer retainer packages for ongoing design, development, and performance optimization.",
  },
  {
    question: "How do I start a project with Apex?",
    answer:
      "Reach out to us on Instagram. Send a brief description of your project and we'll schedule a discovery call within 48 hours. No forms, no friction — just a conversation.",
  },
];

export const PHILOSOPHY =
  "We believe every brand deserves a digital presence that commands attention. Our work sits at the intersection of strategy, design, and engineering — built to perform, crafted to endure.";

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
