/**
 * Defer loading of non-critical scripts until idle or after DOM load
 * 
 * @param callback - Function to execute when browser is idle
 */
export function executeWhenIdle(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => callback(), { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    const win = window as Window;
    win.addEventListener('load', () => {
      setTimeout(callback, 200);
    });
  }
} 