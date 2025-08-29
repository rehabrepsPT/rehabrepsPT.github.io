// About Page Specific Animations
interface AboutPageAnimations {
  init(): void;
  setupScrollAnimations(): void;
  setupValueCardAnimations(): void;
}

class AboutPageController implements AboutPageAnimations {
  private isAnimated = new Set<string>();

  constructor() {
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

  private setupAnimations(): void {
    this.setupScrollAnimations();
    this.setupValueCardAnimations();
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

    // Only observe bio content for slide animation
    const elementsToObserve = [
      '.bio-content'
    ];

    elementsToObserve.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => observer.observe(el));
    });
  }

  private triggerAnimation(element: Element): void {
    const className = element.className;
    
    if (className.includes('bio-content')) {
      this.animateBioContent(element);
    }
  }


  private animateBioContent(element: Element): void {
    (element as HTMLElement).style.opacity = '0';
    (element as HTMLElement).style.transform = 'translateX(50px)';
    (element as HTMLElement).style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
      (element as HTMLElement).style.opacity = '1';
      (element as HTMLElement).style.transform = 'translateX(0px)';
    }, 400);
  }


  setupValueCardAnimations(): void {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateCardHover(card, true);
      });
      
      card.addEventListener('mouseleave', () => {
        this.animateCardHover(card, false);
      });
    });
  }

  private animateCardHover(card: Element, isHover: boolean): void {
    const icon = card.querySelector('.value-icon');
    const title = card.querySelector('h3');
    
    if (icon && title) {
      if (isHover) {
        (icon as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)';
        (title as HTMLElement).style.color = '#ffe400';
      } else {
        (icon as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
        (title as HTMLElement).style.color = '#000000';
      }
    }
  }

}

// Initialize About page animations only if user doesn't prefer reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  new AboutPageController();
} else {
  // Fallback for reduced motion users - make everything visible
  document.addEventListener('DOMContentLoaded', () => {
    const elementsToShow = [
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