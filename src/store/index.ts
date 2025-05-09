import { create } from 'zustand';

interface AppState {
  cookieConsent: boolean;
  isMenuOpen: boolean;
  isDarkMode: boolean;
  setCookieConsent: (value: boolean) => void;
  toggleMenu: () => void;
  toggleDarkMode: () => void;
  closeMenu: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  cookieConsent: localStorage.getItem('cookieConsent') === 'true',
  isMenuOpen: false,
  isDarkMode: false,
  
  setCookieConsent: (value) => {
    localStorage.setItem('cookieConsent', String(value));
    set({ cookieConsent: value });
  },
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  
  closeMenu: () => set({ isMenuOpen: false }),
  
  toggleDarkMode: () => set({ isDarkMode: false }),
})); 