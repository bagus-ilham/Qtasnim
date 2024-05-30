import React, { useEffect, useState } from "react";
import TransactionsTable from "../components/Table";
import SidebarWithHeader from "../components/SiderbarHeader";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import apiUtils from "../utils/apiUtils";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    jumlahTerjual: "",
    tanggalTransaksi: "",
    barangId: "",
  });
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await apiUtils.get("/product");
      console.log("API Response:", response);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiUtils.post("/transaction", formData, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });
      onClose();
      setFormData({ jumlahTerjual: "", tanggalTransaksi: "", barangId: "" });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <SidebarWithHeader>
        <Button colorScheme="blue" onClick={onOpen}>
          Add Transaction
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Transaction</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <FormControl>
                  <FormLabel>Jumlah Terjual</FormLabel>
                  <Input
                    name="jumlahTerjual"
                    value={formData.jumlahTerjual}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Tanggal Transaksi</FormLabel>
                  <Input
                    name="tanggalTransaksi"
                    type="date"
                    value={formData.tanggalTransaksi}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Barang</FormLabel>
                  <Select
                    name="barangId"
                    value={formData.barangId}
                    onChange={handleInputChange}
                  >
                    {products &&
                      products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Add
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <TransactionsTable />
      </SidebarWithHeader>
    </>
  );
};

export default Home;
