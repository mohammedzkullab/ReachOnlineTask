import { useEffect, useState } from "react";
import Search from "./Search";
import { Card, Dropdown, Skeleton, Switcher } from "components";
import useFetch from "hooks/useFetch";
import useAuth from "hooks/useAuth";
import { TableProps } from "components/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { deleteItem } from "./utils/deleteItem";

const SORT_ASC = "asc";
const SORT_DESC = "desc";

export const Table = ({
  columns,
  fetchUrl,
  withoutSearch = false,
  className = "",
}: TableProps) => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [isMutate, setisMutate] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [sortColumn, setSortColumn] = useState(columns[2]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const auth = useAuth();
  const { loading, error, fetchData } = useFetch(
    `${fetchUrl}?${search && `search=${search}&`}per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    },
    (data) => {
      setData(data.data);
    }
  );

  useEffect(() => {
    fetchData();
  }, [search, perPage, fetchUrl, isMutate]);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC);
    } else {
      setSortColumn(column);
      setSortOrder(SORT_ASC);
    }
  };

  const items = [
    {
      icon: <PencilIcon height={15} width={15} />,
      title: "Edit",
      action: () => console.log("clicked"),
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
    <div className="mt-8">
      {!withoutSearch && <Search setSearch={setSearch} />}
      <Card className={className}>
        <table className="w-full text-center">
          <thead className="bg-gray-light text-gray-dark mb-4">
            <tr>
              {columns.map((column: any) => {
                return (
                  <th
                    key={column}
                    onClick={(e) => handleSort(column)}
                    className="py-4"
                  >
                    <p className="inline-flex items-center gap-2 cursor-pointer">
                      {column.toUpperCase().replace("_", " ")}
                      {column === sortColumn ? (
                        <>{sortOrder === SORT_ASC && <span>^</span>}</>
                      ) : null}
                    </p>
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
                      <Switcher status={d.status} />
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
                      width={1020}
                      className="py-4 mt-4"
                      numberOfLoaders={7}
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="">
            <td>111</td>
            <td></td>
            <td></td>
            <td></td>
            <td>123</td>
          </tfoot>
        </table>
      </Card>
    </div>
  );
};

export default Table;
