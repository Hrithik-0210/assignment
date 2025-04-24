import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  XAxis,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";

const ProductChart = () => {
  const [colorData, setColorData] = useState([]);
  const [capacityData, setCapacityData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const getProductData = async () => {
    try {
      const data = await fetch(
        "https://product-data-5biy.onrender.com/products"
      );
      const jsonData = await data.json();
      // console.log(jsonData);

      const colorCount = {};
      const capacityCount = {};

      jsonData.forEach((product) => {
        const pData = product.data;
        if (pData) {
          const color = pData.color || pData.Color || pData["Strap Colour"];
          if (color && typeof color === "string") {
            colorCount[color] = (colorCount[color] || 0) + 1;
          }

          const capacity =
            pData.capacity || pData.Capacity || pData["capacity GB"];
          if (capacity) {
            capacityCount[capacity] = (capacityCount[capacity] || 0) + 1;
          }
        }
      });
      const formattedColorData = Object.entries(colorCount).map(
        ([name, value]) => ({ name, value: Number(value) })
      );
      const formattedCapacityData = Object.entries(capacityCount).map(
        ([name, value]) => ({ name, value: Number(value) })
      );

      setColorData(formattedColorData);
      setCapacityData(formattedCapacityData);
    } catch (err) {
      console.log("No Data Found", err);
    }
  };

  // console.log(colorData);
  // console.log(capacityData);

  useEffect(() => {
    getProductData();
  }, []);

  const RADIAN = Math.PI / 180;

  return (
    <div className="flex gap-5">
      <div style={{ width: "100%", height: 300 }}>
        <h2 className="text-xl font-bold text-center mb-4">
          Color-wise Product Chart
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={colorData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, "dataMax +1 "]} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "500px", height: 300 }}>
        <h2 className="text-xl font-bold text-center mb-4">
          Category-wise Product Chart
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={capacityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name }) => name}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {capacityData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductChart;
