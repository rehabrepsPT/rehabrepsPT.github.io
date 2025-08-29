// Main TypeScript file for Rehab Reps website
import { RehabRepsThemeManager } from './theme-manager.js';

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

  constructor() {
    this.themeManager = new RehabRepsThemeManager();
    this.init();
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
      
      // Trigger performance metrics after delay
      setTimeout(() => {
        this.animatePerformanceMetrics();
      }, 1000);
    }
  }

  private animateHeroWords(): void {
    const heroWords = document.querySelectorAll('.hero-word');
    
    heroWords.forEach((word, index) => {
      const delay = parseInt(word.getAttribute('data-delay') || '0');
      
      setTimeout(() => {
        word.classList.remove('opacity-0');
        word.style.opacity = '1';
      }, delay);
    });
  }

  private animatePerformanceMetrics(): void {
    const metrics = document.querySelectorAll('.metric-fill');
    
    metrics.forEach((metric, index) => {
      const targetWidth = metric.getAttribute('data-width') || '0%';
      
      setTimeout(() => {
        (metric as HTMLElement).style.width = targetWidth;
      }, index * 200);
    });
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

    mobileMenuBtn.addEventListener('click', () => {
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
}

// Performance optimizations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Initialize animations only if user doesn't prefer reduced motion
  new RehabRepsHeroAnimation();
} else {
  // Fallback for reduced motion users
  document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');
    
    if (heroContent && heroImage) {
      heroContent.classList.add('animate-in');
      heroImage.classList.add('animate-in');
    }

    // Still enable mobile menu and carousel
    const animation = new RehabRepsHeroAnimation();
    animation.setupMobileMenu();
    animation.setupCarousel();
  });
}

// Error handling
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

// Export for potential external use
export { RehabRepsHeroAnimation };