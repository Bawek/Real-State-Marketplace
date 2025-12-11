import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ blogs }) => {
    console.log(blogs)
  // Aggregate blogs data by created date
  const data = blogs?.map(item => {
    console.log(item.title)
    return {
      name: new Date(item.createdAt).toLocaleDateString(),
      posts: item.title.length || 0,
      pv:blogs.pageViews || 0,
      awt:blogs.awt || 0
    };
  });
  

  return (
    <div style={{ width: "100%", height: 300 }} className="bg-green-100">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}
       >
          {/* Axes */}
          <XAxis dataKey="name" />
          <YAxis />
          {/* Gridlines */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Tooltip with custom content */}
          <Tooltip
           
          />
          {/* Area with fill color */}
          <Area type="monotone" dataKey="posts" stroke="#000" fill="#fff000" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
