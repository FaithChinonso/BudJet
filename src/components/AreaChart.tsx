import { convertToDateFormat, formatNumberWithCommas } from "@/helpers";
import { Transaction } from "@/utils";
import moment from "moment";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DailyData {
  date: string;
  debit: number;
  credit: number;
}
interface MonthlyData {
  month: string;
  debit: number;
  credit: number;
}
function isSingleMonth(transactions: Transaction[]): boolean {
  if (transactions.length === 0) return true;
  const firstDate = new Date(transactions[0].date);
  return transactions.every((transaction) => {
    const date = new Date(transaction.date);
    return (
      date.getFullYear() === firstDate.getFullYear() &&
      date.getMonth() === firstDate.getMonth()
    );
  });
}

function transformTransactionsDaily(transactions: Transaction[]): DailyData[] {
  const result: { [key: string]: DailyData } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const dateKey = convertToDateFormat(date); // Format as YYYY-MM-DD
    console.log(date, dateKey, new Date("2024-05-21"));
    if (!result[dateKey]) {
      result[dateKey] = { date: dateKey, debit: 0, credit: 0 };
    }

    if (transaction.type === "debit") {
      result[dateKey].debit += transaction.amount;
    } else if (transaction.type === "credit") {
      result[dateKey].credit += transaction.amount;
    }
  });

  return Object.values(result).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}
function transformTransactionsMonthly(
  transactions: Transaction[]
): MonthlyData[] {
  const result: { [key: string]: MonthlyData } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as YYYY-MM

    if (!result[monthKey]) {
      result[monthKey] = { month: monthKey, debit: 0, credit: 0 };
    }

    if (transaction.type === "debit") {
      result[monthKey].debit += transaction.amount;
    } else if (transaction.type === "credit") {
      result[monthKey].credit += transaction.amount;
    }
  });

  return Object.values(result).sort(
    (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
  );
}

const AreaChartComp = ({ transactions }: { transactions: Transaction[] }) => {
  const axisTickStyle = {
    fontSize: "10px",
    fill: "#666", // Change to desired color
  };
  const isWithinSingleMonth = isSingleMonth(transactions);
  const transformedData = isWithinSingleMonth
    ? transformTransactionsDaily(transactions)
    : transformTransactionsMonthly(transactions);
  console.log(transactions, "transformedData", transformedData);
  return (
    <div className="w-full">
      {transactions.length === 0 ? (
        <div className="text-secondary w-full h-[300px] flex items-center justify-center bg-light-green">
          <p>No transactions available</p>
        </div>
      ) : (
        <ResponsiveContainer height={300} width="100%">
          <AreaChart
            data={transformedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDebit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff2420" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff2420" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey={isWithinSingleMonth ? "date" : "month"}
              tick={axisTickStyle}
              tickFormatter={(value: string) => moment(value).format("ll")}
            />
            <YAxis
              tick={axisTickStyle}
              tickFormatter={(value: number) =>
                formatNumberWithCommas(value.toString())
              }
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value: number) =>
                formatNumberWithCommas(value.toString())
              }
            />
            <Area
              type="monotone"
              dataKey="debit"
              stroke="#ff2420"
              fillOpacity={1}
              fill="url(#colorDebit)"
            />
            <Area
              type="monotone"
              dataKey="credit"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorCredit)"
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AreaChartComp;
