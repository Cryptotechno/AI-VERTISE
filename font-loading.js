/**
 * Font loading optimization script
 * Prevents Flash of Invisible Text (FOIT) and Flash of Unstyled Text (FOUT)
 */
(function() {
  // Add font-display classes to immediately show fallback fonts
  document.documentElement.classList.add('fonts-pending');
  
  // Check if FontFace API is supported
  if ('FontFace' in window) {
    // Define the Inter font family with multiple weights
    Promise.all([
      new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format("woff2")', 
        { weight: '400', style: 'normal', display: 'swap' }).load(),
      new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2) format("woff2")', 
        { weight: '500', style: 'normal', display: 'swap' }).load(),
      new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2) format("woff2")', 
        { weight: '600', style: 'normal', display: 'swap' }).load()
    ]).then(fonts => {
      fonts.forEach(font => {
        document.fonts.add(font);
      });
      document.documentElement.classList.remove('fonts-pending');
      document.documentElement.classList.add('fonts-loaded');
      
      // Store font loaded state in sessionStorage to avoid FOIT on page navigation
      try {
        sessionStorage.setItem('fonts-loaded', 'true');
      } catch (e) {}
    }).catch(() => {
      // If loading fonts fails, still remove pending class to show fallback
      document.documentElement.classList.remove('fonts-pending');
    });
  } else {
    // Fallback for browsers without FontFace API
    // Just show the system fonts
    document.documentElement.classList.remove('fonts-pending');
  }
  
  // Add a failsafe to ensure we don't block content display
  setTimeout(function() {
    if (document.documentElement.classList.contains('fonts-pending')) {
      document.documentElement.classList.remove('fonts-pending');
    }
  }, 1000);
})(); 