// Footer Component - Single source of truth for all pages
export function createFooter(): string {
  const currentYear = new Date().getFullYear();
  
  return `
  <!-- Footer -->
  <footer class="bg-background-light pt-16 pb-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        <!-- Brand -->
        <div class="text-center lg:text-left">
          <h4 class="text-xl font-semibold text-rr-black uppercase mb-4">Rehab Reps</h4>
          <p class="text-sm text-gray-600 mb-4">Our mission is to empower you by optimizing movement, restoring function, and promoting pain-free performance to freely participate in the activities you love.</p>
          
          <!-- Social Links -->
          <div class="flex justify-center lg:justify-start space-x-3">
            <a href="https://www.instagram.com/rehabrepsphysicaltherapy" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-rr-yellow transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61561689862478" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-rr-yellow transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Links -->
        <div class="text-center lg:text-left">
          <h5 class="font-semibold text-rr-black mb-4">Links</h5>
          <ul class="space-y-2">
            <li><a href="/" class="text-sm text-gray-600 hover:text-rr-yellow transition-colors">Home</a></li>
            <li><a href="/about/" class="text-sm text-gray-600 hover:text-rr-yellow transition-colors">About</a></li>
            <li><a href="/services/" class="text-sm text-gray-600 hover:text-rr-yellow transition-colors">Services</a></li>
            <li><a href="/contact/" class="text-sm text-gray-600 hover:text-rr-yellow transition-colors">Contact Us</a></li>
            <li><a href="/contact/#newsletter" class="text-sm text-gray-600 hover:text-rr-yellow transition-colors">Join Newsletter</a></li>
          </ul>
        </div>
        
        <!-- Location -->
        <div class="text-center lg:text-left">
          <h5 class="font-semibold text-rr-black mb-4">Location</h5>
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-rr-black mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p class="text-sm text-gray-600">2593 Mayport Rd, STE 105<br>Atlantic Beach, Florida, 32233</p>
          </div>
        </div>
        
        <!-- Contact -->
        <div class="text-center lg:text-left">
          <h5 class="font-semibold text-rr-black mb-4">Contact Us</h5>
          <div class="space-y-2">
            <p class="text-sm text-gray-600">Dr. Shelby Stewart, PT, DPT, Cert. DN, CF-L3</p>
            <p class="text-xs text-gray-500 italic">Owner and Clinician</p>
            <a href="mailto:rehabreps@outlook.com" class="text-sm text-gray-600 hover:text-rr-black transition-colors block">rehabreps@outlook.com</a>
            <a href="tel:+1904-717-2269" class="text-sm text-gray-600 hover:text-rr-black transition-colors block">(904) 717-2269</a>
            <a href="https://rehabreps.janeapp.com/" target="_blank" class="text-sm text-rr-black hover:text-rr-yellow transition-colors block">Book Appointment</a>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t pt-8">
        <p class="text-center text-sm text-gray-500" id="copyright">© ${currentYear} Rehab Reps All Rights Reserved</p>
      </div>
    </div>
  </footer>
  `;
}
