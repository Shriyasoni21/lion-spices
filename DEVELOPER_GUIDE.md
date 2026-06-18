# 🚀 Developer's Quick Start Guide

## ⚡ 30-Second Setup

```bash
cd spices
npm install
npm run dev
```

That's it! Your website is now running at `http://localhost:3000`

## 📂 Project Structure at a Glance

```
spices/
├── src/
│   ├── components/
│   │   ├── common/          ← Reusable UI components
│   │   └── sections/        ← Page sections
│   ├── data/                ← Product & blog data
│   ├── styles/              ← Global CSS
│   ├── App.jsx              ← Main component
│   └── main.jsx             ← Entry point
├── index.html               ← HTML template
├── tailwind.config.js       ← Theme colors & config
├── vite.config.js           ← Build config
└── package.json             ← Dependencies
```

## 🎨 Customization Guide

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'spice-red': '#YOUR_COLOR',      // Primary red
  'gold': '#YOUR_COLOR',           // Accent gold
  'cream': '#YOUR_COLOR',          // Background
  'brown': '#YOUR_COLOR',          // Text
}
```

### Update Products
Edit `src/data/productData.js`:
```javascript
export const products = [
  {
    id: 1,
    title: "Your Product Name",
    price: 299,
    image: "your-image-url",
    // ... more fields
  }
]
```

### Change Hero Text & Images
Edit `src/components/sections/HeroSection.jsx`:
```javascript
const heroSlides = [
  {
    image: 'your-image-url',
    title: 'Your Title',
    subtitle: 'Your Subtitle',
  },
  // ... more slides
]
```

### Replace Images
All images use Unsplash URLs. Replace with your own URLs in:
- Product images in `productData.js`
- Blog images in `blogData.js`
- Section background images in individual components

## 💻 Common Tasks

### Add New Product
1. Open `src/data/productData.js`
2. Add to `products` array:
```javascript
{
  id: 13,
  title: "New Spice",
  price: 299,
  originalPrice: 399,
  image: "image-url",
  rating: 4.8,
  reviews: 123,
  badge: "New",
  category: "Whole Spices"
}
```

### Add a New Section
1. Create new file in `src/components/sections/MySection.jsx`
2. Import in `src/App.jsx`
3. Add component between other sections

### Change Navbar Links
Edit `src/components/common/Navbar.jsx`:
```javascript
const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#shop' },
  // Add/edit links here
]
```

### Update Footer Links
Edit `src/components/common/Footer.jsx`:
```javascript
const footerSections = [
  {
    title: 'Quick Links',
    links: ['Home', 'Shop', ...] // Edit here
  }
]
```

## 🎬 Customizing Animations

### Change Animation Speed
In any component using Framer Motion:
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}  // ← Change this (in seconds)
>
```

### Change Animation Type
Examples:
```javascript
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// Slide up
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}

// Zoom in
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}

// Rotate
animate={{ rotate: 360 }}
```

## 📱 Testing Responsive Design

### Option 1: Browser DevTools
F12 → Click Device Toggle (top-left) → Choose device

### Option 2: Actual Test URLs
- Mobile: `http://localhost:3000`
- Tablet: Resize window to 768px width
- Desktop: Resize window to 1024px width

### Responsive Breakpoints in Code
```javascript
// Tailwind breakpoints
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Usage:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## 🔧 Form Submission Handling

### Newsletter Subscription
Edit `src/components/sections/NewsletterSection.jsx`:
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Add your API call here
  // Example: await fetch('your-api/subscribe', { data })
  setSubmitted(true);
}
```

## 🌐 Connecting Real Data

### From External API
Replace data files with API calls:
```javascript
// In a component:
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  
  return (
    // Render products
  );
}
```

### From Backend Services
Use any backend:
- REST API
- GraphQL
- Firebase
- MongoDB
- Your custom API

## 📦 Building for Production

### Create optimized build:
```bash
npm run build
```

### Output folder: `dist/`
This folder contains your production website.

### Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repo
- **AWS S3**: Upload `dist/` folder
- **Any hosting**: Upload `dist/` files

## 🐛 Troubleshooting

### Port already in use
```bash
# Use different port
npm run dev -- --port 3001
```

### Changes not reflecting
- Clear browser cache (Ctrl+Shift+Delete)
- Or Ctrl+F5 to hard refresh
- Check Vite terminal for errors

### Tailwind classes not working
- Make sure files are in `content` in `tailwind.config.js`
- Restart dev server: Stop (Ctrl+C) and `npm run dev`

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
```

## 📊 Performance Tips

1. **Optimize Images**
   - Use modern formats (WebP)
   - Compress before upload
   - Use appropriate sizes

2. **Code Splitting**
   - Vite does this automatically
   - Large components load as-needed

3. **Animation Performance**
   - Reduce animation duration if needed
   - Use `will-change` CSS for smooth animations

## 🔗 Useful Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/
- **Swiper**: https://swiperjs.com

## 💡 Pro Tips

1. **Use Live Reload**: Dev server automatically refreshes on save
2. **Mobile Testing**: Use `npm run preview` to test production build locally
3. **Component Reuse**: Copy components and customize instead of rebuilding
4. **Animations**: Test on slower devices for smooth experience
5. **SEO**: Update meta tags in `index.html`

## 📞 Getting Help

Check these files:
- `README.md` - Project overview
- `SETUP.md` - Detailed setup
- `PROJECT_DELIVERY.md` - What's included

## ✅ Deployment Checklist

Before deploying:
- [ ] Update all product images with real images
- [ ] Update company details in Footer
- [ ] Update WhatsApp number in FloatingWhatsApp
- [ ] Update social media links in Footer
- [ ] Test on mobile, tablet, desktop
- [ ] Test form submissions
- [ ] Check all links work
- [ ] Update meta tags in index.html
- [ ] Remove console.log statements
- [ ] Run `npm run build` and test

## 🎉 You're All Set!

Your premium spice eCommerce website is ready for:
- Development
- Customization
- Testing
- Deployment

Happy coding! 🌶️✨

---

**Questions?** Check the component files - they're well-commented and easy to follow.
