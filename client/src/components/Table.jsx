import React, { useState, useEffect } from "react";
import {
  Flex,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import useCustomToast from "./Toast";
import apiUtils from "../utils/apiUtils";
import useDebounce from "../hooks/useDebounce";

const TransactionsTable = () => {
  const [data, setData] = useState([]);
  const showToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedValue = useDebounce(searchQuery, 1000);

  useEffect(() => {
    // console.log("masuk sini kali")
  }, [debouncedValue]);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dataFetch = async () => {
    try {
      const fetchedData = await apiUtils.get("/transaction", {
        search: searchQuery,
        sortBy,
        sortOrder,
        startDate,
        endDate,
      });
      setData(fetchedData);
    } catch (error) {
        console.log(error)
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditedItem(item);
    onOpen();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmed) {
      try {
        await apiUtils.delete(`/transaction/${id}`);
        showToast({
            title: "Transaction deleted",
            status: "success",
        });
        dataFetch();
      } catch (error) {
        showToast({
          title: error.code,
          description: error.message,
          status: "error",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await apiUtils.put(`/transaction/${selectedItem.id}`, editedItem);
      dataFetch();
      onClose();
      showToast({
        title: "Transaction updated",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: error.code,
        description: error.message,
        status: "error",
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    dataFetch();
  }, [debouncedValue, sortBy, sortOrder, startDate, endDate]);

  return (
    <Box overflowX="auto">
      <Flex mb={4}>
        <Input
          placeholder="Search by date"
          value={searchQuery}
          onChange={handleSearch}
          mr={2}
        />
        <Select value={sortBy} onChange={handleSortBy} mr={2}>
          <option value="name">Nama Barang</option>
          <option value="date">Tanggal Transaksi</option>
          <option value="quantity">Jumlah Terjual</option>
        </Select>
        <Select value={sortOrder} onChange={handleSortOrder} mr={2}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
        <Input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={handleStartDate}
          mr={2}
        />
        <Input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={handleEndDate}
        />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Jumlah Terjual</Th>
            <Th>Tanggal Transaksi</Th>
            <Th>Nama Barang</Th>
            <Th>Jenis Barang</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.jumlahTerjual}</Td>
              <Td>{item.tanggalTransaksi}</Td>
              <Td>{item.Product.name}</Td>
              <Td>{item.Product.ProductType.name}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  mr={2}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="jumlahTerjual">
              <FormLabel>Jumlah Terjual</FormLabel>
              <Input
                type="number"
                name="jumlahTerjual"
                value={editedItem.jumlahTerjual}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="tanggalTransaksi">
              <FormLabel>Tanggal Transaksi</FormLabel>
              <Input
                type="date"
                name="tanggalTransaksi"
                value={editedItem.tanggalTransaksi}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TransactionsTable;
