import { createNavigation } from '../components/navigation.js';
import { createFooter } from '../components/footer.js';

// About Page Specific Animations
interface AboutPageAnimations {
  init(): void;
  setupScrollAnimations(): void;
  setupValueCardAnimations(): void;
  injectComponents(): void;
}

class AboutPageController implements AboutPageAnimations {
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
      navPlaceholder.innerHTML = createNavigation('about');
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = createFooter();
    }
  }

  private setupAnimations(): void {
    this.resetAnimationStates();
    this.setupScrollAnimations();
    this.setupValueCardAnimations();
    this.setupMobileMenu();
  }

  private resetAnimationStates(): void {
    // Clear the animation tracking set to allow re-animation
    this.isAnimated.clear();
    
    // Reset bio content to initial state, clearing any inline styles
    const bioContent = document.querySelector('.bio-content') as HTMLElement;
    if (bioContent) {
      // Clear inline styles that may persist from previous navigation
      bioContent.style.opacity = '';
      bioContent.style.transform = '';
      bioContent.style.transition = '';
      
      // Let CSS handle the initial hidden state
    }

    // Reset page header elements
    const pageTitle = document.querySelector('.page-title-animate') as HTMLElement;
    const pageSubtitle = document.querySelector('.page-subtitle-animate') as HTMLElement;
    
    if (pageTitle) {
      pageTitle.style.opacity = '';
      pageTitle.style.transform = '';
      pageTitle.style.transition = '';
    }
    
    if (pageSubtitle) {
      pageSubtitle.style.opacity = '';
      pageSubtitle.style.transform = '';
      pageSubtitle.style.transition = '';
    }
  }

  setupScrollAnimations(): void {
    // Create intersection observer for bio content slide animation only
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const animationId = target.getAttribute('class') || target.tagName;
            
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

    // Observe page header and bio content for animations
    const elementsToObserve = [
      '.page-title-animate',
      '.page-subtitle-animate',
      '.bio-content'
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
    } else if (className.includes('bio-content')) {
      this.animateBioContent(element);
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

  private animateBioContent(element: Element): void {
    const el = element as HTMLElement;
    
    // Ensure element starts from initial hidden state
    el.style.opacity = '0';
    el.style.transform = 'translateX(50px)';
    el.style.transition = 'all 0.8s ease-out';
    
    // Force reflow to ensure initial state is applied
    el.offsetHeight;
    
    // Trigger animation
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0px)';
    }, 50);
  }


  setupValueCardAnimations(): void {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateMethodHover(card, true);
      });
      
      card.addEventListener('mouseleave', () => {
        this.animateMethodHover(card, false);
      });
    });
  }

  private animateCardHover(card: Element, isHover: boolean): void {
    const icon = card.querySelector('.value-icon');
    const title = card.querySelector('h3');

    if (icon && title) {
      // Set explicit transition for smooth hover animations
      (icon as HTMLElement).style.transition = 'transform 0.3s ease';
      (title as HTMLElement).style.transition = 'color 0.3s ease';

      if (isHover) {
        (icon as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)';
        (title as HTMLElement).style.color = '#ffe400';
      } else {
        (icon as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
        (title as HTMLElement).style.color = '#000000';
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

}

// Initialize About page - works for both normal and reduced motion users
new AboutPageController();

// If reduced motion is preferred, make elements visible immediately
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.addEventListener('DOMContentLoaded', () => {
    const elementsToShow = [
      '.page-title-animate',
      '.page-subtitle-animate',
      '.bio-content'
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
  console.error('About page animation error:', e.error);
  // Graceful fallback
  const allAnimatedElements = document.querySelectorAll('[class*="animate"]');
  allAnimatedElements.forEach(el => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });
});

export { AboutPageController };