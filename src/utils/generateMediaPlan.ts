import * as XLSX from 'xlsx-js-style';

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

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

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

export const generateMediaPlan = (
  channels: Channel[],
  budget: number,
  predictions: Record<string, ChannelPrediction>
) => {
  // Calculate total metrics
  const totalBudget = budget;
  const totalImpressions = Object.values(predictions).reduce((sum, p) => sum + p.impressions, 0);
  const avgCPM = (totalBudget * 1000) / totalImpressions;
  const avgROI = Object.values(predictions).reduce((sum, p) => sum + p.roi, 0) / channels.length;
  const avgCTR = Object.values(predictions).reduce((sum, p) => sum + p.ctr, 0) / channels.length;
  const avgConversion = Object.values(predictions).reduce((sum, p) => sum + p.conversion, 0) / channels.length;

  // Create workbook
  const wb = XLSX.utils.book_new();
  const wsData: any[][] = [];

  // Add title with style
  wsData.push([{
    v: 'AI-VERTISE Media Plan',
    t: 's',
    s: {
      font: { bold: true, sz: 16, color: { rgb: brandColors.primary } },
      alignment: { horizontal: 'center', vertical: 'center' }
    }
  }]);
  wsData.push([]);

  // Add summary section with styles
  wsData.push([{
    v: 'Campaign Summary',
    t: 's',
    s: createHeaderStyle()
  }]);

  // Add summary data with styles
  wsData.push([
    { v: 'Total Budget', t: 's', s: createDataStyle() },
    { v: totalBudget, t: 'n', s: { ...createDataStyle(), numFmt: '"$"#,##0' } }
  ]);
  wsData.push([
    { v: 'Total Impressions', t: 's', s: createDataStyle() },
    { v: totalImpressions, t: 'n', s: { ...createDataStyle(), numFmt: '#,##0' } }
  ]);
  wsData.push([
    { v: 'Average CPM', t: 's', s: createDataStyle() },
    { v: avgCPM, t: 'n', s: { ...createDataStyle(), numFmt: '"$"#,##0.00' } }
  ]);
  wsData.push([
    { v: 'Average ROI', t: 's', s: createDataStyle() },
    { v: avgROI, t: 'n', s: { ...createDataStyle(), numFmt: '0.0"x"' } }
  ]);
  wsData.push([
    { v: 'Average CTR', t: 's', s: createDataStyle() },
    { v: avgCTR * 100, t: 'n', s: { ...createDataStyle(), numFmt: '0.0"%"' } }
  ]);
  wsData.push([
    { v: 'Average Conversion Rate', t: 's', s: createDataStyle() },
    { v: avgConversion * 100, t: 'n', s: { ...createDataStyle(), numFmt: '0.0"%"' } }
  ]);

  wsData.push([]);

  // Add channel performance section with styles
  wsData.push([{
    v: 'Channel Performance',
    t: 's',
    s: createHeaderStyle()
  }]);

  // Add headers with styles
  const headers = [
    'Channel',
    'Budget',
    'Impressions',
    'CPM',
    'ROI',
    'CTR',
    'CPC',
    'Conv. Rate',
    'CAC'
  ].map(header => ({
    v: header,
    t: 's',
    s: createHeaderStyle(brandColors.secondary)
  }));
  wsData.push(headers);

  // Add channel data with styles
  channels.forEach((channel, idx) => {
    const prediction = predictions[channel.id];
    if (prediction) {
      const rowStyle = createDataStyle(idx % 2 === 1);
      wsData.push([
        { v: channel.name, t: 's', s: rowStyle },
        { v: prediction.budget, t: 'n', s: { ...rowStyle, numFmt: '"$"#,##0' } },
        { v: prediction.impressions, t: 'n', s: { ...rowStyle, numFmt: '#,##0' } },
        { v: prediction.cpm, t: 'n', s: { ...rowStyle, numFmt: '"$"#,##0.00' } },
        { v: prediction.roi, t: 'n', s: createMetricStyle(prediction.roi, 2, false, '0.0"x"') },
        { v: prediction.ctr * 100, t: 'n', s: { ...rowStyle, numFmt: '0.0"%"' } },
        { v: prediction.cpc, t: 'n', s: { ...rowStyle, numFmt: '"$"#,##0.00' } },
        { v: prediction.conversion * 100, t: 'n', s: { ...rowStyle, numFmt: '0.0"%"' } },
        { v: prediction.cac, t: 'n', s: createMetricStyle(prediction.cac, 100, true, '"$"#,##0') }
      ]);
    }
  });

  wsData.push([]);

  // Add AI Recommendations with styles
  wsData.push([{
    v: 'AI Recommendations',
    t: 's',
    s: createHeaderStyle()
  }]);

  const insights = generateTopThreeInsights(channels, predictions);
  insights.forEach(insight => {
    const color = insight.startsWith('🟢') ? brandColors.success :
                 insight.startsWith('🟡') ? brandColors.warning :
                 brandColors.error;
    wsData.push([{
      v: insight,
      t: 's',
      s: {
        font: { color: { rgb: color }, sz: 11 },
        alignment: { horizontal: 'left', vertical: 'center' }
      }
    }]);
  });

  wsData.push([]);

  // Add contact information with styles
  wsData.push([{
    v: 'Contact Information',
    t: 's',
    s: createHeaderStyle()
  }]);

  const contactStyle = {
    font: { sz: 11, color: { rgb: brandColors.text } },
    alignment: { horizontal: 'left', vertical: 'center' }
  };

  wsData.push([
    { v: 'Name:', t: 's', s: contactStyle },
    { v: 'Nataliia Rumiantseva', t: 's', s: contactStyle }
  ]);
  wsData.push([
    { v: 'Phone:', t: 's', s: contactStyle },
    { v: '+48 503 589 781', t: 's', s: contactStyle }
  ]);
  wsData.push([
    { v: 'Email:', t: 's', s: contactStyle },
    { v: 'natalymakota@gmail.com', t: 's', s: contactStyle }
  ]);
  wsData.push([{
    v: '© AI VERTISE 2024',
    t: 's',
    s: {
      font: { italic: true, sz: 10, color: { rgb: brandColors.text } },
      alignment: { horizontal: 'center', vertical: 'center' }
    }
  }]);

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Set column widths
  ws['!cols'] = [
    { wch: 25 }, // Channel
    { wch: 12 }, // Budget
    { wch: 12 }, // Impressions
    { wch: 10 }, // CPM
    { wch: 8 },  // ROI
    { wch: 8 },  // CTR
    { wch: 10 }, // CPC
    { wch: 12 }, // Conv. Rate
    { wch: 10 }  // CAC
  ];

  // Add merge cells for headers
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }, // Title
    { s: { r: 2, c: 0 }, e: { r: 2, c: 8 } }, // Campaign Summary
    { s: { r: 10, c: 0 }, e: { r: 10, c: 8 } }, // Channel Performance
    { s: { r: wsData.length - 6, c: 0 }, e: { r: wsData.length - 6, c: 8 } }, // AI Recommendations
    { s: { r: wsData.length - 2, c: 0 }, e: { r: wsData.length - 2, c: 8 } } // Copyright
  ];

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Media Plan');

  // Generate Excel file
  const wbout = XLSX.write(wb, {
    type: 'array',
    bookType: 'xlsx',
    bookSST: false
  });
  
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  return URL.createObjectURL(blob);
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