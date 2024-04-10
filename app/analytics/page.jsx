'use client'
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

export default function Analytics() {
    const chartRef = useRef(null);
    const lineChartref = useRef(null);
    const [isWeekly, setIsWeekly] = useState(true);

    useEffect(() => {
        if (chartRef.current && isWeekly) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    datasets: [
                        {
                            label: "No. of prints",
                            data: [200, 150, 300, 400, 100],
                            backgroundColor: "#6FFFB0",
                            
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: "category",
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
            chartRef.current.chart = newChart;
        }
    }, [isWeekly]);

    useEffect(() => {
        if (lineChartref.current && !isWeekly) {
            if (lineChartref.current.chart) {
                lineChartref.current.chart.destroy();
            }

            const context = lineChartref.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "line",
                data: {
                    labels: ["December", "January", "February", "March", "April"],
                    datasets: [
                        {
                            label: "Info",
                            data: [10000, 15000, 3000, 7000, 11000],
                            backgroundColor: "#6FFFB0",
                            borderColor:'#25DA59'
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: "category",
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
            lineChartref.current.chart = newChart;
        }
    }, [isWeekly]);

    return (
        <>
            <h1 className="text-center mt-10 text-5xl font-bold flex flex-col justify-center items-center">Analytics</h1>
            <div className="flex flex-row justify-center mt-10 gap-10">
            <button 
        className={`text-purple-300 px-5 py-3 border-2 rounded-lg hover:scale-110 transition-all ease-in-out border-purple-500 ${isWeekly ? 'bg-purple-800 ' : 'bg-none border-transparent'}`} 
        onClick={() => setIsWeekly(true)}
    >
        Weekly
    </button>
    <button 
        className={`text-purple-300 px-5 py-3 border-2 rounded-lg hover:scale-110 transition-all ease-in-out border-purple-500 ${!isWeekly ? 'bg-purple-800' : 'bg-none border-transparent'}`} 
        onClick={() => setIsWeekly(false)}
    >
        Monthly
    </button>
            </div>
            <div className="bg-form-dark w-[60%] mt-20 text-center m-auto items-center rounded-xl">
                {isWeekly ? (
                    <canvas ref={chartRef} className="ml-20 max-w-screen-lg text-white items-center" />
                ) : (
                    <canvas ref={lineChartref} className="ml-20 max-w-screen-lg text-white items-center" />
                )}
            </div>
        </>
    );
}
