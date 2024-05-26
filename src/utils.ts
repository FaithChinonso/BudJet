import { formatNumberWithCommas } from "./helpers";

export const nav = [
  { id: 1, name: "Dashboard", route: "/dashboard" },
  { id: 2, name: "Expenses", route: "/expenses" },
  { id: 3, name: "Income", route: "/income" },
  { id: 4, name: "Budget", route: "/budget" },
];
export const dashboardDetails = [
  {
    id: 2,
    name: "Income",
    value: formatNumberWithCommas("650000"),
    color: "#ead1dc",
    textColor: "rgba(0,100,0,1)",
  },
  {
    id: 3,
    name: "Expenses",
    value: formatNumberWithCommas("150000"),
    color: "rgba(75,211,165,0.1)",
    textColor: "rgba(0,100,0,1)",
  },
  {
    id: 1,
    name: "Balance",
    value: formatNumberWithCommas("500000"),
    color: "#fff2cc",
    textColor: "rgba(0,100,0,1)",
  },

  {
    id: 4,
    name: "Count",
    value: "20",
    color: "#cfe2f3",
    textColor: "rgba(0,100,0,1)",
  },
  {
    id: 5,
    name: "Overdue",
    value: "20000",
    color: "#d9d2e9",
    textColor: "rgba(0,100,0,1)",
  },
];
export const customStyle = {
  rows: {
    style: {
      padding: "0px",
      fontWeight: 300,
      fontSize: 13,
      lineHeight: 17,
      letterSpacing: 0.4,
      color: "rgba(118, 118, 118, 1)",
      border: "none",
      "&:hover": {
        color: "#013220 !important",
        fontWeight: 500,
      },
    },
  },
  headCells: {
    style: {
      fontWeight: 500,
      fontSize: 15,
      color: "#013220",
      borderBottom: "1px solid #013220",

      textAlign: "center",
    },
  },

  pagination: {
    style: {
      margin: "0 auto",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
  head: {
    style: {
      backgroundColor: "#F8FFFC",
      textAlign: "center",
    },
  },
};
export const tableData = [
  {
    id: 1,
    title: "Salary",
    amount: "250000",
    budget: "",
    type: "credit",
    date: new Date(),
    desc: "Escape Technology paid me",
  },
  {
    id: 2,
    title: "Mummy",
    amount: "40000",
    budget: "Black Tax",
    type: "debit",
    date: new Date(),
    desc: "Sent money to mummy",
  },
  {
    id: 3,
    title: "Provision",
    amount: "34580",
    budget: "food",
    type: "debit",
    date: new Date(),
    desc: "Bought milk,milo and cocopops",
  },
  {
    id: 4,
    title: "Salary",
    amount: "250000",
    budget: "",
    type: "credit",
    date: new Date(),
    desc: "Codemania paid me",
  },
  {
    id: 5,
    title: "Salary",
    amount: "150000",
    budget: "",
    type: "credit",
    date: new Date(),
    desc: "Itranxit paid me",
  },
  {
    id: 6,
    title: "Saloon Maintainance",
    amount: "48000",
    budget: "personal maintainance",
    type: "debit",
    date: new Date(),
    desc: "Did my lashes, nails and pedicure",
  },
];

export const categories = [
  { label: "Food", value: "food" },
  { label: "Toiletries", value: "toiletries" },
  { label: "Hair care", value: "hair_care" },
  { label: "Transportation", value: "transportation" },
  { label: "Fuel", value: "fuel" },
  { label: "Laundry", value: "laundry" },
  { label: "Light", value: "light" },
  { label: "House Maintenance", value: "house_maintenance" },
  { label: "Outing/Hangout", value: "outing_hangout" },
  { label: "Pedicure/Manicure", value: "pedicure_manicure" },
  { label: "Beauty Maintenance", value: "beauty_maintenance" },
  { label: "Cloths", value: "cloths" },
  { label: "Shoes/Bags", value: "shoes_bags" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Junk", value: "junk" },
  { label: "Black Tax", value: "black_tax" },
  { label: "Gift", value: "gift" },
  { label: "Loan", value: "loan" },
  { label: "Debt", value: "debt" },
  { label: "Health", value: "health" },
  { label: "Internet", value: "internet" },
  { label: "Investment", value: "investment" },
  { label: "Offering/Tithe/Seed", value: "offering_tithe_seed" },
  { label: "Savings", value: "savings" },
  { label: "Monthly Contribution", value: "monthly_contribution" },
  { label: "Service Charge", value: "service_charge" },
];
export const creditCategory = [
  { label: "Salary", value: "salary" },
  { label: "Gift", value: "gift" },
  { label: "Loan", value: "loan" },
  { label: "Investment", value: "Investment" },
  { label: "Savings", value: "Savings" },
  { label: "Freelance", value: "freelance" },
];
export interface Transaction {
  date: string;
  id: number;
  name: string;
  amount: number;
  type: string;
  userId: string;
  desc: string;
  category: string;
}
export interface MonthlyData {
  month: string;
  data: Transaction[];
}
export const areaData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
