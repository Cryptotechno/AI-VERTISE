import React from 'react';
import Calculator from '../components/sections/Calculator';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import SuccessStories from '../components/sections/SuccessStories';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import BackToTop from '../components/ui/BackToTop';
import PageTransition from '../components/ui/PageTransition';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <PageTransition>
          <Hero />
        </PageTransition>
        <div className="space-y-24 md:space-y-32">
          <PageTransition>
            <Services />
          </PageTransition>
          <PageTransition>
            <Calculator />
          </PageTransition>
          <PageTransition>
            <SuccessStories />
          </PageTransition>
          <PageTransition>
            <About />
          </PageTransition>
          <PageTransition>
            <Contact />
          </PageTransition>
        </div>
        <BackToTop />
      </main>
    </div>
  );
}; 