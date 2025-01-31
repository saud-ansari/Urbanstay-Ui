import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PropertyBarChart = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:57614/PropertyCountType')
    .then(res =>{
      setData(res.data);
    })
    .catch(error => {
      console.log(error);
    });
  },[]);

  return (
    <div>
      <h2>Number of Properties Listed vs. Rented (Category-wise)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}> {/* Use dataInfo here */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="propertyType" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Legend />
          <Bar dataKey="propertyType" fill="propertyType" />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PropertyBarChart;