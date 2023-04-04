import { useEffect, useState } from "react";
import Search from "./Search";
import { Button, Card, Dropdown, Modal, Skeleton, Switcher } from "components";
import useFetch from "hooks/useFetch";
import useAuth from "hooks/useAuth";
import { TableProps } from "components/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { deleteItem } from "./utils/deleteItem";
import { changeStatus } from "./utils/changeStatus";
import useModal from "hooks/useModal";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";

export const Table = ({
  columns,
  fetchUrl,
  withoutSearch = false,
  className = "",
}: TableProps) => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState("10");
  const [isMutate, setisMutate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [currentLang, setCurrentLang] = useState("en");
  const [search, setSearch] = useState("");
  const { isOpen, closeModal, openModal } = useModal();
  const {
    isOpen: isOpenEdit,
    closeModal: closeModalEdit,
    openModal: openModalEdit,
  } = useModal();
  const auth = useAuth();
  const { loading, error, fetchData } = useFetch(
    `${fetchUrl}?per_page=${perPage}${search && `&search=${search}`}`,
    {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
        "Accept-Language": currentLang,
      },
    },
    (data) => {
      setData(data.data);
      console.log(data.data);
    }
  );

  useEffect(() => {
    fetchData();
  }, [search, perPage, fetchUrl, isMutate]);

  const items = [
    {
      icon: <PencilIcon height={15} width={15} />,
      title: "Edit",
      action: (id: any) => {
        setSelectedId(id);
        console.log(selectedId);
        openModalEdit();
      },
    },
    {
      icon: <TrashIcon height={15} width={15} />,
      title: "Delete",
      action: (id: string | number) => {
        deleteItem(id, auth?.token, () => setisMutate((prev) => !prev));
      },
    },
  ];

  return (
    <div className="my-4">
      <h1 className="text-2xl font-semibold my-4">Products </h1>
      <div className="flex items-center justify-between w-full gap-3 mb-6">
        <Search setSearch={setSearch} />
        <Button
          onClick={openModal}
          className="bg-red-600 hover:bg-red-500 text-sm px-2 py-2 md:px-5 md:py-4 md:text-base "
        >
          Add Product
        </Button>

        <AddProductForm
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
          setisMutate={setisMutate}
        />
        {selectedId && (
          <EditProductForm
            id={selectedId}
            isOpen={isOpenEdit}
            closeModal={closeModalEdit}
            openModal={openModalEdit}
            setisMutate={setisMutate}
          />
        )}
      </div>

      <Card
        className={`sm:min-w-[600px] overflow-x-scroll md:overflow-auto ${className}`}
      >
        <table className="w-full text-center ">
          <thead className="bg-gray-light text-gray-dark mb-4">
            <tr>
              {columns.map((column: any) => {
                return (
                  <th key={column} className="p-4">
                    {column.toUpperCase().replace("_", " ")}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {!loading && data.length === 0 && (
              <tr>
                <td>No data found</td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td>{error?.message}</td>
              </tr>
            )}
            {!loading ? (
              data?.map((d: any, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-light hover:cursor-pointer"
                  >
                    <td className="py-4 text-gray-400 font-bold text-center flex items-center justify-center">
                      <img src={d.image} alt="" width={60} height={30} />
                    </td>
                    <td className="py-4 text-gray-400 font-bold text-center">
                      {d.name[currentLang]}
                    </td>
                    <td className="py-4 text-gray-400 font-bold text-center">
                      {d.sort_order}
                    </td>
                    <td className="py-4 text-gray-400 font-bold text-center">
                      <Switcher
                        id={d.id}
                        status={d.status}
                        action={() => changeStatus(d.id, d.status, auth.token)}
                      />
                    </td>
                    <td className="py-4 text-gray-400 font-bold text-center">
                      <Dropdown id={d.id} title="Actions" items={items} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="spinner-border" role="status">
                    <Skeleton
                      width={1320}
                      className="py-4 mt-4"
                      numberOfLoaders={7}
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="">
            <td>
              <select
                className="my-4 outline-none w-1/4 bg-gray-200 rounded p-4 py-2"
                onChange={(e) => setPerPage(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tfoot>
        </table>
      </Card>
    </div>
  );
};

export default Table;
