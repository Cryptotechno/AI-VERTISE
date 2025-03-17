import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, Plugin } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState, useRef } from 'react'

// Custom plugin for percentage labels with animation
const percentageLabelsPlugin: Plugin = {
  id: 'percentageLabels',
  afterDraw: (chart: ChartJS) => {
    const { ctx } = chart;
    const chartData = chart.data.datasets[0].data as number[];
    
    ctx.save();
    const centerX = chart.width / 2;
    const centerY = chart.height / 2;
    const radius = Math.min(chart.width, chart.height) * 0.45;

    chartData.forEach((value, i) => {
      if (typeof value === 'number' && value > 0) {
        const total = chartData.reduce((sum, val) => 
          (typeof sum === 'number' ? sum : 0) + (typeof val === 'number' ? val : 0), 
          0
        );
        
        let angleStart = 0;
        for (let j = 0; j < i; j++) {
          const currentValue = chartData[j];
          if (typeof currentValue === 'number') {
            angleStart += (currentValue / total) * Math.PI * 2;
          }
        }
        const angle = angleStart + (value / total) * Math.PI;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw white background with shadow for better visibility
        ctx.save();
        ctx.font = 'bold 16px Inter';
        const text = `${value.toFixed(1)}%`;
        const textMetrics = ctx.measureText(text);
        const padding = 6;
        
        // Add shadow to the background
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.beginPath();
        ctx.roundRect(
          x - textMetrics.width / 2 - padding,
          y - textMetrics.actualBoundingBoxAscent / 2 - padding,
          textMetrics.width + padding * 2,
          textMetrics.actualBoundingBoxAscent + padding * 2,
          4
        );
        ctx.fill();
        
        // Reset shadow for text
        ctx.shadowColor = 'transparent';
        
        // Draw text
        ctx.fillStyle = '#111827';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
        ctx.restore();
      }
    });
    ctx.restore();
  }
};

// Register ChartJS components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, percentageLabelsPlugin);

interface MediaPlanChartProps {
  data: {
    labels: (string | undefined)[]
    datasets: {
      data: number[]
      backgroundColor: (string | undefined)[]
      borderColor?: (string | undefined)[]
      borderWidth: number
    }[]
  }
}

const MediaPlanChart = ({ data }: MediaPlanChartProps) => {
  const [startAngle, setStartAngle] = useState(-90);
  const prevDataRef = useRef(data);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if data has changed
    if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data)) {
      setIsAnimating(true);
      
      // Magical rotation animation
      const duration = 1200;
      const startTime = performance.now();
      const startAngle = -90;
      const endAngle = startAngle + 360; // Full rotation

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Custom easing function for magical feel
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentAngle = startAngle + (endAngle - startAngle) * eased;
        
        setStartAngle(currentAngle);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
      prevDataRef.current = data;
    }
  }, [data]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative h-[400px]">
        <Doughnut
          data={{
            ...data,
            labels: data.labels.map(label => '')
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            radius: '90%',
            rotation: startAngle * Math.PI / 180,
            animation: {
              duration: isAnimating ? 1200 : 750, // Longer duration during magical animation
              easing: 'easeOutCubic',
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                titleColor: '#1F2937',
                bodyColor: '#4B5563',
                bodyFont: {
                  size: 14,
                  weight: 500
                },
                padding: 12,
                boxPadding: 6,
                borderColor: 'rgba(229, 231, 235, 0.8)',
                borderWidth: 1,
                displayColors: true,
                callbacks: {
                  label: (context) => {
                    const originalLabel = data.labels[context.dataIndex] || '';
                    const value = context.raw as number;
                    return ` ${originalLabel}: ${value.toFixed(1)}%`;
                  }
                }
              }
            },
            elements: {
              arc: {
                borderWidth: 2,
                borderColor: '#ffffff'
              }
            },
            hover: {
              mode: 'nearest',
              intersect: true
            }
          }}
        />
      </div>
    </div>
  )
}

export default MediaPlanChart 