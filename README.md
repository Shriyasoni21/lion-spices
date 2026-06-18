# Lion Spices - Premium Indian Spices eCommerce Website

A luxurious, fully responsive eCommerce frontend for a premium Indian spices and masala brand. Built with modern web technologies and production-ready code.

## 🎯 Overview

Lion Spices is a complete eCommerce frontend website showcasing premium Indian spices with:
- Fully responsive design (mobile-first approach)
- Smooth animations and transitions using Framer Motion
- Modern, luxury aesthetic with custom color theme
- Interactive product carousels with Swiper.js
- Professional component-based architecture

## ✨ Features

### 🎨 Visual Features
- **Announcement Bar**: Rotating promotional messages
- **Sticky Navbar**: Transparent-to-solid navigation with scroll
- **Hero Section**: Full-screen carousel with animations
- **Featured Categories**: Responsive category cards with hover effects
- **Why Choose Us**: Feature highlights with animated icons
- **Best Sellers**: Product carousel with ratings and prices
- **Promotional Banner**: Parallax background with countdown timer
- **Recipe/Blog Section**: Article cards with hover animations
- **Testimonials**: Customer reviews carousel
- **Newsletter**: Email subscription section
- **Instagram Gallery**: Social media feed integration
- **Premium Footer**: Comprehensive footer with links and contact
- **Floating Buttons**: Scroll-to-top and WhatsApp contact buttons

### 🛠️ Technical Features
- **React 18** with Vite for fast development
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Swiper.js** for responsive carousels
- **React Icons** for beautiful iconography
- **Mobile-First Design** responsive breakpoints
- **Lazy Loading** for images
- **Glassmorphism Effects** for modern UI
- **Custom Hooks** for reusable logic

## 📁 Project Structure

```
spices/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AnnouncementBar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── ScrollToTopButton.jsx
│   │   │   ├── FloatingWhatsApp.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/
│   │       ├── HeroSection.jsx
│   │       ├── FeaturedCategoriesSection.jsx
│   │       ├── WhyChooseUsSection.jsx
│   │       ├── BestSellerProductsSection.jsx
│   │       ├── PromoSection.jsx
│   │       ├── RecipeSection.jsx
│   │       ├── TestimonialsSection.jsx
│   │       ├── NewsletterSection.jsx
│   │       └── InstagramGallerySection.jsx
│   ├── data/
│   │   ├── productData.js
│   │   └── blogData.js
│   ├── styles/
│   │   └── index.css
│   ├── assets/
│   │   └── images/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd spices
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The website will open automatically at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 Color Scheme

- **Primary Red**: `#8B1E1E` (Deep spice red)
- **Accent Gold**: `#D9A441` (Turmeric gold)
- **Background**: `#F8F4EC` (Cream)
- **Text**: `#3E2723` (Dark brown)

## 📦 Dependencies

### Core Libraries
- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-router-dom**: ^6.20.0

### UI & Animation
- **framer-motion**: ^10.16.4
- **react-icons**: ^4.12.0
- **swiper**: ^11.0.3
- **tailwindcss**: ^3.3.6

### Utilities
- **lucide-react**: ^0.292.0
- **postcss**: ^8.4.31
- **autoprefixer**: ^10.4.16

## 🎯 Components Guide

### Common Components
All reusable UI components with Framer Motion animations:
- `ProductCard`: Product display with ratings and actions
- `CategoryCard`: Category showcase with hover effects
- `BlogCard`: Article cards with metadata
- `Navbar`: Sticky navigation with mobile menu
- `Footer`: Comprehensive footer section
- `ScrollToTopButton`: Fixed floating button
- `FloatingWhatsApp`: WhatsApp contact button

### Section Components
Major page sections:
- `HeroSection`: Hero carousel with CTAs
- `FeaturedCategoriesSection`: 6-category grid
- `WhyChooseUsSection`: Feature highlights
- `BestSellerProductsSection`: Product carousel
- `PromoSection`: Promotional banner with parallax
- `RecipeSection`: Blog/recipe cards
- `TestimonialsSection`: Customer reviews carousel
- `NewsletterSection`: Email subscription
- `InstagramGallerySection`: Social gallery

## 🎬 Animations & Interactions

- **Scroll Animations**: Elements animate on scroll
- **Hover Effects**: Cards lift and scale on hover
- **Carousel Transitions**: Smooth slide transitions
- **Icon Animations**: Spinning, floating effects
- **Button Interactions**: Scale and tap animations
- **Parallax Effect**: Background image parallax on promo

## 📱 Responsive Design

Fully responsive across all devices:
- **Mobile**: 320px+ (optimized for small phones)
- **Tablet**: 768px+ (iPad and tablets)
- **Desktop**: 1024px+ (full-size desktop)
- **Large**: 1280px+ (ultrawide displays)

## 🔧 Customization

### Modify Colors
Edit `tailwind.config.js` to change the color theme:
```javascript
colors: {
  'spice-red': '#8B1E1E',
  'gold': '#D9A441',
  'cream': '#F8F4EC',
  // ... add more colors
}
```

### Update Content
Edit data files in `src/data/`:
- `productData.js` - Products, categories, features
- `blogData.js` - Blogs, testimonials, instagram feed

### Modify Sections
All sections are in `src/components/sections/` - fully editable

## 📄 License

This project is created for demonstration purposes.

## 🤝 Support

For questions or customization needs, feel free to reach out.

## 🙏 Credits

Built with ❤️ using React, Vite, and Tailwind CSS.

---

**Ready to deploy and showcase your premium spice brand! 🌶️✨**
