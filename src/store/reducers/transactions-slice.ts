"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
const initialState: any = {
  transactions: [],
  credit: [],
  debit: [],
  totalCreditAmount: 0,
  totalDebitAmount: 0,
  balance: 0,
  creditCount: 0,
  debitCount: 0,
  highestDebitCategory: "",
};
const transactionslice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    getTransactions: (state, action: PayloadAction<any>) => {
      state.transactions = action.payload;

      // Filter credit and debit transactions
      const credit = action.payload.filter(
        (item: any) => item.type === "credit"
      );
      const debit = action.payload.filter((item: any) => item.type === "debit");

      // Calculate total credit amount and count
      const totalCreditAmount = credit.reduce(
        (total: number, item: any) => total + item.amount,
        0
      );
      const creditCount = credit.length;

      // Calculate total debit amount and count
      const totalDebitAmount = debit.reduce(
        (total: number, item: any) => total + item.amount,
        0
      );
      const debitCount = debit.length;

      // Determine the highest amount category for debits
      const debitCategoryAmounts: Record<string, number> = {};
      debit.forEach((item: any) => {
        if (debitCategoryAmounts[item.category]) {
          debitCategoryAmounts[item.category] += item.amount;
        } else {
          debitCategoryAmounts[item.category] = item.amount;
        }
      });

      const highestDebitCategory = Object.keys(debitCategoryAmounts).reduce(
        (a, b) => (debitCategoryAmounts[a] > debitCategoryAmounts[b] ? a : b),
        ""
      );

      // Update state
      state.credit = credit;
      state.debit = debit;
      state.balance = totalCreditAmount - totalDebitAmount;
      state.totalCreditAmount = totalCreditAmount;
      state.totalDebitAmount = totalDebitAmount;
      state.creditCount = creditCount;
      state.debitCount = debitCount;
      state.highestDebitCategory = highestDebitCategory;
    },
    removeTransactions: (state) => {
      state.transactions = [];
      state.credit = [];
      state.debit = [];
      state.totalCreditAmount = 0;
      state.totalDebitAmount = 0;
      state.balance = 0;
      state.creditCount = 0;
      state.debitCount = 0;
      state.highestDebitCategory = "";
    },
  },
});
export const { getTransactions, removeTransactions } = transactionslice.actions;

export default transactionslice.reducer;
