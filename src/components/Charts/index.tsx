import React from 'react';
//import { Typography } from '@mui/material';
// import Chart from 'react-apexcharts';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { randomRGB, RGBAFromRGB } from '@/utils/colors';

type Series = {
  name: string;
  data: string[] | number[];
  // data: any[];
};

interface LineChartProps {
  series: Series[];
  xAxisData: any[];
  stacked?: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const LineChart: React.FC<LineChartProps> = ({
  series = [],
  xAxisData = [],
  stacked = false,
}) => {
  const chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    interaction: {
      mode: 'index',
    },
    scales: {
      y: {
        stacked: stacked,
      },
    },
  };

  const data = {
    labels: xAxisData.sort((a, b) => a - b),
    datasets: series.map((s, idx) => {
      const color = randomRGB();
      const rgba = RGBAFromRGB(color, 0.5);

      return {
        label: s.name,
        data: s.data,
        borderColor: color,
        backgroundColor: rgba,
        fill: stacked,
      };
    }),
  };

  // @ts-ignore
  return <Line options={chartOptions} data={data} />;
};

export default LineChart;
