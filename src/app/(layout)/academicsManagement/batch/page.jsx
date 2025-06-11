'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBatchPaginationRequest } from '@/Redux/features/batch/batchSlice';
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconInfoCircle,
  IconCornerDownRightDouble,
  IconCornerDownRight
} from '@tabler/icons-react';
import { closeModal, openModal } from '@/Redux/features/utils/modalSlice';
import Breadcrumb from '@/components/common/Breadcrumb';
import WelcomeHeader from '@/components/common/WelcomeHeader';
import BatchCreate from './_components/BatchCreate';
import BatchEdit from './_components/BatchEdit';
import CustomPagination from '@/components/common/CustomPagination';
import useDebounce from '@/components/utils/useDebounce';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Empty } from 'antd';

const BatchListPage = (props) => {
  const router = useRouter();
  const { courseId } = props;
  const selectedAcademicYear = useSelector((state) => state.academicYear.selectedAcademicYear);
  console.log("Batch Listing Page", selectedAcademicYear)
  // Constants
  const breadcrumbItem = useMemo(() => [{ name: "Batches Management" }], []);
  const initialPagination = useMemo(() => ({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    totalElements: 0,
  }), []);

  // Redux state
  const dispatch = useDispatch();
  const { batchDataPagination, loading, error } = useSelector((state) => state.batch);
  const { token } = useSelector((state) => state.auth);
  const { modals } = useSelector((state) => state.modal);

  // Derived modal states
  const isCreateModalOpen = useMemo(() => modals.createBatch.isOpen, [modals.createBatch.isOpen]);
  const isEditModalOpen = useMemo(() => modals.editBatch.isOpen, [modals.editBatch.isOpen]);

  // Component state
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedItem, setSelectedItem] = useState(null);

  // Memoized modal handlers
  const modalHandlers = useMemo(() => ({
    create: {
      open: () => {
        dispatch(openModal({ modalType: "createBatch" }));
        dispatch(closeModal({ modalType: "editBatch" }));
      },
      close: () => dispatch(closeModal({ modalType: "createBatch" }))
    },
    edit: {
      open: (item) => {
        dispatch(openModal({ modalType: "editBatch" }));
        dispatch(closeModal({ modalType: "createBatch" }));
        setSelectedItem(item);
      },
      close: () => dispatch(closeModal({ modalType: "editBatch" }))
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
    if (batchDataPagination?.data) {
      const { content, pageable, totalPages, totalElements } = batchDataPagination?.data
      setData(content || []);
      setPagination(prev => ({
        ...prev,
        page: pageable?.pageNumber || 0,
        rowsPerPage: pageable?.pageSize || prev.rowsPerPage,
        totalPages: totalPages || 0,
        totalElements: totalElements || 0
      }));
    }
  }, [batchDataPagination]);

  // Effect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        size: pagination.rowsPerPage,
        sortBy: "id",
        ascending: isAscending,
        searchFilter: debouncedSearchText,
        // academicYearID: selectedAcademicYear,
        // courseID: courseId
      };
      try {
        dispatch(getBatchPaginationRequest({ data: params, token, selectedAcademicYear, courseId }));
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
    selectedAcademicYear,
    courseId,
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
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-2 md:gap-2 mb-4">
        <div className='w-full md:w-auto card bg-card-color rounded-xl form-control flex'>
          <input
            type="text"
            id="team_board_search"
            className="form-input !rounded-e-none !py-[6px]"
            placeholder="Search Batches..."
            value={searchText}
            onChange={handleSearch}
          />
          <button className="btn border border-border-color !rounded-s-none">
            <IconSearch className='w-[20px] h-[20px]' />
          </button>
        </div>
        <button
          onClick={modalHandlers.create.open}
          className="flex gap-1 btn btn-light-primary w-full md:w-auto"
        >
          <IconPlus />
          <span className="block">Register New Batch</span>
        </button>
      </div>
      {isCreateModalOpen && (
        <BatchCreate
          openModal={modalHandlers.create.open}
          closeModal={modalHandlers.create.close}
          courseId={courseId}
        />
      )}

      {isEditModalOpen && (
        <BatchEdit
          openModal={modalHandlers.edit.open}
          closeModal={modalHandlers.edit.close}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          courseId={courseId}
        />
      )}
      {!isCreateModalOpen && !isEditModalOpen && (
        <>
          {/* Header Section */}
          {/* <div className="flex flex-col md:mx-6 md:flex-row justify-between items-start md:items-center gap-4 mb-6"> */}
          {/* <h5 className="text-base sm:text-lg">
              Batches Listing
            </h5> */}
          {/* Search Input */}
          {/* <div className='w-full md:w-auto card bg-card-color rounded-xl form-control flex'>
              <input
                type="text"
                id="team_board_search"
                className="form-input !rounded-e-none !py-[6px]"
                placeholder="Search batches..."
                value={searchText}
                onChange={handleSearch}
              />
              <button className="btn border border-border-color !rounded-s-none">
                <IconSearch className='w-[20px] h-[20px]' />
              </button>
            </div> */}
          {/* </div> */}

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
                          {isAscending ? (
                            <IconCaretDownFilled onClick={() => setIsAscending(false)} className="cursor-pointer w-3 h-3" />
                          ) : (
                            <IconCaretUpFilled onClick={() => setIsAscending(true)} className="cursor-pointer w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="py-3 px-2 md:px-4 border-b border-r border-primary-10">
                        <div className="flex justify-center items-center gap-1">
                          Batch Name
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
                          Batch Status
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
                          <td className="py-4 px-2 md:px-4 text-center border-r">{item?.campusBatchName || ""}</td>
                          <td className="py-4 px-2 md:px-4 text-center border-r">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {item ? (item?.isActive ? "Active" : "Inactive") : "N/A"}
                            </span>
                          </td>
                          <td className="py-4 px-2 md:px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button className="btn btn-light-primary p-2"
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
                        <td colSpan="6" className="text-center py-4 px-2 md:px-4">
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No Courses Found"
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
            <CustomPagination
              page={pagination.page}
              handleChange={paginationHandlers.handlePageChange}
              rowsPerPage={pagination.rowsPerPage}
              handleChangeRowsPerPage={paginationHandlers.handleRowsPerPageChange}
              totalPages={pagination.totalPages}
              totalElements={pagination?.totalElements}
            />
          }
        </>
      )}
    </>
  );
}

export default BatchListPage;