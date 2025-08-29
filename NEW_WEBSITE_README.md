# Rehab Reps Physical Therapy - New Website

🏗️ **This is the new modern website build - currently in development on the `new-website-dev` branch**

## 🚀 Modern Tech Stack

- **Vite** - Lightning-fast build tool and dev server
- **TypeScript** - Type-safe JavaScript for better development
- **Tailwind CSS** - Utility-first CSS framework
- **Modern CSS** - Custom animations and dark mode

## 🎨 Features

### ✅ Implemented
- **Hero Section with Advanced Animations**
  - Geometric motion graphics
  - Performance metrics visualization
  - Kinetic typography
  - Interactive particle system
  - Auto-advancing image carousel

- **Dark/Light Mode System**
  - System preference detection
  - Manual toggle (desktop + mobile)
  - Persistent user preference
  - Smooth transitions
  - Dark charcoal theme with RR yellow accents

- **Responsive Design**
  - Mobile-first approach
  - Tailwind breakpoints
  - Optimized for all screen sizes

- **Performance Optimized**
  - Fast loading times
  - Smooth 60fps animations
  - Accessibility compliant (WCAG 2.1 AA)
  - Reduced motion support

### 🏗️ In Progress
- Additional pages (About, Services, Contact)
- Content management system
- SEO optimization
- Performance monitoring

## 🛠️ Development

### Prerequisites
- Node.js 20+
- npm

### Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
- **Local**: http://localhost:3001
- **Hot reload** enabled for instant updates
- **Source maps** for debugging

## 🎯 Brand Guidelines

### Colors
- **Primary Yellow**: #ffe400
- **Dark Charcoal**: #1a1a1a (main dark background)
- **Surface Dark**: #242424 (cards/elements)
- **Border Dark**: #333333 (borders/dividers)

### Typography
- **Font**: Inter (300-800 weights)
- **Style**: Clean, modern, athletic yet professional

### Design Principles
- **Athletic Professionalism**: CrossFit energy + medical trust
- **Clean lines** with **bold accents**
- **High contrast** for readability
- **Smooth animations** that enhance UX

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── styles/             
│   ├── main.css        # Main styles + imports
│   ├── hero-animations.css  # Hero section animations
│   └── dark-mode.css   # Dark theme styles
├── scripts/
│   ├── main.ts         # Main application logic
│   └── theme-manager.ts # Dark/light mode system
├── assets/             # Static assets
└── [pages].html        # HTML pages

public/
└── images/             # Optimized images
```

## 🚀 Deployment

### Current Setup
- **Development**: `new-website-dev` branch
- **Production**: Will deploy to `main` branch when ready
- **GitHub Pages**: Automatic deployment via GitHub Actions

### Deployment Process
1. **Development** → `new-website-dev` branch
2. **Testing** → Local development server
3. **Production Ready** → Merge to `main` branch
4. **Live Site** → Automatic deployment via GitHub Actions

## ⚡ Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🎨 Animation Features

### Hero Section
- **Geometric shapes** that float and pulse rhythmically
- **Performance metrics** with animated progress bars
- **Text animations** with staggered word reveals
- **Interactive particles** that respond to mouse movement
- **Color transitions** that sync with theme changes

### Dark Mode
- **Enhanced particle effects** with glow
- **Gradient backgrounds** with smooth transitions
- **Improved contrast** for better readability
- **Athletic pulse effects** on interactive elements

---

## 📞 Support

For development questions or issues:
1. Check the console for TypeScript/build errors
2. Ensure all dependencies are installed (`npm install`)
3. Verify Node.js version compatibility (20+)

---

**Built with ❤️ for Rehab Reps Physical Therapy**