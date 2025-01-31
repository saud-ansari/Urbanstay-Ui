import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PropertyBarChart = () => {
  const [dataInfo, setDataInfo] = useState([]); // Initialize as an empty array
  const [data , setData] = useState({
    propertyType: 'studio',
    value: 10,
    count: 10
  })

  // Fetch data from the API
  // useEffect(() => {
  //   axios.get('http://localhost:57614/api/Property')
  //     .then((response) => {
  //       if (response.data) {
  //         setDataInfo(response.data); // Set the fetched data to the state
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data: ', error);
  //     });
  // }, []); 
  // // Empty dependency array ensures the effect runs only once

  // useEffect(() => {
  //   if (dataInfo.length > 0) {
  //     const studioCount = dataInfo.filter(item => item.propertyType === "Studios").count;
  //     setData([
  //       { propertyType: 'Studios', count: studioCount },
  //       // You can add other properties similarly based on the fetched data
  //     ]);
  //   }
  // }, [dataInfo]); // Run this effect when dataInfo changes

  return (
    <div>
      <h2>Number of Properties Listed vs. Rented (Category-wise)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}> {/* Use dataInfo here */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="propertyType" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="listed" fill="#8884d8" />
          <Bar dataKey="rented" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PropertyBarChart;