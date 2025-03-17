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
  fill: { fgColor: { rgb: string } };
  font: { color: { rgb: string }; bold?: boolean; sz?: number; italic?: boolean };
  alignment?: { horizontal: string; vertical: string; wrapText?: boolean };
  border?: {
    top: { style: string; color: { rgb: string } };
    bottom: { style: string; color: { rgb: string } };
    left: { style: string; color: { rgb: string } };
    right: { style: string; color: { rgb: string } };
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
  alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  border: {
    top: { style: 'thin', color: { rgb: 'FFFFFF' } },
    bottom: { style: 'thin', color: { rgb: 'FFFFFF' } },
    left: { style: 'thin', color: { rgb: 'FFFFFF' } },
    right: { style: 'thin', color: { rgb: 'FFFFFF' } },
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

export const generateMediaPlan = () => {
  const wb = XLSX.utils.book_new();
  
  // Create the main sheet with enhanced KPIs
  const ws = XLSX.utils.aoa_to_sheet([
    [{ v: 'AI VERTISE Media Plan', s: { font: { bold: true, sz: 24 }, alignment: { horizontal: 'center' } } }],
    [{ v: 'Powered by Advanced AI Analytics', s: { font: { italic: true, sz: 14, color: { rgb: brandColors.secondary } }, alignment: { horizontal: 'center' } } }],
    [''],
    // Key Performance Summary
    [{ v: 'Key Performance Summary', s: { 
      font: { bold: true, sz: 16, color: { rgb: 'FFFFFF' } }, 
      fill: { fgColor: { rgb: brandColors.primary } }, 
      alignment: { horizontal: 'center' } 
    } }],
    [
      { v: 'Total Budget', s: createHeaderStyle() },
      { v: 'Est. Total Reach', s: createHeaderStyle() },
      { v: 'Avg. CPM', s: createHeaderStyle() },
      { v: 'Projected ROI', s: createHeaderStyle() },
      { v: 'Engagement Rate', s: createHeaderStyle() },
      { v: 'Conversion Rate', s: createHeaderStyle() }
    ],
    [
      { v: '$10,000', s: createDataStyle(false, '$#,##0') },
      { v: '450,000', s: createDataStyle(false, '#,##0') },
      { v: '$32.17', s: createDataStyle(false, '$0.00') },
      { v: '2.82x', s: createMetricStyle(2.82, 2.5) },
      { v: '4.3%', s: createMetricStyle(4.3, 4.0) },
      { v: '2.1%', s: createMetricStyle(2.1, 2.0) }
    ],
    [''],
    // Channel Performance Matrix
    [{ v: 'Channel Performance Matrix', s: { 
      font: { bold: true, sz: 16, color: { rgb: 'FFFFFF' } }, 
      fill: { fgColor: { rgb: brandColors.primary } }, 
      alignment: { horizontal: 'center' } 
    } }],
    // Channel data headers
    [
      { v: 'Channel', s: createHeaderStyle() },
      { v: 'Budget (%)', s: createHeaderStyle() },
      { v: 'Budget ($)', s: createHeaderStyle() },
      { v: 'Est. Reach', s: createHeaderStyle() },
      { v: 'CPM', s: createHeaderStyle() },
      { v: 'AI Score', s: createHeaderStyle() },
      { v: 'ROI Forecast', s: createHeaderStyle() },
      { v: 'Engagement', s: createHeaderStyle() },
      { v: 'CTR', s: createHeaderStyle() },
      { v: 'CPC', s: createHeaderStyle() },
      { v: 'Conv. Rate', s: createHeaderStyle() },
      { v: 'CAC', s: createHeaderStyle() }
    ],
    [
      { v: 'LinkedIn Ads', s: createDataStyle() },
      { v: 30, s: createDataStyle(false, '0.0%') },
      { v: 3000, s: createDataStyle(false, '$#,##0') },
      { v: 50000, s: createDataStyle(false, '#,##0') },
      { v: 60, s: createDataStyle(false, '$0.00') },
      { v: 8.5, s: createMetricStyle(8.5, 8.0, false, '0.0') },
      { v: 2.8, s: createMetricStyle(2.8, 2.5, false, '0.0') },
      { v: '4.2%', s: createMetricStyle(4.2, 3.5, false, '0.0%') },
      { v: '1.8%', s: createMetricStyle(1.8, 1.5, false, '0.0%') },
      { v: '$4.20', s: createDataStyle(false, '$0.00') },
      { v: '2.4%', s: createMetricStyle(2.4, 2.0, false, '0.0%') },
      { v: '$125', s: createMetricStyle(125, 100, true, '$#,##0') }
    ],
    [
      { v: 'Native Ads', s: createDataStyle(true) },
      { v: 25, s: createDataStyle(true, '0.0%') },
      { v: 2500, s: createDataStyle(true, '$#,##0') },
      { v: 75000, s: createDataStyle(true, '#,##0') },
      { v: 33.33, s: createDataStyle(true, '$0.00') },
      { v: 7.8, s: createMetricStyle(7.8, 8.0, false, '0.0') },
      { v: 3.1, s: createMetricStyle(3.1, 2.5, false, '0.0') },
      { v: '3.8%', s: createMetricStyle(3.8, 3.5, false, '0.0%') },
      { v: '1.2%', s: createMetricStyle(1.2, 1.5, false, '0.0%') },
      { v: '$3.50', s: createDataStyle(true, '$0.00') },
      { v: '1.8%', s: createMetricStyle(1.8, 2.0, false, '0.0%') },
      { v: '$95', s: createMetricStyle(95, 100, true, '$#,##0') }
    ],
    [
      { v: 'Telegram Ads', s: createDataStyle() },
      { v: 20, s: createDataStyle(false, '0.0%') },
      { v: 2000, s: createDataStyle(false, '$#,##0') },
      { v: 100000, s: createDataStyle(false, '#,##0') },
      { v: 20, s: createDataStyle(false, '$0.00') },
      { v: 8.2, s: createMetricStyle(8.2, 8.0, false, '0.0') },
      { v: 2.9, s: createMetricStyle(2.9, 2.5, false, '0.0') },
      { v: '5.1%', s: createMetricStyle(5.1, 3.5, false, '0.0%') },
      { v: '1.8%', s: createMetricStyle(1.8, 1.5, false, '0.0%') },
      { v: '$5.10', s: createDataStyle(false, '$0.00') },
      { v: '2.4%', s: createMetricStyle(2.4, 2.0, false, '0.0%') },
      { v: '$125', s: createMetricStyle(125, 100, true, '$#,##0') }
    ],
    [
      { v: 'DOOH', s: createDataStyle(true) },
      { v: 15, s: createDataStyle(true, '0.0%') },
      { v: 1500, s: createDataStyle(true, '$#,##0') },
      { v: 200000, s: createDataStyle(true, '#,##0') },
      { v: 7.5, s: createDataStyle(true, '$0.00') },
      { v: 7.5, s: createMetricStyle(7.5, 8.0, false, '0.0') },
      { v: 1.8, s: createMetricStyle(1.8, 2.5, false, '0.0') },
      { v: '2.5%', s: createMetricStyle(2.5, 3.5, false, '0.0%') },
      { v: '0.8%', s: createMetricStyle(0.8, 1.5, false, '0.0%') },
      { v: '$7.50', s: createDataStyle(true, '$0.00') },
      { v: '1.2%', s: createMetricStyle(1.2, 2.0, false, '0.0%') },
      { v: '$180', s: createMetricStyle(180, 100, true, '$#,##0') }
    ],
    [
      { v: 'App Store Ads', s: createDataStyle() },
      { v: 10, s: createDataStyle(false, '0.0%') },
      { v: 1000, s: createDataStyle(false, '$#,##0') },
      { v: 25000, s: createDataStyle(false, '#,##0') },
      { v: 40, s: createDataStyle(false, '$0.00') },
      { v: 8.0, s: createMetricStyle(8.0, 8.0, false, '0.0') },
      { v: 3.5, s: createMetricStyle(3.5, 2.5, false, '0.0') },
      { v: '6.2%', s: createMetricStyle(6.2, 3.5, false, '0.0%') },
      { v: '1.8%', s: createMetricStyle(1.8, 1.5, false, '0.0%') },
      { v: '$6.20', s: createDataStyle(false, '$0.00') },
      { v: '3.5%', s: createMetricStyle(3.5, 2.0, false, '0.0%') },
      { v: '$125', s: createMetricStyle(125, 100, true, '$#,##0') }
    ],
    // Total row with bold styling and calculations
    [
      { v: 'TOTAL', s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } } } },
      { v: 100, s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '0.0%' } },
      { v: 10000, s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '$#,##0' } },
      { v: 450000, s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '#,##0' } },
      { v: 32.17, s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '$0.00' } },
      { v: 8.0, s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '0.0' } },
      { v: 2.82, s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '0.0' } },
      { v: '4.3%', s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '0.0%' } },
      { v: '1.5%', s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '0.0%' } },
      { v: '$5.30', s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '$0.00' } },
      { v: '2.3%', s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '0.0%' } },
      { v: '$130', s: { ...createHeaderStyle(), fill: { fgColor: { rgb: brandColors.secondary } }, numFmt: '$#,##0' } }
    ],
    [''],
    // Audience Segmentation Analysis
    [{ v: 'Audience Segmentation Analysis', s: { 
      font: { bold: true, sz: 16, color: { rgb: 'FFFFFF' } }, 
      fill: { fgColor: { rgb: brandColors.primary } }, 
      alignment: { horizontal: 'center' } 
    } }],
    [
      { v: 'Channel', s: createHeaderStyle() },
      { v: 'Primary Audience', s: createHeaderStyle() },
      { v: 'Age Range', s: createHeaderStyle() },
      { v: 'Interests', s: createHeaderStyle() },
      { v: 'Engagement Score', s: createHeaderStyle() },
      { v: 'Conversion Rate', s: createHeaderStyle() }
    ],
    [
      { v: 'LinkedIn Ads', s: createDataStyle() },
      { v: 'B2B Professionals', s: createDataStyle() },
      { v: '25-54', s: createDataStyle() },
      { v: 'Tech, Finance, Marketing', s: createDataStyle() },
      { v: '8.5', s: createMetricStyle(8.5, 8.0, false, '0.0') },
      { v: '2.4%', s: createMetricStyle(2.4, 2.0, false, '0.0%') }
    ],
    [
      { v: 'Native Ads', s: createDataStyle(true) },
      { v: 'Tech Enthusiasts', s: createDataStyle(true) },
      { v: '18-45', s: createDataStyle(true) },
      { v: 'AI, Innovation, Digital', s: createDataStyle(true) },
      { v: '7.8', s: createMetricStyle(7.8, 8.0, false, '0.0') },
      { v: '1.8%', s: createMetricStyle(1.8, 2.0, false, '0.0%') }
    ],
    [
      { v: 'Telegram Ads', s: createDataStyle() },
      { v: 'Crypto Community', s: createDataStyle() },
      { v: '21-45', s: createDataStyle() },
      { v: 'Blockchain, Trading, Tech', s: createDataStyle() },
      { v: '8.2', s: createMetricStyle(8.2, 8.0, false, '0.0') },
      { v: '2.4%', s: createMetricStyle(2.4, 2.0, false, '0.0%') }
    ],
    [
      { v: 'DOOH', s: createDataStyle(true) },
      { v: 'Urban Professionals', s: createDataStyle(true) },
      { v: '25-54', s: createDataStyle(true) },
      { v: 'Business, Tech, Luxury', s: createDataStyle(true) },
      { v: '7.5', s: createMetricStyle(7.5, 8.0, false, '0.0') },
      { v: '1.2%', s: createMetricStyle(1.2, 2.0, false, '0.0%') }
    ],
    [
      { v: 'App Store Ads', s: createDataStyle() },
      { v: 'Mobile Users', s: createDataStyle() },
      { v: '18-44', s: createDataStyle() },
      { v: 'Apps, Mobile Tech', s: createDataStyle() },
      { v: '8.0', s: createMetricStyle(8.0, 8.0, false, '0.0') },
      { v: '3.5%', s: createMetricStyle(3.5, 2.0, false, '0.0%') }
    ],
    [''],
    // Update AI Insights with audience segmentation recommendations
    [{ v: 'AI Insights & Recommendations', s: { 
      font: { bold: true, sz: 16, color: { rgb: 'FFFFFF' } }, 
      fill: { fgColor: { rgb: brandColors.accent } }, 
      alignment: { horizontal: 'center' } 
    } }],
    [{ v: '🟢 LinkedIn + Native Ads combination shows highest synergy for tech-focused B2B audience (Expected +15% ROI boost)', s: { font: { sz: 11, bold: true, color: { rgb: brandColors.success } } } }],
    [{ v: '🟡 DOOH performance requires location-based optimization - Target premium business districts during peak hours', s: { font: { sz: 11, bold: true, color: { rgb: brandColors.warning } } } }],
    [{ v: '🟢 App Store Ads excelling with mobile-first younger demographic (18-34 age group)', s: { font: { sz: 11, bold: true, color: { rgb: brandColors.success } } } }],
    [{ v: '🔴 DOOH CAC ($180) needs improvement - Implement targeted messaging for urban professionals', s: { font: { sz: 11, bold: true, color: { rgb: brandColors.error } } } }],
    [{ v: '🟡 Opportunity to cross-target Telegram users with Native Ads for improved engagement', s: { font: { sz: 11, bold: true, color: { rgb: brandColors.warning } } } }],
    [{ v: '🟢 Consider expanding LinkedIn targeting to include Finance & Tech decision-makers', s: { font: { sz: 11, bold: true, color: { rgb: brandColors.success } } } }],
    [''],
    [{ v: 'Generated by AI VERTISE © 2024', s: { font: { italic: true, sz: 10 }, alignment: { horizontal: 'center' } } }],
    [{ v: 'Nataliia Rumiantseva | +48 503 589 781 | natalymakota@gmail.com', s: { 
      font: { italic: true, sz: 10 }, 
      alignment: { horizontal: 'center' } 
    } }]
  ]);

  // Update column widths for new sections
  ws['!cols'] = [
    { width: 20 }, // Channel/Metric
    { width: 15 }, // Budget % / Primary Audience
    { width: 12 }, // Budget $ / Age Range
    { width: 25 }, // Est. Reach / Interests
    { width: 12 }, // CPM / Engagement Score
    { width: 12 }, // AI Score / Conversion Rate
    { width: 12 }, // ROI Forecast
    { width: 12 }, // Engagement
    { width: 10 }, // CTR
    { width: 10 }, // CPC
    { width: 12 }, // Conv. Rate
    { width: 10 }, // CAC
  ];

  // Update merge cells to fix Channel Performance Matrix header
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } }, // Title
    { s: { r: 1, c: 0 }, e: { r: 1, c: 11 } }, // Subtitle
    { s: { r: 3, c: 0 }, e: { r: 3, c: 5 } }, // Key Performance Summary
    { s: { r: 7, c: 0 }, e: { r: 7, c: 11 } }, // Channel Performance Matrix header
    { s: { r: 16, c: 0 }, e: { r: 16, c: 5 } }, // Audience Segmentation Analysis header
    { s: { r: 23, c: 0 }, e: { r: 23, c: 11 } }, // AI Insights header
    { s: { r: 30, c: 0 }, e: { r: 30, c: 11 } }, // Footer
    { s: { r: 31, c: 0 }, e: { r: 31, c: 11 } }, // Contact info
  ];

  // Set print and view properties
  ws['!pageSetup'] = {
    orientation: 'landscape',
    fitToPage: true,
    fitToHeight: 1,
    fitToWidth: 1,
    scale: 85, // Slightly smaller scale for better readability
  };

  // Set zoom level and freeze panes
  ws['!view'] = [{
    zoom: 85,
    frozen: true,
    xSplit: 1,
    ySplit: 8, // Adjust frozen rows to match new structure
    topLeftCell: 'B9',
    activeCell: 'B9',
  }];

  XLSX.utils.book_append_sheet(wb, ws, 'Media Plan');
  
  // Write to file with specific options
  XLSX.writeFile(wb, 'public/downloads/AI_VERTISE_Media_Plan.xlsx', {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
    compression: true,
  });
}; 