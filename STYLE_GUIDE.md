# Rehab Reps Physical Therapy - Style & Design Guide

## Brand Identity & Vision

### Core Concept
A modern, sleek physical therapy website that embodies the intersection of professional medical expertise and CrossFit athletic culture. The design should reflect Dr. Shelby Stewart's dual role as both a licensed physical therapist and CrossFit coach, creating trust through professionalism while inspiring through athletic energy.

### Target Audience
- CrossFit athletes and fitness enthusiasts
- Sports injury patients
- Active individuals seeking performance optimization
- People looking for fitness-forward rehabilitation

---

## Visual Identity

### Color Palette

I need some ideas, here is what I have so far based off of the logo:
Bright Yellow**: `#ffe400`
Black and white.

### Typography

#### Primary Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

#### Characteristics
- **Clean and Modern**: Sans-serif for readability and contemporary feel
- **Athletic Edge**: Strong, confident letterforms
- **Professional**: Highly legible for medical content
- **Versatile**: Works for both headers and body text

#### Font Weights & Usage
- **Light (300)**: Subtle text, captions
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Subheadings, emphasis
- **Semibold (600)**: Section headers
- **Bold (700)**: Main headings
- **Extrabold (800)**: Hero titles, impact statements

---

## Design Principles

### 1. Athletic Professionalism
- **Clean lines** with **bold accents**
- **Geometric shapes** and **structured layouts**
- **High contrast** for readability and impact
- **Minimal but powerful** visual elements

### 2. CrossFit-Inspired Elements
- **Strong, angular design elements**
- **Bold typography** with confident spacing
- **Action-oriented imagery** (existing photos of PT exercises in gym)
- **Performance metrics styling** (for services, credentials)
- **Industrial/gym aesthetic** balanced with medical cleanliness

### 3. Medical Trust & Authority
- **Consistent spacing** and **organized information hierarchy**
- **Professional color usage** (navy as primary, yellow as accent only)
- **Clear call-to-actions** for appointments and contact
- **Credibility indicators** (certifications, experience)

### 4. Modern Web Standards
- **Mobile-first responsive design**
- **Fast loading** and **smooth animations**
- **Accessibility compliance** (WCAG 2.1 AA)
- **Progressive Web App** capabilities

## Performance Guidelines

### Loading Priorities
1. **Critical CSS** inlined in `<head>`
2. **Above-the-fold content** loads first
3. **Images** lazy-loaded below fold
4. **Non-critical JavaScript** deferred

### Optimization Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

---

## Content Guidelines

### Tone of Voice
- **Confident** but not arrogant
- **Professional** but approachable
- **Motivational** with CrossFit energy
- **Educational** without being condescending
- **Empowering** for patient outcomes

### Key Messaging
- **Expertise**: Dr. Stewart's credentials and experience
- **Unique Approach**: Fitness-forward physical therapy
- **CrossFit Connection**: Dual role as coach and PT
- **Results-Oriented**: Focus on getting back to activities you love
- **Personalized Care**: Individual attention and treatment plans

### Content Preservation
⚠️ **IMPORTANT**: All existing text content, slogans, and messaging must be preserved exactly as written. This includes:
- About page biography
- Mission statement
- Service descriptions
- Contact information
- All existing copy and messaging


Hero Animation Concept:

  Core Animation Elements:
  1. Geometric Motion Graphics - Clean, angular shapes that pulse and move rhythmically (CrossFit energy)
  2. Performance Metrics Visualization - Animated progress bars/charts showing movement optimization (data-driven professionalism)
  3. Kinetic Typography - Mission statement text that builds up word-by-word with athletic timing
  4. Subtle Particle System - Floating geometric particles that represent cellular healing/recovery
  5. Color Transitions - Smooth black → yellow accent transitions that sync with user scroll

  Animation Sequence (3-4 seconds):
  0.0s → Geometric shapes fade in from edges
  0.5s → "Our Mission" text animates in with bold, confident timing
  1.0s → Performance metrics bars fill up progressively
  1.5s → Mission statement builds word-by-word
  2.5s → Subtle hover states activate (particles respond to mouse)
  3.0s → Smooth infinite loop of geometric breathing/pulsing

  Technical Implementation:
  - CSS Animations + Intersection Observer API for performance
  - GSAP library for complex timeline coordination (if needed)
  - CSS Grid/Flexbox for responsive geometric layouts
  - Custom easing curves that feel athletic but controlled

  Professional + Athletic Balance:
  - Sharp, clean lines (medical precision)
  - Bold, confident timing (CrossFit energy)
  - Subtle, non-distracting (maintains readability)
  - Performance optimized (fast loading)