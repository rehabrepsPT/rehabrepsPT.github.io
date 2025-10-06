// Navigation Component - Single source of truth for all pages
export function createNavigation(currentPage: string): string {
  const isActive = (page: string) => currentPage === page ? 
    'text-rr-black font-semibold border-b-2 border-rr-yellow' : 
    'text-gray-700 hover:text-rr-black transition-colors duration-200 font-medium';

  const isMobileActive = (page: string) => currentPage === page ? 
    'text-rr-black font-semibold' : 
    'text-rr-black hover:text-gray-600 font-medium py-2';

  return `
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-20">
        
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-3 group">
          <img src="/images/rr-logo-square.png" alt="Rehab Reps Logo" class="w-8 h-8 lg:w-10 lg:h-10 transition-transform group-hover:scale-105">
          <span class="text-xl lg:text-2xl font-semibold text-rr-black uppercase tracking-tight">Rehab Reps</span>
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <a href="/" class="${isActive('home')}">Home</a>
          <a href="/about.html" class="${isActive('about')}">About</a>
          <a href="/services.html" class="${isActive('services')}">Services</a>
          <a href="/contact.html" class="${isActive('contact')}">Contact</a>
          
          <!-- CTA Button -->
          <a href="https://rehabreps.janeapp.com/" class="bg-rr-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium">
            Book Appointment
          </a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="lg:hidden hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
      <div class="px-4 py-6 space-y-4">
        <a href="/" class="${isMobileActive('home')}">Home</a>
        <a href="/about.html" class="${isMobileActive('about')}">About</a>
        <a href="/services.html" class="${isMobileActive('services')}">Services</a>
        <a href="/contact.html" class="${isMobileActive('contact')}">Contact</a>
        
        <!-- Mobile Theme Toggle -->
        <button id="theme-toggle-mobile" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle theme">
          <svg class="theme-icon-sun w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg class="theme-icon-moon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <span class="text-gray-700">Toggle Theme</span>
        </button>
        
        <a href="https://rehabreps.janeapp.com/" class="block bg-rr-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-center">
          Book Appointment
        </a>
      </div>
    </div>
  </nav>
  `;
}