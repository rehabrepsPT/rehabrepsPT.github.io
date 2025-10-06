// Main TypeScript file for Rehab Reps website
import { RehabRepsThemeManager } from './theme-manager.js';
import { createNavigation } from '../components/navigation.js';
import { createFooter } from '../components/footer.js';

interface HeroAnimation {
  init(): void;
  animateOnScroll(): void;
  setupCarousel(): void;
  setupMobileMenu(): void;
}

class RehabRepsHeroAnimation implements HeroAnimation {
  private isAnimated = false;
  private currentSlide = 0;
  private slideInterval: number | null = null;
  private slides: NodeListOf<Element> | null = null;
  private indicators: NodeListOf<Element> | null = null;
  private themeManager: RehabRepsThemeManager;
  private timelineInterval: number | null = null;
  private isTimelinePaused = false;
  private timelineStartTime: number = 0;
  private timelineElapsed: number = 0;

  constructor() {
    this.themeManager = new RehabRepsThemeManager();
    this.injectComponents();
    this.init();
  }

  private injectComponents(): void {
    // Inject navigation component
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
      navPlaceholder.innerHTML = createNavigation('home');
    }

    // Inject footer component
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = createFooter();
    }
  }

  init(): void {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupAnimations();
      });
    } else {
      this.setupAnimations();
    }
  }

  private setupAnimations(): void {
    this.animateOnScroll();
    this.setupCarousel();
    this.setupMobileMenu();
    this.setupPerformanceMetrics();
    this.setupParticleInteractions();
    this.updateCopyright();
    this.setupVisibilityChangeHandler();
  }

  animateOnScroll(): void {
    // Intersection Observer for hero animations
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');

    if (!heroContent || !heroImage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isAnimated) {
            this.triggerHeroAnimation();
            this.isAnimated = true;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(heroContent);

    // Check if hero is already in viewport on page load
    const heroRect = heroContent.getBoundingClientRect();
    const isInViewport = heroRect.top < window.innerHeight && heroRect.bottom > 0;

    if (isInViewport && !this.isAnimated) {
      // Trigger animation immediately if already visible
      this.triggerHeroAnimation();
      this.isAnimated = true;
    }
  }

  private triggerHeroAnimation(): void {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');

    if (heroContent && heroImage) {
      // Trigger content animations
      heroContent.classList.add('animate-in');
      heroImage.classList.add('animate-in');

      // Animate hero words with stagger
      this.animateHeroWords();
      
      // Trigger rehabilitation timeline after delay
      setTimeout(() => {
        this.animateRehabilitationTimeline();
      }, 1000);
    }
  }

  private animateHeroWords(): void {
    const heroWords = document.querySelectorAll('.hero-word');
    
    heroWords.forEach((word, index) => {
      const delay = parseInt(word.getAttribute('data-delay') || '0');
      
      setTimeout(() => {
        word.classList.remove('opacity-0');
        // word.style.opacity = '1';
      }, delay);
    });
  }

  private animateRehabilitationTimeline(): void {
    const timeline = document.querySelector('.rehabilitation-progress');
    if (!timeline) return;

    const phases = [
      { name: 'EVALUATE', description: 'Comprehensive movement assessment', position: 0 },
      { name: 'RECOVER', description: 'Pain management and acute care', position: 25 },
      { name: 'REBUILD', description: 'Restore strength and mobility', position: 50 },
      { name: 'RELOAD', description: 'Sport-specific performance training', position: 75 },
      { name: 'REVITALIZE', description: 'Ongoing wellness support', position: 100 }
    ];

    let currentPhase = 0;
    
    const progressFill = timeline.querySelector('.progress-fill') as HTMLElement;
    const progressDot = timeline.querySelector('.progress-dot') as HTMLElement;
    const phaseText = timeline.querySelector('.phase-text') as HTMLElement;
    const phaseDescription = timeline.querySelector('.phase-description') as HTMLElement;
    const markers = timeline.querySelectorAll('.marker');
    const phaseLabels = timeline.querySelectorAll('.phase-labels span');

    const animateToPhase = (phaseIndex: number) => {
      const phase = phases[phaseIndex];
      
      // Update progress fill and dot position
      if (progressFill) {
        progressFill.style.width = `${phase.position}%`;
      }
      if (progressDot) {
        progressDot.style.left = `${phase.position}%`;
      }

      // Update active marker
      markers.forEach((marker, index) => {
        marker.classList.toggle('active', index === phaseIndex);
      });

      // Update phase label styles based on current stage
      phaseLabels.forEach((label, index) => {
        label.classList.remove('passed', 'active');
        if (index < phaseIndex) {
          label.classList.add('passed'); // Light gray for passed phases
        } else if (index === phaseIndex) {
          label.classList.add('active'); // Darker for current phase
        }
        // Future phases remain default gray
      });

      // Update phase text with fade effect
      if (phaseText && phaseDescription) {
        phaseText.classList.add('fading');
        phaseDescription.classList.add('fading');
        
        setTimeout(() => {
          phaseText.textContent = phase.name;
          phaseDescription.textContent = phase.description;
          phaseText.classList.remove('fading');
          phaseDescription.classList.remove('fading');
        }, 150);
      }
    };

    const startTimeline = () => {
      this.timelineStartTime = Date.now();
      this.timelineElapsed = 0;
      
      // Start the progression through phases
      const cyclePhases = () => {
        if (this.isTimelinePaused) return;
        
        animateToPhase(currentPhase);
        currentPhase = (currentPhase + 1) % phases.length;
        
        if (currentPhase === 0) {
          // Reset cycle timing
          this.timelineInterval = window.setTimeout(cyclePhases, 5250);
        } else {
          this.timelineInterval = window.setTimeout(cyclePhases, 3750);
        }
      };

      // Start after initial delay
      this.timelineInterval = window.setTimeout(cyclePhases, 1500);
    };

    startTimeline();
  }

  setupCarousel(): void {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.indicator');

    if (!this.slides || !this.indicators || this.slides.length === 0 || this.indicators.length === 0) return;

    // Setup indicator click events
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });

    // Auto-advance carousel
    this.startCarousel();

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        this.stopCarousel();
      });

      carouselContainer.addEventListener('mouseleave', () => {
        this.startCarousel();
      });
    }
  }

  private goToSlide(index: number): void {
    if (!this.slides || !this.indicators) return;
    if (index < 0 || index >= this.slides.length) return;

    // Remove active states
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active states - check if elements exist
    const targetSlide = this.slides[index];
    const targetIndicator = this.indicators[index];
    
    if (targetSlide) {
      targetSlide.classList.add('active');
    }
    if (targetIndicator) {
      targetIndicator.classList.add('active');
    }

    this.currentSlide = index;
  }

  private nextSlide(): void {
    if (!this.slides || this.slides.length === 0) return;
    
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  private startCarousel(): void {
    // Stop any existing carousel to prevent multiple intervals
    this.stopCarousel();

    this.slideInterval = window.setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  private stopCarousel(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  setupMobileMenu(): void {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event from bubbling to document
      const isHidden = mobileMenu.classList.contains('hidden');

      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (!mobileMenuBtn.contains(target) && !mobileMenu.contains(target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  private setupPerformanceMetrics(): void {
    // Add shimmer effect to metrics bars
    const metricBars = document.querySelectorAll('.metric-fill');
    
    metricBars.forEach(bar => {
      bar.addEventListener('animationend', (e) => {
        if (e.animationName === 'shimmer') {
          // Add subtle pulse on completion
          bar.classList.add('animate-pulse');
          setTimeout(() => {
            bar.classList.remove('animate-pulse');
          }, 1000);
        }
      });
    });
  }

  private setupParticleInteractions(): void {
    const heroSection = document.querySelector('.hero-section');
    const particles = document.querySelectorAll('.particle');

    if (!heroSection || !particles.length) return;

    // Add mouse interaction for particles
    let mouseX = 0;
    let mouseY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;

      particles.forEach((particle, index) => {
        const element = particle as HTMLElement;
        const speed = 0.05 + (index * 0.01);
        
        const targetX = mouseX * 20 - 10;
        const targetY = mouseY * 20 - 10;
        
        element.style.transform = `translate(${targetX}px, ${targetY}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      particles.forEach(particle => {
        const element = particle as HTMLElement;
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  private updateCopyright(): void {
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
      const currentYear = new Date().getFullYear();
      copyrightElement.textContent = `© ${currentYear} Rehab Reps All Rights Reserved`;
    }
  }

  private setupVisibilityChangeHandler(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseTimelineAnimation();
      } else {
        this.resumeTimelineAnimation();
      }
    });
  }

  private pauseTimelineAnimation(): void {
    if (this.timelineInterval && !this.isTimelinePaused) {
      this.isTimelinePaused = true;
      this.timelineElapsed += Date.now() - this.timelineStartTime;
      clearTimeout(this.timelineInterval);
      this.timelineInterval = null;
    }
  }

  private resumeTimelineAnimation(): void {
    if (this.isTimelinePaused) {
      this.isTimelinePaused = false;
      this.timelineStartTime = Date.now();
      
      const timeline = document.querySelector('.rehabilitation-progress');
      if (timeline) {
        this.resumeTimelineFromElapsed();
      }
    }
  }

  private resumeTimelineFromElapsed(): void {
    const phases = [
      { name: 'EVALUATE', description: 'Comprehensive movement assessment', position: 0 },
      { name: 'RECOVER', description: 'Pain management and acute care', position: 25 },
      { name: 'REBUILD', description: 'Restore strength and mobility', position: 50 },
      { name: 'RELOAD', description: 'Sport-specific performance training', position: 75 },
      { name: 'REVITALIZE', description: 'Ongoing wellness support', position: 100 }
    ];

    const totalCycleTime = (3750 * 4) + 5250;
    const normalizedElapsed = this.timelineElapsed % totalCycleTime;
    
    let currentPhaseIndex = 0;
    let phaseStartTime = 1500;
    
    if (normalizedElapsed > phaseStartTime) {
      for (let i = 0; i < phases.length; i++) {
        const phaseEndTime = phaseStartTime + (i === phases.length - 1 ? 5250 : 3750);
        if (normalizedElapsed <= phaseEndTime) {
          currentPhaseIndex = i;
          break;
        }
        phaseStartTime = phaseEndTime;
      }
    }
    
    this.animateToPhaseSmooth(currentPhaseIndex);
    
    const remainingTime = Math.max(100, (phaseStartTime + (currentPhaseIndex === phases.length - 1 ? 5250 : 3750)) - normalizedElapsed);
    this.timelineInterval = window.setTimeout(() => {
      this.continueTimelineAnimation(currentPhaseIndex);
    }, remainingTime);
  }

  private continueTimelineAnimation(currentPhase: number): void {
    const phases = [
      { name: 'EVALUATE', description: 'Comprehensive movement assessment', position: 0 },
      { name: 'RECOVER', description: 'Pain management and acute care', position: 25 },
      { name: 'REBUILD', description: 'Restore strength and mobility', position: 50 },
      { name: 'RELOAD', description: 'Sport-specific performance training', position: 75 },
      { name: 'REVITALIZE', description: 'Ongoing wellness support', position: 100 }
    ];

    const nextPhase = (currentPhase + 1) % phases.length;
    this.animateToPhaseSmooth(nextPhase);
    
    const nextDelay = nextPhase === 0 ? 5250 : 3750;
    this.timelineInterval = window.setTimeout(() => {
      this.continueTimelineAnimation(nextPhase);
    }, nextDelay);
  }

  private animateToPhaseSmooth(phaseIndex: number): void {
    const timeline = document.querySelector('.rehabilitation-progress');
    if (!timeline) return;

    const phases = [
      { name: 'EVALUATE', description: 'Comprehensive movement assessment', position: 0 },
      { name: 'RECOVER', description: 'Pain management and acute care', position: 25 },
      { name: 'REBUILD', description: 'Restore strength and mobility', position: 50 },
      { name: 'RELOAD', description: 'Sport-specific performance training', position: 75 },
      { name: 'REVITALIZE', description: 'Ongoing wellness support', position: 100 }
    ];

    const phase = phases[phaseIndex];
    const progressFill = timeline.querySelector('.progress-fill') as HTMLElement;
    const progressDot = timeline.querySelector('.progress-dot') as HTMLElement;
    const phaseText = timeline.querySelector('.phase-text') as HTMLElement;
    const phaseDescription = timeline.querySelector('.phase-description') as HTMLElement;
    const markers = timeline.querySelectorAll('.marker');
    const phaseLabels = timeline.querySelectorAll('.phase-labels span');

    if (progressFill) {
      progressFill.style.width = `${phase.position}%`;
    }
    if (progressDot) {
      progressDot.style.left = `${phase.position}%`;
    }

    markers.forEach((marker, index) => {
      marker.classList.toggle('active', index === phaseIndex);
    });

    phaseLabels.forEach((label, index) => {
      label.classList.remove('passed', 'active');
      if (index < phaseIndex) {
        label.classList.add('passed');
      } else if (index === phaseIndex) {
        label.classList.add('active');
      }
    });

    if (phaseText && phaseDescription) {
      phaseText.classList.add('fading');
      phaseDescription.classList.add('fading');
      
      setTimeout(() => {
        phaseText.textContent = phase.name;
        phaseDescription.textContent = phase.description;
        phaseText.classList.remove('fading');
        phaseDescription.classList.remove('fading');
      }, 150);
    }
  }

  cleanup(): void {
    // Clear all intervals
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
    if (this.timelineInterval) {
      clearTimeout(this.timelineInterval);
      this.timelineInterval = null;
    }
    
    // Reset timeline state
    this.isTimelinePaused = false;
    this.timelineElapsed = 0;
    this.timelineStartTime = 0;
  }
}

// Initialize homepage - works for both normal and reduced motion users
const rehabRepsInstance = new RehabRepsHeroAnimation();
(window as any).rehabRepsInstance = rehabRepsInstance;

// If reduced motion is preferred, make hero content visible immediately
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');

    if (heroContent && heroImage) {
      heroContent.classList.add('animate-in');
      heroImage.classList.add('animate-in');
    }
  });
}

// Error handling and cleanup
window.addEventListener('error', (e) => {
  console.error('Animation error:', e.error);
  // Graceful fallback - ensure content is visible
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image-container');
  
  if (heroContent) {
    (heroContent as HTMLElement).style.opacity = '1';
  }
  if (heroImage) {
    (heroImage as HTMLElement).style.opacity = '1';
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Clear any running timeline intervals to prevent memory leaks
  const rehabRepsInstance = (window as any).rehabRepsInstance;
  if (rehabRepsInstance && typeof rehabRepsInstance.cleanup === 'function') {
    rehabRepsInstance.cleanup();
  }
});

// Export for potential external use
export { RehabRepsHeroAnimation };