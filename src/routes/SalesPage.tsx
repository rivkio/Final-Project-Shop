// SalesPage.tsx
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import salesService from '../services/analytics';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './SalesPage.scss';

// רישום הרכיבים הדרושים ל-Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesPage = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [salesData, setSalesData] = useState<{ _id: string; totalAmount: number; totalSales: number }[]>([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            if (startDate && endDate) {
                try {
                    const response = await salesService.getSalesByDate(startDate, endDate);
                    setSalesData(response.data.salesByDate);
                } catch (err) {
                    console.error('Error fetching sales data:', err);
                }
            }
        };

        fetchSalesData();
    }, [startDate, endDate]);

    const chartData = {
        labels: salesData.map(item => item._id), // תאריכים
        datasets: [
            {
                label: 'Total Amount', // כותרת הנתונים
                data: salesData.map(item => item.totalAmount), // ערכים של סכומי ההזמנות
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Total Sales', // כותרת הנתונים
                data: salesData.map(item => item.totalSales), // ערכים של מספר ההזמנות
                fill: false,
                backgroundColor: 'rgba(153,102,255,0.2)',
                borderColor: 'rgba(153,102,255,1)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category' as const,
                labels: salesData.map(item => item._id), // תאריכים
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount',
                },
                ticks: {
                    callback: function (value: number) {
                        return `$${value}`; // הוסף סימן דולר לפני הערכים
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="sales-page">
            <h1>Sales Analytics</h1>
            <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    onChange={setStartDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select start date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select end date"
                />
            </div>
            <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default SalesPage;