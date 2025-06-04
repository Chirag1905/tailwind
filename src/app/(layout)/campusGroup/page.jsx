'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { avatar1 } from '@/assets/images';
import {
  IconEdit,
  IconPlus,
  IconLogin2,
  IconSearch,
  IconFilter,
} from '@tabler/icons-react';
import Image from 'next/image';
import { closeModal, openModal } from '@/Redux/features/utils/modalSlice';
import { getCampusGroupPaginationRequest, getCampusGroupRequest } from '@/Redux/features/campusGroup/campusGroupSlice';
import Breadcrumb from '@/components/common/Breadcrumb';
import WelcomeHeader from '@/components/common/WelcomeHeader';
import CampusGroupCreate from './_components/CampusGroupCreate';
import CampusGroupEdit from './_components/CampusGroupEdit';
import CustomPagination from '@/components/common/CustomPagination';
import useDebounce from '@/components/utils/useDebounce';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import { sanitizeText } from '@/components/utils/sanitizeText';

const CampusGroup = () => {
  // Constants
  const breadcrumbItem = useMemo(() => [{ name: "Campus Group Management" }], []);
  const initialPagination = useMemo(() => ({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    totalElements: 0,
  }), []);

  // Redux state
  const dispatch = useDispatch();
  const { campusGroupPaginationData, loading, error } = useSelector((state) => state.campusGroup);
  const { token } = useSelector((state) => state.auth);
  const { modals } = useSelector((state) => state.modal);

  // Derived modal states
  const isCreateModalOpen = useMemo(() => modals.createCampusGroup.isOpen, [modals.createCampusGroup.isOpen]);
  const isEditModalOpen = useMemo(() => modals.editCampusGroup.isOpen, [modals.editCampusGroup.isOpen]);

  // Component state
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState("id");
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Memoized modal handlers
  const modalHandlers = useMemo(() => ({
    create: {
      open: () => {
        dispatch(openModal({ modalType: "createCampusGroup" }));
        dispatch(closeModal({ modalType: "editCampusGroup" }));
      },
      close: () => dispatch(closeModal({ modalType: "createCampusGroup" }))
    },
    edit: {
      open: (item) => {
        dispatch(openModal({ modalType: "editCampusGroup" }));
        dispatch(closeModal({ modalType: "createCampusGroup" }));
        setSelectedItem(item);
      },
      close: () => dispatch(closeModal({ modalType: "editCampusGroup" }))
    }
  }), [dispatch]);

  // Memoized pagination handlers
  const paginationHandlers = useMemo(() => ({
    handlePageChange: (event, value) => {
      setPagination(prev => ({ ...prev, page: value - 1 }));
    },
    handleRowsPerPageChange: (event) => {
      setPagination(prev => ({
        ...prev,
        page: 0,
        rowsPerPage: event.target.value
      }));
    }
  }), []);

  // Search handler
  const handleSearch = useCallback((e) => setSearchText(e.target.value), []);

  // Debounced search text
  const debouncedSearchText = useDebounce(searchText, 300);

  // Effect for body scroll lock
  useEffect(() => {
    const shouldLock = isCreateModalOpen || isEditModalOpen;
    document.body.classList.toggle("overflow-hidden", shouldLock);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isCreateModalOpen, isEditModalOpen]);

  // Effect for Get Data
  useEffect(() => {
    if (campusGroupPaginationData?.data) {
      const { content, pageable, totalPages, totalElements } = campusGroupPaginationData.data;
      setData(content || []);
      setPagination(prev => ({
        ...prev,
        page: pageable?.pageNumber || 0,
        rowsPerPage: pageable?.pageSize || prev.rowsPerPage,
        totalPages: totalPages || 0,
        totalElements: totalElements || 0
      }));
    }
  }, [campusGroupPaginationData]);

  // Effect for Post Data
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        size: pagination.rowsPerPage,
        sortBy: "id",
        ascending: isAscending,
        searchFilter: debouncedSearchText
      };

      try {
        dispatch(getCampusGroupPaginationRequest({ data: params, token }));
      } catch (error) {
        console.error("Error fetching campus group data:", error);
        toast.error("Failed to load campus group data");
      }
    };
    fetchData();
  }, [
    pagination.page,
    pagination.rowsPerPage,
    isAscending,
    debouncedSearchText,
    dispatch,
    token
  ]);

  // Handle API errors
  // useEffect(() => {
  //   if (!error) return;
  //   if (Array.isArray(error.error)) {
  //     console.error('Error Fetching Data', { position: "top-right", duration: 2000, });
  //   } else if (error.message) {
  //     toast.error(error.message, { position: "top-right", duration: 2000 });
  //   } else {
  //     toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
  //   }
  // }, [error]);

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
          <button
            onClick={modalHandlers.create.open}
            className="flex gap-1 btn btn-light-primary w-full md:w-auto shadow-sm"
          >
            <IconPlus />
            <span className="block">Create Campus Group</span>
          </button>
        </div>
        <div className="md:hidden h-4"></div>
        <WelcomeHeader />
      </div>

      {isCreateModalOpen && (
        <CampusGroupCreate
          openModal={modalHandlers.create.open}
          closeModal={modalHandlers.create.close}
        />
      )}

      {isEditModalOpen && (
        <CampusGroupEdit
          openModal={modalHandlers.edit.open}
          closeModal={modalHandlers.edit.close}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {!isCreateModalOpen && !isEditModalOpen && (
        <div className="pt-6 md:pt-5 px-5 sm:px-6 md:px-0 bg-card-color border rounded-xl shadow-xl">
          {/* Header Section */}
          <div className="flex flex-col md:mx-9 md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center w-full md:w-auto">
              <h5 className="text-lg sm:text-xl font-medium">
                Campus Group Listing
              </h5>
              {/* {isAscending ? (
                <IconCaretDownFilled
                  onClick={() => setIsAscending(false)}
                  className="cursor-pointer ml-2"
                />
              ) : (
                <IconCaretUpFilled
                  onClick={() => setIsAscending(true)}
                  className="cursor-pointer ml-2"
                />
              )} */}
            </div>

            <div className='flex items-center gap-2 md:gap-4 w-full md:w-auto'>
              {/* Search Input */}
              <div className='w-full md:w-auto card bg-card-color rounded-xl form-control flex'>
                <input
                  type="text"
                  id="team_board_search"
                  className="form-input !rounded-e-none !py-[6px]"
                  placeholder="Search Campus Group..."
                  value={sanitizeText(searchText || "")}
                  onChange={handleSearch}
                />
                <button className="btn border border-border-color !rounded-s-none">
                  <IconSearch className='w-[20px] h-[20px]' />
                </button>
              </div>

              {/* Filter Dropdown */}
              <div className="relative custom-dropdown-container">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded"
                >
                  <IconFilter className='w-[20px] h-[20px]' />
                  <span>Filter</span>
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 z-10 p-3 mt-2 w-[185px] bg-white border border-gray-300 rounded-xl shadow-xl">
                    {/* Notch (triangle) at the top-right */}
                    <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-300 z-0"></div>

                    <div className="relative z-10 form-check flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="sort-by-id"
                        className="form-check-input mr-2"
                        checked={sortBy === "id"}
                        onChange={() => setSortBy(sortBy === "id" ? "name" : "id")}
                      />
                      <label htmlFor="sort-by-id" className="text-primary">
                        {sortBy === "id" ? "Sort by ID" : "Sort by Name"}
                      </label>
                    </div>
                    <div className="relative z-10 form-check flex items-center border-t pt-1">
                      <input
                        type="checkbox"
                        id="sort-ascending"
                        className="form-check-input mr-2"
                        checked={isAscending}
                        onChange={() => setIsAscending(!isAscending)}
                      />
                      <label htmlFor="sort-ascending" className="text-primary">
                        {isAscending ? "Ascending Order" : "Descending Order"}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`my-6 md:my-[10px] px-2 sm:px-4 md:px-[30px] h-[60vh] md:h-[70vh] ${loading ? '' : 'overflow-auto cus-scrollbar'
              }`}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ul className="flex flex-col gap-4 md:gap-6 h-full">
                {data?.length > 0 ? (
                  data?.map((item, index) => (
                    <li
                      className="flex items-center justify-between gap-3 p-3 bg-white/10 rounded-xl shadow-md border"
                      key={`CampusGroup-${item.id || index}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Image
                          src={avatar1 || ""}
                          alt="CampusGroup profile"
                          className="rounded-md w-9 h-9 min-w-[36px] object-cover"
                        />
                        <h6 className="font-medium truncate">
                          {item?.campusGroupName || ""}
                        </h6>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          className="btn btn-light-primary px-3 py-1.5 text-sm"
                          onClick={() => modalHandlers.edit.open(item)}
                        >
                          <IconEdit className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                          <span className="hidden md:inline ml-1">Edit</span>
                        </button>
                        <button className="btn btn-light-danger px-3 py-1.5 text-sm">
                          <IconLogin2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                          <span className="hidden md:inline ml-1">Login</span>
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex items-center justify-center h-full text-gray-500">
                    No Campus Groups available
                  </li>
                )}
              </ul>
            )}
          </div>
          {/* Pagination */}
          {data?.length > 0 &&
            <div className="mt-6">
              <CustomPagination
                page={pagination.page}
                handleChange={paginationHandlers.handlePageChange}
                rowsPerPage={pagination.rowsPerPage}
                handleChangeRowsPerPage={paginationHandlers.handleRowsPerPageChange}
                totalPages={pagination.totalPages}
                totalElements={pagination?.totalElements}
              />
            </div>
          }
        </div>
      )}
    </>
  );
}

export default CampusGroup;