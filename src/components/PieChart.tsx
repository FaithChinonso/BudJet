import { Transaction } from "@/utils";
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const PieChartComp = ({ transactions }: { transactions: Transaction[] }) => {
  interface CategoryData {
    name: string;
    value: number;
  }
  const getTopCategories = (transactions: Transaction[]): CategoryData[] => {
    const categoryMap: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      if (categoryMap[transaction.category]) {
        categoryMap[transaction.category] += transaction.amount;
      } else {
        categoryMap[transaction.category] = transaction.amount;
      }
    });

    const sortedCategories = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return sortedCategories.slice(0, 5);
  };
  const data = getTopCategories(transactions);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6361"];

  return (
    <div className="w-full">
      {transactions.length === 0 ? (
        <div className="text-secondary w-full h-[300px] flex items-center justify-center bg-light-green">
          <p>No transactions available</p>
        </div>
      ) : (
        <ResponsiveContainer height={300} width="100%">
          <PieChart>
            <Pie
              data={data || []}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={70}
              fill="#82ca9d"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `₦${value.toLocaleString()}`,
                name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartComp;
