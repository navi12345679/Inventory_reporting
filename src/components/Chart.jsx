import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartData }) => {
  // Safely handle undefined or empty data with default fallback
  const data = {
    labels: chartData?.labels || [], // Use empty array if labels is undefined
    datasets: chartData?.datasets?.map(dataset => ({
      ...dataset,
      data: dataset.data || [], // Use empty array if data in dataset is undefined
    })) || [], // Use empty array if datasets is undefined
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart Title',
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
