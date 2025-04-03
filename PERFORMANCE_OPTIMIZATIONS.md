# Performance Optimization Guide

Based on the performance audit results, the following optimizations have been implemented to significantly improve website performance:

## 1. Image Optimizations

### Next-gen Image Formats
- Added `convert-images.js` script to automatically convert JPG/PNG to WebP and AVIF formats
- Created `OptimizedImage` component to choose the best format available
- Run `npm run convert-images` to process all images in the project

### Lazy Loading & Prioritization
- Images below-the-fold are now lazy loaded automatically
- Hero/header images are now prioritized with `fetchPriority="high"`
- Added responsive image sizes for bandwidth optimization

## 2. JavaScript Optimizations

### Code Splitting
- Lazy loading of non-critical components
- Updated `main.tsx` to defer non-essential JavaScript
- Created `lazyLoad.ts` utility for on-demand loading

### Bundle Size Reduction
- Added analytics code splitting with `executeWhenIdle()`
- Third-party scripts are now loaded asynchronously
- Custom virtualizing solution for large lists (see `virtualScroll.ts`)

## 3. Largest Contentful Paint (LCP) Optimization

- Created `useLCPOptimization` hook to address 5,800ms LCP time
- Preloads critical images with high priority 
- Monitors and adjusts for real-world performance

## 4. DOM Size Reduction

- Implemented virtual scrolling for large lists
- Added component to render only visible items
- Use for any list with more than 50-100 items to reduce DOM node count

## How to Apply These Optimizations

### 1. For Images:

Replace standard `<img>` tags with the new `OptimizedImage` component:

```tsx
<OptimizedImage 
  src="/path/to/image.jpg" 
  alt="Description" 
  width={800} 
  height={600} 
  priority={isHeroImage} 
/>
```

Run the conversion script before building:
```
npm run convert-images
```

### 2. For JavaScript:

Identify and lazy-load non-critical components:

```tsx
// Before
import HeavyComponent from './HeavyComponent';

// After
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

For third-party scripts, use the async loading utilities:
```tsx
import { loadScriptAsync, executeWhenIdle } from './utils/lazyLoad';

// Inside component
useEffect(() => {
  executeWhenIdle(() => {
    loadScriptAsync('https://example.com/heavy-script.js');
  });
}, []);
```

### 3. For Large DOM Sizes:

Replace large lists with virtualized ones:

```tsx
import { useRef, useState, useEffect } from 'react';
import { setupVirtualScroll } from './utils/virtualScroll';

function LargeList({ items }) {
  const containerRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  
  useEffect(() => {
    const cleanup = setupVirtualScroll({
      containerRef,
      itemCount: items.length,
      itemHeight: 50, // Height of each item in pixels
      renderItems: (start, end) => setVisibleRange({ start, end })
    });
    return cleanup;
  }, [items.length]);
  
  return (
    <div 
      ref={containerRef} 
      style={{ height: '600px', overflow: 'auto', position: 'relative' }}
    >
      {/* Only render visible items */}
      {items.slice(visibleRange.start, visibleRange.end + 1).map((item, i) => (
        <div 
          key={visibleRange.start + i} 
          style={{ height: '50px' }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### 4. For LCP Optimization:

Add the hook to critical pages:

```tsx
import { useLCPOptimization } from '../hooks/useLCPOptimization';

function HomePage() {
  // Target your hero image or main heading
  useLCPOptimization('.hero-image');
  
  return (
    <div>
      <img className="hero-image" src="/path/to/hero.webp" alt="Hero" />
      {/* Rest of the page */}
    </div>
  );
}
```

## Measuring Results

After implementing these optimizations, run another Lighthouse test to measure improvements. You should see significant gains in:

- Largest Contentful Paint (LCP) - target under 2.5s
- Total Blocking Time (TBT) - target under 200ms
- Cumulative Layout Shift (CLS) - target under 0.1
- First Contentful Paint (FCP) - target under 1.8s

## Additional Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [JavaScript Performance](https://web.dev/fast/#optimize-your-javascript) 