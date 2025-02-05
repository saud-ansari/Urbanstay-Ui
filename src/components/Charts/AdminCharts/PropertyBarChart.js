import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';

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
      <h2>Types of Properties Listed</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}> {/* Use dataInfo here */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="propertyType"/>
          <YAxis dataKey="count"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d"  activeBar={<Rectangle fill="#8884d8"/>} />  
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', marginTop: '-10px', color:'#82ca9d'}}>Property Type</p>
    </div>
  );
};

export default PropertyBarChart;