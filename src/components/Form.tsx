import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Button,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { categories, creditCategory } from "@/utils";

const Form = ({ onClose, onSubmit, setData, data, isEdit, category }: any) => {
  console.log(data, "form");

  return (
    <ModalContent width={{ base: "80vw", md: "450px", lg: "450px" }}>
      <ModalHeader>
        {isEdit
          ? "Update Transaction"
          : `Add ${category === "all" ? "a" : category} transaction`}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody className="flex flex-col space-y-4">
        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            fontSize="14"
            textColor="#013220"
            className="font-semibold"
          >
            Name
          </FormLabel>
          <Input
            type="name"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </FormControl>
        {category === "all" ? (
          <FormControl isRequired>
            <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
              Transaction Type
            </FormLabel>
            <Select
              placeholder="Select type"
              value={data?.type}
              onChange={(e) => {
                setData({ ...data, type: e.target.value });
                if (e.target.value === "credit") {
                  setData({
                    ...data,
                    type: e.target.value,
                    category: "credit",
                  });
                }
              }}
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </Select>
          </FormControl>
        ) : null}

        <FormControl isRequired>
          <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
            Category
          </FormLabel>
          <Select
            placeholder="Select category"
            value={data?.category.trim()}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            {(data.type === "debit" ? categories : creditCategory)?.map(
              (category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              )
            )}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
            Amount
          </FormLabel>
          <NumberInput min={1} defaultValue={data.amount}>
            <NumberInputField
              placeholder="input amount"
              value={Number(data?.amount)}
              onChange={(e) =>
                setData({ ...data, amount: Number(e.target.value) })
              }
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
            Date
          </FormLabel>
          <Input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
            More Details
          </FormLabel>
          <Textarea
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            placeholder="Type here"
            size="sm"
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="red" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button type="submit" variant="ghost" onClick={onSubmit}>
          {isEdit ? "Edit" : "Add"}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default Form;
