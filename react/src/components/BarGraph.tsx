import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarGraphProps {
  data: { [key: string]: number }[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const transformedData = data.map(item => {
    const label = Object.keys(item)[0];
    const value = Object.values(item)[0];
    return { name: label, value: value };
  });

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">Data for Selected Date</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
