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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { randomRGB, RGBAFromRGB } from '@/utils/colors';

type Series = {
  name: string;
  // data: string[] | number[];
  data: any[];
};

interface LineChartProps {
  series: Series[];
  xAxisData: any[];
  stacked: boolean;
  yTitle?: string;
  xTitle?: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart: React.FC<LineChartProps> = ({
  series = [],
  xAxisData = [],
  stacked = false,
  yTitle,
  xTitle,
}) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: title
      // }
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
    labels: xAxisData,
    datasets: series.map((s, idx) => {
      const color = randomRGB();
      const rgba = RGBAFromRGB(color, 0.5);

      return {
        label: s.name,
        data: s.data,
        borderColor: color,
        backgroundColor: rgba,
      };
    }),
  };

  // b@ts-ignore
  const chartOptions1: {
    responsive: boolean;
    plugins: { legend: { position: string } };
    interaction: { mode: string };
    scales: { y: { stacked: boolean } };
  };

  // TS2322: Type '{
  //  responsive: boolean;
  //  plugins: { legend: { position: string; }; };
  //  interaction: { mode: string; };
  //  scales: { y: { stacked: boolean; }; }; }'
  //  is not assignable to type '_DeepPartialObject<CoreChartOptions<"line"> & ElementChartOptions<"line"> & PluginChartOptions<"line"> & DatasetChartOptions<"line"> & ScaleChartOptions<...> & LineControllerChartOptions>'.   The types of 'interaction.mode' are incompatible between these types.     Type 'string' is not assignable to type '"index" | "x" | "y" | "dataset" | "point" | "nearest" | undefined'.

  return <Line options={chartOptions} data={data} />;
};

export default LineChart;
