import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import EmptyTable from "./EmptyTable";
import { customStyle } from "@/utils";
import { FaEllipsisVertical } from "react-icons/fa6";
import { formatNumberWithCommas } from "@/helpers";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import ActionMenu from "./ActionMenu";

export const DataFilterTable = ({
  data = [],
  pageSize = 20,
  setEditId,
  setIsEdit,
  onOpen,
  setData,
  editId,
  type = "outer",
}: any) => {
  createTheme("solarized", {
    striped: {
      default: "#4356e31a",
    },
  });
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const paginationComponentOptions = {
    noRowsPerPage: true,
    rowsPerPageText: "Showing",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
  };
  const columnAdmin = [
    {
      name: "S/N",
      selector: (row: { sn: any }) => <div>{row.sn}</div>,
      maxwidth: "70px",
      width: "70px",
    },

    {
      name: "Title",
      selector: (row: { name: any }) => <div>{row.name}</div>,
      maxwidth: "200px",
      width: "200px",
    },
    {
      name: "Date",
      selector: (row: { date: any }) => <div>{row.date}</div>,
      maxwidth: "150px",
    },

    {
      name: "Amount",
      selector: (row: { amount: any }) => (
        <div className="">{formatNumberWithCommas(row.amount)}</div>
      ),
      maxwidth: "120px",
    },
    {
      name: "Category",
      selector: (row: { category: any }) => (
        <div className="capitalize">{row.category}</div>
      ),
    },
    {
      name: "Type",
      selector: (row: { type: any }) => (
        <div
          style={{ color: row.type === "credit" ? "#006400" : "#ff6400" }}
          className="capitalize"
        >
          {row.type}
        </div>
      ),
      omit: type === "inner",
    },
    {
      name: "Actions",
      maxwidth: "100px",
      width: "100px",
      cell: (prop: any) => {
        return (
          <ActionMenu
            setIsEdit={setIsEdit}
            setEditId={setEditId}
            onOpen={onOpen}
            setData={setData}
            prop={prop}
            onSecondModalOpen={onSecondModalOpen}
          />
        );
      },
    },
  ];
  const formatData = data?.slice().map((item: any, index: any) => {
    return {
      sn: index + 1,
      name: `${item?.name} ` || "--",
      category: `${item?.category} ` || "--",
      date: moment(item.date).format("ll") || "--",
      amount: item.amount || "--",
      id: item.id || "0",
      type: item.type || "--",
      desc: item?.desc || "--",
    };
  });
  function ExpandedComponent({ data }: any) {
    const displayData = JSON.stringify(data, null, 2);
    console.log(data, JSON.stringify(data, null, 2));
    return (
      <div>
        <h2 className=" font-bold text-secondary my-4">Content </h2>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </div>
    );
  }
  const deleteTransaction = async () => {
    await deleteDoc(doc(db, "transactions", editId));
    onSecondModalClose();
  };
  return (
    <div className="z-1 pb-3">
      <AlertDialog
        //@ts-ignore
        leastDestructiveRef={cancelRef}
        isOpen={isSecondModalOpen}
        onClose={onSecondModalClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Transaction
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onSecondModalClose}>Cancel</Button>
              <Button colorScheme="red" onClick={deleteTransaction} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <DataTable
        //@ts-ignore
        columns={columnAdmin}
        data={formatData}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        responsive
        expandableRowsComponent={ExpandedComponent}
        noDataComponent={<EmptyTable columns={columnAdmin} />}
        paginationPerPage={pageSize}
        //@ts-ignore
        customStyles={customStyle}
        expandableRows
      />
    </div>
  );
};
export default DataFilterTable;
