import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, MessageCircle, ArrowDown, Moon, Sun, ExternalLink, Calendar } from 'lucide-react';
import ProfilePic from './assets/_MG_0082.jpg';
import ZidepeopleLogo from './assets/new-logo.png';
import Imposter from './assets/download.png';

const Portfolio = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  //const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isDark, setIsDark] = useState(true); // Theme state

  // Auto-trigger intro animation after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroComplete(true);
      setTimeout(() => setShowScrollHint(true), 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position with requestAnimationFrame for smooth performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          //const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          //const progress = scrolled / maxScroll;
          
          setScrollY(scrolled);
          //setScrollProgress(progress);
          
          if (scrolled > 50) setShowScrollHint(false);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to contact section
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // PFP positioning logic
  const getPFPStyle = () => {
    if (scrollY < 50) {
      if (!introComplete) {
        return {
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          position: 'fixed'
        };
      } else {
        return {
          left: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '200px',
          height: '200px',
          position: 'fixed'
        };
      }
    } else {
      const shrinkProgress = Math.min(scrollY / 300, 1);
      const size = 200 - (120 * shrinkProgress);
      
      return {
        left: `${10 - (6 * shrinkProgress)}%`,
        top: `${50 - (46 * shrinkProgress)}%`,
        transform: shrinkProgress > 0.5 ? 'none' : 'translateY(-50%)',
        width: `${size}px`,
        height: `${size}px`,
        position: 'fixed'
      };
    }
  };

  // Text positioning
  const getTextStyle = () => {
    if (scrollY < 50) {
      if (!introComplete) {
        return {
          opacity: 0,
          transform: 'translateY(100px)'
        };
      } else {
        return {
          opacity: 1,
          transform: 'translateY(0)'
        };
      }
    } else {
      const fadeProgress = Math.min(scrollY / 300, 1);
      return {
        opacity: 1 - fadeProgress,
        transform: `translateY(${fadeProgress * -50}px)`
      };
    }
  };

  // Project card horizontal slide animation
  const getProjectTransform = (index) => {
    const projectsStart = 400;
    const cardSpacing = 350;
    
    const cardScrollStart = projectsStart + (index * cardSpacing);
    const cardScrollEnd = cardScrollStart + 300;
    
    if (scrollY < cardScrollStart) {
      return index % 2 === 0 
        ? { transform: 'translateX(100%)', opacity: 0 }
        : { transform: 'translateX(-100%)', opacity: 0 };
    } else if (scrollY > cardScrollEnd) {
      return { transform: 'translateX(0)', opacity: 1 };
    } else {
      const localProgress = (scrollY - cardScrollStart) / (cardScrollEnd - cardScrollStart);
      const movement = (1 - localProgress) * 100;
      
      return index % 2 === 0
        ? { transform: `translateX(${movement}%)`, opacity: localProgress }
        : { transform: `translateX(-${movement}%)`, opacity: localProgress };
    }
  };

  // Skills section visibility trigger - fires once when section comes into view
  const [skillsVisible, setSkillsVisible] = useState(false);
  
  useEffect(() => {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillsVisible) {
            setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }

    return () => skillsObserver.disconnect();
  }, [skillsVisible]);

  const projects = [
    {
      title: "Zidepeople",
      period: "Jun 2024 - present",
      description: "Zidepeople is a production web platform where I developed and maintained both the primary user-facing website and the internal administration dashboard. I built scalable frontend systems focused on performance, usability, and responsive design while collaborating closely with backend engineers and designers to ship production-ready features.",
      tech: ["React", "Css", "REST APIs", "Git", "JavaScript"],
      link: "https://www.zidepeople.com/",
      image: ZidepeopleLogo
    },
    {
      title: "Exodus",
      period: "Nov 2025 - Feb 2026",
      description: "Exodus is a record label management platform that allows users to explore artists and access their streaming platforms and media content. I independently designed and developed the entire backend infrastructure, focusing on scalable API architecture and structured content management.",
      tech: ["Python", "Postgres", "FastAPI", "Render", "Postman", "REST APIs"],
      link: "#",
      image: "" 
    },
    {
      title: "TurnUp Lagos",
      period: "May 2025 - Aug 2025",
      description: "TurnUp Lagos is an event discovery and tracking platform designed to help users find and stay updated on upcoming events. I handled full backend development, designing scalable APIs and authentication systems to support event management and user interactions.",
      tech: ["Python", "Postgres", "FastAPI", "Render", "Postman", "REST APIs"],
      link: "#",
      image: ""
    },
    {
      title: "Plan'et",
      period: "Mar 2024 - Aug 2024",
      description: "Plan’et is a full-stack event planning web application developed as my final year project. The platform allows users to organize, manage, and coordinate events through an interactive and responsive web interface.",
      tech: ["Python", "Postgres", "FastAPI", "HTML", "CSS", "JavaScript", "REST APIs"],
      link: "https://plan-et.onrender.com/docs",
      image: ""
    },
    {
      title: "Imposter",
      period: "Oct 2022 - Jan 2023",
      description: "Imposter is a multiplayer mobile party game inspired by social deduction gameplay. Players receive questions, but one player receives a different prompt and must blend in while others attempt to identify the imposter. The app focuses on real-time interaction, game logic, and scalable backend architecture.",
      tech: ["React Native", "Python", "FastAPI", "PostgreSQL", "Mobile Development", "Game Logic Design", "REST APIs"],
      link: "#",
      image: Imposter
    }
  ];

  const skills = [
    { name: "React", level: 95, delay: 0 },
    { name: "React Native", level: 70, delay: 0 },
    { name: "Python & FastAPI", level: 75, delay: 0 },
    { name: "SQL DBs", level: 65, delay: 0 },
    { name: "REST APIs", level: 90, delay: 0 },
    { name: "Git & CI/CD", level: 93, delay: 0 }
  ];

  // Theme-based color classes
  const theme = {
    bg: isDark ? 'bg-neutral-950' : 'bg-stone-50',
    bgSecondary: isDark ? 'bg-neutral-900' : 'bg-white',
    bgCard: isDark ? 'bg-neutral-900/50' : 'bg-white/80',
    text: isDark ? 'text-white' : 'text-neutral-900',
    textSecondary: isDark ? 'text-neutral-400' : 'text-neutral-600',
    border: isDark ? 'border-neutral-800' : 'border-neutral-200',
    borderHover: isDark ? 'border-red-500/50' : 'border-red-400/50',
    accent: isDark ? 'text-red-400' : 'text-red-600',
    accentBg: isDark ? 'bg-red-500' : 'bg-red-600',
    accentHover: isDark ? 'hover:bg-red-600' : 'hover:bg-red-700',
    shadow: isDark ? 'shadow-red-500/20' : 'shadow-red-400/30',
    gradient: isDark ? 'from-red-500 to-rose-600' : 'from-red-500 to-rose-500',
    skillBar: isDark ? 'bg-neutral-800' : 'bg-neutral-200',
    skillFill: isDark ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-red-500 to-rose-500'
  };

  return (
    <div className={`${theme.bg} ${theme.text} min-h-screen relative overflow-x-hidden theme-transition`}>
      {/* Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: ${isDark ? '#0a0a0a' : '#f5f5f4'};
            transition: background 0.3s ease;
          }
          ::-webkit-scrollbar-thumb {
            background: ${isDark ? '#ef4444' : '#dc2626'};
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${isDark ? '#dc2626' : '#b91c1c'};
          }

          /* Jump animation for contact button */
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .jump-animation {
            animation: jump 2s ease-in-out infinite;
          }

          /* Project card 3D tilt */
          .project-card {
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
          }

          .project-card:hover {
            transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.02);
          }

          /* Smooth theme color transitions only */
          .theme-transition {
            transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          }
        `}
      </style>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-80 left-8 z-50 ${theme.bgSecondary} ${theme.text} p-4 rounded-full ${theme.border} border-2 hover:${theme.borderHover} shadow-lg transition-all duration-300 hover:scale-110 group`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-400 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <Moon className="w-6 h-6 text-neutral-700 group-hover:rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Floating Contact Button - TOP RIGHT with jump animation */}
      <button
        onClick={scrollToContact}
        className={`fixed top-8 right-8 z-50 bg-gradient-to-r ${theme.gradient} text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:${theme.shadow} transition-all duration-300 hover:scale-110 jump-animation flex items-center gap-2 group`}
      >
        <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Contact Me</span>
      </button>

      {/* Profile Picture - Animated position */}
      <div
        className="z-40"
        style={{
          ...getPFPStyle(),
          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="relative w-full h-full">
          <div className={`w-full h-full rounded-full overflow-hidden border-4 ${isDark ? 'border-red-500' : 'border-red-600'} shadow-2xl ${theme.shadow}`}>
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-full h-full object-cover scale-150 object-[200%_-30%]"
            />
          </div>
          <div className={`absolute inset-0 rounded-full ${isDark ? 'border-red-500/30' : 'border-red-400/30'} border-2 animate-pulse`} style={{ transform: 'scale(1.1)' }}></div>
        </div>
      </div>

      {/* Name and Title */}
      <div
        className="fixed right-[10%] top-1/2 -translate-y-1/2 z-30"
        style={{
          ...getTextStyle(),
          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="text-right">
          <h1 className={`text-7xl md:text-8xl font-black mb-4 ${theme.text}`}>
            Kayode Teniola
          </h1>
          <div className={`text-2xl md:text-3xl ${theme.accent} font-semibold tracking-wide`}>
            Full Stack Developer
          </div>
          <div className="mt-6 flex items-center justify-end gap-4">
            <div className={`h-px w-16 bg-gradient-to-r ${isDark ? 'from-transparent to-red-500' : 'from-transparent to-red-600'}`}></div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      {showScrollHint && scrollY < 50 && (
        <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce text-center ${theme.textSecondary}`}>
          <div className="text-sm mb-2">scroll to explore</div>
          <ArrowDown className={`w-6 h-6 ${theme.accent} mx-auto`} />
        </div>
      )}

      {/* Spacer for intro section */}
      <div className="h-screen"></div>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <h2 className={`text-6xl md:text-8xl font-black mb-6 ${theme.text}`}>
              My Work
            </h2>
            <p className={`text-xl ${theme.textSecondary}`}>Projects that made an impact</p>
          </div>

          {/* Project Cards */}
          <div className="space-y-32">
            {projects.map((project, index) => {
              const style = getProjectTransform(index);
              
              return (
                <div
                  key={index}
                  style={{
                    ...style,
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <a
                    href={project.link}
                    className="block group project-card cursor-pointer"
                  >
                    <div className={`${theme.bgCard} backdrop-blur-xl rounded-3xl overflow-hidden border-2 ${theme.border} hover:${theme.borderHover} transition-all duration-500 shadow-2xl hover:${theme.shadow}`}>
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-video md:aspect-auto">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-60' : 'bg-gradient-to-t from-white via-white/50 to-transparent opacity-40'}`}></div>
                          
                          {/* Hover icon */}
                          <div className={`absolute top-6 right-6 w-12 h-12 ${theme.accentBg} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:rotate-45`}>
                            <ExternalLink className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          {/* Period */}
                          <div className={`flex items-center gap-2 ${theme.accent} text-sm mb-4 font-medium`}>
                            <Calendar className="w-4 h-4" />
                            <span>{project.period}</span>
                          </div>

                          {/* Title */}
                          <h3 className={`text-4xl md:text-5xl font-bold mb-6 ${theme.text} group-hover:${theme.accent} transition-colors duration-300`}>
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className={`${theme.textSecondary} text-lg leading-relaxed mb-8`}>
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech, i) => (
                              <span
                                key={i}
                                className={`px-4 py-2 ${isDark ? 'bg-neutral-800/80' : 'bg-neutral-100'} backdrop-blur border ${theme.border} rounded-full text-sm ${theme.textSecondary} hover:${theme.borderHover} transition-all`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* View indicator */}
                          <div className={`mt-6 flex items-center gap-2 ${theme.accent} font-semibold group-hover:gap-4 transition-all`}>
                            <span>View Project</span>
                            <ArrowDown className="w-4 h-4 rotate-[-90deg]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 px-4 ${isDark ? 'bg-neutral-900/30' : 'bg-neutral-100/50'} backdrop-blur-sm relative`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-6xl md:text-8xl font-black mb-6 ${theme.text}`}>
              Technical Skills
            </h2>
            <p className={`text-xl ${theme.textSecondary}`}>Tools I've mastered</p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-2xl font-bold ${theme.text} group-hover:${theme.accent} transition-colors`}>
                    {skill.name}
                  </span>
                  <span className={`${theme.accent} text-xl font-semibold`}>
                    {skill.level}%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className={`h-3 ${theme.skillBar} rounded-full overflow-hidden relative`}>
                  <div
                    className={`h-full ${theme.skillFill} rounded-full relative`}
                    style={{
                      width: skillsVisible ? `${skill.level}%` : '0%',
                      transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${skill.delay}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-32 relative">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-red-950/20 via-rose-950/20 to-neutral-950' : 'bg-gradient-to-br from-red-50/50 via-rose-50/50 to-stone-50'}`}></div>
        
        {/* Animated background blobs */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-red-500/10' : 'bg-red-400/20'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-rose-500/10' : 'bg-rose-400/20'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 text-center max-w-5xl">
          <h2 className={`text-6xl md:text-9xl font-black mb-8 leading-tight ${theme.text}`}>
            Let's Build
            <br />
            <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Something Great
            </span>
          </h2>

          <p className={`text-2xl ${theme.textSecondary} mb-16 max-w-3xl mx-auto leading-relaxed`}>
            Got an idea? Let's turn it into reality. I'm available for freelance projects, 
            collaborations, and full-time opportunities.
          </p>

          {/* Contact Options */}
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            <a
              href="https://wa.me/08052041858"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-green-500/50 flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>WhatsApp</span>
            </a>

            <a
              href="mailto:kayodeteniola100@gmail.com"
              className={`group px-8 py-4 ${theme.accentBg} ${theme.accentHover} text-white rounded-full font-bold transition-all duration-300 hover:scale-110 shadow-2xl hover:${theme.shadow} flex items-center gap-3`}
            >
              <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Email</span>
            </a>

            <a
              href="https://github.com/Tenniee"
              target="_blank"
              rel="noopener noreferrer"
              className={`group px-8 py-4 ${theme.bgSecondary} ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} rounded-full font-bold transition-all duration-300 hover:scale-110 shadow-2xl flex items-center gap-3 border-2 ${theme.border}`}
            >
              <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/teniola-kayode-3aa82127a/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-blue-600/50 flex items-center gap-3"
            >
              <Linkedin className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Footer */}
          <div className={`mt-20 pt-8 border-t ${theme.border}`}>
            <p className={`${theme.textSecondary}`}>
              © 2026 Kayode Teniola • Designed & Built with React + Tailwind CSS
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
