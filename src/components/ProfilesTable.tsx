import { FC, useMemo } from "react";
import {
  Column,
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { Profile } from "../types/types";

const ProfilesTable: FC<{
  data: Profile[];
  onRowClick: (row: Profile) => void;
}> = ({ data, onRowClick }) => {
  const columns: Column<Profile>[] = useMemo(
    () => [
      { Header: "Profile ID", accessor: "profileId" },
      { Header: "Country", accessor: "country" },
      { Header: "MarketPlace", accessor: "marketplace" },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
      <h1>Profiles</h1>
      <div className="mb-3 d-flex align-items-center w-25">
        <label htmlFor="search" className="me-2">
          Search:
        </label>
        <input
          type="text"
          id="search"
          className="form-control"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={i}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : "🔽"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => onRowClick(row.original)}
                key={i}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()} key={i}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3 align-items-center">
        <button
          className="btn btn-primary mx-2"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>{" "}
        <span className="mx-2 align-items-center"> Page {pageIndex + 1}</span>
        <button
          className="btn btn-primary"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>{" "}
      </div>
    </div>
  );
};

export default ProfilesTable;
