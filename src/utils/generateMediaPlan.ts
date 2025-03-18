import * as XLSX from 'xlsx-js-style';
import type { Channel, CampaignGoal, CampaignSettings } from '../types/calculator';

const brandColors = {
  primary: '4F46E5', // Indigo
  secondary: '6366F1', // Lighter Indigo
  accent: 'F59E0B', // Amber
  text: '1F2937', // Dark Gray
  lightGray: 'F3F4F6',
  success: '22C55E', // Green
  warning: 'F59E0B', // Amber
  error: 'EF4444', // Red
  info: '3B82F6', // Blue
  lightSuccess: 'DCFCE7', // Light Green
  lightError: 'FEE2E2', // Light Red
};

interface CellStyle {
  fill?: { fgColor: { rgb: string } };
  font?: { color?: { rgb: string }; bold?: boolean; sz?: number; italic?: boolean };
  alignment?: { horizontal: string; vertical: string; wrapText?: boolean };
  border?: {
    top?: { style: string; color: { rgb: string } };
    bottom?: { style: string; color: { rgb: string } };
    left?: { style: string; color: { rgb: string } };
    right?: { style: string; color: { rgb: string } };
  };
  numFmt?: string;
}

const createHeaderStyle = (bgColor: string = brandColors.primary): CellStyle => ({
  fill: { fgColor: { rgb: bgColor } },
  font: { color: { rgb: 'FFFFFF' }, bold: true, sz: 12 },
  alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  border: {
    top: { style: 'thin', color: { rgb: 'FFFFFF' } },
    bottom: { style: 'thin', color: { rgb: 'FFFFFF' } },
    left: { style: 'thin', color: { rgb: 'FFFFFF' } },
    right: { style: 'thin', color: { rgb: 'FFFFFF' } },
  },
});

const createDataStyle = (isAlternate: boolean = false, format?: string): CellStyle => ({
  fill: { fgColor: { rgb: isAlternate ? brandColors.lightGray : 'FFFFFF' } },
  font: { color: { rgb: brandColors.text }, sz: 11 },
  alignment: { horizontal: 'center', vertical: 'center' },
  border: {
    top: { style: 'thin', color: { rgb: brandColors.lightGray } },
    bottom: { style: 'thin', color: { rgb: brandColors.lightGray } },
    left: { style: 'thin', color: { rgb: brandColors.lightGray } },
    right: { style: 'thin', color: { rgb: brandColors.lightGray } },
  },
  ...(format ? { numFmt: format } : {}),
});

const createMetricStyle = (value: number, threshold: number, inverse: boolean = false, format?: string): CellStyle => {
  const isGood = inverse ? value <= threshold : value >= threshold;
  const color = isGood ? brandColors.success : brandColors.error;
  const bgColor = isGood ? brandColors.lightSuccess : brandColors.lightError;
  
  return {
    fill: { fgColor: { rgb: bgColor } },
    font: { color: { rgb: color }, sz: 11, bold: true },
    alignment: { horizontal: 'center', vertical: 'center' },
    border: {
      top: { style: 'thin', color: { rgb: brandColors.lightGray } },
      bottom: { style: 'thin', color: { rgb: brandColors.lightGray } },
      left: { style: 'thin', color: { rgb: brandColors.lightGray } },
      right: { style: 'thin', color: { rgb: brandColors.lightGray } },
    },
    ...(format ? { numFmt: format } : {}),
  };
};

interface ChannelPrediction {
  impressions: number;
  cpm: number;
  ctr: number;
  cpc: number;
  conversion: number;
  cac: number;
  roi: number;
  budget: number;
}

interface MediaPlanData {
  budget: number;
  channels: Array<{
    name: string;
    allocation: number;
    budget: number;
    predictions: ChannelPrediction;
  }>;
  settings: {
    type: string;
    audienceTarget: string;
    duration: number;
    isAutomated: boolean;
  };
  goal: string;
}

const generateTopThreeInsights = (
  channels: Channel[],
  predictions: Record<string, ChannelPrediction>
): string[] => {
  const insights: string[] = [];
  
  // Find best performing channel by ROI
  const bestChannel = channels.reduce((best, current) => {
    const currentPred = predictions[current.id];
    const bestPred = predictions[best.id];
    return currentPred.roi > bestPred.roi ? current : best;
  }, channels[0]);
  
  insights.push(`🟢 ${bestChannel.name} shows the highest ROI at ${predictions[bestChannel.id].roi.toFixed(1)}x, consider increasing budget allocation.`);
  
  // Find channels with low ROI for optimization
  const lowROIChannels = channels.filter(ch => predictions[ch.id].roi < 2.0);
  if (lowROIChannels.length > 0) {
    insights.push(`🟡 Consider optimizing or reducing budget for ${lowROIChannels.map(ch => ch.name).join(', ')} due to ROI below 2.0x.`);
  } else {
    insights.push(`🟢 All channels are performing efficiently with ROI above 2.0x.`);
  }
  
  // Analyze CAC efficiency
  const highCACChannels = channels.filter(ch => predictions[ch.id].cac > 100);
  if (highCACChannels.length > 0) {
    insights.push(`🔴 High customer acquisition cost in ${highCACChannels.map(ch => ch.name).join(', ')}. Review targeting and creative strategy.`);
  } else {
    insights.push(`🟢 Customer acquisition costs are within acceptable range across all channels.`);
  }
  
  return insights.slice(0, 3);
};

interface MediaPlanInput {
  channels: Channel[];
  settings: CampaignSettings;
  goal: CampaignGoal;
  budget: number;
}

export const generateMediaPlan = async ({ channels, settings, goal, budget }: MediaPlanInput): Promise<string[][]> => {
  // Create headers
  const headers = [
    'Channel',
    'Budget',
    'Allocation',
    'Impressions',
    'CPM',
    'CTR',
    'CPC',
    'Conversions',
    'CAC',
    'ROI'
  ];

  // Create data rows
  const rows = channels.map(channel => [
    channel.name,
    `$${channel.budget?.toLocaleString() || '0'}`,
    `${channel.allocation?.toFixed(1) || '0'}%`,
    (channel.predictions?.impressions || 0).toLocaleString(),
    `$${channel.predictions?.cpm?.toFixed(2) || '0'}`,
    `${((channel.predictions?.ctr || 0) * 100).toFixed(2)}%`,
    `$${channel.predictions?.cpc?.toFixed(2) || '0'}`,
    Math.round(
      (channel.predictions?.impressions || 0) * 
      (channel.predictions?.ctr || 0) * 
      (channel.predictions?.conversion || 0)
    ).toLocaleString(),
    `$${channel.predictions?.cac?.toFixed(0) || '0'}`,
    `${channel.predictions?.roi?.toFixed(1) || '0'}x`
  ]);

  // Add summary row
  const totalBudget = channels.reduce((sum, channel) => sum + (channel.budget || 0), 0);
  const totalImpressions = channels.reduce((sum, channel) => sum + (channel.predictions?.impressions || 0), 0);
  const avgCPM = channels.reduce((sum, channel) => sum + (channel.predictions?.cpm || 0), 0) / channels.length;
  const avgCTR = channels.reduce((sum, channel) => sum + (channel.predictions?.ctr || 0), 0) / channels.length;
  const avgCPC = channels.reduce((sum, channel) => sum + (channel.predictions?.cpc || 0), 0) / channels.length;
  const totalConversions = channels.reduce((sum, channel) => 
    sum + Math.round((channel.predictions?.impressions || 0) * (channel.predictions?.ctr || 0) * (channel.predictions?.conversion || 0)), 
    0
  );
  const avgCAC = totalBudget / totalConversions;
  const avgROI = channels.reduce((sum, channel) => sum + (channel.predictions?.roi || 0), 0) / channels.length;

  const summaryRow = [
    'TOTAL',
    `$${totalBudget.toLocaleString()}`,
    '100%',
    totalImpressions.toLocaleString(),
    `$${avgCPM.toFixed(2)}`,
    `${(avgCTR * 100).toFixed(2)}%`,
    `$${avgCPC.toFixed(2)}`,
    totalConversions.toLocaleString(),
    `$${avgCAC.toFixed(0)}`,
    `${avgROI.toFixed(1)}x`
  ];

  // Return all rows including headers and summary
  return [headers, ...rows, summaryRow];
};

// Helper function for generating insights
function generateInsights(data: MediaPlanData): string[] {
  const insights: string[] = [];
  
  // Find channels with highest ROI
  const sortedByROI = [...data.channels].sort((a, b) => b.predictions.roi - a.predictions.roi);
  if (sortedByROI.length > 0) {
    insights.push(`🟢 ${sortedByROI[0].name} shows highest ROI potential (${sortedByROI[0].predictions.roi.toFixed(1)}x)`);
  }

  // Check for high CAC channels
  const highCACChannels = data.channels.filter(ch => ch.predictions.cac > 100);
  if (highCACChannels.length > 0) {
    insights.push(`🔴 High CAC detected in ${highCACChannels.map(ch => ch.name).join(', ')} - Consider optimization`);
  }

  // Add campaign-type specific insights
  if (data.settings.type === 'mobile_app') {
    insights.push(`🟡 Consider increasing budget allocation for app-specific channels`);
  }

  return insights;
} 