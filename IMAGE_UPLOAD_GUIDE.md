# Lion Spices - Image Upload & Setup Guide

## 📁 Directory Structure Created

The following image directories have been created in your project:

```
public/
└── images/
    ├── logo/              → Brand logos and favicon
    ├── products/          → Product package images
    ├── hero/              → Hero section images
    ├── recipes/           → Recipe section images
    ├── about/             → About section images
    └── avatars/           → Customer testimonial avatars
```

## 🖼️ Image Files to Upload

### 1. **Logo Files** (`public/images/logo/`)
Required for brand identity:
- `lion-logo.png` - Main logo (recommended: 500x500px PNG)
- `lion-logo-dark.png` - Dark variant for light backgrounds
- `lion-logo-white.png` - White variant for dark backgrounds  
- `lion-favicon.ico` - Browser tab icon (32x32px)

**Use Case:** Logo displayed in Navbar, Footer, and metadata

### 2. **Product Images** (`public/images/products/`)
Spice product package images:
- `red-chilli-powder.png` - ₹199 product
- `turmeric-powder.png` - ₹179 product
- `coriander-powder.png` - ₹189 product
- `aachar-mirchi.png` - ₹249 product
- `rai-powder.png` - ₹199 product
- `rai-dal.png` - ₹229 product

**Recommended:** 500x500px PNG with transparency
**Used in:** FeaturedCategoriesSection, BestSellerProductsSection, ProductCard

### 3. **Hero Section Images** (`public/images/hero/`)
Landing page hero section:
- `hero-bg.jpg` - Hero background (1920x1080px)
- `hero-spices.png` - Spice showcase (high quality)

**Used in:** HeroSection.jsx (right side display)

### 4. **Recipe Images** (`public/images/recipes/`)
Recipe section card images:
- `biryani.jpg` - Biryani recipe
- `curry.jpg` - Curry recipe
- `dal.jpg` - Dal recipe
- `masala.jpg` - Masala recipe

**Recommended:** 800x600px JPG
**Used in:** RecipeSection.jsx

### 5. **About Section Images** (`public/images/about/`)
About page content:
- `about-hero.jpg` - Main about image (1200x600px)
- `spices-farm.jpg` - Farm/sourcing image

**Used in:** AboutSection.jsx

### 6. **Avatar Images** (`public/images/avatars/`)
Customer testimonial avatars:
- `avatar-1.jpg` through `avatar-6.jpg`

**Recommended:** 150x150px JPG (circular crop in CSS)
**Used in:** TestimonialsSection.jsx

## 📋 Step-by-Step Upload Instructions

### Using Windows Explorer:
1. Navigate to: `C:\Users\hp\Documents\spices\public\images\`
2. Create folders matching the structure above
3. Drag and drop image files into respective folders

### Using Command Line:
```powershell
# From project root
$imageDirs = @(
    "public/images/logo",
    "public/images/products",
    "public/images/hero",
    "public/images/recipes",
    "public/images/about",
    "public/images/avatars"
)

foreach ($dir in $imageDirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# Then copy your image files into these directories
```

## 🔧 Code Configuration

All image paths are centralized in: `src/config/imageAssets.js`

### Current Image Path Format:
```javascript
export const imageAssets = {
  logo: {
    main: '/images/logo/lion-logo.png',
    // ... other logo variants
  },
  products: {
    redChilliPowder: '/images/products/red-chilli-powder.png',
    // ... other products
  },
  // ... more categories
};
```

### How Components Use Images:
```javascript
import { imageAssets } from '../config/imageAssets';

// In component JSX:
<img src={imageAssets.products.redChilliPowder} alt="Red Chilli Powder" />
```

## ✅ Verification Checklist

After uploading images:

- [ ] All image files are in correct directories
- [ ] File names match exactly (case-sensitive on Linux/Mac)
- [ ] Run dev server: `npm run dev`
- [ ] Open http://localhost:3000 in browser
- [ ] Verify images load on:
  - [ ] Hero section
  - [ ] Product cards
  - [ ] Recipe section
  - [ ] About section
  - [ ] Testimonials (avatars)
  - [ ] Navbar logo
  - [ ] Footer logo
  - [ ] Browser favicon

## 📊 Image Optimization Tips

### Size Guidelines:
- **Logo:** 500x500px (PNG) = ~50-100KB
- **Product images:** 500x500px (PNG) = ~100-200KB
- **Hero images:** 1920x1080px (JPG) = ~200-400KB
- **Recipe images:** 800x600px (JPG) = ~100-150KB
- **Avatars:** 150x150px (JPG) = ~10-20KB

### Compression Tools:
- **Online:** TinyPNG, ImageOptim, Squoosh
- **Local:** ImageMagick, FFmpeg
- **Format:** WebP for modern browsers (with PNG fallback)

### Example compression:
```bash
# Using ImageMagick
convert red-chilli-powder.png -quality 85 -resize 500x500 red-chilli-powder-optimized.png
```

## 🚀 After Image Upload

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Test all sections load images**

4. **Optional: Lighthouse audit**
   ```bash
   npm run build
   npm run preview
   # Then use Chrome DevTools Lighthouse
   ```

## 🎨 Brand Logo Specifications

### Recommended Logo Variants:
- **Full Logo:** Lion Spices with brand mark
- **Mark Only:** Just the lion/spice icon
- **Horizontal Layout:** Logo + text horizontal
- **Vertical Layout:** Logo + text stacked

### Color Variants:
- **Main Color:** On white (#FFF7ED cream background)
- **Dark Color:** On light backgrounds (use dark red #DC2626)
- **White Color:** On dark backgrounds (use white #FFFFFF)

## 💡 Pro Tips

1. **Use Consistent Branding:** All spice images should have similar styling/background
2. **High Quality Hero Images:** Hero images impact first impression - use high quality
3. **Avatar Consistency:** All avatars should be same size and style (circular crop recommended)
4. **Logo Simplicity:** Ensure logo is recognizable at small sizes (favicon)

## 🐛 Troubleshooting

### Images not loading?
- Check file path spelling (case-sensitive)
- Verify files are in correct directory
- Check browser console for 404 errors
- Hard refresh browser cache

### Images look pixelated?
- Image resolution too low
- Use higher resolution source
- Check CSS sizing (not stretching small images)

### Logo not showing?
- Verify path: `/images/logo/lion-logo.png`
- Check file format (PNG with transparency preferred)
- Clear browser cache

## 📞 Support Files

- Image documentation: `public/images/README.md`
- Setup guide: `src/IMAGES_SETUP.md`
- Image configuration: `src/config/imageAssets.js`

---

**Status:** ✅ Infrastructure ready - awaiting image files
**Next Step:** Upload your image files to the directories created above
