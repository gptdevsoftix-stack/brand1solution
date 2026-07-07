import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import agencyHero from './assets/agency-hero.png'
import globalStudio from './assets/global-studio.png'

gsap.registerPlugin(ScrollTrigger)

type Theme = 'light' | 'dark'

type Service = {
  title: string
  eyebrow: string
  copy: string
}

const navItems = ['about', 'services', 'work', 'pricing', 'faq', 'contact'] as const

const services: Service[] = [
  {
    title: 'Experience Design',
    eyebrow: 'UX / UI',
    copy: 'Premium interfaces, design systems, prototypes, and product flows that make users trust the brand faster.',
  },
  {
    title: 'Web Engineering',
    eyebrow: 'React / Vite',
    copy: 'Fast marketing sites, dashboards, portals, and conversion pages built with clean frontend architecture.',
  },
  {
    title: 'Growth Systems',
    eyebrow: 'SEO / CRO',
    copy: 'Search visibility, content structure, analytics, and conversion experiments designed around measurable lift.',
  },
  {
    title: 'Commerce Builds',
    eyebrow: 'Shopify / Custom',
    copy: 'Elegant storefronts with product storytelling, secure checkout, performance, and post-launch optimization.',
  },
]

const portfolio = [
  ['Luma Finance', 'Fintech dashboard with real-time insight layers', 'Product Strategy'],
  ['Aster Studio', 'A cinematic brand site for a creative production team', 'Brand Web'],
  ['Northline Goods', 'Conversion-led e-commerce with editorial product pages', 'Commerce'],
]

const pricing = [
  ['Launch', '$2.8k+', 'Best for a premium brand site refresh', ['Strategy sprint', '5 core sections', 'Responsive build', 'Launch QA']],
  ['Scale', '$6.5k+', 'Best for full websites and growth systems', ['UX direction', '8-12 sections', 'CMS-ready structure', 'SEO foundation']],
  ['Signature', 'Custom', 'Best for ambitious products and campaigns', ['Creative direction', 'Motion system', 'Custom interactions', 'Growth roadmap']],
]

const faqs = [
  ['Can you use content from our old website?', 'Yes. The current Brand1Solutions content can be refined, reorganized, and elevated into stronger messaging.'],
  ['Will the site be responsive?', 'Yes. The layout is built mobile-first with adaptive typography, spacing, navigation, and interaction behavior.'],
  ['Is this SEO friendly?', 'Yes. It uses semantic sections, accessible headings, optimized metadata, fast assets, and clean content hierarchy.'],
  ['Can animations be reduced?', 'Yes. Motion respects reduced-motion preferences and uses GPU-friendly transforms where possible.'],
]

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<Theme>('dark')
  const [active, setActive] = useState('hero')
  const cursorX = useSpring(useMotionValue(0), { stiffness: 260, damping: 34 })
  const cursorY = useSpring(useMotionValue(0), { stiffness: 260, damping: 34 })

  useEffect(() => {
    const stored = window.localStorage.getItem('brand1-theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(stored ?? preferred)
    const timer = window.setTimeout(() => setLoading(false), 1050)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('brand1-theme', theme)
  }, [theme])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.85 })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 18)
      cursorY.set(event.clientY - 18)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [cursorX, cursorY])

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-section]')
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(section.id),
        onEnterBack: () => setActive(section.id),
      })

      gsap.fromTo(
        section.querySelectorAll('[data-reveal]'),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 72%' },
        },
      )
    })

    gsap.to('[data-parallax]', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: '#work', start: 'top bottom', end: 'bottom top', scrub: true },
    })

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }, [])

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Brand1Solutions',
      url: 'https://brand1solutions.com',
      email: 'info@brand1solutions.com',
      serviceType: ['Web Development', 'UI/UX Design', 'App Development', 'SEO', 'Digital Marketing'],
    }),
    [],
  )

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-50 hidden h-9 w-9 rounded-full border border-cyan-300/50 mix-blend-difference lg:block" style={{ x: cursorX, y: cursorY }} />
      <div className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)] selection:bg-cyan-300 selection:text-slate-950">
        <DynamicBackdrop />
        <Navbar active={active} theme={theme} setTheme={setTheme} />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Features />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-slate-950 text-white"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="relative grid h-40 w-40 place-items-center">
        <motion.div className="absolute inset-0 rounded-full border border-cyan-300/40" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute inset-5 rounded-full border border-amber-300/40" animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight">
          B1
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

function DynamicBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div className="absolute left-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-cyan-400/20 blur-3xl" animate={{ x: [0, 80, 10], y: [0, 30, 90], scale: [1, 1.18, 1] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-[-10rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-amber-300/16 blur-3xl" animate={{ x: [0, -80, -10], y: [0, -60, -20], scale: [1, 1.12, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,.065)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,.065)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
    </div>
  )
}

function Navbar({ active, theme, setTheme }: { active: string; theme: Theme; setTheme: (theme: Theme) => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed left-1/2 top-4 z-40 w-[min(1180px,calc(100%_-_28px))] -translate-x-1/2 transition-all duration-300 ${scrolled ? 'glass shadow-2xl shadow-cyan-950/10' : 'bg-transparent'}`}>
      <nav className="flex h-16 items-center justify-between px-3 md:px-4" aria-label="Main navigation">
        <a href="#hero" className="magnetic inline-flex items-center gap-3 rounded-xl p-2 font-black tracking-tight">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-700 text-white shadow-lg shadow-cyan-500/20">B1</span>
          <span className="leading-none">Brand1<span className="block text-xs font-bold text-cyan-500">Solutions</span></span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className={`relative rounded-full px-4 py-2 text-sm font-bold capitalize transition-colors ${active === item ? 'text-slate-950 dark:text-white' : 'text-[var(--muted)] hover:text-[var(--text)]'}`}>
              {active === item && <motion.span layoutId="active-nav" className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-white/10" />}
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="magnetic grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--panel)]" type="button" aria-label="Toggle color theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☼' : '◐'}
          </button>
          <a href="#contact" className="magnetic hidden rounded-full bg-[var(--text)] px-5 py-3 text-sm font-black text-[var(--bg)] shadow-xl shadow-cyan-500/10 sm:inline-flex">Start</a>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--panel)] lg:hidden" type="button" aria-label="Open menu" onClick={() => setOpen((value) => !value)}>
            <span className="h-0.5 w-5 bg-current shadow-[0_7px_0_currentColor]" />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} className="glass mx-3 mb-3 grid gap-1 rounded-2xl p-3 lg:hidden">
            {navItems.map((item) => <a key={item} href={`#${item}`} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-lg font-black capitalize">{item}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section id="hero" data-section className="section grid min-h-screen items-center pt-28 lg:grid-cols-[1fr_.9fr] lg:pt-20">
      <div>
        <RevealText eyebrow="Digital agency for serious brands" title="Digital experiences with the polish of a product launch." />
        <p data-reveal className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)]">
          Brand1Solutions designs and builds premium websites, apps, brand systems, and growth experiences that feel fast, memorable, and unmistakably credible.
        </p>
        <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
          <MagneticButton href="#work">View Work</MagneticButton>
          <MagneticButton href="#contact" subtle>Book a Strategy Call</MagneticButton>
        </div>
      </div>
      <motion.div data-reveal className="relative mt-14 lg:mt-0" initial={{ rotateX: 10, rotateY: -10 }} whileHover={{ rotateX: 0, rotateY: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-cyan-400 via-blue-600 to-amber-300 opacity-40 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl shadow-cyan-950/20">
          <img src={agencyHero} alt="Brand1Solutions premium digital product studio" className="h-[520px] w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-white/10" />
          <FloatingMetric className="left-5 top-5" label="Site lift" value="+68%" />
          <FloatingMetric className="bottom-5 right-5" label="Launch speed" value="2.4x" />
        </div>
      </motion.div>
    </section>
  )
}

function RevealText({ eyebrow, title }: { eyebrow: string; title: string }) {
  const words = title.split(' ')
  return (
    <div>
      <p data-reveal className="eyebrow">{eyebrow}</p>
      <h1 className="max-w-5xl text-balance text-6xl font-black leading-[.92] tracking-[-0.055em] md:text-8xl lg:text-[7.8rem]">
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} className="mr-4 inline-block overflow-hidden" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.05 + index * 0.035, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            {word}
          </motion.span>
        ))}
      </h1>
    </div>
  )
}

function FloatingMetric({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <motion.div className={`absolute rounded-2xl border border-white/20 bg-white/12 p-4 text-white shadow-2xl backdrop-blur-xl ${className}`} animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
      <span className="text-xs font-bold uppercase tracking-widest text-cyan-100">{label}</span>
      <strong className="block text-3xl font-black">{value}</strong>
    </motion.div>
  )
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="We combine creative direction with senior frontend engineering.">
      <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div data-reveal className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)]">
          <img src={globalStudio} alt="Global creative workspace" className="h-full w-full object-cover opacity-90" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          {['Strategy', 'Design', 'Build', 'Growth'].map((item, index) => (
            <motion.span key={item} className="absolute rounded-full border border-white/15 bg-white/15 px-4 py-2 text-sm font-black text-white backdrop-blur-xl" style={{ left: `${12 + (index % 2) * 48}%`, top: `${18 + index * 18}%` }} animate={{ y: [0, -12, 0] }} transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}>
              {item}
            </motion.span>
          ))}
        </div>
        <div data-reveal className="grid content-center gap-8">
          <p className="max-w-2xl text-2xl leading-10 text-[var(--muted)]">
            We turn business ambition into digital presence: clear positioning, expressive design, reliable React builds, and growth systems that keep improving after launch.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Counter end={42} suffix="+" label="Launches" />
            <Counter end={98} suffix="%" label="Client satisfaction" />
            <Counter end={3} suffix="x" label="Avg. clarity lift" />
          </div>
        </div>
      </div>
    </Section>
  )
}

function Services() {
  return (
    <Section id="services" eyebrow="Services" title="Four disciplines. One premium digital system.">
      <div className="grid gap-5 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.article data-reveal key={service.title} className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-7" whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="text-sm font-black uppercase tracking-[.2em] text-cyan-500">{service.eyebrow}</span>
            <h3 className="mt-16 text-3xl font-black tracking-tight">{service.title}</h3>
            <p className="mt-5 leading-7 text-[var(--muted)]">{service.copy}</p>
            <span className="absolute bottom-5 right-6 text-7xl font-black text-[var(--text)] opacity-5">0{index + 1}</span>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function Portfolio() {
  return (
    <Section id="work" eyebrow="Portfolio" title="Selected concepts built to feel distinct.">
      <div className="grid gap-6">
        {portfolio.map(([name, copy, type], index) => (
          <motion.article data-reveal key={name} className="group grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] md:grid-cols-[.8fr_1.2fr]" whileHover={{ scale: 0.99 }}>
            <div className="relative min-h-72 overflow-hidden">
              <img data-parallax src={index === 1 ? agencyHero : globalStudio} alt={`${name} project concept`} className="h-[120%] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 to-slate-950/70" />
            </div>
            <div className="grid content-between gap-10 p-8 md:p-12">
              <span className="w-fit rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-500">{type}</span>
              <div>
                <h3 className="text-4xl font-black tracking-tight md:text-6xl">{name}</h3>
                <p className="mt-5 max-w-2xl text-xl leading-8 text-[var(--muted)]">{copy}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function Features() {
  return (
    <Section id="features" eyebrow="Features" title="Premium details that make the site feel alive.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div data-reveal className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8">
          <AnimatedSvg />
        </div>
        <div className="grid gap-4">
          {['Lenis smooth scrolling', 'Framer page motion', 'GSAP scroll reveals', 'Dark and light modes', 'Accessible semantic structure'].map((item) => (
            <div data-reveal key={item} className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 text-xl font-black">{item}</div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="A site should make the business feel inevitable.">
      <div data-reveal className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] py-8">
        <motion.div className="flex gap-6 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
          {[...Array(2)].flatMap(() => ['Premium execution', 'Clear communication', 'Beautiful motion', 'Fast delivery', 'Conversion focused']).map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-full border border-[var(--line)] px-8 py-4 text-3xl font-black tracking-tight">{item}</span>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function Pricing() {
  return (
    <Section id="pricing" eyebrow="Pricing" title="Flexible packages for different launch moments.">
      <div className="grid gap-5 lg:grid-cols-3">
        {pricing.map(([name, price, copy, items]) => (
          <article data-reveal key={name as string} className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-7">
            <h3 className="text-3xl font-black">{name as string}</h3>
            <p className="mt-4 text-5xl font-black tracking-tight">{price as string}</p>
            <p className="mt-4 leading-7 text-[var(--muted)]">{copy as string}</p>
            <ul className="mt-8 grid gap-3">
              {(items as string[]).map((item) => <li key={item} className="flex gap-3 text-sm font-bold"><span className="text-cyan-500">✦</span>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

function FAQ() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Straight answers before the first call.">
      <div className="mx-auto max-w-4xl divide-y divide-[var(--line)] rounded-[2rem] border border-[var(--line)] bg-[var(--panel)]">
        {faqs.map(([question, answer]) => <Accordion key={question} question={question} answer={answer} />)}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Tell us what you want your brand to become.">
      <div className="grid gap-6 lg:grid-cols-[1fr_.75fr]">
        <form data-reveal className="grid gap-4 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 md:p-8">
          <input aria-label="Name" placeholder="Name" className="field" />
          <input aria-label="Email" placeholder="Email" className="field" type="email" />
          <textarea aria-label="Project details" placeholder="What are we building?" className="field min-h-40 resize-y" />
          <MagneticButton href="mailto:info@brand1solutions.com">Send Inquiry</MagneticButton>
        </form>
        <aside data-reveal className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8">
          <img src={globalStudio} alt="Creative contact workspace" className="mb-7 h-64 w-full rounded-3xl object-cover" loading="lazy" />
          <a className="block text-2xl font-black" href="mailto:info@brand1solutions.com">info@brand1solutions.com</a>
          <a className="mt-5 block text-[var(--muted)]" href="tel:+15169829342">John Haines: +516-982-9342</a>
          <a className="mt-2 block text-[var(--muted)]" href="tel:+16197142878">Michael Anderson: +619-714-2878</a>
          <p className="mt-6 text-[var(--muted)]">14.7 Woodbury Road, Huntington, NY 11743</p>
        </aside>
      </div>
    </Section>
  )
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} data-section className="section py-24 md:py-32">
      <div data-reveal className="mb-12 max-w-4xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="text-balance text-5xl font-black leading-[.98] tracking-[-.045em] md:text-7xl">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function MagneticButton({ href, children, subtle = false }: { href: string; children: ReactNode; subtle?: boolean }) {
  return (
    <a href={href} className={`magnetic group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full px-7 text-sm font-black transition-transform hover:-translate-y-1 ${subtle ? 'border border-[var(--line)] bg-[var(--panel)] text-[var(--text)]' : 'bg-[var(--text)] text-[var(--bg)] shadow-2xl shadow-cyan-500/15'}`}>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </a>
  )
}

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = 54
    const timer = window.setInterval(() => {
      frame += 1
      setValue(Math.round((frame / total) * end))
      if (frame >= total) window.clearInterval(timer)
    }, 22)
    return () => window.clearInterval(timer)
  }, [end, inView])

  return (
    <div ref={ref} className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-5">
      <strong className="text-4xl font-black">{value}{suffix}</strong>
      <span className="mt-2 block text-sm font-bold text-[var(--muted)]">{label}</span>
    </div>
  )
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div data-reveal>
      <button type="button" className="flex w-full items-center justify-between gap-6 p-6 text-left text-xl font-black" onClick={() => setOpen((value) => !value)}>
        {question}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-cyan-500">+</motion.span>
      </button>
      <AnimatePresence>
        {open && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-6 pb-6 leading-7 text-[var(--muted)]">{answer}</motion.p>}
      </AnimatePresence>
    </div>
  )
}

function AnimatedSvg() {
  return (
    <svg viewBox="0 0 900 420" role="img" aria-label="Animated product system diagram" className="h-full min-h-[360px] w-full">
      <defs>
        <linearGradient id="lineGradient" x1="0" x2="1">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <motion.path d="M80 210 C210 40 330 380 460 210 S700 40 820 210" fill="none" stroke="url(#lineGradient)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
      {[80, 260, 450, 640, 820].map((x, index) => (
        <motion.circle key={x} cx={x} cy={index % 2 ? 140 : 210} r="34" fill="rgba(34,211,238,.15)" stroke="rgba(34,211,238,.55)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} />
      ))}
    </svg>
  )
}

function Footer() {
  return (
    <footer className="section flex flex-col justify-between gap-8 border-t border-[var(--line)] py-12 text-[var(--muted)] md:flex-row">
      <p className="font-black text-[var(--text)]">Brand1Solutions</p>
      <p>Premium web design, development, branding, and growth systems.</p>
      <a href="#hero" className="font-black text-[var(--text)]">Back to top</a>
    </footer>
  )
}

export default App
