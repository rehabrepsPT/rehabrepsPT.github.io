// Dark Mode Theme Manager
export interface ThemeManager {
  init(): void;
  toggleTheme(): void;
  setTheme(theme: 'light' | 'dark' | 'system'): void;
  getCurrentTheme(): 'light' | 'dark';
}

export class RehabRepsThemeManager implements ThemeManager {
  private currentTheme: 'light' | 'dark' | 'system' = 'system';
  private prefersDarkMedia: MediaQueryList;
  
  constructor() {
    this.prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }

  init(): void {
    // Load saved theme preference or default to system
    const savedTheme = localStorage.getItem('rr-theme') as 'light' | 'dark' | 'system' | null;
    this.currentTheme = savedTheme || 'system';

    // Apply initial theme
    this.applyTheme();

    // Listen for system theme changes
    this.prefersDarkMedia.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });

    // Update toggle button state
    this.updateToggleButton();
    
    // Add event listener to toggle button
    this.setupToggleButton();
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    this.currentTheme = theme;
    localStorage.setItem('rr-theme', theme);
    this.applyTheme();
    this.updateToggleButton();
  }

  toggleTheme(): void {
    if (this.currentTheme === 'system') {
      // If system, toggle to opposite of current system preference
      this.setTheme(this.prefersDarkMedia.matches ? 'light' : 'dark');
    } else if (this.currentTheme === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'system') {
      return this.prefersDarkMedia.matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  private applyTheme(): void {
    const isDark = this.getCurrentTheme() === 'dark';
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(isDark);

    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: this.getCurrentTheme() } 
    }));
  }

  private updateMetaThemeColor(isDark: boolean): void {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    metaThemeColor.setAttribute('content', isDark ? '#1a1a1a' : '#ffffff');
  }

  private setupToggleButton(): void {
    const toggleButton = document.getElementById('theme-toggle');
    const mobileToggleButton = document.getElementById('theme-toggle-mobile');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
    
    if (mobileToggleButton) {
      mobileToggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  private updateToggleButton(): void {
    this.updateDesktopToggle();
    this.updateMobileToggle();
  }

  private updateDesktopToggle(): void {
    const toggleButton = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');

    if (!toggleButton || !sunIcon || !moonIcon) return;

    const isDark = this.getCurrentTheme() === 'dark';
    
    // Update icons
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }

    // Update button aria-label
    toggleButton.setAttribute('aria-label', 
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );

    // Add smooth rotation animation
    toggleButton.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      toggleButton.style.transform = 'rotate(0deg)';
    }, 150);
  }

  private updateMobileToggle(): void {
    const mobileToggleButton = document.getElementById('theme-toggle-mobile');
    const mobileSunIcons = document.querySelectorAll('.theme-icon-sun');
    const mobileMoonIcons = document.querySelectorAll('.theme-icon-moon');

    if (!mobileToggleButton) return;

    const isDark = this.getCurrentTheme() === 'dark';
    
    // Update mobile icons
    mobileSunIcons.forEach(icon => {
      if (isDark) {
        icon.classList.remove('hidden');
      } else {
        icon.classList.add('hidden');
      }
    });
    
    mobileMoonIcons.forEach(icon => {
      if (isDark) {
        icon.classList.add('hidden');
      } else {
        icon.classList.remove('hidden');
      }
    });

    // Update button aria-label
    mobileToggleButton.setAttribute('aria-label', 
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );

    // Add smooth rotation animation
    mobileToggleButton.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      mobileToggleButton.style.transform = 'rotate(0deg)';
    }, 150);
  }

  // Public method to get theme preference for animations
  getThemePreference(): 'light' | 'dark' | 'system' {
    return this.currentTheme;
  }
}

// Utility function to preload theme before page render (prevents flash)
export function preloadTheme(): void {
  const savedTheme = localStorage.getItem('rr-theme') as 'light' | 'dark' | 'system' | null;
  const theme = savedTheme || 'system';
  
  let isDark = false;
  
  if (theme === 'dark') {
    isDark = true;
  } else if (theme === 'system') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (isDark) {
    document.documentElement.classList.add('dark');
  }
}

// Call preload immediately to prevent flash of wrong theme
preloadTheme();