import { createNavigation } from '../components/navigation.js';
import { createFooter } from '../components/footer.js';

// Contact Page Specific Animations and Functionality
interface ContactPageAnimations {
  init(): void;
  setupScrollAnimations(): void;
  setupFormHandling(): void;
  injectComponents(): void;
}

class ContactPageController implements ContactPageAnimations {
  private isAnimated = new Set<string>();

  constructor() {
    this.injectComponents();
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
      navPlaceholder.innerHTML = createNavigation('contact');
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = createFooter();
    }
  }

  private setupAnimations(): void {
    this.resetAnimationStates();
    this.setupScrollAnimations();
    this.setupFormHandling();
    this.setupMobileMenu();
  }

  private resetAnimationStates(): void {
    // Clear the animation tracking set to allow re-animation
    this.isAnimated.clear();
    
    // Reset all animated elements to initial state
    const elementsToReset = [
      '.page-title-animate',
      '.page-subtitle-animate',
      '.contact-image-container',
      '.contact-form-container',
      '.newsletter-header',
      '.newsletter-form-container'
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
      '.contact-image-container',
      '.contact-form-container',
      '.newsletter-header',
      '.newsletter-form-container'
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
    } else if (className.includes('contact-image-container')) {
      this.animateContactImage(element);
    } else if (className.includes('contact-form-container')) {
      this.animateContactForm(element);
    } else if (className.includes('newsletter-header')) {
      this.animateNewsletterHeader(element);
    } else if (className.includes('newsletter-form-container')) {
      this.animateNewsletterForm(element);
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

  private animateContactImage(element: Element): void {
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

  private animateContactForm(element: Element): void {
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

  private animateNewsletterHeader(element: Element): void {
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

  private animateNewsletterForm(element: Element): void {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow
    el.offsetHeight;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  }

  setupFormHandling(): void {
    // Contact Form Enhancements
    const contactForm = document.querySelector('form[action*="formspree"]') as HTMLFormElement;
    if (contactForm) {
      this.enhanceContactForm(contactForm);
    }

    // Newsletter Form Enhancements
    const newsletterForm = document.getElementById('mc-embedded-subscribe-form') as HTMLFormElement;
    if (newsletterForm) {
      this.enhanceNewsletterForm(newsletterForm);
    }
  }

  private enhanceContactForm(form: HTMLFormElement): void {
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    form.addEventListener('submit', (e) => {
      if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('opacity-75', 'cursor-not-allowed');
        
        // Reset button after a delay (in case of navigation)
        setTimeout(() => {
          if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
          }
        }, 3000);
      }
    });

    // Add focus enhancement to form inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        (input as HTMLElement).style.boxShadow = '0 0 0 3px rgba(255, 228, 0, 0.3)';
      });
      
      input.addEventListener('blur', () => {
        (input as HTMLElement).style.boxShadow = '';
      });
    });
  }

  private enhanceNewsletterForm(form: HTMLFormElement): void {
    const submitButton = form.querySelector('#mc-embedded-subscribe') as HTMLButtonElement;
    
    form.addEventListener('submit', (e) => {
      if (submitButton) {
        const originalText = submitButton.value;
        submitButton.value = 'Subscribing...';
        submitButton.disabled = true;
        submitButton.classList.add('opacity-75', 'cursor-not-allowed');
        
        // Reset button after a delay
        setTimeout(() => {
          if (submitButton) {
            submitButton.value = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
          }
        }, 3000);
      }
    });

    // Add focus enhancement to newsletter inputs
    const inputs = form.querySelectorAll('input[type="email"], input[type="text"]');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        (input as HTMLElement).style.boxShadow = '0 0 0 2px #ffe400';
        (input as HTMLElement).style.borderColor = 'transparent';
      });
      
      input.addEventListener('blur', () => {
        (input as HTMLElement).style.boxShadow = '';
        (input as HTMLElement).style.borderColor = '#d1d5db';
      });
    });
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
}

// Initialize Contact page animations only if user doesn't prefer reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  new ContactPageController();
} else {
  // Fallback for reduced motion users - make everything visible immediately
  document.addEventListener('DOMContentLoaded', () => {
    const elementsToShow = [
      '.page-title-animate',
      '.page-subtitle-animate',
      '.contact-image-container',
      '.contact-form-container',
      '.newsletter-header',
      '.newsletter-form-container'
    ];

    elementsToShow.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
    });

    // Still inject components for reduced motion users
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
      navPlaceholder.innerHTML = createNavigation('contact');
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = createFooter();
    }

    // Setup mobile menu for reduced motion users
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
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

      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        if (!mobileMenuBtn.contains(target) && !mobileMenu.contains(target)) {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('Contact page error:', e.error);
  // Graceful fallback
  const allAnimatedElements = document.querySelectorAll('[class*="opacity-0"]');
  allAnimatedElements.forEach(el => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });
});

export { ContactPageController };