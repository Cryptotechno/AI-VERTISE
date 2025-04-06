import React from 'react';
import { useAnalyticsPageview } from '../../hooks/useAnalyticsPageview';

export const AnalyticsTracker: React.FC = () => {
  useAnalyticsPageview();
  return null;
};

export default AnalyticsTracker; 