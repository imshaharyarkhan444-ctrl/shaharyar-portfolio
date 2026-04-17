import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Mail, Phone, ExternalLink, Code2,
  Database, Globe, Cpu, BookOpen, GraduationCap, Briefcase,
  User, Layers, ChevronDown, Terminal, Star, ArrowRight,
  Copy, Check, MapPin, Calendar, Zap
} from "lucide-react";

// GitHub SVG Icon (lucide-react may not export it in all versions)
function Github({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ============================= TYPES ============================= */
interface Project {
  title: string;
  description: string;
  details: string;
  tech: string[];
  icon: string;
  color: string;
  highlight: string;
}

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

/* ============================= DATA ============================= */
const NAV_LINKS = ["About", "Skills", "Projects", "Education", "Contact"];

const PROJECTS: Project[] = [
  {
    title: "Restaurant Management System",
    description: "Full-featured Java application for managing restaurant operations end-to-end.",
    details:
      "Designed and built a comprehensive Java-based system for handling customer orders, generating itemized bills, and managing table reservations. Architected using clean OOP principles — every feature encapsulated in its own subclass for maximum readability and scalability.",
    tech: ["Java", "OOP", "CLI", "Data Structures"],
    icon: "🍽️",
    color: "from-orange-500/20 to-red-500/10",
    highlight: "OOP Architecture",
  },
  {
    title: "Mini Mart (DSA GUI App)",
    description: "Graphical inventory & billing system built with Data Structures as the core engine.",
    details:
      "A GUI-based desktop application featuring secure admin login, product management, and a customer-facing order interface. Powered entirely by custom DSA implementations — push/pop stack, linked list — for cart and inventory operations.",
    tech: ["Java", "DSA", "Stack", "Linked List", "GUI"],
    icon: "🛒",
    color: "from-emerald-500/20 to-teal-500/10",
    highlight: "DSA-Powered",
  },
  {
    title: "TimeTable Scheduling System",
    description: "Intelligent schedule generator using Constraint Satisfaction Problem (CSP) algorithms.",
    details:
      "Developed a full-stack timetable scheduler leveraging CSP to automatically resolve scheduling conflicts across classes, rooms, and instructors. Built with PHP on the backend and a clean, responsive HTML/CSS frontend.",
    tech: ["PHP", "HTML", "CSS", "CSP", "Algorithms"],
    icon: "📅",
    color: "from-blue-500/20 to-indigo-500/10",
    highlight: "CSP Algorithm",
  },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: <Code2 size={20} />,
    color: "text-violet-400",
    skills: [
      { name: "JavaScript", level: 85, icon: "⚡" },
      { name: "Java", level: 90, icon: "☕" },
      { name: "Python", level: 75, icon: "🐍" },
      { name: "C++", level: 70, icon: "⚙️" },
    ],
  },
  {
    category: "Web Technologies",
    icon: <Globe size={20} />,
    color: "text-sky-400",
    skills: [
      { name: "HTML5", level: 90, icon: "🌐" },
      { name: "CSS3", level: 85, icon: "🎨" },
      { name: "PHP", level: 70, icon: "🐘" },
    ],
  },
  {
    category: "Databases",
    icon: <Database size={20} />,
    color: "text-emerald-400",
    skills: [
      { name: "SQL", level: 80, icon: "🗄️" },
      { name: "MongoDB", level: 65, icon: "🍃" },
    ],
  },
  {
    category: "CS Fundamentals",
    icon: <Cpu size={20} />,
    color: "text-pink-400",
    skills: [
      { name: "Data Structures", level: 88, icon: "🌲" },
      { name: "Algorithms", level: 85, icon: "🔢" },
      { name: "OOP", level: 90, icon: "📦" },
      { name: "AI / ML Basics", level: 65, icon: "🤖" },
    ],
  },
];

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Software Engineering",
  "AI / Machine Learning",
  "Programming Fundamentals",
];

/* ============================= INTERSECTION OBSERVER HOOK ============================= */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ============================= ANIMATED SECTION ============================= */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================= SKILL BAR ============================= */
function SkillBar({ skill, inView }: { skill: Skill; inView: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 text-sm text-slate-300">
          <span>{skill.icon}</span>
          {skill.name}
        </span>
        <span className="text-xs font-code text-violet-400 font-medium">
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full progress-bar rounded-full"
          style={{
            width: inView ? `${skill.level}%` : "0%",
            transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

/* ============================= COPY EMAIL ============================= */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = "imshaharyar.khan444@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors group"
    >
      <Mail size={14} className="text-violet-400" />
      <span className="text-sm">{email}</span>
      {copied ? (
        <Check size={14} className="text-emerald-400" />
      ) : (
        <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

/* ============================= PARTICLE BLOB ============================= */
function HeroBlob({
  className,
  color,
  size,
  delay,
}: {
  className: string;
  color: string;
  size: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-blob ${className}`}
      style={{
        background: color,
        width: size,
        height: size,
        animationDelay: delay,
      }}
    />
  );
}

/* ============================= MAIN APP ============================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const skillsRef = useRef<HTMLDivElement>(null);
  const [skillsInView, setSkillsInView] = useState(false);

  // Navbar scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = NAV_LINKS.map((n) => n.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Skills in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSkillsInView(true);
      },
      { threshold: 0.1 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 overflow-x-hidden">

      {/* ==================== NAVBAR ==================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              SK
            </div>
            <span className="font-semibold text-white">
              Shaharyar<span className="text-violet-400">.</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`nav-link text-sm font-medium pb-1 ${
                  activeSection === link.toLowerCase()
                    ? "text-white"
                    : ""
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("Contact")}
              className="hidden md:flex btn-primary text-white text-sm font-medium px-4 py-2 rounded-lg items-center gap-2 z-10 relative"
            >
              <Mail size={14} />
              Hire Me
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-400 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mobile-nav px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-slate-300 hover:text-violet-400 py-2 border-b border-white/5 transition-colors"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("Contact")}
              className="btn-primary text-white text-sm font-medium px-4 py-3 rounded-lg mt-2 z-10 relative"
            >
              Hire Me
            </button>
          </div>
        )}
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Background blobs */}
        <HeroBlob className="top-[-10%] left-[-10%]" color="#7c3aed" size="600px" delay="0s" />
        <HeroBlob className="bottom-[-10%] right-[-10%]" color="#4f46e5" size="500px" delay="3s" />
        <HeroBlob className="top-[40%] left-[50%]" color="#0ea5e9" size="400px" delay="6s" />

        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,10,15,0)_0%,_rgba(10,10,15,0.8)_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 hero-badge rounded-full px-4 py-2 text-sm text-violet-300 mb-8"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full" style={{ animation: "pulse 2s infinite" }} />
            <span className="font-code">Available for Internship Opportunities</span>
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 text-glow"
            style={{ animation: "fade-in-up 0.7s ease 0.1s forwards", opacity: 0 }}
          >
            <span className="text-white">Shaharyar</span>
            <br />
            <span className="gradient-text">Khan</span>
          </h1>

          {/* Role */}
          <div
            className="flex items-center justify-center gap-3 mb-6"
            style={{ animation: "fade-in-up 0.7s ease 0.2s forwards", opacity: 0 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
            <p className="text-lg sm:text-xl text-slate-400 font-medium tracking-widest uppercase font-code">
              Software Developer
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>

          {/* Tagline */}
          <p
            className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ animation: "fade-in-up 0.7s ease 0.3s forwards", opacity: 0 }}
          >
            Computer Science student passionate about building{" "}
            <span className="text-violet-300 font-medium">scalable software solutions</span>.
            {" "}Turning complex problems into elegant, efficient code.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            style={{ animation: "fade-in-up 0.7s ease 0.4s forwards", opacity: 0 }}
          >
            <button
              onClick={() => scrollTo("Projects")}
              className="btn-primary text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 text-base z-10 relative"
            >
              View My Work
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              className="btn-outline font-semibold px-8 py-4 rounded-xl flex items-center gap-2 text-base"
            >
              Contact Me
              <Mail size={18} />
            </button>
          </div>

          {/* Stats Row */}
          <div
            className="flex items-center justify-center gap-8 sm:gap-16"
            style={{ animation: "fade-in-up 0.7s ease 0.5s forwards", opacity: 0 }}
          >
            {[
              { value: "3+", label: "Projects Built" },
              { value: "4+", label: "Languages" },
              { value: "2026", label: "Graduating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator flex flex-col items-center gap-2">
          <span className="text-xs text-slate-600 uppercase tracking-widest">Scroll</span>
          <ChevronDown size={16} className="text-violet-500" />
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <User size={16} className="text-violet-400" />
            </div>
            <span className="font-code text-violet-400 text-sm">01. about_me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-12">
            Who Am <span className="gradient-text">I?</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Bio */}
          <AnimatedSection delay={100}>
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p className="text-lg">
                I'm a{" "}
                <span className="text-violet-300 font-semibold">Computer Science student</span>{" "}
                at Iqra University (Batch 2022–2026), with a deep passion for crafting software that solves real problems. My journey started with fundamentals and has grown into hands-on experience building full-stack applications and algorithm-driven systems.
              </p>
              <p>
                I approach every project with a focus on{" "}
                <span className="text-sky-300 font-medium">clean architecture</span>,{" "}
                <span className="text-emerald-300 font-medium">code efficiency</span>, and{" "}
                <span className="text-pink-300 font-medium">user-first thinking</span>. Whether it's designing class hierarchies in Java or solving scheduling constraints with CSP, I love the intersection of logic and creativity.
              </p>
              <p>
                I'm actively seeking an <span className="text-white font-medium">internship opportunity</span> to apply my skills in a real-world engineering environment, contribute to impactful products, and grow alongside experienced developers.
              </p>
            </div>

            {/* Contact Quick Links */}
            <div className="mt-8 space-y-3">
              <CopyEmail />
              <a
                href="tel:+923222970998"
                className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors"
              >
                <Phone size={14} className="text-violet-400" />
                <span className="text-sm">+92 3222970998</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} className="text-violet-400" />
                <span className="text-sm">Pakistan 🇵🇰</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar size={14} className="text-violet-400" />
                <span className="text-sm">Graduating 2026</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:imshaharyar.khan444@gmail.com"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </AnimatedSection>

          {/* Right — Info Cards */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <GraduationCap size={22} className="text-violet-400" />,
                  title: "Education",
                  value: "BS Computer Science",
                  sub: "Iqra University",
                  bg: "from-violet-500/10 to-indigo-500/5",
                },
                {
                  icon: <Code2 size={22} className="text-sky-400" />,
                  title: "Focus",
                  value: "Software Dev",
                  sub: "Backend & Algorithms",
                  bg: "from-sky-500/10 to-blue-500/5",
                },
                {
                  icon: <Zap size={22} className="text-emerald-400" />,
                  title: "Status",
                  value: "Open to Work",
                  sub: "Internship Ready",
                  bg: "from-emerald-500/10 to-teal-500/5",
                },
                {
                  icon: <Star size={22} className="text-pink-400" />,
                  title: "Top Skill",
                  value: "Java & OOP",
                  sub: "90% Proficiency",
                  bg: "from-pink-500/10 to-rose-500/5",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${card.bg}`}
                >
                  <div className="mb-3">{card.icon}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    {card.title}
                  </div>
                  <div className="text-white font-bold text-sm">{card.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Soft Skills */}
            <div className="mt-6 glass-card rounded-2xl p-5">
              <div className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Briefcase size={16} className="text-violet-400" />
                Core Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Problem Solving",
                  "Clean Code",
                  "Team Collaboration",
                  "Fast Learner",
                  "OOP Design",
                  "Analytical Thinking",
                ].map((trait) => (
                  <span key={trait} className="skill-pill text-xs text-violet-300 rounded-full px-3 py-1">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ==================== SKILLS ==================== */}
      <section id="skills" className="py-24 px-6" ref={skillsRef}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Layers size={16} className="text-sky-400" />
              </div>
              <span className="font-code text-sky-400 text-sm">02. technical_skills</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              What I <span className="gradient-text">Know</span>
            </h2>
            <p className="text-slate-400 max-w-xl mb-12">
              A solid foundation across programming languages, web technologies, and computer science fundamentals — continuously expanding.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, ci) => (
              <AnimatedSection key={cat.category} delay={ci * 100}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className={`flex items-center gap-3 mb-6 ${cat.color}`}>
                    {cat.icon}
                    <span className="font-semibold text-white">{cat.category}</span>
                  </div>
                  <div className="space-y-5">
                    {cat.skills.map((skill) => (
                      <SkillBar key={skill.name} skill={skill} inView={skillsInView} />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Tech Badges */}
          <AnimatedSection delay={400}>
            <div className="mt-8 glass-card rounded-2xl p-6">
              <div className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                <Terminal size={14} />
                Technologies & Tools
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript", "Java", "Python", "C++", "HTML5", "CSS3",
                  "PHP", "SQL", "MongoDB", "Git", "OOP", "DSA",
                  "CSP", "Algorithms", "Software Engineering",
                ].map((tech) => (
                  <span key={tech} className="skill-pill text-xs font-code text-slate-300 rounded-lg px-3 py-1.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Briefcase size={16} className="text-emerald-400" />
              </div>
              <span className="font-code text-emerald-400 text-sm">03. featured_projects</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Things I've <span className="gradient-text">Built</span>
            </h2>
            <p className="text-slate-400 max-w-xl mb-12">
              A selection of projects that showcase my ability to architect, develop, and deliver complete software solutions.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project, pi) => (
              <AnimatedSection key={project.title} delay={pi * 120}>
                <div
                  className={`glass-card rounded-2xl p-6 h-full flex flex-col bg-gradient-to-br ${project.color} cursor-pointer group`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{project.icon}</span>
                    <span className="text-xs skill-pill text-violet-300 rounded-full px-3 py-1 font-semibold">
                      {project.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Short desc */}
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Details */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-5 flex-1">
                    {project.details}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-code bg-white/5 border border-white/8 text-slate-400 rounded-md px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* GitHub CTA */}
          <AnimatedSection delay={400}>
            <div className="mt-10 text-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-outline px-6 py-3 rounded-xl font-medium text-sm"
              >
                <Github size={18} />
                View All Projects on GitHub
                <ExternalLink size={14} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ==================== EDUCATION ==================== */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                <GraduationCap size={16} className="text-pink-400" />
              </div>
              <span className="font-code text-pink-400 text-sm">04. education</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-12">
              My <span className="gradient-text-warm">Background</span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Timeline Card */}
            <AnimatedSection delay={100}>
              <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-violet-500/8 to-indigo-500/5 h-full">
                <div className="flex items-start gap-5">
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center pt-1">
                    <div className="timeline-dot flex-shrink-0" />
                    <div className="w-0.5 flex-1 mt-2 timeline-line rounded-full" />
                  </div>

                  <div className="flex-1">
                    {/* Degree */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-code text-violet-400 bg-violet-500/10 rounded-full px-3 py-0.5">
                        2022 – 2026
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2 mb-1">
                      Bachelor of Science
                    </h3>
                    <p className="text-violet-300 font-semibold mb-1">Computer Science</p>
                    <p className="text-slate-400 text-sm mb-4 flex items-center gap-1">
                      <BookOpen size={13} />
                      Iqra University, Pakistan
                    </p>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      Pursuing a comprehensive CS degree with strong emphasis on software engineering, algorithms, and systems design. Expected graduation 2026.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Coursework */}
            <AnimatedSection delay={200}>
              <div className="glass-card rounded-2xl p-8 h-full">
                <h3 className="text-lg font-bold text-white mb-2">Relevant Coursework</h3>
                <p className="text-sm text-slate-500 mb-6">Key subjects shaping my technical foundation</p>
                <div className="grid grid-cols-1 gap-3">
                  {COURSEWORK.map((course, i) => (
                    <div
                      key={course}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5 hover:border-violet-500/30 transition-all group"
                    >
                      <div className="w-6 h-6 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                        <span className="text-xs font-code text-violet-400">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <span className="text-sm text-slate-300">{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Goals Banner */}
          <AnimatedSection delay={300}>
            <div className="mt-8 glass-card rounded-2xl p-6 bg-gradient-to-r from-violet-500/10 via-indigo-500/8 to-sky-500/10 border border-violet-500/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Zap size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Currently Looking For</h4>
                  <p className="text-slate-400 text-sm">
                    An internship where I can contribute to real engineering challenges, write production-quality code, 
                    and learn from experienced software developers. Open to backend, full-stack, or software engineering roles.
                  </p>
                </div>
                <button
                  onClick={() => scrollTo("Contact")}
                  className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap flex-shrink-0 z-10 relative ml-auto"
                >
                  Let's Talk <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                  <Mail size={16} className="text-sky-400" />
                </div>
                <span className="font-code text-sky-400 text-sm">05. get_in_touch</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-4">
                Let's <span className="gradient-text">Connect</span>
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto text-lg">
                I'm actively seeking internship opportunities. Whether you have a role in mind or just want to say hello — my inbox is always open.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <AnimatedSection delay={100}>
              <div className="space-y-4">
                {/* Email Card */}
                <a
                  href="mailto:imshaharyar.khan444@gmail.com"
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 group cursor-pointer block"
                >
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                    <Mail size={20} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Email</div>
                    <div className="text-sm text-slate-300 group-hover:text-violet-300 transition-colors break-all">
                      imshaharyar.khan444@gmail.com
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 ml-auto flex-shrink-0 group-hover:text-violet-400 transition-colors" />
                </a>

                {/* Phone Card */}
                <a
                  href="tel:+923222970998"
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 group cursor-pointer block"
                >
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/20 transition-colors">
                    <Phone size={20} className="text-sky-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Phone</div>
                    <div className="text-sm text-slate-300 group-hover:text-sky-300 transition-colors">
                      +92 3222970998
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 ml-auto flex-shrink-0 group-hover:text-sky-400 transition-colors" />
                </a>

                {/* GitHub Card */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 group cursor-pointer block"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <Github size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">GitHub</div>
                    <div className="text-sm text-slate-300 group-hover:text-emerald-300 transition-colors">
                      github.com/shaharyar-khan
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 ml-auto flex-shrink-0 group-hover:text-emerald-400 transition-colors" />
                </a>

                {/* Location */}
                <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-pink-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Location</div>
                    <div className="text-sm text-slate-300">Pakistan 🇵🇰 — Open to Remote</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={200}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                  window.location.href = `mailto:imshaharyar.khan444@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
                }}
                className="glass-card rounded-2xl p-6 space-y-4"
              >
                <h3 className="text-white font-bold mb-2">Send a Message</h3>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Ahmed Ali"
                    className="form-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="form-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about the opportunity or just say hi!"
                    className="form-input w-full rounded-xl px-4 py-3 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 z-10 relative"
                >
                  <Mail size={16} />
                  Send Message
                  <ArrowRight size={16} />
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                SK
              </div>
              <span className="text-slate-400 text-sm">
                Shaharyar Khan <span className="text-violet-400">·</span> Software Developer
              </span>
            </div>

            <div className="text-slate-600 text-xs font-code">
              Built with React · Tailwind CSS · ❤️
            </div>

            <div className="flex gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-xs text-slate-600 hover:text-violet-400 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 text-slate-700 text-xs">
            © {new Date().getFullYear()} Shaharyar Khan. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
