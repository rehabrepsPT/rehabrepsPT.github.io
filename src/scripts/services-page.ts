import { createNavigation } from '../components/navigation.js';
import { createFooter } from '../components/footer.js';
// Services Page Specific Animations
import { RehabRepsThemeManager } from './theme-manager.js';

interface ServicesPageAnimations {
  init(): void;
  setupScrollAnimations(): void;
  setupServiceCardAnimations(): void;
  injectComponents(): void;
}

class ServicesPageController implements ServicesPageAnimations {
  private isAnimated = new Set<string>();
  private themeManager: RehabRepsThemeManager;

  constructor() {
    this.injectComponents();
    this.themeManager = new RehabRepsThemeManager();
    this.init();
  }

  init(): void {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupAnimations();
      });
    } else {
      this.setupAnimations();
    }
  }

  injectComponents(): void {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
      navPlaceholder.innerHTML = createNavigation('services');
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = createFooter();
    }
  }

  private setupAnimations(): void {
    this.resetAnimationStates();
    this.setupScrollAnimations();
    this.setupServiceCardAnimations();
    this.setupMobileMenu();
    this.updateCopyright();
  }

  private resetAnimationStates(): void {
    // Clear the animation tracking set to allow re-animation
    this.isAnimated.clear();
    
    // Reset all animated elements to initial state
    const elementsToReset = [
      '.page-title-animate',
      '.page-subtitle-animate',
      // '.service-card',
      // '.treatment-method',
      '.office-gallery',
      '.service-benefits',
      '.cta-content'
    ];
    
    elementsToReset.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const element = el as HTMLElement;
        // Clear inline styles that may persist from previous navigation
        element.style.opacity = '';
        element.style.transform = '';
        element.style.transition = '';
      });
    });
  }

  setupScrollAnimations(): void {
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const animationId = target.className.replace(/\s+/g, '-');
            
            if (!this.isAnimated.has(animationId)) {
              this.triggerAnimation(target);
              this.isAnimated.add(animationId);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Elements to observe for scroll animations
    const elementsToObserve = [
      '.page-title-animate',
      '.page-subtitle-animate',
      // '.service-card',
      '.treatment-section-title',
      '.treatment-section-subtitle',
      // '.treatment-method',
      '.office-gallery',
      '.service-benefits',
      '.cta-content'
    ];

    elementsToObserve.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => observer.observe(el));
    });
  }

  private triggerAnimation(element: Element): void {
    const className = element.className;
    
    if (className.includes('page-title-animate')) {
      this.animatePageTitle(element);
    } else if (className.includes('page-subtitle-animate')) {
      this.animatePageSubtitle(element);
    } else if (className.includes('treatment-section-title')) {
      this.animateSectionTitle(element);
    } else if (className.includes('treatment-section-subtitle')) {
      this.animateSectionSubtitle(element);
    } else if (className.includes('service-card')) {
      // this.animateServiceCard(element);
    } else if (className.includes('treatment-method')) {
      // this.animateTreatmentMethod(element);
    } else if (className.includes('office-gallery')) {
      this.animateOfficeGallery(element);
    } else if (className.includes('service-benefits')) {
      this.animateServiceBenefits(element);
    } else if (className.includes('cta-content')) {
      this.animateCtaContent(element);
    }
  }

  private animatePageTitle(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }

  private animatePageSubtitle(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  }

  private animateSectionTitle(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }

  private animateSectionSubtitle(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  }

  private animateServiceCard(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    // Get index for stagger effect
    const allCards = document.querySelectorAll('.service-card');
    const index = Array.from(allCards).indexOf(element);
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200 + 100);
  }

  private animateTreatmentMethod(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    // Get index for stagger effect
    const allMethods = document.querySelectorAll('.treatment-method');
    const index = Array.from(allMethods).indexOf(element);
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100 + 100);
  }

  private animateOfficeGallery(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, 100);
  }

  private animateServiceBenefits(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateX(50px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, 200);
  }

  private animateCtaContent(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }

  setupServiceCardAnimations(): void {
    const serviceCards = document.querySelectorAll('.service-card');
    const treatmentMethods = document.querySelectorAll('.treatment-method');
    
    // Add hover effects to service cards
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateMethodHover(card, true);
      });
      
      card.addEventListener('mouseleave', () => {
        this.animateMethodHover(card, false);
      });
    });

    // Add hover effects to treatment methods
    treatmentMethods.forEach(method => {
      method.addEventListener('mouseenter', () => {
        this.animateMethodHover(method, true);
      });
      
      method.addEventListener('mouseleave', () => {
        this.animateMethodHover(method, false);
      });
    });
  }

  private animateCardHover(card: Element, isHover: boolean): void {
    const icon = card.querySelector('svg');
    
    if (icon) {
      if (isHover) {
        (icon as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)';
        (icon as HTMLElement).style.transition = 'transform 0.3s ease';
        (card as HTMLElement).style.transform = 'translateY(-5px)';
        (card as HTMLElement).style.transition = 'transform 0.3s ease';
      } else {
        (icon as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }
    }
  }

  private animateMethodHover(method: Element, isHover: boolean): void {
    const icon = method.querySelector('svg');
    
    if (icon) {
      if (isHover) {
        (icon as HTMLElement).style.transform = 'scale(1.15)';
        (icon as HTMLElement).style.transition = 'transform 0.3s ease';
        (method as HTMLElement).style.transform = 'translateY(-3px)';
        (method as HTMLElement).style.transition = 'transform 0.3s ease';
      } else {
        (icon as HTMLElement).style.transform = 'scale(1)';
        (method as HTMLElement).style.transform = 'translateY(0)';
      }
    }
  }

  private setupMobileMenu(): void {
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

  private updateCopyright(): void {
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
      const currentYear = new Date().getFullYear();
      copyrightElement.textContent = `© ${currentYear} Rehab Reps All Rights Reserved`;
    }
  }
}

// Initialize Services page animations only if user doesn't prefer reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  new ServicesPageController();
} else {
  // Fallback for reduced motion users - make everything visible
  document.addEventListener('DOMContentLoaded', () => {
    const elementsToShow = [
      '.page-title-animate',
      '.page-subtitle-animate',
      '.service-card',
      '.treatment-method',
      '.office-gallery',
      '.service-benefits',
      '.cta-content'
    ];

    elementsToShow.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
    });
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('Services page animation error:', e.error);
  // Graceful fallback
  const allAnimatedElements = document.querySelectorAll('[class*="opacity-0"]');
  allAnimatedElements.forEach(el => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });
});

export { ServicesPageController };