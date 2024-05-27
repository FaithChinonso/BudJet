import moment from "moment";
import { MonthlyData, Transaction } from "./utils";

export function formatNumberWithCommas(number: string) {
  return `₦${number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
export const customFilter = (data: any[], text: any | null) => {
  if (!text) return data;
  if (typeof text === "string") {
    return data?.filter((item: any) =>
      Object.keys(item).some((key) =>
        item[key]?.toString().toLowerCase().includes(text?.toLowerCase())
      )
    );
  }
  if (typeof text === "number") {
    return data?.filter((item: any) =>
      Object.keys(item).some((key) => item[key].includes(+text))
    );
  }
};

export function generateMonthlyData(
  userJoinedDate: string,
  transactions: Transaction[]
): MonthlyData[] {
  const result: MonthlyData[] = [];
  const startDate = new Date(userJoinedDate);
  const endDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert transactions to a more accessible format
  const dataByMonth: { [key: string]: Transaction[] } = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!dataByMonth[monthKey]) {
      dataByMonth[monthKey] = [];
    }
    dataByMonth[monthKey].push(transaction);
  });

  // Generate the result array
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const monthKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    if (dataByMonth.hasOwnProperty(monthKey)) {
      const monthName = `${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
      result.push({ month: monthName, data: dataByMonth[monthKey] });
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return result;
}
export function capitalizeAndRemoveUnderscore(text: string): string {
  // Remove underscores and capitalize the text
  return text
    .split("_") // Split the text by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the words back with spaces
}
export function convertToDateFormat(dateString: any): string {
  return moment(dateString, "MMMM DD, YYYY").format("YYYY-MM-DD");
}
