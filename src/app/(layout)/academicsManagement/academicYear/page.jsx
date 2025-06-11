'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  IconEdit,
  IconPlus,
  IconTrash,
  IconSearch,
  IconCaretDownFilled,
  IconCaretUpFilled
} from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { closeModal, openModal } from '@/Redux/features/utils/modalSlice';
import { getAcademicYearPaginationRequest } from '@/Redux/features/academicYear/academicYearSlice';
import Breadcrumb from '@/components/common/Breadcrumb';
import WelcomeHeader from '@/components/common/WelcomeHeader';
import AcademicYearCreate from './_components/AcademicYearCreate';
import AcademicYearEdit from './_components/AcademicYearEdit';
import CustomPagination from '@/components/common/CustomPagination';
import useDebounce from '@/components/utils/useDebounce';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import { Empty } from 'antd';

const AcademicYearListPage = () => {
  // Constants
  const breadcrumbItem = useMemo(() => [{ name: "Academic Years" }], []);
  const initialPagination = useMemo(() => ({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    totalElements: 0,
  }), []);

  // Redux state
  const dispatch = useDispatch();
  const { academicYearDataPagination, loading, error } = useSelector((state) => state.academicYear);
  const { token } = useSelector((state) => state.auth);
  const { modals } = useSelector((state) => state.modal);

  // Derived modal states
  const isCreateModalOpen = useMemo(() => modals.createAcademicYear.isOpen, [modals.createAcademicYear.isOpen]);
  const isEditModalOpen = useMemo(() => modals.editAcademicYear.isOpen, [modals.editAcademicYear.isOpen]);

  // Component state
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState("id");
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedItem, setSelectedItem] = useState(null);

  // Memoized modal handlers
  const modalHandlers = useMemo(() => ({
    create: {
      open: () => {
        dispatch(openModal({ modalType: "createAcademicYear" }));
        dispatch(closeModal({ modalType: "editAcademicYear" }));
      },
      close: () => dispatch(closeModal({ modalType: "createAcademicYear" }))
    },
    edit: {
      open: (item) => {
        dispatch(openModal({ modalType: "editAcademicYear" }));
        dispatch(closeModal({ modalType: "createAcademicYear" }));
        setSelectedItem(item);
      },
      close: () => dispatch(closeModal({ modalType: "editAcademicYear" }))
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

  // Effect for data update
  useEffect(() => {
    if (academicYearDataPagination?.data) {
      const { content, pageable, totalPages, totalElements } = academicYearDataPagination?.data;
      setData(content || []);
      setPagination(prev => ({
        ...prev,
        page: pageable?.pageNumber || 0,
        rowsPerPage: pageable?.pageSize || prev.rowsPerPage,
        totalPages: totalPages || 0,
        totalElements: totalElements || 0
      }));
    }
  }, [academicYearDataPagination]);

  // Effect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        size: pagination.rowsPerPage,
        sortBy: sortBy,
        ascending: isAscending,
        searchFilter: debouncedSearchText
      };
      try {
        dispatch(getAcademicYearPaginationRequest({ data: params, token }));
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
    sortBy,
    debouncedSearchText,
    dispatch,
    token
  ]);

  // Handle API errors
  // useEffect(() => {
  //   if (!error) return;
  //   if (Array.isArray(error.error)) {
  //     toast.error('Error Fetching Data', { position: "top-right", duration: 2000, });
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
            className="flex gap-1 btn btn-light-primary w-full md:w-auto shadow-lg"
          >
            <IconPlus />
            <span className="block">Create Academic Year</span>
          </button>
        </div>
        <div className="md:hidden h-4"></div>
        <WelcomeHeader />
      </div>
      {isCreateModalOpen && (
        <AcademicYearCreate
          openModal={modalHandlers.create.open}
          closeModal={modalHandlers.create.close}
        />
      )}

      {isEditModalOpen && (
        <AcademicYearEdit
          openModal={modalHandlers.edit.open}
          closeModal={modalHandlers.edit.close}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
      {!isCreateModalOpen && !isEditModalOpen && (
        <>
          <div className="pt-6 md:pt-7 px-5 sm:px-6 md:px-0 bg-card-color border rounded-xl shadow-xl">
            {/* Header Section */}
            <div className="flex flex-col px-5 md:mx-6 md:flex-row justify-between items-start md:items-center">
              <h5 className="text-lg sm:text-xl font-medium">
                Academic Years Listing
              </h5>
              {/* Search Input */}
              <div className='w-full md:w-auto card bg-card-color rounded-xl form-control flex'>
                <input
                  type="text"
                  id="team_board_search"
                  className="form-input !rounded-e-none !py-[10px]"
                  placeholder="Search academics..."
                  value={searchText}
                  onChange={handleSearch}
                />
                <button className="btn border border-border-color !rounded-s-none">
                  <IconSearch className='w-[20px] h-[20px]' />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className={`my-6 md:my-8 px-2 sm:px-4 md:px-10 h-fit md:h-max ${loading ? '' : 'overflow-auto cus-scrollbar'}`}>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="rounded-xl overflow-hidden border border-primary-10 shadow-sm">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead className='bg-primary-10'>
                      <tr>
                        <th className="py-3 px-2 md:px-4 border-b border-r border-primary-10 first:rounded-tl-lg">
                          <div className="flex justify-center items-center gap-1">
                            SL
                            {sortBy ? (
                              <IconCaretDownFilled
                                onChange={() => setSortBy(sortBy === "id" ? "name" : "id")}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            ) : (
                              <IconCaretUpFilled
                                onChange={() => setSortBy(sortBy === "name" ? "id" : "name")}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            )}
                          </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 border-b border-r border-primary-10">
                          <div className="flex justify-center items-center gap-1">
                            Name
                            {isAscending ? (
                              <IconCaretDownFilled
                                onClick={() => setIsAscending(false)}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            ) : (
                              <IconCaretUpFilled
                                onClick={() => setIsAscending(true)}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            )}
                          </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 border-b border-r border-primary-10">
                          <div className="flex justify-center items-center gap-1">
                            Start Date
                            {isAscending ? (
                              <IconCaretDownFilled
                                onClick={() => setIsAscending(false)}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            ) : (
                              <IconCaretUpFilled
                                onClick={() => setIsAscending(true)}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            )}
                          </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 border-b border-r border-primary-10">
                          <div className="flex justify-center items-center gap-1">
                            End Date
                            {isAscending ? (
                              <IconCaretDownFilled
                                onClick={() => setIsAscending(false)}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            ) : (
                              <IconCaretUpFilled
                                onClick={() => setIsAscending(true)}
                                className="cursor-pointer w-3 h-3 text-primary hover:text-primary-10"
                              />
                            )}
                          </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 border-b border-r border-primary-10">
                          <div className="flex justify-center items-center gap-1">
                            Status
                          </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 border-b border-primary-10 last:rounded-tr-lg">
                          <div className="flex justify-center items-center gap-1">
                            Actions
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary-10">
                      {data && data?.length > 0 ? (
                        data?.map((item, index) => (
                          <tr key={index} className="hover:bg-primary-10 transition-colors">
                            <td className="py-4 px-2 md:px-4 text-center border-r">{index + 1}</td>
                            <td className="py-4 px-2 md:px-4 text-center border-r">{item?.academicYearName || "N/A"}</td>
                            <td className="py-4 px-2 md:px-4 text-center border-r">{item?.startDate || "N/A"}</td>
                            <td className="py-4 px-2 md:px-4 text-center border-r">{item?.endDate || "N/A"}</td>
                            <td className="py-4 px-2 md:px-4 text-center border-r">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {item ? (item?.isActive ? "Active" : "Inactive") : "N/A"}
                              </span>
                            </td>
                            <td className="py-4 px-2 md:px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  className="p-2 btn btn-light-primary rounded-md transition-colors"
                                  onClick={() => modalHandlers.edit.open(item)}
                                >
                                  <IconEdit className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-8 px-2 md:px-4">
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description="No Academic Years Found"
                              className="flex flex-col items-center justify-center"
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
        </>
      )}
    </>
  );
}

export default AcademicYearListPage;