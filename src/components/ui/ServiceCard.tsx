import React from 'react';
import { FaCheck, FaArrowRight, FaStar } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Card } from './Card';

export interface ServiceProps {
  icon: IconType;
  title: string;
  description: string;
  benefits: string[];
  cta: string;
  recommendation?: {
    score: number;
    trend: string;
    impact: string;
  };
  onButtonClick?: () => void;
}

export const ServiceCard: React.FC<ServiceProps> = ({
  icon: Icon,
  title,
  description,
  benefits,
  cta,
  recommendation,
  onButtonClick
}) => {
  return (
    <Card
      pattern={false}
      className="relative overflow-hidden bg-white rounded-[24px] p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] border border-gray-100/60 hover:border-indigo-100 transition-all duration-300 group isolate h-full"
    >
      {/* Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-[-1] bg-pattern"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* AI Score Badge */}
        {recommendation && (
          <div className="absolute top-0 right-0 flex items-center gap-2 px-3.5 py-2 bg-white rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100/80">
            <FaStar className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              {recommendation.score}% Match
            </span>
          </div>
        )}

        <div className="mb-7 relative">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-8 h-8" />
          </div>
          {/* AI Trend Tag */}
          {recommendation && (
            <div className="absolute left-20 top-1 inline-flex items-center">
              <span className="text-sm font-semibold text-indigo-600 bg-white px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100/80">
                {recommendation.trend}
              </span>
            </div>
          )}
        </div>

        <h3 className="service-title text-xl font-bold mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-7 flex-grow">{description}</p>

        <div className="space-y-3 mb-7">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100/80">
                <FaCheck className="w-3 h-3 text-indigo-600" />
              </div>
              <span className="text-sm text-gray-600">{benefit}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onButtonClick}
          className="service-cta-button w-full px-4 py-3 text-white rounded-2xl font-medium flex items-center justify-center gap-2 group/btn transition-all duration-300 hover:scale-[1.02] mt-auto cursor-pointer"
        >
          {cta}
          <FaArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </Card>
  );
}; 