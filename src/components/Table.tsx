import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import EmptyTable from "./EmptyTable";
import { customStyle } from "@/utils";

export const DataFilterTable = ({ column, data = [], pageSize = 20 }: any) => {
  createTheme("solarized", {
    striped: {
      default: "#4356e31a",
    },
  });

  const paginationComponentOptions = {
    noRowsPerPage: true,
    rowsPerPageText: "Showing",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
  };

  return (
    <div>
      <DataTable
        columns={column}
        data={data}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        responsive
        noDataComponent={<EmptyTable columns={column} />}
        paginationPerPage={pageSize}
        //@ts-ignore
        customStyles={customStyle}
      />
    </div>
  );
};
export default DataFilterTable;
