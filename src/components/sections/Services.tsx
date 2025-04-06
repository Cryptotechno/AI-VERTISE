import React from 'react'
import { motion } from 'framer-motion'
import { services, aiRecommendations } from '../../data/servicesData'
import { ServiceCard } from '../ui/ServiceCard'
import '../../styles/services.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Services: React.FC = () => {
  // Function to handle service button clicks
  const handleServiceClick = (serviceTitle: string) => {
    console.log(`Service clicked: ${serviceTitle}`);
    
    // Scroll to contact section or open a modal
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80; // Adjust for fixed header
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="services-section py-16" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 shadow-lg">
            <span className="text-indigo-600 font-medium">What We Offer</span>
          </div>
          <h2 className="services-heading">
            Let's Grow Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to take your digital presence to the next level? Our AI-powered solutions make it happen.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.title} 
              variants={itemVariants}
              className="h-full"
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                benefits={service.benefits}
                cta={service.cta}
                recommendation={aiRecommendations[service.title]}
                onButtonClick={() => handleServiceClick(service.title)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services 