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