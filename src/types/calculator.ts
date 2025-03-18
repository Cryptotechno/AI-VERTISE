import { ReactNode } from 'react';

export type CampaignGoal = 'awareness' | 'consideration' | 'conversion';

export interface Goal {
  id: CampaignGoal;
  name: string;
  icon: ReactNode;
  description: string;
}

export interface Predictions {
  impressions: number;
  engagement: number;
  conversion: number;
  roi: number;
  cpm: number;
  ctr: number;
  cpc: number;
  cac: number;
}

export interface Channel {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  description: string;
  budget?: number;
  allocation?: number;
  predictions?: Predictions;
}

export interface ChannelPrediction {
  impressions: number;
  cpm: number;
  roi: number;
  ctr: number;
  cpc: number;
  conversion: number;
  cac: number;
  engagement: number;
}

export interface AIInsight {
  type: 'positive' | 'neutral' | 'negative';
  message: string;
  impact: number; // 0-100
  confidence: number; // 0-100
}

export interface CampaignSettings {
  type: 'web_landing' | 'mobile_app' | 'cross_platform';
  audienceTarget: 'broad' | 'specific' | 'custom';
  duration: number; // in months
  isAutomated: boolean;
} 