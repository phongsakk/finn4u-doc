'use client';

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
    ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';

// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Needed for fill background
);

type dataSet = {
    set: {
        label: string[],
        data: number[]
    }
}

const LineChart = ({ set: { label, data } }: dataSet) => {
    const chartRef = useRef(null);
    const config = {
        labels: label,
        datasets: [
            {
                showLabel: false,
                data: data,
                fill: true,
                backgroundColor: (context: any) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgb(40, 150, 99)');  // Start with semi-transparent
                    gradient.addColorStop(1, 'rgba(48, 177, 117, 0.2)');    // Fade to transparent
                    return gradient;
                },
                borderColor: 'rgba(36, 137, 104, 1)',
                tension: 0.4,
                pointRadius: 3
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    display: true,
                    callback: (tickValue: string | number, index: number, ticks: any[]) => {
                        if (typeof tickValue === 'number') {
                            if (tickValue >= 1_000_000) {
                                return `${tickValue / 1_000_000}M`;
                            }
                            if (tickValue >= 1000) {
                                return `${tickValue / 1000}K`;
                            }
                        }

                        return tickValue;
                    }
                },
                grid: {
                    display: true
                }
            },
            x: {
                ticks: {
                    display: true
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    } satisfies ChartOptions<'line'>;


    return <Line ref={chartRef} data={config} options={options} />;
};

export default LineChart;
