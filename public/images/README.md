# Lion Spices Image Assets

This directory contains all image assets for the Lion Spices eCommerce website.

## Directory Structure

### `/logo`
- `lion-logo.png` - Main brand logo (white background)
- `lion-logo-dark.png` - Dark variant for light backgrounds
- `lion-logo-white.png` - White variant for dark backgrounds
- `lion-favicon.ico` - Favicon for browser tab

### `/products`
Store product images with naming convention: `{product-name}.png`

**Required Product Images:**
- `red-chilli-powder.png`
- `turmeric-powder.png`
- `coriander-powder.png`
- `aachar-mirchi.png`
- `rai-powder.png`
- `rai-dal.png`

### `/hero`
Hero section images:
- `hero-bg.jpg` - Hero background image
- `hero-spices.png` - Featured spices showcase

### `/recipes`
Recipe section images:
- `biryani.jpg` - Biryani recipe image
- `curry.jpg` - Curry recipe image
- `dal.jpg` - Dal recipe image
- `masala.jpg` - Masala recipe image

### `/about`
About section images:
- `about-hero.jpg` - About section hero image
- `spices-farm.jpg` - Farm/sourcing image

### `/avatars`
Customer testimonial avatars:
- `avatar-1.jpg` through `avatar-6.jpg` - Customer avatars for testimonials

## Image Specifications

### Product Images
- Format: PNG with transparency preferred
- Size: 500x500px
- Resolution: 72 DPI
- Content: Product packaging/spices

### Hero Images
- Format: JPG
- Size: 1920x1080px
- Resolution: 72 DPI

### Recipe Images
- Format: JPG
- Size: 800x600px
- Resolution: 72 DPI

### Avatar Images
- Format: JPG or PNG
- Size: 150x150px
- Resolution: 72 DPI

### Logo Images
- Format: PNG with transparency for colored variants, ICO for favicon
- Size: Minimum 256x256px for logo, 32x32 for favicon

## How to Add Images

1. Place image files in the appropriate subdirectory
2. Update the product data file if adding new products:
   - File: `src/data/productData.js`
   - Update the `image` field with the new path: `/images/products/filename.png`

3. Update component references as needed

## Current Placeholder Setup

The application currently uses placeholder paths. Replace them with actual images:
- Product images: `/images/products/{product-name}.png`
- Hero images: `/images/hero/hero-bg.jpg`
- Recipe images: `/images/recipes/{recipe-name}.jpg`
- Avatar images: `/images/avatars/avatar-{number}.jpg`
- Logo: `/images/logo/lion-logo.png`

## Image Optimization Tips

- Compress images to reduce bundle size
- Use WebP format for better compression (with PNG fallback)
- Implement lazy loading for off-screen images
- Use responsive images with srcset for different screen sizes
