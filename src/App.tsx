import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type MenuOpenState = boolean

type Service = {
  id: string
  title: string
  copy: string
  tags: string[]
  image: string
}

type Project = {
  id: string
  num: string
  title: string
  copy: string
  image: string
}

type TeamMember = {
  name: string
  role: string
  image: string
  social: {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
  }
}

type Testimonial = {
  quote: string
  author: string
  role: string
  avatar: string
  logo: string
}

type FAQItem = {
  question: string
  answer: string
}

type BlogItem = {
  author: string
  date: string
  category: string
  title: string
  excerpt: string
  image: string
}

const servicesList: Service[] = [
  {
    id: '01',
    title: 'Digital Marketing',
    copy: 'We are a cause-led digital marketing and brand agency dedicated to helping businesses grow and expand their market reach.',
    tags: ['UI/UX Design', 'Strategy & Planning', 'Pitchdeck'],
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c576fa806721378754b4_Mask%20group%20(3)_optimized.webp',
  },
  {
    id: '02',
    title: 'Brand Strategy & Identity',
    copy: 'Crafting unique visual stories, distinct positioning, and cohesive style guidelines that make your brand stand out.',
    tags: ['Positioning', 'Visual Guidelines', 'Logo Design'],
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c5846379874173b121dc_Mask%20group%20(4)_optimized.webp',
  },
  {
    id: '03',
    title: 'Social Media Marketing',
    copy: 'Engage with target audiences across modern channels through smart campaign plans, community building, and analysis.',
    tags: ['Campaign Planning', 'Community Growth', 'Analytics'],
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c5bbb44546c10a509311_Mask%20group%20(5)_optimized.webp',
  },
  {
    id: '04',
    title: 'Content Creation',
    copy: 'Premium copywriting, visual assets, photography layouts, and multimedia experiences created around real user stories.',
    tags: ['Copywriting', 'Graphic Design', 'Photography'],
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c5c816d94397f9e969d5_Mask%20group%20(6)_optimized.webp',
  },
]

const projectsList: Project[] = [
  {
    id: '01',
    num: '01',
    title: 'Elevare Digital Marketing',
    copy: 'We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose.',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c663e1748181e8dfef98_Mask%20group%20(6)_optimized.webp',
  },
  {
    id: '02',
    num: '02',
    title: 'StratEdge Marketing',
    copy: 'Driving traffic, generating leads, and turning random clicks into long-term loyal brand customers.',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c7181b0c19661b2e9419_Mask%20group%20(5)_optimized.webp',
  },
  {
    id: '03',
    num: '03',
    title: 'Momentum Partners',
    copy: 'Transforming brands with smart positioning strategy, compelling storytelling layouts, and measurable organic growth.',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c724d8f8deb69327931d_Mask%20group%20(7)_optimized.webp',
  },
]

const teamList: TeamMember[] = [
  {
    name: 'Theresa Webb',
    role: 'Marketing Specialist',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69a5069b00fa7ef312d5e9f6_Mask%20group%20(24).webp',
    social: { facebook: '#', instagram: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Kristin Watson',
    role: 'Marketing Specialist',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69a5069b178148eee153f96c_Mask%20group%20(25).webp',
    social: { facebook: '#', instagram: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Guy Hawkins',
    role: 'Marketing Specialist',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69a5069b178148eee153f96f_Mask%20group%20(26).webp',
    social: { facebook: '#', instagram: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Ron Williamson',
    role: 'Marketing Specialist',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69a5069ba1ea7f84bf56b8d6_Mask%20group%20(27).webp',
    social: { facebook: '#', instagram: '#', twitter: '#', linkedin: '#' },
  },
]

const testimonialsList: Testimonial[] = [
  {
    quote: 'We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose. They delivered exceptional branding strategies that exceeded our ambitious growth targets.',
    author: 'Kristin Watson',
    role: 'Marketing Director',
    avatar: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d267f7af63905b9b9a11b_Group%2018%20(1).webp',
    logo: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74dbb0b1600ed11e3f30_Logo%20(4).svg',
  },
  {
    quote: 'Our user acquisition rates doubled within 3 months of partnering with them. Their content creation studio is top-tier and their workflow is highly structured and transparent.',
    author: 'Liam Anderson',
    role: 'Product Lead',
    avatar: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d26725de35b5d16022330_Group%2019.webp',
    logo: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db0cc97f52ce240dec_Logo%20(2).svg',
  },
  {
    quote: 'A dedicated team that aligns creativity directly with performance metrics. The branding guidelines are highly polished, responsive, and easy to roll out across channels.',
    author: 'Damien Cabral',
    role: 'Founder & CEO',
    avatar: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d265d8569f51df2d0f85f_Group%2017.webp',
    logo: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db877c549927bc1e19_Logo.svg',
  },
]

const partnersList = [
  {
    front: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db877c549927bc1e19_Logo.svg',
    back: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db877c549927bc1e19_Logo.svg',
  },
  {
    front: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db7b87689148cf41eb_Logo%20(1).svg',
    back: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db7b87689148cf41eb_Logo%20(1).svg',
  },
  {
    front: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db0cc97f52ce240dec_Logo%20(2).svg',
    back: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db0cc97f52ce240dec_Logo%20(2).svg',
  },
  {
    front: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db2a42138c42cef740_Logo%20(3).svg',
    back: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74db2a42138c42cef740_Logo%20(3).svg',
  },
  {
    front: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74dbb0b1600ed11e3f30_Logo%20(4).svg',
    back: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74dbb0b1600ed11e3f30_Logo%20(4).svg',
  },
]

const faqsList: FAQItem[] = [
  {
    question: 'What services do you offer?',
    answer: 'We provide end-to-end digital marketing and branding solutions, including brand strategy, digital marketing, social media management, content creation, performance marketing, and web design.',
  },
  {
    question: 'Who do you work with?',
    answer: 'We work with growth-stage startups, creative agencies, established mid-sized studios, and enterprise brands that require clean positioning and elevated design aesthetic to stand out.',
  },
  {
    question: 'How do you approach a new project?',
    answer: 'Every project goes through our three-step solution process: Discover (audience research and deep brand insights), Impact (high-fidelity design and build execution), and Growth (conversion-focused analysis and performance scaling).',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'While branding refreshes and website launches deliver immediate authority upgrades, content campaigns and performance marketing strategies typically show solid quantitative results within 6 to 12 weeks.',
  },
  {
    question: 'Do you offer customized solutions?',
    answer: 'Yes. All campaigns, structures, layouts, and integrations are tailored strictly around your business objective. We build custom websites, custom dashboards, and specialized strategy models.',
  },
]

const blogsList: BlogItem[] = [
  {
    author: 'Damien Cabral',
    date: 'Dec 10, 2025',
    category: 'Marketing',
    title: 'How to Build a Strong Marketing Strategy That Delivers Results',
    excerpt: 'A step-by-step guide to creating a marketing strategy that drives growth, engagement, and measurable outcomes.',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c388b330469916aa6e98_Mask%20group%20(2)_optimized.webp',
  },
  {
    author: 'Liam Anderson',
    date: 'March 15, 2026',
    category: 'Advertising',
    title: 'How to Create an Effective Marketing Strategy That Yields Results',
    excerpt: 'A comprehensive guide to crafting a marketing strategy that fosters growth, boosts engagement, and achieves measurable results.',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c3a21236af6944d5e3f4_Mask%20group%20(3)_optimized.webp',
  },
  {
    author: 'Liam Thompson',
    date: 'April 10, 2024',
    category: 'Advertising',
    title: 'Crafting an Effective Marketing Strategy That Yields Results',
    excerpt: 'A comprehensive guide to developing a marketing strategy that fosters growth, boosts engagement, and achieves measurable results.',
    image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae34/69b8c45cd9ee14d78c6efa49_Mask%20group%20(2)_optimized.webp',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState<MenuOpenState>(false)
  const [activeProject, setActiveProject] = useState<number>(0)
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0)

  // Auto advance process steps to mimic slider auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % 3)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-light-green text-dark-black overflow-hidden font-roboto antialiased selection:bg-primary selection:text-dark-black">
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
        <ProjectsSection activeProject={activeProject} setActiveProject={setActiveProject} />

        {/* Stat Marquee Banner */}
        <StatsMarquee />

        {/* Process Section */}
        <ProcessSection activeStep={activeProcessStep} setActiveStep={setActiveProcessStep} />

        {/* Team Grid */}
        <TeamSection />

        {/* Testimonials Fading Slider */}
        <TestimonialsSection />

        {/* Partners 3D flip section */}
        <PartnersSection />

        {/* FAQ list */}
        <FAQSection />

        {/* Blogs list */}
        <BlogsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

/* ---------------- HEADER COMPONENT ---------------- */
function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (o: boolean) => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-green/20 bg-light-green/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href="/" className="flex items-center gap-2 font-roboto-condensed text-2xl font-black uppercase tracking-tight text-dark-black hover:opacity-90 transition-opacity">
          <span>Brand1</span>
          <span className="rounded-full bg-primary px-3 py-1 text-xs text-dark-black font-extrabold tracking-widest">Solution</span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-8 lg:flex font-roboto font-semibold text-dark-black/75">
          <a href="#about" className="hover:text-dark-black transition-colors">About</a>
          <a href="#services" className="hover:text-dark-black transition-colors">Service</a>
          <a href="#projects" className="hover:text-dark-black transition-colors">Projects</a>
          <a href="#process" className="hover:text-dark-black transition-colors">Process</a>
          <a href="#faq" className="hover:text-dark-black transition-colors">FAQ</a>
          <a href="#blogs" className="hover:text-dark-black transition-colors">Blogs</a>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a href="#contact" className="primary-button-hover group hidden items-center gap-2 rounded-full border border-border-green bg-dark-black px-6 py-2.5 text-white lg:flex">
            <span className="font-roboto-condensed text-sm font-bold uppercase tracking-wider">Contact Us</span>
            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-dark-black overflow-hidden">
              <svg className="btn-arrow-slide h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg className="absolute -left-5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-5 text-dark-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border-green/60 bg-transparent transition-colors hover:bg-border-green/10"
            aria-label="Toggle Drawer Menu"
          >
            <div className={`h-0.5 w-5 bg-dark-black transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <div className={`h-0.5 w-5 bg-dark-black transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`h-0.5 w-5 bg-dark-black transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
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
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="h-full w-full max-w-md bg-light-green p-8 border-l border-border-green/40 shadow-2xl flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2 font-roboto-condensed text-2xl font-black uppercase tracking-tight text-dark-black">
              <span>Brand1</span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs text-dark-black font-extrabold tracking-widest">Solution</span>
            </div>
            <button onClick={onClose} className="h-10 w-10 border border-border-green rounded-full grid place-items-center hover:bg-border-green/10 transition-colors">
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-3xl font-roboto-condensed font-black uppercase text-dark-black">
            <a href="#about" onClick={onClose} className="hover:text-primary transition-colors">Home</a>
            <a href="#about" onClick={onClose} className="hover:text-primary transition-colors">About</a>
            <a href="#services" onClick={onClose} className="hover:text-primary transition-colors">Service</a>
            <a href="#projects" onClick={onClose} className="hover:text-primary transition-colors">Projects</a>
            <a href="#process" onClick={onClose} className="hover:text-primary transition-colors">Process</a>
            <a href="#faq" onClick={onClose} className="hover:text-primary transition-colors">FAQ</a>
            <a href="#blogs" onClick={onClose} className="hover:text-primary transition-colors">Blogs</a>
          </nav>
        </div>

        <div>
          <div className="h-px bg-border-green/30 my-6" />
          <a href="#contact" onClick={onClose} className="primary-button-hover group flex w-full items-center justify-center gap-3 rounded-full bg-dark-black py-4 text-white">
            <span className="font-roboto-condensed text-lg uppercase tracking-wider font-bold">Contact Us</span>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-dark-black overflow-hidden">
              <svg className="btn-arrow-slide h-4 w-4 transition-transform duration-300 group-hover:translate-x-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg className="absolute -left-6 h-4 w-4 transition-transform duration-300 group-hover:translate-x-6 text-dark-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- HERO SECTION ---------------- */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-light-green py-20 lg:py-32">
      {/* Decorative overlay background lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699bdcf6ab2fe2e2b2c2850d_Group%203.svg" alt="Line decoration" className="absolute bottom-0 left-0 w-full opacity-60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 grid gap-12 lg:grid-cols-12 items-center">
        {/* Left Column Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="overflow-hidden mb-4">
            <span className="inline-block rounded-full border border-border-green px-4 py-1.5 text-xs font-black uppercase tracking-widest text-deep-gray bg-border-green/10">
              Creative Agency Studio
            </span>
          </div>

          <h1 className="font-roboto-condensed text-5xl font-black leading-[1.0] tracking-tight text-dark-black md:text-7xl lg:text-8xl uppercase mb-6">
            BRAND1 _ <br />SOLUTION
          </h1>

          <p className="max-w-xl text-lg font-medium leading-relaxed text-black-main mb-8">
            We help brands grow through smart marketing solutions powered by creativity and technology. Solutions built to grow, scale, and perform.
          </p>

          <a href="#contact" className="primary-button-hover group flex items-center gap-3 rounded-full bg-dark-black px-7 py-4 text-white">
            <span className="font-roboto-condensed text-lg uppercase tracking-wider font-bold">Contact Us</span>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-dark-black overflow-hidden">
              <svg className="btn-arrow-slide h-4 w-4 transition-transform duration-300 group-hover:translate-x-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg className="absolute -left-6 h-4 w-4 transition-transform duration-300 group-hover:translate-x-6 text-dark-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </div>

        {/* Right Column Visual Overlay */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Slow spinning badge element */}
          <div className="absolute -left-12 -top-12 z-20 h-36 w-36 animate-spin-slow">
            <img src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699c0db6fa87821af2dbd857_-%20AWARD%20WINNING%20AGENCY%20-%20SINCE%202016%20(1).webp" alt="Award badge" className="w-full h-full object-contain" />
          </div>

          <div className="relative organic-mask-hero border-4 border-border-green/30 bg-bg-deep p-2 shadow-xl aspect-square w-full max-w-[420px] overflow-hidden">
            <img
              src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69b4e4c8e4f0bbee0226282b_Mask%20group%20(18).webp"
              alt="Digital marketing portrait"
              className="h-full w-full object-cover rounded-[34px] scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- MARQUEE SECTION ---------------- */
function MarqueeSection() {
  const words = ['Designed for growth', 'Built for impact']
  return (
    <section className="bg-dark-black py-8 border-y-2 border-border-green/20 overflow-hidden select-none">
      {/* Row 1 - Left to Right */}
      <div className="flex w-full whitespace-nowrap overflow-hidden py-2.5">
        <div className="animate-marquee-left flex gap-12 text-2xl md:text-3xl font-roboto-condensed font-black uppercase text-primary">
          {[...Array(6)].flatMap((_, i) =>
            words.map((word, wIdx) => (
              <div key={`m1-${i}-${wIdx}`} className="flex items-center gap-8">
                <span>{word}</span>
                <img src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69b53497ca28dbd5887c06a1_Vector%20(1).svg" alt="star" className="h-6 w-6 text-primary" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Row 2 - Right to Left with Outlined text */}
      <div className="flex w-full whitespace-nowrap overflow-hidden py-2.5 border-t border-border-green/10 mt-2">
        <div className="animate-marquee-right flex gap-12 text-2xl md:text-3xl font-roboto-condensed font-black uppercase">
          {[...Array(12)].map((_, i) => (
            <div key={`m2-${i}`} className="flex items-center gap-8">
              <span className={i % 2 === 0 ? 'text-white' : 'text-transparent stroke-text'}>
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
  )
}

/* ---------------- ABOUT STUDIO SECTION ---------------- */
function AboutSection() {
  const avatars = [
    'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d265d8569f51df2d0f85f_Group%2017.webp',
    'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d26725de35b5d16022330_Group%2019.webp',
    'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d267f7af63905b9b9a11b_Group%2018%20(1).webp',
    'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d26a119b49e6e3c693ab1_Group%2020.webp',
  ]

  return (
    <section id="about" className="py-20 lg:py-32 bg-light-green border-b border-border-green/20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Intro Header */}
        <div className="grid gap-6 lg:grid-cols-12 mb-16 items-start">
          <p className="lg:col-span-3 text-left font-roboto-condensed text-xl font-black uppercase text-deep-gray tracking-wide">
            About Studio
          </p>
          <h2 className="lg:col-span-9 text-left font-roboto-condensed text-3xl font-black leading-tight text-dark-black md:text-5xl lg:text-6xl uppercase">
            We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose.
          </h2>
        </div>

        {/* Feature Blocks grid */}
        <div className="grid gap-10 lg:grid-cols-2 mt-12">
          {/* Map/Global badge card */}
          <div className="flex flex-col justify-between rounded-[40px] border border-border-green/60 bg-bg-deep p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <div className="max-w-[140px] mb-8">
                <img src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d35e18b6ee6d988e279a4_Simplification%20(1).webp" alt="world map icon" className="w-full h-auto" />
              </div>
              <h3 className="font-roboto-condensed text-2xl md:text-3xl font-black uppercase leading-tight text-dark-black mb-8 max-w-xs">
                Brand1 Solution supports clients from all over the world
              </h3>
            </div>

            {/* Overlapping Client Avatars */}
            <div className="relative z-10 flex items-center mt-6">
              <div className="flex -space-x-4">
                {avatars.map((img, i) => (
                  <img key={`av-${i}`} src={img} alt="client avatar" className="h-14 w-14 rounded-full border-4 border-bg-deep object-cover shadow-md" />
                ))}
              </div>
              <div className="ml-4 h-1 w-24 bg-border-green/40 rounded-full" />
            </div>
          </div>

          {/* Unblur chart image card */}
          <div className="flex flex-col justify-between rounded-[40px] border border-border-green/60 bg-bg-deep p-8 md:p-12 relative overflow-hidden">
            <div className="relative h-64 md:h-72 w-full rounded-3xl overflow-hidden border border-border-green/30 mb-8 group">
              <motion.img
                initial={{ filter: 'blur(6px)' }}
                whileInView={{ filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d2935a9d8d5ecf784d3c7_image%2045.webp"
                alt="analytics graphic"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-dark-black/5" />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="text-black-main font-medium max-w-sm text-left">
                We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose.
              </p>
              <a href="#contact" className="primary-button-hover group flex items-center gap-3 rounded-full bg-dark-black px-6 py-4 text-white shrink-0">
                <span className="font-roboto-condensed text-base uppercase tracking-wider font-bold">Contact Us</span>
                <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary text-dark-black overflow-hidden">
                  <svg className="btn-arrow-slide h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <svg className="absolute -left-5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-5 text-dark-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SERVICES ACCORDION COMPONENT ---------------- */
function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left - 120, // centers the floating image
      y: e.clientY - rect.top - 80,
    })
  }

  return (
    <section id="services" className="py-20 lg:py-32 bg-light-green border-b border-border-green/20 relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Title */}
        <div className="grid gap-6 lg:grid-cols-12 mb-16 items-start">
          <h2 className="lg:col-span-4 text-left font-roboto-condensed text-4xl font-black uppercase text-dark-black tracking-tight">
            Services
          </h2>
          <p className="lg:col-span-8 text-left font-roboto text-lg font-medium leading-relaxed text-deep-gray">
            Strategic marketing solutions designed to drive growth and measurable results. Solutions built to grow, scale, and perform.
          </p>
        </div>

        {/* Hover Accordion List */}
        <div
          className="relative border-t border-border-green mt-12 select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {servicesList.map((service, index) => {
            const isHovered = hoveredIdx === index
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIdx(index)}
                className="group relative border-b border-border-green/60 py-8 transition-colors duration-300 hover:bg-bg-deep/40 cursor-pointer"
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-green bg-transparent text-dark-black transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:rotate-45">
                    <img
                      src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699d5d868239f0565df4855d_Arrow%20-%20Right.webp"
                      alt="Arrow icon"
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                </div>

                {/* Smooth Expand content */}
                <motion.div
                  initial={false}
                  animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
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
                        className="inline-flex items-center gap-1.5 rounded-full border border-border-green px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-dark-black bg-white"
                      >
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            )
          })}

          {/* Floating hover follow image cursor */}
          <AnimatePresence>
            {hoveredIdx !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                style={{
                  position: 'absolute',
                  left: mousePos.x,
                  top: mousePos.y,
                  pointerEvents: 'none',
                  zIndex: 30,
                }}
                className="hidden lg:block h-40 w-60 border-2 border-border-green rounded-2xl overflow-hidden shadow-2xl bg-bg-deep"
              >
                <img
                  src={servicesList[hoveredIdx].image}
                  alt="Service preview"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ---------------- PROJECTS SECTION ---------------- */
function ProjectsSection({ activeProject, setActiveProject }: { activeProject: number; setActiveProject: (i: number) => void }) {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-light-green border-b border-border-green/20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Title */}
        <div className="grid gap-6 lg:grid-cols-12 mb-16 items-start">
          <h2 className="lg:col-span-4 text-left font-roboto-condensed text-4xl font-black uppercase text-dark-black tracking-tight">
            Our Projects
          </h2>
          <p className="lg:col-span-8 text-left font-roboto text-lg font-medium leading-relaxed text-deep-gray">
            We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose. Solutions designed to scale.
          </p>
        </div>

        {/* Dynamic Width Accordion Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-6 mt-12 min-h-[500px]">
          {projectsList.map((project, index) => {
            const isActive = activeProject === index
            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProject(index)}
                className={`relative flex flex-col justify-between rounded-[40px] border border-border-green/60 bg-bg-deep p-8 md:p-10 cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'w-full lg:flex-[2.5]' : 'w-full lg:flex-[1]'}`}
              >
                {/* Text content details */}
                <div className="relative z-10 flex flex-col items-start text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-border-green/20 border border-border-green text-sm font-bold text-dark-black font-roboto-condensed">
                      {project.num}
                    </span>
                    <h3 className="font-roboto-condensed text-2xl md:text-3xl font-black uppercase text-dark-black">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description only shown or opacity transitions based on active */}
                  <div className={`transition-all duration-500 overflow-hidden ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 lg:max-h-0 opacity-0'}`}>
                    <p className="text-black-main font-medium leading-relaxed max-w-md">
                      {project.copy}
                    </p>
                  </div>
                </div>

                {/* Project Image Overlay inside the container */}
                <div className="relative mt-8 h-64 lg:h-72 w-full overflow-hidden rounded-3xl border border-border-green/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark-black/5" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- GIANT STAT MARQUEE ---------------- */
function StatsMarquee() {
  return (
    <section className="bg-bg-deep py-20 border-b border-border-green/20 relative overflow-hidden select-none">
      {/* Outer Banner wraps */}
      <div className="border-y-2 border-border-green py-8 flex items-center whitespace-nowrap overflow-hidden">
        <div className="animate-marquee-left flex gap-16 text-6xl md:text-8xl font-roboto-condensed font-black uppercase text-dark-black">
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
          <img src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699e74dbb1e20032c584943b_Star%201.svg" alt="Giant Star" className="h-16 w-16 text-dark-black" />
          <p className="font-roboto-condensed text-xl font-bold uppercase text-dark-black tracking-wider text-left">
            Cause-Led Brand Agency <br />Building Purpose
          </p>
        </div>

        {/* Stats overlay ticket container */}
        <div className="flex flex-wrap justify-center gap-6 bg-white border-2 border-border-green rounded-[30px] p-6 shadow-lg">
          <div className="flex items-center gap-4 border-r border-border-green/40 pr-6">
            <img src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69a2646e786d6e61bdb5e677_14k.svg" alt="14k badge" className="h-12 w-auto" />
            <div className="text-left">
              <h4 className="font-roboto-condensed text-xl font-black uppercase text-dark-black leading-none">14K</h4>
              <p className="text-xs font-bold text-deep-gray uppercase tracking-wider mt-1">Completed Projects</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pl-2">
            <img src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69a26798fbf985a30a5da8b3_38%2B%20(3).svg" alt="38 award badge" className="h-12 w-auto" />
            <div className="text-left">
              <h4 className="font-roboto-condensed text-xl font-black uppercase text-dark-black leading-none">38+</h4>
              <p className="text-xs font-bold text-deep-gray uppercase tracking-wider mt-1">Top Agency Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- PROCESS SECTION ---------------- */
function ProcessSection({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (i: number) => void }) {
  const steps = [
    {
      num: 'step 01',
      title: 'Discover',
      copy: 'We understand your brand, target audience, and business goals through detailed industrial insights, user metrics analysis, and target research workshops.',
      image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699fcf647fca9ec7764151b7_Simplification%20(3).webp',
    },
    {
      num: 'step 02',
      title: 'Impact',
      copy: 'We conceptualize visual frameworks, design systems, modern prototypes, and deploy high-fidelity frontend systems that deliver instant credibility.',
      image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699fcf63a70c9af4c0143b31_Simplification%20(4).webp',
    },
    {
      num: 'step 03',
      title: 'Growth',
      copy: 'We analyze ongoing traffic metrics, execute page conversion rate optimization tests, and adjust digital campaigns to scale your brand authority.',
      image: 'https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/699fcf6335fca42deeee7c84_Simplification%20(5).webp',
    },
  ]

  return (
    <section id="process" className="py-20 lg:py-32 bg-light-green border-b border-border-green/20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Title Left */}
          <div className="lg:col-span-4 text-left">
            <h2 className="font-roboto-condensed text-4xl font-black uppercase text-dark-black mb-6">
              Our Solution Process
            </h2>
            <p className="font-roboto text-lg font-medium leading-relaxed text-deep-gray">
              A seamless journey that transforms ideas into impactful solutions through creativity, strategy, and performance.
            </p>
          </div>

          {/* Stepper Center/Right */}
          <div className="lg:col-span-8 grid gap-8 md:grid-cols-12">
            {/* SVG Connector step line */}
            <div className="md:col-span-2 hidden md:flex flex-col items-center relative py-4">
              {steps.map((_, i) => (
                <div key={`ind-${i}`} className="flex flex-col items-center relative h-36">
                  {/* Step ball circle */}
                  <button
                    onClick={() => setActiveStep(i)}
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 font-bold ${activeStep === i ? 'bg-primary border-primary text-dark-black scale-110 shadow-lg' : 'bg-white border-border-green text-deep-gray'}`}
                  >
                    {i + 1}
                  </button>
                  {/* Vertical connecting line indicator */}
                  {i < 2 && (
                    <div className="absolute top-10 bottom-0 left-[19px] w-0.5 bg-border-green/45 overflow-hidden">
                      {activeStep === i && (
                        <div className="absolute top-0 w-full h-full bg-primary animate-pulse" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Slider cards box */}
            <div className="md:col-span-10 flex flex-col gap-6">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-[40px] border border-border-green/60 p-8 text-left transition-all duration-500 cursor-pointer ${isActive ? 'bg-white shadow-xl translate-x-2' : 'bg-bg-deep/40 opacity-70'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-bg-deep border border-border-green flex items-center justify-center shrink-0">
                          <img src={step.image} alt={step.title} className="h-7 w-7 object-contain" />
                        </div>
                        <div>
                          <span className="font-roboto-condensed text-xs font-black uppercase text-deep-gray tracking-wider">
                            {step.num}
                          </span>
                          <h3 className="font-roboto-condensed text-2xl font-black uppercase text-dark-black leading-none">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <p className="text-black-main font-medium leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- TEAM SECTION ---------------- */
function TeamSection() {
  return (
    <section id="team" className="py-20 lg:py-32 bg-light-green border-b border-border-green/20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Title */}
        <div className="grid gap-6 lg:grid-cols-12 mb-16 items-start">
          <h2 className="lg:col-span-4 text-left font-roboto-condensed text-4xl font-black uppercase text-dark-black tracking-tight">
            Our Team Members
          </h2>
          <p className="lg:col-span-8 text-left font-roboto text-lg font-medium leading-relaxed text-deep-gray">
            A seamless journey that transforms ideas into impactful solutions through creativity, strategy, and performance.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {teamList.map((member) => (
            <div key={member.name} className="group relative flex flex-col rounded-[32px] border border-border-green bg-bg-deep p-4 overflow-hidden">
              {/* Photo Box */}
              <div className="relative h-80 w-full overflow-hidden rounded-[24px] border border-border-green/30 bg-white">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Slide Up Socials Drawer overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-dark-black/80 backdrop-blur-sm p-4 transition-transform duration-300 group-hover:translate-y-0 flex justify-center gap-4">
                  <a href={member.social.facebook} className="text-white hover:text-primary transition-colors">FB</a>
                  <a href={member.social.instagram} className="text-white hover:text-primary transition-colors">IG</a>
                  <a href={member.social.twitter} className="text-white hover:text-primary transition-colors">TW</a>
                  <a href={member.social.linkedin} className="text-white hover:text-primary transition-colors">LN</a>
                </div>
              </div>

              {/* Identity details footer text */}
              <div className="pt-6 pb-2 text-left">
                <span className="font-roboto-condensed text-xs font-black uppercase text-deep-gray tracking-wider">
                  {member.role}
                </span>
                <h3 className="font-roboto-condensed text-xl font-black uppercase text-dark-black mt-1">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- TESTIMONIALS COMPONENT ---------------- */
function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="py-20 lg:py-32 bg-bg-deep border-b border-border-green/20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Summary Box */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-border-green rounded-[40px] bg-light-green p-8 md:p-10 relative overflow-hidden text-left h-full">
            <div>
              <span className="inline-block rounded-full border border-border-green px-4 py-1 text-xs font-black uppercase tracking-widest text-deep-gray bg-white mb-6">
                Testimonial
              </span>

              {/* Overlapping Client mini-ticket */}
              <div className="flex items-center -space-x-3 mb-8">
                {testimonialsList.map((client, i) => (
                  <img
                    key={`tav-${i}`}
                    src={client.avatar}
                    alt={client.author}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="h-8 w-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-xs font-black text-dark-black">
                  +
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-roboto-condensed text-4xl font-black uppercase text-dark-black leading-none mb-1">
                01.25K+
              </h3>
              <p className="text-sm font-bold text-deep-gray uppercase tracking-wider">
                Our Satisfied Clients
              </p>
            </div>
          </div>

          {/* Right Slides Box */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white border border-border-green rounded-[40px] p-8 md:p-12 text-left relative min-h-[380px]">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  <h4 className="font-roboto-condensed text-xl md:text-2xl font-black uppercase leading-relaxed text-dark-black">
                    "{testimonialsList[activeTestimonial].quote}"
                  </h4>

                  <div className="h-px bg-border-green/20 w-full my-4" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonialsList[activeTestimonial].avatar}
                        alt={testimonialsList[activeTestimonial].author}
                        className="h-12 w-12 rounded-full object-cover border border-border-green"
                      />
                      <div>
                        <h5 className="font-roboto-condensed text-lg font-black uppercase text-dark-black leading-none">
                          {testimonialsList[activeTestimonial].author}
                        </h5>
                        <p className="text-xs font-bold text-deep-gray uppercase tracking-wider mt-1">
                          {testimonialsList[activeTestimonial].role}
                        </p>
                      </div>
                    </div>

                    <img
                      src={testimonialsList[activeTestimonial].logo}
                      alt="Brand partner logo"
                      className="h-7 w-auto object-contain opacity-70 shrink-0 self-start sm:self-auto"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length)}
                className="h-12 w-12 rounded-full border border-border-green flex items-center justify-center hover:bg-border-green/10 transition-colors"
                aria-label="Previous Testimonial"
              >
                ✕
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonialsList.length)}
                className="h-12 w-12 rounded-full border border-border-green bg-dark-black flex items-center justify-center hover:bg-dark-black/90 transition-colors"
                aria-label="Next Testimonial"
              >
                <img
                  src="https://cdn.prod.website-files.com/699bd36545e668ad55d3ae1b/69a2b834e27818e867fccdb6_Arrow%20-%20Right.svg"
                  alt="Arrow Right"
                  className="h-5 w-5 text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- PARTNERS SECTION (3D ROTATION) ---------------- */
function PartnersSection() {
  return (
    <section className="py-20 lg:py-32 bg-light-green border-b border-border-green/20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center mb-16">
          <div className="h-0.5 w-24 bg-border-green mb-6" />
          <h2 className="font-roboto-condensed text-xl font-bold uppercase text-deep-gray tracking-widest text-center">
            partner with +150 brands
          </h2>
          <div className="h-0.5 w-24 bg-border-green mt-6" />
        </div>

        {/* 3D Flip Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {partnersList.map((partner, index) => (
            <div key={`partner-${index}`} className="logo-flip-card group h-32 w-full cursor-pointer relative">
              <div className="logo-flip-inner absolute inset-0 w-full h-full duration-500 rounded-3xl border border-border-green/60 bg-bg-deep">
                {/* Front logo */}
                <div className="logo-flip-front absolute inset-0 w-full h-full flex items-center justify-center p-4">
                  <img src={partner.front} alt="Brand logo" className="max-h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* Back logo */}
                <div className="logo-flip-back absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-white rounded-3xl">
                  <img src={partner.back} alt="Brand logo inverted" className="max-h-8 w-auto object-contain opacity-90" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ ACCORDION COMPONENT ---------------- */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 lg:py-32 bg-light-green border-b border-border-green/20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Title details */}
          <div className="lg:col-span-4 text-left">
            <h2 className="font-roboto-condensed text-4xl font-black uppercase text-dark-black mb-6">
              Frequently asked questions
            </h2>
            <p className="font-roboto text-lg font-medium leading-relaxed text-deep-gray">
              Find clear and transparent answers to the most common questions about our services, process, and way of working.
            </p>
          </div>

          {/* Accordion Lists Box */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqsList.map((faq, idx) => {
              const isOpen = openIdx === idx
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border-green/60 bg-white overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-roboto-condensed text-lg md:text-xl font-black uppercase text-dark-black">
                      {faq.question}
                    </span>
                    <div className="h-8 w-8 rounded-full border border-border-green/60 flex items-center justify-center shrink-0 bg-bg-deep text-dark-black font-black transition-transform duration-300">
                      {isOpen ? '✕' : '+'}
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6"
                  >
                    <p className="pb-6 text-left text-black-main font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- BLOGS SECTION ---------------- */
function BlogsSection() {
  return (
    <section id="blogs" className="py-20 lg:py-32 bg-light-green border-b border-border-green/20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Title */}
        <div className="grid gap-6 lg:grid-cols-12 mb-16 items-start">
          <h2 className="lg:col-span-4 text-left font-roboto-condensed text-4xl font-black uppercase text-dark-black tracking-tight">
            The latest blogs & trends
          </h2>
          <p className="lg:col-span-8 text-left font-roboto text-lg font-medium leading-relaxed text-deep-gray">
            We are a cause-led digital marketing and brand agency dedicated to helping businesses grow with purpose. We are a cause-led digital marketing.
          </p>
        </div>

        {/* Blogs cards grid */}
        <div className="grid gap-8 md:grid-cols-3 mt-12">
          {blogsList.map((blog, idx) => (
            <article key={idx} className="group flex flex-col justify-between rounded-[40px] border border-border-green bg-bg-deep p-6 relative overflow-hidden text-left cursor-pointer">
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-black uppercase text-deep-gray tracking-wider">
                    {blog.author}
                  </span>
                  <span className="text-xs font-bold text-deep-gray">
                    {blog.date}
                  </span>
                </div>

                {/* Category chip */}
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-white border border-border-green px-4 py-1 text-xs font-bold uppercase tracking-wider text-dark-black">
                    {blog.category}
                  </span>
                </div>

                {/* Thumbnail Image */}
                <div className="h-48 w-full overflow-hidden rounded-2xl border border-border-green/20 bg-white mb-6">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Article Header title */}
                <h3 className="font-roboto-condensed text-xl md:text-2xl font-black uppercase text-dark-black mb-4 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
              </div>

              <div>
                <p className="text-sm font-medium leading-relaxed text-black-main mt-4">
                  {blog.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- FOOTER SECTION ---------------- */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-light-green pt-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start pb-16">
          {/* Newsletter Box */}
          <div className="lg:col-span-5 text-left border border-border-green bg-bg-deep rounded-[40px] p-8 md:p-10 relative overflow-hidden">
            <h4 className="font-roboto-condensed text-xl font-black uppercase text-dark-black mb-6">
              Subscribe to our newsletter
            </h4>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter Your Email..."
                required
                className="w-full rounded-full border border-border-green/80 bg-white px-6 py-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/20 text-dark-black"
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
                <a href="#about" className="hover:text-dark-black transition-colors">Home</a>
                <a href="#about" className="hover:text-dark-black transition-colors">About</a>
                <a href="#services" className="hover:text-dark-black transition-colors">Service</a>
                <a href="#projects" className="hover:text-dark-black transition-colors">Projects</a>
                <a href="#faq" className="hover:text-dark-black transition-colors">FAQ</a>
              </div>
            </div>

            <div>
              <h5 className="font-roboto-condensed text-lg font-black uppercase text-dark-black mb-6">
                Pages
              </h5>
              <div className="flex flex-col gap-3 font-semibold text-deep-gray">
                <a href="#" className="hover:text-dark-black transition-colors">Style Guide</a>
                <a href="#" className="hover:text-dark-black transition-colors">License</a>
                <a href="#" className="hover:text-dark-black transition-colors">Changelog</a>
                <a href="#" className="hover:text-dark-black transition-colors">404 Page</a>
                <a href="#" className="hover:text-dark-black transition-colors">Password</a>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h5 className="font-roboto-condensed text-lg font-black uppercase text-dark-black mb-6">
                Contact
              </h5>
              <div className="flex flex-col gap-4 text-deep-gray">
                <a href="mailto:contact@brand1solution.com" className="font-bold text-dark-black hover:underline transition-all">
                  contact@brand1solution.com
                </a>
                <p className="text-sm font-medium leading-relaxed">
                  1901 Thornridge Cir. <br />Shiloh, Hawaii 81063
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
            <a href="#" className="hover:text-dark-black transition-colors">Facebook</a>
            <a href="#" className="hover:text-dark-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-dark-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-dark-black transition-colors">Linkedin</a>
          </div>

          <p className="normal-case font-medium">
            © {currentYear} Designed by <a href="#" className="hover:text-dark-black font-semibold">Olynex</a>. Powered by <a href="#" className="hover:text-dark-black font-semibold">Webflow</a> & React.
          </p>
        </div>

        {/* Giant header signature footer text */}
        <div className="relative pointer-events-none select-none text-center leading-none mt-4">
          <h3 className="font-roboto-condensed text-[10vw] md:text-[11vw] font-black uppercase tracking-tight text-border-green/20 select-none whitespace-nowrap">
            Brand1 Solution
          </h3>
        </div>
      </div>
    </footer>
  )
}

export default App
