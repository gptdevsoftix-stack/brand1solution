import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type MenuOpenState = boolean;

type Service = {
  id: string;
  title: string;
  copy: string;
  tags: string[];
  image: string;
};

type Project = {
  id: string;
  num: string;
  title: string;
  copy: string;
  image: string;
  category: string;
  result: string;
  scope: string[];
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  logo: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type BlogItem = {
  author: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
};

const servicesList: Service[] = [
  {
    id: "01",
    title: "Web Development",
    copy: "Custom websites built with cutting-edge technologies for performance, scalability, and stunning user experiences.",
    tags: ["Performance", "Scalable Builds", "Modern Web"],
    image: "/site-images/brand1-service-web-development.png",
  },
  {
    id: "02",
    title: "UI/UX Design",
    copy: "Intuitive, beautiful interfaces designed to delight users and maximize engagement across all platforms.",
    tags: ["User Flows", "Interface Design", "Prototyping"],
    image: "/site-images/brand1-service-ui-ux-design.png",
  },
  {
    id: "03",
    title: "App Development",
    copy: "Native and cross-platform mobile apps that deliver seamless experiences, drive user retention, and scale effortlessly.",
    tags: ["Mobile Apps", "Cross-Platform", "Retention"],
    image: "/site-images/brand1-service-app-development.png",
  },
  {
    id: "04",
    title: "E-Commerce Solutions",
    copy: "Full-featured online stores with secure payments, inventory management, and conversion optimization.",
    tags: ["Online Stores", "Payments", "Conversion"],
    image: "/site-images/brand1-service-ecommerce.png",
  },
  {
    id: "05",
    title: "SEO & Growth",
    copy: "Data-driven SEO strategies and growth marketing campaigns to boost your visibility, organic traffic, and conversions.",
    tags: ["Technical SEO", "Organic Traffic", "Growth Campaigns"],
    image: "/site-images/brand1-service-seo-growth.png",
  },
  {
    id: "06",
    title: "Digital Marketing",
    copy: "Strategic campaigns across social media, email, and paid channels to grow your audience and revenue.",
    tags: ["Social Media", "Email", "Paid Channels"],
    image: "/site-images/brand1-service-digital-marketing.png",
  },
];

const projectsList: Project[] = [
  {
    id: "01",
    num: "01",
    title: "Elevare Digital Marketing",
    copy: "We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose.",
    image: "/site-images/brand1-project-elevare.png",
    category: "Digital Growth",
    result: "+72% campaign lift",
    scope: ["Brand Strategy", "Paid Campaigns", "Landing Pages"],
  },
  {
    id: "02",
    num: "02",
    title: "StratEdge Marketing",
    copy: "Driving traffic, generating leads, and turning random clicks into long-term loyal brand customers.",
    image: "/site-images/brand1-project-stratedge.png",
    category: "Lead Generation",
    result: "3.1x qualified leads",
    scope: ["SEO System", "Funnel Design", "Analytics"],
  },
  {
    id: "03",
    num: "03",
    title: "Momentum Partners",
    copy: "Transforming brands with smart positioning strategy, compelling storytelling layouts, and measurable organic growth.",
    image: "/site-images/brand1-project-momentum.png",
    category: "Brand Experience",
    result: "+48% engagement",
    scope: ["Identity Refresh", "Content System", "UX Direction"],
  },
];

const teamList: TeamMember[] = [
  {
    name: "Theresa Webb",
    role: "Marketing Specialist",
    image: "/site-images/site-21-69a5069b00fa7ef312d5e9f6-mask-group-24-.webp",
    social: { facebook: "#", instagram: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Kristin Watson",
    role: "Marketing Specialist",
    image: "/site-images/site-22-69a5069b178148eee153f96c-mask-group-25-.webp",
    social: { facebook: "#", instagram: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Guy Hawkins",
    role: "Marketing Specialist",
    image: "/site-images/site-23-69a5069b178148eee153f96f-mask-group-26-.webp",
    social: { facebook: "#", instagram: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Ron Williamson",
    role: "Marketing Specialist",
    image: "/site-images/site-24-69a5069ba1ea7f84bf56b8d6-mask-group-27-.webp",
    social: { facebook: "#", instagram: "#", twitter: "#", linkedin: "#" },
  },
];

const testimonialsList: Testimonial[] = [
  {
    quote:
      "We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose. They delivered exceptional branding strategies that exceeded our ambitious growth targets.",
    author: "Kristin Watson",
    role: "Marketing Director",
    avatar: "/site-images/site-05-699d267f7af63905b9b9a11b-group-18-1-.webp",
    logo: "/site-images/site-13-699e74dbb0b1600ed11e3f30-logo-4-.svg",
  },
  {
    quote:
      "Our user acquisition rates doubled within 3 months of partnering with them. Their content creation studio is top-tier and their workflow is highly structured and transparent.",
    author: "Liam Anderson",
    role: "Product Lead",
    avatar: "/site-images/site-04-699d26725de35b5d16022330-group-19.webp",
    logo: "/site-images/site-09-699e74db0cc97f52ce240dec-logo-2-.svg",
  },
  {
    quote:
      "A dedicated team that aligns creativity directly with performance metrics. The branding guidelines are highly polished, responsive, and easy to roll out across channels.",
    author: "Damien Cabral",
    role: "Founder & CEO",
    avatar: "/site-images/site-03-699d265d8569f51df2d0f85f-group-17.webp",
    logo: "/site-images/site-12-699e74db877c549927bc1e19-logo.svg",
  },
];

const partnersList = [
  {
    front: "/site-images/site-12-699e74db877c549927bc1e19-logo.svg",
    back: "/site-images/site-12-699e74db877c549927bc1e19-logo.svg",
  },
  {
    front: "/site-images/site-11-699e74db7b87689148cf41eb-logo-1-.svg",
    back: "/site-images/site-11-699e74db7b87689148cf41eb-logo-1-.svg",
  },
  {
    front: "/site-images/site-09-699e74db0cc97f52ce240dec-logo-2-.svg",
    back: "/site-images/site-09-699e74db0cc97f52ce240dec-logo-2-.svg",
  },
  {
    front: "/site-images/site-10-699e74db2a42138c42cef740-logo-3-.svg",
    back: "/site-images/site-10-699e74db2a42138c42cef740-logo-3-.svg",
  },
  {
    front: "/site-images/site-13-699e74dbb0b1600ed11e3f30-logo-4-.svg",
    back: "/site-images/site-13-699e74dbb0b1600ed11e3f30-logo-4-.svg",
  },
];

const faqsList: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We provide end-to-end digital marketing and branding solutions, including brand strategy, digital marketing, social media management, content creation, performance marketing, and web design.",
  },
  {
    question: "Who do you work with?",
    answer:
      "We work with growth-stage startups, creative agencies, established mid-sized studios, and enterprise brands that require clean positioning and elevated design aesthetic to stand out.",
  },
  {
    question: "How do you approach a new project?",
    answer:
      "Every project moves through four clear stages: Discovery, Strategy, Design & Build, and Launch & Grow. This keeps the work focused, measurable, and aligned with your business goals.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "While branding refreshes and website launches deliver immediate authority upgrades, content campaigns and performance marketing strategies typically show solid quantitative results within 6 to 12 weeks.",
  },
  {
    question: "Do you offer customized solutions?",
    answer:
      "Yes. All campaigns, structures, layouts, and integrations are tailored strictly around your business objective. We build custom websites, custom dashboards, and specialized strategy models.",
  },
];

const blogsList: BlogItem[] = [
  {
    author: "Damien Cabral",
    date: "Dec 10, 2025",
    category: "Marketing",
    title: "How to Build a Strong Marketing Strategy That Delivers Results",
    excerpt:
      "A step-by-step guide to creating a marketing strategy that drives growth, engagement, and measurable outcomes.",
    image:
      "/site-images/site-30-69b8c388b330469916aa6e98-mask-group-2-optimi.webp",
  },
  {
    author: "Liam Anderson",
    date: "March 15, 2026",
    category: "Advertising",
    title: "How to Create an Effective Marketing Strategy That Yields Results",
    excerpt:
      "A comprehensive guide to crafting a marketing strategy that fosters growth, boosts engagement, and achieves measurable results.",
    image:
      "/site-images/site-31-69b8c3a21236af6944d5e3f4-mask-group-3-optimi.webp",
  },
  {
    author: "Liam Thompson",
    date: "April 10, 2024",
    category: "Advertising",
    title: "Crafting an Effective Marketing Strategy That Yields Results",
    excerpt:
      "A comprehensive guide to developing a marketing strategy that fosters growth, boosts engagement, and achieves measurable results.",
    image:
      "/site-images/site-32-69b8c45cd9ee14d78c6efa49-mask-group-2-optimi.webp",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState<MenuOpenState>(false);
  const [activeProject, setActiveProject] = useState<number>(0);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  // Auto advance process steps to mimic slider auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-light-blue text-dark-black overflow-hidden font-roboto antialiased selection:bg-primary selection:text-white">
      {/* Sticky Header Nav */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Full screen Drawer Menu */}
      <AnimatePresence>
        {menuOpen && <MenuDrawer onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Double Marquees */}
        <MarqueeSection />

        {/* About Section */}
        <AboutSection />

        {/* Services Accordion List */}
        <ServicesSection />

        {/* Projects Accordion Grid */}
        <ProjectsSection
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />

        {/* Stat Marquee Banner */}
        <StatsMarquee />

        {/* Process Section */}
        <ProcessSection
          activeStep={activeProcessStep}
          setActiveStep={setActiveProcessStep}
        />

        {/* Testimonials Fading Slider */}
        <TestimonialsSection />

        {/* FAQ list */}
        <FAQSection />

        {/* Blogs list */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ---------------- HEADER COMPONENT ---------------- */
function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (o: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-blue/20 bg-light-blue/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a
          href="/"
          className="flex items-center gap-2 font-roboto-condensed text-2xl font-black uppercase tracking-tight text-dark-black hover:opacity-90 transition-opacity"
        >
          <span>Brand1</span>
          <span className="rounded-full bg-primary px-3 py-1 text-xs text-white font-extrabold tracking-widest">
            Solution
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-8 lg:flex font-roboto font-semibold text-dark-black/75">
          <a href="#about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-primary transition-colors">
            Service
          </a>
          <a href="#projects" className="hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#process" className="hover:text-primary transition-colors">
            Process
          </a>
          <a href="#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
          <a href="#blogs" className="hover:text-primary transition-colors">
            Blogs
          </a>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="primary-button-hover group hidden items-center gap-2 rounded-full border border-border-blue bg-dark-black px-6 py-2.5 text-white lg:flex"
          >
            <span className="font-roboto-condensed text-sm font-bold uppercase tracking-wider">
              Contact Us
            </span>
            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white overflow-hidden">
              <svg
                className="btn-arrow-slide h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <svg
                className="absolute -left-5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </a>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border-blue/60 bg-transparent transition-colors hover:bg-border-blue/10"
            aria-label="Toggle Drawer Menu"
          >
            <div
              className={`h-0.5 w-5 bg-dark-black transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <div
              className={`h-0.5 w-5 bg-dark-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`h-0.5 w-5 bg-dark-black transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- MOBILE MENU DRAWER ---------------- */
function MenuDrawer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-dark-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="h-full w-full max-w-md bg-light-blue p-8 border-l border-border-blue/40 shadow-2xl flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2 font-roboto-condensed text-2xl font-black uppercase tracking-tight text-dark-black">
              <span>Brand1</span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs text-white font-extrabold tracking-widest">
                Solution
              </span>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 border border-border-blue rounded-full grid place-items-center hover:bg-border-blue/10 transition-colors"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-2xl font-roboto-condensed font-black uppercase text-dark-black">
            <a
              href="#about"
              onClick={onClose}
              className="hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={onClose}
              className="hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              onClick={onClose}
              className="hover:text-primary transition-colors"
            >
              Service
            </a>
            <a
              href="#projects"
              onClick={onClose}
              className="hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#process"
              onClick={onClose}
              className="hover:text-primary transition-colors"
            >
              Process
            </a>
            <a
              href="#faq"
              onClick={onClose}
              className="hover:text-primary transition-colors"
            >
              FAQ
            </a>
            <a
              href="#blogs"
              onClick={onClose}
              className="hover:text-primary transition-colors"
            >
              Blogs
            </a>
          </nav>
        </div>

        <div>
          <div className="h-px bg-border-blue/30 my-6" />
          <a
            href="#contact"
            onClick={onClose}
            className="primary-button-hover group flex w-full items-center justify-center gap-3 rounded-full bg-dark-black py-4 text-white"
          >
            <span className="font-roboto-condensed text-lg uppercase tracking-wider font-bold">
              Contact Us
            </span>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white overflow-hidden">
              <svg
                className="btn-arrow-slide h-4 w-4 transition-transform duration-300 group-hover:translate-x-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <svg
                className="absolute -left-6 h-4 w-4 transition-transform duration-300 group-hover:translate-x-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- HERO SECTION ---------------- */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-light-blue min-h-[92vh] flex items-center py-20 lg:py-0">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-0" />
      {/* ── Background: subtle grid + large glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0 hero-grid-bg" />

      {/* Primary blue glow top-right */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full hero-glow-orb animate-float-delay opacity-70 z-0" />

      {/* Secondary soft glow bottom-left */}
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full hero-glow-orb animate-float opacity-50 z-0" />

      {/* Floating decorative dots */}
      <div className="absolute top-1/4 left-[8%] hero-dot animate-float z-0 opacity-80" />
      <div
        className="absolute top-2/3 left-[12%] hero-dot animate-float-delay z-0 opacity-50"
        style={{ width: 6, height: 6 }}
      />
      <div
        className="absolute top-[15%] right-[30%] hero-dot animate-float-delay z-0 opacity-60"
        style={{ width: 7, height: 7 }}
      />

      {/* SVG line decoration */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <img
          src="/site-images/site-01-699bdcf6ab2fe2e2b2c2850d-group-3.svg"
          alt=""
          className="absolute bottom-0 left-0 w-full"
        />
      </div>

      {/* ── Main Layout ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-6 md:px-8 grid gap-10 lg:grid-cols-12 items-center lg:py-24">
        {/* ═══ LEFT COLUMN ═══ */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="hero-tag inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-dark-black">
              <span
                className="hero-dot"
                style={{ width: 7, height: 7, flexShrink: 0 }}
              />
              Award-Winning Creative Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-roboto-condensed text-[clamp(2.35rem,6.8vw,5.35rem)] font-black leading-[0.92] tracking-tight text-dark-black uppercase mb-6"
          >
            We Build{" "}
            <span className="relative inline-block">
              <span className="hero-underline">Brands</span>
            </span>
            <br />
            That{" "}
            <span
              className="animate-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #0a0f1e, #3b82f6, #1d4ed8, #3b82f6, #0a0f1e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dominate
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-xl text-lg md:text-xl font-medium leading-relaxed text-black-main/78 mb-10"
          >
            We help brands grow through smart marketing powered by creativity
            and technology — strategies built to scale, convert, and last.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              className="primary-button-hover group flex items-center gap-3 rounded-full bg-dark-black px-7 py-4 text-white animate-pulse-glow"
            >
              <span className="font-roboto-condensed text-lg uppercase tracking-wider font-bold">
                Start a Project
              </span>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-dark-black overflow-hidden">
                <svg
                  className="btn-arrow-slide h-4 w-4 transition-transform duration-300 group-hover:translate-x-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <svg
                  className="absolute -left-6 h-4 w-4 transition-transform duration-300 group-hover:translate-x-6 text-dark-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </a>

            {/* Secondary ghost CTA */}
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full border-2 border-border-blue/60 px-6 py-[14px] text-dark-black hover:bg-border-blue/10 transition-colors duration-300"
            >
              <span className="font-roboto-condensed text-sm uppercase tracking-wider font-bold">
                View Our Work
              </span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {[
              { value: "250+", label: "Projects Delivered" },
              { value: "8+", label: "Years of Experience" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <div
                key={i}
                className="hero-stat-card px-5 py-4 flex flex-col min-w-[110px] transition-transform duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="font-roboto-condensed text-2xl font-black text-dark-black leading-none">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-deep-gray mt-1 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ═══ RIGHT COLUMN ═══ */}
        <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
          {/* Large glow behind image */}
          <div className="absolute inset-[-10%] rounded-full hero-glow-orb animate-pulse-glow z-0 opacity-60" />

          {/* Main image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 animate-float"
          >
            <div className="relative organic-mask-hero hero-img-ring bg-bg-deep aspect-square w-full max-w-[460px] overflow-hidden">
              <img
                src="/site-images/brand1-generated-hero.png"
                alt="Premium Brand1Solutions digital agency command center"
                className="h-full w-full object-cover scale-[1.04]"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Floating spinning badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              type: "spring",
              stiffness: 160,
            }}
            className="absolute -left-6 top-6 z-20 h-28 w-28 animate-spin-slow drop-shadow-xl"
          >
            <img
              src="/site-images/site-02-699c0db6fa87821af2dbd857---award-winning-age.webp"
              alt="Award badge"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Floating mini "Active Projects" card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.7,
              type: "spring",
              stiffness: 120,
            }}
            className="absolute -right-4 top-[18%] z-20 hero-stat-card px-4 py-3 animate-float-delay flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[
                "/site-images/site-21-69a5069b00fa7ef312d5e9f6-mask-group-24-.webp",
                "/site-images/site-22-69a5069b178148eee153f96c-mask-group-25-.webp",
                "/site-images/site-23-69a5069b178148eee153f96f-mask-group-26-.webp",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-black text-dark-black leading-none">
                +120 Happy
              </p>
              <p className="text-[10px] font-semibold text-deep-gray mt-0.5">
                Clients Worldwide
              </p>
            </div>
          </motion.div>

          {/* Floating mini "Growth" badge bottom-left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.8, type: "spring" }}
            className="absolute -left-2 bottom-[14%] z-20 hero-stat-card px-4 py-3 animate-float flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-black text-dark-black leading-none">
                3× Growth
              </p>
              <p className="text-[10px] font-semibold text-deep-gray mt-0.5">
                Average ROI Boost
              </p>
            </div>
          </motion.div>

          {/* Decorative lime corner accent */}
          <div
            className="absolute -bottom-4 -right-4 z-0 w-32 h-32 rounded-3xl opacity-20"
            style={{
              background:
                "linear-gradient(135deg, #3b82f6 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE SECTION ---------------- */
function MarqueeSection() {
  const words = ["Designed for growth", "Built for impact"];
  return (
    <section className="bg-dark-black py-7 sm:py-8 border-y-2 border-border-blue/20 overflow-hidden select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {/* Row 1 - Left to Right */}
      <div className="flex w-full whitespace-nowrap overflow-hidden py-2.5">
        <div className="animate-marquee-left flex gap-12 text-2xl md:text-3xl font-roboto-condensed font-black uppercase text-primary">
          {[...Array(6)].flatMap((_, i) =>
            words.map((word, wIdx) => (
              <div key={`m1-${i}-${wIdx}`} className="flex items-center gap-8">
                <span>{word}</span>
                <img
                  src="/site-images/site-26-69b53497ca28dbd5887c06a1-vector-1-.svg"
                  alt="star"
                  className="h-6 w-6 text-primary"
                />
              </div>
            )),
          )}
        </div>
      </div>

      {/* Row 2 - Right to Left with Outlined text */}
      <div className="flex w-full whitespace-nowrap overflow-hidden py-2.5 border-t border-border-blue/10 mt-2">
        <div className="animate-marquee-right flex gap-12 text-2xl md:text-3xl font-roboto-condensed font-black uppercase">
          {[...Array(12)].map((_, i) => (
            <div key={`m2-${i}`} className="flex items-center gap-8">
              <span
                className={
                  i % 2 === 0 ? "text-white" : "text-transparent stroke-text"
                }
              >
                Designed for growth
              </span>
              <span className="text-white/40">•</span>
            </div>
          ))}
        </div>
        <style>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------------- ABOUT STUDIO SECTION ---------------- */
function AboutSection() {
  const stats = [
    { value: "250+", label: "Projects delivered" },
    { value: "120+", label: "Happy clients" },
    { value: "8+", label: "Years building brands" },
    { value: "38+", label: "Creative awards" },
  ];

  const highlights = [
    "Brand strategy shaped around real business goals",
    "Web, app, and marketing systems built to convert",
    "Senior creative support from concept to launch",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-light-blue py-20 lg:py-32 border-b border-border-blue/20"
    >
      <div className="absolute -top-24 right-[-120px] h-[360px] w-[360px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-[-140px] h-[280px] w-[280px] rounded-full bg-border-blue/25 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="relative">
              <div className="absolute -left-5 top-8 hidden h-28 w-28 rounded-[28px] border border-border-blue/50 bg-white/75 shadow-xl shadow-primary/10 backdrop-blur-md sm:block" />
              <div className="absolute -right-4 bottom-10 hidden h-36 w-36 rounded-full border border-primary/25 bg-primary/10 blur-sm sm:block" />

              <div className="relative overflow-hidden rounded-[34px] border border-border-blue/40 bg-white p-3 shadow-2xl shadow-primary/10">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-bg-deep sm:aspect-[5/4] lg:aspect-[4/5]">
                  <img
                    src="/site-images/brand1-generated-about.png"
                    alt="Brand1Solutions creative team collaborating in a modern studio"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-black/45 via-dark-black/5 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md">
                    About Brand1
                  </div>
                </div>

                <div className="absolute bottom-7 left-7 right-7 rounded-[24px] border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:right-auto sm:w-72">
                  <p className="font-roboto-condensed text-3xl font-black uppercase leading-none text-primary">
                    8+ Years
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-deep-gray">
                    Building digital identities, campaigns, and websites that
                    help brands look sharp and grow faster.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border-blue/50 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-primary mb-5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              About Us
            </span>

            <h2 className="font-roboto-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.92] text-dark-black">
              Creative Strategy,
              <br />
              <span className="text-primary">Digital Execution</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-black-main/75">
              Brand1 Solution is a digital agency for businesses that need more
              than a nice-looking website. We connect brand clarity, user
              experience, content, and growth marketing into one focused system.
            </p>

            <div className="mt-8 grid gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item}
                  className="group flex items-start gap-4 rounded-[22px] border border-border-blue/50 bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-roboto-condensed text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm sm:text-base font-bold leading-relaxed text-dark-black">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[22px] border border-border-blue/50 bg-bg-deep p-4"
                >
                  <span className="font-roboto-condensed text-2xl font-black leading-none text-primary">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-xs font-bold leading-snug text-deep-gray">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="primary-button-hover group inline-flex items-center gap-3 rounded-full bg-dark-black px-7 py-4 text-white shadow-xl shadow-primary/10 transition-colors hover:bg-primary"
              >
                <span className="font-roboto-condensed text-sm font-black uppercase tracking-wider">
                  View Our Work
                </span>
                <svg
                  className="btn-arrow-slide h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border-2 border-border-blue/60 px-7 py-4 font-roboto-condensed text-sm font-black uppercase tracking-wider text-dark-black transition-colors hover:bg-white"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ACCORDION COMPONENT ---------------- */
function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - 120, // centers the floating image
      y: e.clientY - rect.top - 80,
    });
  };

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-bg-deep border-b border-border-blue/20 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-[-160px] top-20 h-[380px] w-[380px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Title */}
        <div className="grid gap-6 lg:grid-cols-12 mb-16 items-start">
          <h2 className="lg:col-span-4 text-left font-roboto-condensed text-4xl font-black uppercase text-dark-black tracking-tight">
            Services
          </h2>
          <p className="lg:col-span-8 text-left font-roboto text-lg font-medium leading-relaxed text-deep-gray">
            Comprehensive digital solutions tailored to elevate your brand and
            drive measurable results.
          </p>
        </div>

        {/* Hover Accordion List */}
        <div
          className="relative border-t border-border-blue mt-12 select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {servicesList.map((service, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIdx(index)}
                className="group relative border-b border-border-blue/60 py-8 transition-colors duration-300 hover:bg-white/75 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 gap-4">
                  {/* Service Number & Title */}
                  <div className="flex items-center gap-6">
                    <span className="font-roboto-condensed text-xl font-bold text-deep-gray">
                      ({service.id})
                    </span>
                    <h3 className="font-roboto-condensed text-2xl md:text-3xl font-black uppercase text-dark-black">
                      {service.title}
                    </h3>
                  </div>

                  {/* Rotatable Arrow Indicator */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-blue bg-transparent text-dark-black transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:rotate-45">
                    <img
                      src="/site-images/site-08-699d5d868239f0565df4855d-arrow---right.webp"
                      alt="Arrow icon"
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                </div>

                {/* Smooth Expand content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden px-4 md:px-20 text-left"
                >
                  <p className="mt-4 text-black-main font-medium leading-relaxed max-w-xl">
                    {service.copy}
                  </p>
                  {/* Tag chips */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border-blue px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-dark-black bg-white"
                      >
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Floating hover follow image cursor */}
          <AnimatePresence>
            {hoveredIdx !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 20, stiffness: 150 }}
                style={{
                  position: "absolute",
                  left: mousePos.x,
                  top: mousePos.y,
                  pointerEvents: "none",
                  zIndex: 30,
                }}
                    className="hidden lg:block w-72 aspect-[4/3] border-2 border-white rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 bg-bg-deep"
              >
                <img
                  src={servicesList[hoveredIdx].image}
                  alt="Service preview"
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS SECTION ---------------- */
function ProjectsSection({
  activeProject,
  setActiveProject,
}: {
  activeProject: number;
  setActiveProject: (i: number) => void;
}) {
  const currentProject = projectsList[activeProject];

  return (
    <section
      id="projects"
      className="py-20 lg:py-32 bg-light-blue border-b border-border-blue/20 overflow-hidden relative"
    >
      <div className="absolute -top-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-160px] h-[340px] w-[340px] rounded-full bg-border-blue/20 blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Title */}
        <div className="grid gap-8 lg:grid-cols-12 mb-16 items-end relative z-10">
          <div className="lg:col-span-5 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-blue/50 bg-bg-deep px-4 py-2 text-xs font-black uppercase tracking-widest text-primary mb-5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Case Studies
            </span>
            <h2 className="font-roboto-condensed text-3xl md:text-4xl lg:text-5xl font-black uppercase text-dark-black tracking-tight leading-[0.96]">
              Our Projects
            </h2>
          </div>
          <div className="lg:col-span-7 text-left lg:text-right">
            <p className="font-roboto text-lg font-medium leading-relaxed text-deep-gray max-w-2xl lg:ml-auto">
              A curated look at how we shape strategy, design, and digital
              systems into growth-focused brand experiences.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 relative z-10">
          {/* Featured active project */}
          <motion.article
            key={currentProject.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 relative min-h-[560px] overflow-hidden rounded-[44px] border border-border-blue/60 bg-dark-black text-white shadow-2xl shadow-primary/10"
          >
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/45 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.35),transparent_34%)]" />

            <div className="relative z-10 flex min-h-[560px] flex-col justify-between p-7 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-widest backdrop-blur-md">
                  {currentProject.category}
                </span>
                <span className="font-roboto-condensed text-5xl font-black text-white/30">
                  {currentProject.num}
                </span>
              </div>

              <div className="max-w-2xl text-left">
                <div className="mb-5 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20">
                  {currentProject.result}
                </div>
                <h3 className="font-roboto-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.92] tracking-tight">
                  {currentProject.title}
                </h3>
                <p className="mt-5 max-w-xl text-base md:text-lg font-medium leading-relaxed text-white/78">
                  {currentProject.copy}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {currentProject.scope.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          {/* Project selector rail */}
          <div className="lg:col-span-4 grid gap-4">
            {projectsList.map((project, index) => {
              const isActive = activeProject === index;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(index)}
                  onMouseEnter={() => setActiveProject(index)}
                  className={`group relative overflow-hidden rounded-[32px] border p-5 text-left transition-all duration-500 ${
                    isActive
                      ? "border-primary bg-white shadow-xl shadow-primary/10"
                      : "border-border-blue/60 bg-bg-deep hover:bg-white"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl border border-border-blue/30 bg-white">
                      <img
                        src={project.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={`font-roboto-condensed text-sm font-black ${isActive ? "text-primary" : "text-deep-gray"}`}
                        >
                          {project.num}
                        </span>
                        <span className="h-px w-8 bg-border-blue" />
                      </div>
                      <h4 className="font-roboto-condensed text-xl font-black uppercase leading-none text-dark-black">
                        {project.title}
                      </h4>
                      <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-deep-gray">
                        {project.result}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GIANT STAT MARQUEE ---------------- */
function StatsMarquee() {
  return (
    <section className="bg-bg-deep py-20 border-b border-border-blue/20 relative overflow-hidden select-none">
      {/* Outer Banner wraps */}
      <div className="border-y-2 border-border-blue py-8 flex items-center whitespace-nowrap overflow-hidden">
        <div className="animate-marquee-left flex gap-16 text-4xl md:text-6xl lg:text-7xl font-roboto-condensed font-black uppercase text-dark-black">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>DIGITAL _ MARKETING_AGENCY</span>
              <span className="text-primary">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Floating stat panel overlay wrapper */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
        <div className="flex items-center gap-6">
          <img
            src="/site-images/site-14-699e74dbb1e20032c584943b-star-1.svg"
            alt="Giant Star"
            className="h-16 w-16 text-dark-black"
          />
          <p className="font-roboto-condensed text-xl font-bold uppercase text-dark-black tracking-wider text-left">
            Cause-Led Brand Agency <br />
            Building Purpose
          </p>
        </div>

        {/* Stats overlay ticket container */}
        <div className="flex flex-wrap justify-center gap-6 bg-white border-2 border-border-blue rounded-[30px] p-6 shadow-lg">
          <div className="flex items-center gap-4 border-r border-border-blue/40 pr-6">
            <img
              src="/site-images/site-18-69a2646e786d6e61bdb5e677-14k.svg"
              alt="14k badge"
              className="h-12 w-auto"
            />
            <div className="text-left">
              <h4 className="font-roboto-condensed text-xl font-black uppercase text-dark-black leading-none">
                14K
              </h4>
              <p className="text-xs font-bold text-deep-gray uppercase tracking-wider mt-1">
                Completed Projects
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 pl-2">
            <img
              src="/site-images/site-19-69a26798fbf985a30a5da8b3-38-3-.svg"
              alt="38 award badge"
              className="h-12 w-auto"
            />
            <div className="text-left">
              <h4 className="font-roboto-condensed text-xl font-black uppercase text-dark-black leading-none">
                38+
              </h4>
              <p className="text-xs font-bold text-deep-gray uppercase tracking-wider mt-1">
                Top Agency Awards
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS SECTION ---------------- */
function ProcessSection({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (i: number) => void;
}) {
  const steps = [
    {
      num: "01",
      title: "Audit & Direction",
      copy: "We clarify your offer, audience, goals, and current digital gaps so the project starts with a sharp direction.",
      image:
        "/site-images/site-17-699fcf647fca9ec7764151b7-simplification-3-.webp",
    },
    {
      num: "02",
      title: "Strategy Map",
      copy: "We define messaging, user journeys, content priorities, and growth channels before design or development begins.",
      image:
        "/site-images/site-16-699fcf63a70c9af4c0143b31-simplification-4-.webp",
    },
    {
      num: "03",
      title: "Design & Build",
      copy: "We turn the strategy into polished interfaces, responsive pages, conversion flows, and scalable technical foundations.",
      image:
        "/site-images/site-15-699fcf6335fca42deeee7c84-simplification-5-.webp",
    },
    {
      num: "04",
      title: "Launch & Improve",
      copy: "We launch carefully, measure performance, and keep improving the experience so your brand keeps gaining momentum.",
      image: "/site-images/brand1-service-seo-growth.png",
    },
  ];

  return (
    <section
      id="process"
      className="relative overflow-hidden py-20 lg:py-32 bg-dark-black border-b border-border-blue/20"
    >
      <div className="absolute inset-0 hero-grid-bg opacity-10" />
      <div className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-36 bottom-0 h-[320px] w-[320px] rounded-full bg-primary-light/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary-light mb-5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              How We Work
            </span>
            <h2 className="font-roboto-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[0.92]">
              A Clear Process <br />
              Built For Growth
            </h2>
          </div>
          <div className="lg:col-span-6 text-left lg:text-right">
            <p className="font-roboto text-lg font-medium leading-relaxed text-white/65 max-w-2xl lg:ml-auto">
              We keep the workflow transparent, focused, and measurable from
              the first strategy call through launch and optimization.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group relative min-h-[330px] overflow-hidden rounded-[30px] border p-6 text-left transition-all duration-500 ${
                  isActive
                    ? "border-primary bg-white text-dark-black shadow-2xl shadow-primary/20 -translate-y-2"
                    : "border-white/10 bg-white/5 text-white hover:border-primary/50 hover:bg-white/10"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-primary transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />

                <div className="mb-8 flex items-center justify-between gap-4">
                  <span
                    className={`font-roboto-condensed text-5xl font-black leading-none ${
                      isActive ? "text-primary" : "text-white/25"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                      isActive
                        ? "border-border-blue bg-bg-deep"
                        : "border-white/10 bg-white/10"
                    }`}
                  >
                    <img
                      src={step.image}
                      alt=""
                      className="h-8 w-8 object-contain"
                    />
                  </span>
                </div>

                <h3 className="font-roboto-condensed text-2xl md:text-3xl font-black uppercase leading-none">
                  {step.title}
                </h3>
                <p
                  className={`mt-5 text-sm font-medium leading-relaxed ${
                    isActive ? "text-deep-gray" : "text-white/60"
                  }`}
                >
                  {step.copy}
                </p>

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span
                    className={`h-px flex-1 ${
                      isActive ? "bg-border-blue" : "bg-white/10"
                    }`}
                  />
                  <span
                    className={`ml-4 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
                      isActive ? "bg-primary text-white" : "bg-white/10 text-white"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-5 text-left backdrop-blur-md md:flex md:items-center md:justify-between md:gap-6">
          <p className="text-sm font-semibold leading-relaxed text-white/65">
            Current focus:{" "}
            <span className="text-white">
              {steps[activeStep].title}
            </span>{" "}
            keeps every decision connected to the next milestone.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 font-roboto-condensed text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-primary-dark md:mt-0"
          >
            Start With Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS COMPONENT ---------------- */
function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const activeClient = testimonialsList[activeTestimonial];

  return (
    <section className="relative py-20 lg:py-32 bg-bg-deep border-b border-border-blue/20 overflow-hidden">
      <div className="absolute left-[-160px] top-20 h-[360px] w-[360px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute right-[-120px] bottom-10 h-[320px] w-[320px] rounded-full bg-border-blue/30 blur-3xl pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-blue/50 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-primary mb-5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Testimonials
            </span>
            <h2 className="font-roboto-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase text-dark-black tracking-tight leading-[0.92]">
              What Clients Say <br />
              <span className="text-primary">After Launch</span>
            </h2>
          </div>
          <p className="lg:col-span-6 text-left lg:text-right text-lg font-medium leading-relaxed text-deep-gray max-w-2xl lg:ml-auto">
            Real feedback from teams who trusted Brand1 Solution to sharpen
            their digital presence, campaign quality, and growth systems.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Left Summary Box */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-white/10 rounded-[34px] bg-dark-black p-8 md:p-10 relative overflow-hidden text-left h-full min-h-[430px] shadow-2xl shadow-primary/10 text-white">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
            <div>
              <span className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary-light bg-white/5 mb-8">
                Trusted Feedback
              </span>

              {/* Overlapping Client mini-ticket */}
              <div className="flex items-center -space-x-3 mb-8">
                {testimonialsList.map((client, i) => (
                  <button
                    key={`tav-${i}`}
                    type="button"
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-12 w-12 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                      activeTestimonial === i
                        ? "z-10 scale-110 border-primary"
                        : "border-white"
                    }`}
                    aria-label={`Show testimonial from ${client.author}`}
                  >
                    <img
                      src={client.avatar}
                      alt={client.author}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
                <div className="h-9 w-9 rounded-full bg-primary border-2 border-white flex items-center justify-center text-xs font-black text-white">
                  +
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-roboto-condensed text-5xl md:text-6xl font-black uppercase text-primary leading-none mb-3">
                1.25K+
              </h3>
              <p className="text-sm font-bold text-white/60 uppercase tracking-wider leading-relaxed">
                Client touchpoints managed across launches, campaigns, and
                growth systems.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["Strategy", "Design", "Launch", "Growth"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-xs font-black uppercase tracking-wider text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Slides Box */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white border border-border-blue rounded-[34px] p-8 md:p-12 text-left relative min-h-[430px] shadow-2xl shadow-primary/10 overflow-hidden">
            <div className="absolute right-8 top-6 font-roboto-condensed text-[8rem] font-black leading-none text-primary/10">
              "
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex flex-col gap-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 rounded-full bg-bg-deep px-4 py-2 text-xs font-black uppercase tracking-widest text-deep-gray">
                      Verified Client
                    </span>
                  </div>
                  <h4 className="font-roboto-condensed text-2xl md:text-4xl lg:text-5xl font-black uppercase leading-[1.05] text-dark-black">
                    {activeClient.quote}
                  </h4>

                  <div className="h-px bg-border-blue/20 w-full my-4" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={activeClient.avatar}
                        alt={activeClient.author}
                        className="h-16 w-16 rounded-full object-cover border border-border-blue"
                      />
                      <div>
                        <h5 className="font-roboto-condensed text-xl font-black uppercase text-dark-black leading-none">
                          {activeClient.author}
                        </h5>
                        <p className="text-xs font-bold text-deep-gray uppercase tracking-wider mt-1">
                          {activeClient.role}
                        </p>
                      </div>
                    </div>

                    <img
                      src={activeClient.logo}
                      alt="Brand partner logo"
                      className="h-8 w-auto object-contain opacity-65 shrink-0 self-start sm:self-auto"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() =>
                  setActiveTestimonial(
                    (prev) =>
                      (prev - 1 + testimonialsList.length) %
                      testimonialsList.length,
                  )
                }
                className="h-12 w-12 rounded-full border border-border-blue flex items-center justify-center hover:bg-bg-deep transition-colors"
                aria-label="Previous Testimonial"
              >
                ✕
              </button>
              <button
                onClick={() =>
                  setActiveTestimonial(
                    (prev) => (prev + 1) % testimonialsList.length,
                  )
                }
                className="h-12 w-12 rounded-full border border-dark-black bg-dark-black flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
                aria-label="Next Testimonial"
              >
                <img
                  src="/site-images/site-20-69a2b834e27818e867fccdb6-arrow---right.svg"
                  alt="Arrow Right"
                  className="h-5 w-5 text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PARTNERS SECTION (3D ROTATION) ---------------- */
function PartnersSection() {
  return (
    <section className="py-20 lg:py-32 bg-light-blue border-b border-border-blue/20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center mb-16">
          <div className="h-0.5 w-24 bg-border-blue mb-6" />
          <h2 className="font-roboto-condensed text-xl font-bold uppercase text-deep-gray tracking-widest text-center">
            partner with +150 brands
          </h2>
          <div className="h-0.5 w-24 bg-border-blue mt-6" />
        </div>

        {/* 3D Flip Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {partnersList.map((partner, index) => (
            <div
              key={`partner-${index}`}
              className="logo-flip-card group h-32 w-full cursor-pointer relative"
            >
              <div className="logo-flip-inner absolute inset-0 w-full h-full duration-500 rounded-3xl border border-border-blue/60 bg-bg-deep">
                {/* Front logo */}
                <div className="logo-flip-front absolute inset-0 w-full h-full flex items-center justify-center p-4">
                  <img
                    src={partner.front}
                    alt="Brand logo"
                    className="max-h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                {/* Back logo */}
                <div className="logo-flip-back absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-white rounded-3xl">
                  <img
                    src={partner.back}
                    alt="Brand logo inverted"
                    className="max-h-8 w-auto object-contain opacity-90"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ACCORDION COMPONENT ---------------- */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 lg:py-32 bg-light-blue border-b border-border-blue/20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Title details */}
          <div className="lg:col-span-4 text-left">
            <h2 className="font-roboto-condensed text-3xl md:text-4xl font-black uppercase text-dark-black mb-6">
              Frequently asked questions
            </h2>
            <p className="font-roboto text-lg font-medium leading-relaxed text-deep-gray">
              Find clear and transparent answers to the most common questions
              about our services, process, and way of working.
            </p>
          </div>

          {/* Accordion Lists Box */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqsList.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border-blue/60 bg-white overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-roboto-condensed text-lg md:text-xl font-black uppercase text-dark-black">
                      {faq.question}
                    </span>
                    <div className="h-8 w-8 rounded-full border border-border-blue/60 flex items-center justify-center shrink-0 bg-bg-deep text-dark-black font-black transition-transform duration-300">
                      {isOpen ? "✕" : "+"}
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6"
                  >
                    <p className="pb-6 text-left text-black-main font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BLOGS SECTION ---------------- */
// function BlogsSection() {
//   return (
//     <section id="blogs" className="py-20 lg:py-32 bg-light-blue border-b border-border-blue/20">
//       <div className="mx-auto max-w-7xl px-6 md:px-8">
//         {/* Title */}
//         <div className="grid gap-6 lg:grid-cols-12 mb-16 items-start">
//           <h2 className="lg:col-span-4 text-left font-roboto-condensed text-4xl font-black uppercase text-dark-black tracking-tight">
//             The latest blogs & trends
//           </h2>
//           <p className="lg:col-span-8 text-left font-roboto text-lg font-medium leading-relaxed text-deep-gray">
//             We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose. We are a cause-led digital marketing.
//           </p>
//         </div>

//         {/* Blogs cards grid */}
//         <div className="grid gap-8 md:grid-cols-3 mt-12">
//           {blogsList.map((blog, idx) => (
//             <article key={idx} className="group flex flex-col justify-between rounded-[40px] border border-border-blue bg-bg-deep p-6 relative overflow-hidden text-left cursor-pointer">
//               <div>
//                 {/* Author Info */}
//                 <div className="flex items-center justify-between mb-6">
//                   <span className="text-xs font-black uppercase text-deep-gray tracking-wider">
//                     {blog.author}
//                   </span>
//                   <span className="text-xs font-bold text-deep-gray">
//                     {blog.date}
//                   </span>
//                 </div>

//                 {/* Category chip */}
//                 <div className="mb-6">
//                   <span className="inline-block rounded-full bg-white border border-border-blue px-4 py-1 text-xs font-bold uppercase tracking-wider text-dark-black">
//                     {blog.category}
//                   </span>
//                 </div>

//                 {/* Thumbnail Image */}
//                 <div className="h-48 w-full overflow-hidden rounded-2xl border border-border-blue/20 bg-white mb-6">
//                   <img
//                     src={blog.image}
//                     alt={blog.title}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>

//                 {/* Article Header title */}
//                 <h3 className="font-roboto-condensed text-xl md:text-2xl font-black uppercase text-dark-black mb-4 group-hover:text-primary transition-colors">
//                   {blog.title}
//                 </h3>
//               </div>

//               <div>
//                 <p className="text-sm font-medium leading-relaxed text-black-main mt-4">
//                   {blog.excerpt}
//                 </p>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

/* ---------------- FOOTER SECTION ---------------- */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-light-blue pt-20 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start pb-16">
          {/* Newsletter Box */}
          <div className="lg:col-span-5 text-left border border-border-blue bg-bg-deep rounded-[40px] p-8 md:p-10 relative overflow-hidden">
            <h4 className="font-roboto-condensed text-xl font-black uppercase text-dark-black mb-6">
              Subscribe to our newsletter
            </h4>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Enter Your Email..."
                required
                className="w-full rounded-full border border-border-blue/80 bg-white px-6 py-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/20 text-dark-black"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-dark-black py-4 font-roboto-condensed text-lg uppercase tracking-wider font-bold text-white transition-colors hover:bg-dark-black/90 cursor-pointer"
              >
                Get Started
              </button>
            </form>
          </div>

          {/* Menus / Directories */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div>
              <h5 className="font-roboto-condensed text-lg font-black uppercase text-dark-black mb-6">
                Menus
              </h5>
              <div className="flex flex-col gap-3 font-semibold text-deep-gray">
                <a
                  href="#about"
                  className="hover:text-dark-black transition-colors"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="hover:text-dark-black transition-colors"
                >
                  About
                </a>
                <a
                  href="#services"
                  className="hover:text-dark-black transition-colors"
                >
                  Service
                </a>
                <a
                  href="#projects"
                  className="hover:text-dark-black transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#faq"
                  className="hover:text-dark-black transition-colors"
                >
                  FAQ
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-roboto-condensed text-lg font-black uppercase text-dark-black mb-6">
                Pages
              </h5>
              <div className="flex flex-col gap-3 font-semibold text-deep-gray">
                <a href="#" className="hover:text-dark-black transition-colors">
                  Style Guide
                </a>
                <a href="#" className="hover:text-dark-black transition-colors">
                  License
                </a>
                <a href="#" className="hover:text-dark-black transition-colors">
                  Changelog
                </a>
                <a href="#" className="hover:text-dark-black transition-colors">
                  404 Page
                </a>
                <a href="#" className="hover:text-dark-black transition-colors">
                  Password
                </a>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h5 className="font-roboto-condensed text-lg font-black uppercase text-dark-black mb-6">
                Contact
              </h5>
              <div className="flex flex-col gap-4 text-deep-gray">
                <a
                  href="mailto:contact@brand1solution.com"
                  className="font-bold text-dark-black hover:underline transition-all"
                >
                  contact@brand1solution.com
                </a>
                <p className="text-sm font-medium leading-relaxed">
                  1901 Thornridge Cir. <br />
                  Shiloh, Hawaii 81063
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider line progress */}
        <div className="h-0.5 bg-border-green/30 w-full relative overflow-hidden mb-8">
          <div className="absolute top-0 bottom-0 left-0 bg-primary w-2/3" />
        </div>

        {/* Footer Sub-links and copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 text-sm font-bold text-deep-gray uppercase tracking-wider relative z-10">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-dark-black transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-dark-black transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-dark-black transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-dark-black transition-colors">
              Linkedin
            </a>
          </div>

          <p className="normal-case font-medium">
            © {currentYear} Designed by{" "}
            <a href="#" className="hover:text-dark-black font-semibold">
              Olynex
            </a>
            . Powered by{" "}
            <a href="#" className="hover:text-dark-black font-semibold">
              Webflow
            </a>{" "}
            & React.
          </p>
        </div>

        {/* Giant header signature footer text */}
        <div className="relative pointer-events-none select-none text-center leading-none mt-4">
          <h3 className="font-roboto-condensed text-[clamp(3rem,8.5vw,7.5rem)] font-black uppercase tracking-tight text-border-green/20 select-none whitespace-nowrap">
            Brand1 Solution
          </h3>
        </div>
      </div>
    </footer>
  );
}

export default App;
