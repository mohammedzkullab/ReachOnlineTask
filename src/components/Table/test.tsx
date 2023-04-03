import { useEffect, useState } from "react";
import Search from "./Search";
import { Card, Skeleton } from "components";
import useFetch from "hooks/useFetch";
import useAuth from "hooks/useAuth";
import { TableProps } from "components/types";

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
  const [currentLang, setCurrentLang] = useState("en");
  const [sortColumn, setSortColumn] = useState(columns[0]);
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
  }, [search, perPage, fetchUrl]);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC);
    } else {
      setSortColumn(column);
      setSortOrder(SORT_ASC);
    }
  };

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
                    onClick={() => console.log(d.id)}
                  >
                    {columns.map((column: any) => {
                      return (
                        <td key={column} className="py-4">
                          {column === "name" ? d.name[currentLang] : d[column]}
                          {column === "manufacturer" ? (
                            <img src={d.image} alt="" width={30} height={30} />
                          ) : (
                            d[column]
                          )}
                        </td>
                      );
                    })}
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
        </table>
      </Card>
    </div>
  );
};

export default Table;
