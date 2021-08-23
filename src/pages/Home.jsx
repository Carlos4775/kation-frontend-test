import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import { LocationMarkerIcon, PlusIcon } from "@heroicons/react/outline";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import triangle from "../img/triangle.svg";
import SimpleMap from "../components/Map";
import useQuery from "../hooks/useQuery";
import SortIcon from "../components/SortIcon";

const Home = () => {
  const { slug = "addresses", page = 1 } = useParams();
  const [query, setQuery] = useQuery();
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [totalAddresses, setTotalAddresses] = useState(0);

  const [sortingField, sortingOrder] = (query.get("sort") || "").split(":");
  const filter = query.get("q") || "";

  //const baseUrl = "http://localhost:3000/";
  const baseUrl =
    "https://my-json-server.typicode.com/Carlos4775/address-data/";
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({});

  const [state, setState] = useState(false);

  const [isCreate, setIsCreate] = useState(false);
  const [isMap, setIsMap] = useState(false);

  const showModal = () => {
    setState(true);
  };

  const hideModal = () => {
    setState(false);
    setIsCreate(false);
    setIsMap(false);
  };

  const getAddress = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}addresses/${id}`);
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterBy = (fieldName) => () => {
    if (sortingField === fieldName) {
      setQuery({
        sort: `${fieldName}:${sortingOrder === "desc" ? "asc" : "desc"}`,
      });
      return;
    }
    setQuery({ sort: `${fieldName}:desc` });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          //`http://localhost:3000/addresses?q=${filter}&_page=${page}_limit=10&_sort=${sortingField}&_order=${sortingOrder}`
          `https://my-json-server.typicode.com/Carlos4775/address-data/addresses?q=${filter}&_page=${page}_limit=10&_sort=${sortingField}&_order=${sortingOrder}`
        );
        const totalCount = response.headers["x-total-count"];
        setTotalCount(totalCount);
        setAddresses(response.data);
        setTotalPages(Math.ceil(totalCount / 10));
        setTotalAddresses(response.data.length);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [sortingField, sortingOrder, page, filter]);

  return (
    <MainLayout>
      <div className="px-10 2xl:px-56">
        <div className="flex flex-col">
          <div className="">
            <div className="align-middle min-w-full">
              <div className="py-6 my-4">
                <h1 className="pb-5 text-xl font-semibold">
                  Consulta Cliente Domicilio
                </h1>
                <hr className="border-none text-gray bg-gray-100 h-2" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                <div className="py-3">
                  <p className="text-lg font-medium">Buscar: </p>
                </div>
                <div className="flex-grow sm:ml-5">
                  <SearchInput />
                </div>
                <div className="mt-5">
                  <Button
                    text="Nuevo Domicilio"
                    icon={<PlusIcon className="h-5 w-5 mr-4" />}
                    className="text-white hover:bg-blue-800"
                    onClick={async () => {
                      await setIsCreate(true);
                      showModal();
                    }}
                    style={{ backgroundColor: "#273F70" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 sm:overflow-x-auto">
            <Table className="w-full">
              <Thead style={{ backgroundColor: "#273F70" }}>
                <Tr>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block">...</span>
                  </Th>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-left text-xs md:text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block sm:block md:block lg:inline-block">
                      PERSONA NO.
                    </span>
                    <SortIcon
                      onClick={filterBy("personNumber")}
                      order={sortingField === "personNumber" && sortingOrder}
                      className="inline-block sm:block md:block"
                    />
                  </Th>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block sm:block md:block lg:inline-block">
                      TIPO DOMICILIO
                    </span>
                    <SortIcon
                      onClick={filterBy("addressType")}
                      order={sortingField === "addressType" && sortingOrder}
                      className="inline-block sm:block md:block"
                    />
                  </Th>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block sm:block md:block lg:inline-block">
                      CALLE
                    </span>
                    <SortIcon
                      onClick={filterBy("street")}
                      order={sortingField === "street" && sortingOrder}
                      className="inline-block sm:block md:block lg:inline-block"
                    />
                  </Th>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block sm:block md:block lg:inline-block">
                      NÚMERO
                    </span>
                    <SortIcon
                      onClick={filterBy("number")}
                      order={sortingField === "number" && sortingOrder}
                      className="inline-block sm:block md:block"
                    />
                  </Th>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block sm:block md:block lg:inline-block">
                      SECTOR
                    </span>
                    <SortIcon
                      onClick={filterBy("sector")}
                      order={sortingField === "sector" && sortingOrder}
                      className="inline-block sm:block md:block"
                    />
                  </Th>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block sm:block md:block lg:inline-block">
                      PROVINCIA
                    </span>
                    <SortIcon
                      onClick={filterBy("province")}
                      order={sortingField === "province" && sortingOrder}
                      className="inline-block sm:block md:block"
                    />
                  </Th>
                  <Th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider space-x-4"
                  >
                    <span className="inline-block sm:block md:block lg:inline-block">
                      ESTADO
                    </span>
                    <SortIcon
                      onClick={filterBy("status")}
                      order={sortingField === "status" && sortingOrder}
                      className="inline-block sm:block md:block"
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {addresses.map((address, idx) => (
                  <Tr
                    key={address.id}
                    className="border border-b mt-10"
                    onClick={async () => {
                      setIsMap(true);
                      await getAddress(address.id);
                      showModal();
                    }}
                  >
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <LocationMarkerIcon className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {address.personNumber}
                          </div>
                        </div>
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {address.addressType}
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {address.street}
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {address.number}
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {address.province}
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {address.sector}
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <span>{address.status ? "Activo" : "Inactivo"}</span>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
          <div className="pt-10">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              totalItems={totalAddresses}
              path={`/${slug}`}
              totalCount={totalCount}
            />
          </div>
        </div>
        <Modal
          title={`Ubicación | ${address.addressType}`}
          show={isMap && state}
          handleClose={hideModal}
          render={() => (
            <div>
              <div
                className="text-white p-4 text-sm"
                style={{ backgroundColor: "#3C8BFB" }}
              >
                {`${address.street} ${address.number}, ${address.sector}, ${address.province}`}
              </div>
              <div className="relative">
                <img
                  src={triangle}
                  alt=""
                  className="absolute -top-3 left-10 transform rotate-180"
                />

                <div
                  className="relative overflow-hidden w-full h-96"
                  style={{ paddingTop: "56.25%" }}
                >
                  <div className="absolute top-0 left-0 right-0 bottom-0 p-5 box-content h-auto">
                    <SimpleMap marker={{ lat: address.x, lng: address.y }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        />
        <Modal
          title="Insertar domicilio"
          show={isCreate && state}
          handleClose={hideModal}
          render={() => (
            <div className="w-full px-8">
              <form className="bg-white rounded pt-6 pb-8 mb-4">
                <div className="flex flex-col sm:flex-row">
                  <div className="mb-4 flex-auto pr-0 sm:pr-3 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="personaNumber"
                    >
                      No. persona
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                  <div className="mb-4 flex-auto pl-0 sm:pl-3">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="addressType"
                    >
                      Tipo domicilio
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="mb-4 flex-auto pr-0 sm:pr-3 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="sector"
                    >
                      Sector
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                  <div className="mb-4 flex-auto pl-0 sm:pl-3">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="province"
                    >
                      Provincia
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="street"
                  >
                    Calle
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="mb-4 flex-auto pr-0 sm:pr-3 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="number"
                    >
                      Número
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                  <div className="mb-4 flex-auto pl-0 sm:pl-3">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="status"
                    >
                      Estado
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="location"
                  >
                    Ubicación
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                </div>
                <div className="flex items-center">
                  <Button
                    text="Guardar"
                    className="text-white"
                    style={{ backgroundColor: "#273F70" }}
                  />
                  <Button
                    text="Limpiar"
                    className="text-black ml-5"
                    style={{ backgroundColor: "#DFDFDF" }}
                  />
                </div>
              </form>
            </div>
          )}
        />
      </div>
    </MainLayout>
  );
};

export default Home;
