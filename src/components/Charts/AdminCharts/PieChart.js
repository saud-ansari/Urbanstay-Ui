import React from 'react'
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
} from "chart.js";

// Register necessary components for Pie chart
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const PieChart = () => {

    // Data for the Pie Chart
    const data = {
        labels: ["Landlords", "Tenants", "Agents", "Admins"], // User roles
        datasets: [
            {
                data: [40, 30, 20, 10], // Proportion of users for each role
                backgroundColor: [
                    "#FF5733", // Landlords
                    "#33FF57", // Tenants
                    "#3357FF", // Agents
                    "#FF33A6", // Admins
                ],
                hoverBackgroundColor: [
                    "#FF6F61",
                    "#61FF6F",
                    "#6171FF",
                    "#FF61B8",
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "User Distribution by Role",
            },
        },
    };

    return (
        <>
            <h2>Users Distribution by Role</h2>
            <Pie data={data} options={options} />
        </>
    )
}

export default PieChart
