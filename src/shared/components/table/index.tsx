import React, { useState, useEffect, useMemo, JSX } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "../../hooks/helper/debounce";
import Image from "next/image";
import { TableHeader, TablePagination } from "@/core/types/interface/component/table";
import TableLoading from "../common/tableloading";
import Chip from "../chip";
import { ISelectableData } from "@/core/types/interface/component/select";
import Pagination from "../pagination";
import { SearchIcon } from "@/core/const/icons/icons";


interface TableProps<T = unknown> {
  headers: TableHeader<T>[];
  data: T[];
  action?: { text?: string; icon?: JSX.Element; avatar?: string }[];
  isOpen?: boolean;
  search?: boolean;
  checkboxAction?: (selected: T[]) => void;
  setIsOpen?: (x: T) => void;
  loading?: boolean;
  pagination?: TablePagination;
  clickable?: boolean;
  avatarField?: keyof T;
}

type Selectable<T> = T & ISelectableData;

export default function Table<T>(props: TableProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter();
  const { headers, data, loading, checkboxAction, pagination } = props;
  const [selectAll, setSelectAll] = useState(false);
  const [selectableData, setSelectableData] = useState<Selectable<T>[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // const [currentPage, setCurrentPage] = useState(pagination?.currentPage ?? 1);
  // const itemsPerPage = pagination?.pageSize ?? 10;
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState(pagination?.pageSize ?? 10);


  const debouncedSearchQuery = useDebounce(searchQuery, 500);


  const enableCheckbox = !!checkboxAction;

  const handleCheckboxCallback = () => {
    if (checkboxAction) checkboxAction(selectableData.filter((item) => item.selected));
  };

  useEffect(() => {
    handleCheckboxCallback();
  }, [selectAll]);

  useEffect(() => {
    if (data) setSelectableData(data?.map((item, index) => ({ ...item, selected: false, originalIndex: index })));
  }, [data]);

  useEffect(() => {
    if (currentPage != 1) setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectableData(data.map((item) => ({ ...item, selected: !selectAll })));
  };

  const handleRowCheckboxChange = (row: Selectable<T>) => {
    const selected = selectableData[row.originalIndex ?? -1];
    if (!selected) return;
    selected.selected = !selected.selected;
    setSelectableData([...selectableData]);
    handleCheckboxCallback();
  };

  // Handle Sorting
  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };
 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const toggleSearch = () => {
    setIsExpanded(!isExpanded)
  }


  // function filterData(data: Selectable<T>[], searchQuery: string): Selectable<T>[] {
  //   return data?.filter((item) =>
  //     Object.values(item as Record<keyof T, T>).some((val) =>
  //       String(val).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  //     )
  //   );
  // }
  function filterData(data: Selectable<T>[], searchQuery: string): Selectable<T>[] {
    return data?.filter((item) =>
      Object.values(item as Record<keyof T, T>).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }


  function sortData(data: Selectable<T>[], sortColumn: string): Selectable<T>[] {
    return data?.sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const filteredData = useMemo(() => filterData(selectableData, debouncedSearchQuery), [selectableData, debouncedSearchQuery]);
  const sortedData = useMemo(() => sortData(filteredData, sortColumn ?? ""), [filteredData, sortColumn, sortOrder]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (page: number, size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1); 
  };

  const handleRedirect = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, userId?: string) => {
    e.preventDefault();
    //  console.log("Navigating to ID:", userId);
    router.push(`/admin/users/${userId}`);
  };

  return (
    <section className="">
      <div className="justify-center 2xl:p-10 2xl:pt-10 ">
        <div className="shadow-md overflow-x-auto bg-white pt-[22px] pl-[25px] ">
        <div className=" flex items-center">
      <div className={` relative flex items-center transition-all duration-300 ${isExpanded ? 'w-60' : 'w-10'}`}>
      <SearchIcon
       onClick={toggleSearch}
       className="text-gray-400 mr-2 absolute top-3 2xl:top-7 left-3 2xl:left-10" />
        <input
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={handleSearch}
          className={`border border-gray-300 text-sm focus:outline-none
               text-gray-600 rounded-xl pl-10 py-2 2xl:px-14 2xl:py-6 w-full
                transition-all duration-300 
                 ${isExpanded ? 'opacity-100' : 'opacity-[1]'}
                `}
        />
      </div>
      <div className="ml-4 2xl:ml-24 flex items-center">
        <span className="text-gray-500 text-sm">Filter by</span>
        <span className="text-orange-500 text-sm ml-2 cursor-pointer">dates</span>
        <span className="text-gray-300 text-sm mx-2">|</span>
        <span className="text-orange-500 text-sm cursor-pointer">Status</span>
      </div>
    </div>
          <table className="w-full rounded-full mt-[53px]">
            <thead className="bg-gray-50 ">
              <tr className="relative">
                {headers.map((header, index) => (
                  <th
                    key={`table_header_index_${header.title}`}
                    scope="col"
                    className="px-5 py-3 text-left md:text-[0.65rem]
                     2xl:text-[1rem]  lg:text-[1rem] font-medium text-[#344054] 
                     uppercase cursor-pointer min-w-[8rem] "
                    onClick={() => header.sortable && handleSort(header.field)}
                  >
                    <section className="flex space-x-1">
                      {index == 0 && enableCheckbox ? (
                        <input
                          onClick={(e) => e.stopPropagation()}
                          type="checkbox"
                          className="mr-2"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      ) : null}
                      <p>{header.title}</p>
                      {sortColumn === header.field ? (
                        sortOrder === "asc" ? (
                          <span>&#9650;</span> // Up arrow
                        ) : (
                          <span>&#9660;</span> // Down arrow
                        )
                      ) : null}
                    </section>
                  </th>
                ))}
                {/* <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th> */}
              </tr>
            </thead>
            {loading ? (
              <TableLoading headers={headers} />
            ) : (
              <tbody className="bg-white border-gray-50 ">
                {currentItems?.map((row) => (
                  <tr
                    key={`table_row_index_${row.id}`}
                    onClick={(e) => props.clickable && handleRedirect(e, row.id)}
                    className={`relative ${props.clickable ? "cursor-pointer" : ""}
                     border border-[#E4E4E4] my-10`}
                  >
                    {headers.map((header, index) => (
                      <td key={header.field} className="px-3 py-3
                      whitespace-nowrap
                       text-xs 
                       lg:text-[0.75rem]
                       2xl:text-[1rem] 
                       2xl:py-10  text-gray-900">
                        <section className="flex space-x-1">
                          {index == 0 && enableCheckbox ? (
                            <input
                              type="checkbox"
                              className="mr-3"
                              // checked={selectedRows[indexOfFirstItem + rowIndex]}
                              checked={row.selected}
                              // onChange={() => handleRowCheckboxChange(indexOfFirstItem + rowIndex)}
                              onChange={() => handleRowCheckboxChange(row)}
                            />
                          ) : null}
                          {header.action?.component ? (
                            <div>
                              <header.action.component item={row} {...header.action.props} />
                            </div>
                          ) : header.component ? (
                            <header.component item={row} />
                          ) : (
                            <section className="flex items-center space-x-2"> {getDataComponent(header, row)}</section>
                          )}
                        </section>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {totalPages > 1 && (
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={itemsPerPage}
            onPageChange={handlePageChange} 
            onPageSizeChange={handlePageSizeChange}  
           
          />
          )}
      </div>
    </section>
  );
}

function getDataComponent<T>(header: TableHeader<T>, data: T) {
  let text = `${data[header.field as keyof typeof data] ?? header.default ?? ""}`;
  text = header.formatter ? header.formatter(text) : text;

  if (header.field === "teamMember") {
    const avatar = (data as { avatar?: string }).avatar;

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Conditionally render the Image only if avatar exists */}
        {avatar ? (
          <Image src={avatar} width={50} height={50} alt="Avatar" />
        ) : null}
        <span>{text}</span>
      </div>
    );
  }

  switch (header.type?.toLowerCase()) {
    case "chip":
      return <Chip text={text} />;
    default:
      return <div>{text}</div>;
  }
}



// function getDataComponent<T>(header: TableHeader<T>, data: T) {
//   let text = `${data[header.field as keyof typeof data] ?? header.default ?? ""}`;
//   text = header.formatter ? header.formatter(text) : text;

//   switch (header.type?.toLowerCase()) {
//     case "chip":
//       return <Chip text={text} />;
//     // case "success":
//     //   return <div className="text-success">{`+${text}`}</div>;
//     // case "error":
//     //   return <div className="text-error">{`-${text}`}</div>;
//     default:
//       return <div> {text} </div>;
//   }
// }
