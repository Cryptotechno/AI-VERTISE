import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaShare, FaLinkedin, FaTwitter, FaFacebook, FaUser, FaBookmark, FaRegBookmark, FaArrowUp } from 'react-icons/fa';

interface ArticleSection {
  type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code';
  content: string;
  level?: number;
  items?: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  language?: string;
}

interface BlogArticleContentProps {
  article: {
    title: string;
    date: string;
    position: string;
    category: string;
    readTime: string;
    image: string;
    content: ArticleSection[];
    tags: string[];
    estimatedReadingProgress?: number;
  };
}

export const BlogArticleContent: React.FC<BlogArticleContentProps> = ({ article }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #6C5CE7 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#a594ff]"
          style={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#6C5CE7] to-[#a594ff] text-white text-sm font-medium rounded-full shadow-sm">
                  {article.category}
                </span>
                <div className="flex gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="inline-block px-3 py-1 bg-gradient-to-r from-[#6C5CE7]/5 to-[#a594ff]/5 text-[#6C5CE7] text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6C5CE7] transition-colors"
              >
                {isBookmarked ? (
                  <FaBookmark className="w-4 h-4" />
                ) : (
                  <FaRegBookmark className="w-4 h-4" />
                )}
                {isBookmarked ? 'Saved' : 'Save article'}
              </button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6C5CE7] via-[#8075FF] to-[#a594ff] bg-clip-text text-transparent mb-8 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#6C5CE7]/10 rounded-full">
                    <FaUser className="w-5 h-5 text-[#6C5CE7]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#6C5CE7]">{article.position}</h3>
                    <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                      <span>{article.date}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <FaClock className="w-4 h-4 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-[#6C5CE7] transition-colors p-2 hover:bg-[#6C5CE7]/5 rounded-full">
                  <FaLinkedin className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-[#6C5CE7] transition-colors p-2 hover:bg-[#6C5CE7]/5 rounded-full">
                  <FaTwitter className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-[#6C5CE7] transition-colors p-2 hover:bg-[#6C5CE7]/5 rounded-full">
                  <FaFacebook className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[21/9] mb-12 rounded-2xl overflow-hidden bg-white p-4">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {section.type === 'paragraph' && (
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {section.content}
                  </p>
                )}
                {section.type === 'heading' && (
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#a594ff] bg-clip-text text-transparent mt-12 mb-6">
                    {section.content}
                  </h2>
                )}
                {section.type === 'image' && section.image && (
                  <figure className="my-8">
                    <div className="rounded-xl overflow-hidden bg-white p-4 aspect-[16/9]">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="text-center text-sm text-gray-500 mt-3">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {section.type === 'quote' && (
                  <blockquote className="my-8 p-6 bg-gradient-to-r from-[#6C5CE7]/5 to-[#a594ff]/5 rounded-xl border-l-4 border-[#6C5CE7] italic text-gray-700">
                    {section.content}
                  </blockquote>
                )}
                {section.type === 'list' && section.items && (
                  <ul className="list-none space-y-2 text-gray-600 mb-6">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.type === 'code' && (
                  <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto my-6">
                    <code className={`language-${section.language || 'javascript'}`}>
                      {section.content}
                    </code>
                  </pre>
                )}
              </motion.div>
            ))}
          </div>

          {/* Author Bio */}
          <motion.div
            className="mt-16 p-8 bg-gradient-to-r from-[#6C5CE7]/5 to-[#a594ff]/5 rounded-2xl border border-gray-100"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-[#6C5CE7]/10 to-[#a594ff]/10 rounded-full">
                <FaUser className="w-6 h-6 text-[#6C5CE7]" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#6C5CE7] to-[#a594ff] bg-clip-text text-transparent mb-1">
                  {article.position}
                </h3>
                <p className="text-gray-600 text-sm">
                  Expert at AI VERTISE, specializing in AI-powered marketing solutions and digital transformation strategies.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-[#6C5CE7] to-[#a594ff] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </article>
  );
};

export const articles = {
  'ai-powered-marketing-automation': {
    title: 'AI-Powered Marketing Automation: The Game-Changer for 2024',
    content: [
      {
        type: 'paragraph',
        content: 'In the rapidly evolving landscape of digital marketing, AI-powered marketing automation has emerged as a transformative force, revolutionizing how businesses engage with their customers. This comprehensive guide explores the latest advancements in marketing automation and how leading brands are leveraging AI to achieve unprecedented results.'
      },
      {
        type: 'heading',
        content: 'The Evolution of Marketing Automation'
      },
      {
        type: 'paragraph',
        content: 'Traditional marketing automation platforms have relied on rule-based systems and basic segmentation. However, with the integration of artificial intelligence, these systems have evolved into sophisticated platforms capable of real-time decision-making and predictive analytics. Modern AI-powered automation can analyze vast amounts of customer data, identify patterns, and make intelligent decisions about when, how, and what to communicate to each individual customer.'
      },
      {
        type: 'heading',
        content: 'Key Benefits of AI-Powered Marketing Automation'
      },
      {
        type: 'list',
        items: [
          'Increased engagement rates by up to 300% through personalized content delivery',
          'Reduced customer acquisition costs by 50% using intelligent lead scoring',
          'Improved customer retention through predictive churn prevention',
          'Enhanced email marketing performance with AI-optimized send times',
          'Automated A/B testing and content optimization'
        ]
      },
      {
        type: 'quote',
        content: '"AI-powered marketing automation isn\'t just about efficiency—it\'s about creating meaningful, personalized experiences at scale that drive real business results."'
      },
      {
        type: 'heading',
        content: 'Implementing AI Marketing Automation'
      },
      {
        type: 'paragraph',
        content: 'Successfully implementing AI marketing automation requires a strategic approach. Start by identifying your key objectives, whether that\'s improving lead generation, enhancing customer engagement, or increasing conversion rates. Then, ensure your data infrastructure can support AI-powered decision-making by consolidating customer data from various touchpoints.'
      },
      {
        type: 'code',
        language: 'python',
        content: `# Example of AI-powered customer segmentation
from sklearn.cluster import KMeans
import pandas as pd

def segment_customers(data):
    # Prepare customer features
    features = ['engagement_score', 'purchase_frequency', 'avg_order_value']
    X = data[features]
    
    # Apply K-means clustering
    kmeans = KMeans(n_clusters=5, random_state=42)
    data['segment'] = kmeans.fit_predict(X)
    
    return data`
      }
    ]
  },
  'generative-ai-content-creation': {
    title: 'Generative AI: Transforming Content Creation for Marketers',
    content: [
      {
        type: 'paragraph',
        content: 'Generative AI is revolutionizing content creation in marketing, enabling brands to produce high-quality, personalized content at scale. From social media posts to long-form articles, AI tools are helping marketers overcome creative blocks and maintain consistent brand voices across all channels.'
      },
      {
        type: 'heading',
        content: 'Understanding Generative AI Models'
      },
      {
        type: 'paragraph',
        content: 'Modern generative AI models like GPT-4 and Claude are built on transformer architectures that can understand context, maintain consistency, and generate human-like text. These models have been trained on vast amounts of data, enabling them to understand industry-specific terminology and adapt to different writing styles.'
      },
      {
        type: 'heading',
        content: 'Best Practices for AI Content Creation'
      },
      {
        type: 'list',
        items: [
          'Define clear brand guidelines and tone of voice',
          'Use specific, detailed prompts for better results',
          'Always review and edit AI-generated content',
          'Maintain a balance between automation and human creativity',
          'Test different approaches and refine your process'
        ]
      },
      {
        type: 'quote',
        content: '"The key to successful AI content creation isn\'t just about generating content—it\'s about maintaining authenticity while scaling your content production."'
      },
      {
        type: 'heading',
        content: 'Practical Applications in Marketing'
      },
      {
        type: 'paragraph',
        content: 'From email campaigns to social media content, generative AI can be applied across various marketing channels. The key is to understand how to effectively prompt these models and integrate them into your existing content workflow.'
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// Example of content generation with proper prompting
const generateContent = async (topic, tone, length) => {
  const prompt = {
    context: "Marketing content generation",
    topic: topic,
    tone_of_voice: tone,
    desired_length: length,
    brand_guidelines: {
      voice: "professional yet friendly",
      taboo_topics: ["controversial subjects"],
      key_messages: ["innovation", "reliability", "customer success"]
    }
  };

  const response = await ai.generateContent(prompt);
  return response;
};`
      }
    ]
  },
  'ai-powered-customer-insights': {
    title: 'Unlocking Customer Insights with AI Analytics',
    content: [
      {
        type: 'paragraph',
        content: 'AI-powered analytics is transforming how businesses understand and respond to customer behavior. By leveraging machine learning algorithms and predictive analytics, companies can now uncover deeper insights and make data-driven decisions with unprecedented accuracy.'
      },
      {
        type: 'heading',
        content: 'The Power of AI in Customer Analytics'
      },
      {
        type: 'paragraph',
        content: 'Traditional analytics tools provide historical data analysis, but AI-powered solutions can predict future behavior, identify patterns, and recommend actions in real-time. This predictive capability enables businesses to be proactive rather than reactive in their customer engagement strategies.'
      },
      {
        type: 'heading',
        content: 'Key Applications of AI Analytics'
      },
      {
        type: 'list',
        items: [
          'Customer behavior prediction and trend analysis',
          'Sentiment analysis across social media and customer feedback',
          'Churn prediction and prevention strategies',
          'Personalization and recommendation engines',
          'Customer lifetime value optimization'
        ]
      },
      {
        type: 'quote',
        content: '"AI analytics isn\'t just about collecting data—it\'s about turning that data into actionable insights that drive business growth and customer satisfaction."'
      },
      {
        type: 'heading',
        content: 'Implementing AI Analytics'
      },
      {
        type: 'paragraph',
        content: 'Successfully implementing AI analytics requires a structured approach to data collection, processing, and analysis. Start by identifying key metrics and ensuring data quality, then gradually build more sophisticated analysis capabilities.'
      },
      {
        type: 'code',
        language: 'python',
        content: `# Example of sentiment analysis implementation
from transformers import pipeline

def analyze_customer_feedback(feedback_data):
    # Initialize sentiment analyzer
    sentiment_analyzer = pipeline("sentiment-analysis")
    
    # Process feedback
    results = []
    for feedback in feedback_data:
        sentiment = sentiment_analyzer(feedback)[0]
        results.append({
            'feedback': feedback,
            'sentiment': sentiment['label'],
            'confidence': sentiment['score']
        })
    
    return results`
      }
    ]
  },
  'ai-advertising-optimization': {
    title: 'AI-Driven Advertising: Maximizing ROAS in Digital Campaigns',
    content: [
      {
        type: 'paragraph',
        content: 'AI is revolutionizing digital advertising by enabling more precise targeting, automated bid management, and creative optimization. Learn how leading brands are achieving up to 40% higher ROAS (Return on Ad Spend) through AI-powered advertising strategies.'
      },
      {
        type: 'heading',
        content: 'The AI Advantage in Digital Advertising'
      },
      {
        type: 'paragraph',
        content: 'Artificial Intelligence brings unprecedented capabilities to digital advertising, from real-time bid adjustments to dynamic creative optimization. By processing vast amounts of data and making instant decisions, AI helps advertisers maximize their budget efficiency and campaign performance.'
      },
      {
        type: 'heading',
        content: 'Key Components of AI Advertising'
      },
      {
        type: 'list',
        items: [
          'Automated bid management and optimization',
          'Dynamic audience segmentation',
          'Creative testing and optimization',
          'Cross-channel campaign coordination',
          'Predictive analytics for campaign performance'
        ]
      },
      {
        type: 'quote',
        content: '"The future of digital advertising lies in AI\'s ability to make real-time decisions that optimize campaign performance while maintaining brand safety and relevance."'
      },
      {
        type: 'heading',
        content: 'Implementing AI Advertising Solutions'
      },
      {
        type: 'paragraph',
        content: 'Successfully implementing AI in your advertising strategy requires careful planning and the right tools. Start by establishing clear KPIs, ensuring proper tracking, and gradually introducing AI optimization features.'
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// Example of AI bid optimization logic
const optimizeBids = async (campaignData) => {
  const bidAdjustments = {
    calculateOptimalBid: (historical, current) => {
      const performance = analyzePerformance(historical);
      const market = analyzeMarketConditions(current);
      
      return {
        suggested_bid: performance.optimal_bid * market.competition_factor,
        confidence_score: performance.confidence,
        expected_roas: performance.projected_roas
      };
    }
  };

  return await bidAdjustments.calculateOptimalBid(
    campaignData.historical,
    campaignData.current
  );
};`
      }
    ]
  }
}; 