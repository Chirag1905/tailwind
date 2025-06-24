'use client';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCoursePaginationRequest } from '@/Redux/features/course/courseSlice';
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconInfoCircle,
  IconChevronDown,
  IconChevronUp,
  IconCornerDownRight,
  IconForms,
  IconCertificate2,
  IconPencilPlus
} from '@tabler/icons-react';
import { closeModal, openModal } from '@/Redux/features/utils/modalSlice';
import Breadcrumb from '@/components/common/Breadcrumb';
import WelcomeHeader from '@/components/common/WelcomeHeader';
import CourseCreate from './_components/CourseCreate';
import CourseEdit from './_components/CourseEdit';
import CustomPagination from '@/components/common/CustomPagination';
import useDebounce from '@/components/utils/useDebounce';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import toast from 'react-hot-toast';
import BatchListPage from '../batch/page';
import { useRouter } from 'next/navigation';
import { Empty, Select, Skeleton } from 'antd';
import { getActiveAcademicYearRequest, setSelectedAcademicYear } from '@/Redux/features/academicYear/academicYearSlice';
import SingleCourseRegister from './registerCourse/_components/SingleCourseRegister';
import CreateForm from '../createForm/page';

const CourseListPage = () => {
  // Constants
  const router = useRouter();
  const breadcrumbItem = useMemo(() => [{ name: "Courses Management" }], []);
  const initialPagination = useMemo(() => ({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    totalElements: 0,
  }), []);

  // Redux state
  const dispatch = useDispatch();
  const { courseDataPagination, loading, error } = useSelector((state) => state.course);
  const { activeAcademicYearData } = useSelector((state) => state.academicYear);
  // console.log("🚀 ~ CourseListPage ~ activeAcademicYearData:", activeAcademicYearData)
  const selectedAcademicYear = useSelector(state => state.academicYear.selectedAcademicYear);
  const { token } = useSelector((state) => state.auth);
  const { modals } = useSelector((state) => state.modal);

  // Derived modal states
  const isCreateModalOpen = useMemo(() => modals.createCourse.isOpen, [modals.createCourse.isOpen]);
  const isEditModalOpen = useMemo(() => modals.editCourse.isOpen, [modals.editCourse.isOpen]);
  const isRegistrationCourseModalOpen = useMemo(() => modals.registrationCourse.isOpen, [modals.registrationCourse.isOpen]);
  const isFormTemplateModalOpen = useMemo(() => modals.selectApplicationFormTemplate.isOpen, [modals.selectApplicationFormTemplate.isOpen]);

  // Component state
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  const [academicYears, setAcademicYears] = useState();

  useEffect(() => {
    if (activeAcademicYearData) {
      setAcademicYears(activeAcademicYearData?.data || []);
    }
    // Optionally set the first academic year as default if none is selected
    if (activeAcademicYearData?.data?.length > 0 && !selectedAcademicYear) {
      dispatch(setSelectedAcademicYear(activeAcademicYearData.data[0].id));
    }
  }, [activeAcademicYearData, selectedAcademicYear, dispatch]);

  // Effect for data update
  useEffect(() => {
    if (token) {
      dispatch(getActiveAcademicYearRequest({ token }));
    }
  }, [dispatch, token]);

  const handleChange = (value) => {
    dispatch(setSelectedAcademicYear(value));
  };
  // Toggle accordion
  const toggleAccordion = (courseId) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  // Memoized modal handlers
  const modalHandlers = useMemo(() => ({
    create: {
      open: () => {
        dispatch(openModal({ modalType: "createCourse" }));
        dispatch(closeModal({ modalType: "editCourse" }));
        dispatch(closeModal({ modalType: "selectApplicationFormTemplate" }));
        dispatch(closeModal({ modalType: "registrationCourse" }));
      },
      close: () => dispatch(closeModal({ modalType: "createCourse" }))
    },
    edit: {
      open: (item) => {
        dispatch(openModal({ modalType: "editCourse" }));
        dispatch(closeModal({ modalType: "createCourse" }));
        dispatch(closeModal({ modalType: "selectApplicationFormTemplate" }));
        dispatch(closeModal({ modalType: "registrationCourse" }));
        setSelectedItem(item);
      },
      close: () => dispatch(closeModal({ modalType: "editCourse" }))
    },
    formTemplate: {
      open: () => {
        dispatch(openModal({ modalType: "selectApplicationFormTemplate" }));
        dispatch(closeModal({ modalType: "createCourse" }));
        dispatch(closeModal({ modalType: "editCourse" }));
        dispatch(closeModal({ modalType: "registrationCourse" }));
      },
      close: () => dispatch(closeModal({ modalType: "selectApplicationFormTemplate" }))
    },
    courseRegistration: {
      open: (item) => {
        dispatch(openModal({ modalType: "registrationCourse" }));
        dispatch(closeModal({ modalType: "createCourse" }));
        dispatch(closeModal({ modalType: "editCourse" }));
        dispatch(closeModal({ modalType: "selectApplicationFormTemplate" }));
        setSelectedItem(item);
      },
      close: () => dispatch(closeModal({ modalType: "registrationCourse" }))
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
    if (courseDataPagination?.data) {
      const { content, pageable, totalPages, totalElements } = courseDataPagination?.data;
      setData(content || []);
      setPagination(prev => ({
        ...prev,
        page: pageable?.pageNumber || 0,
        rowsPerPage: pageable?.pageSize || prev.rowsPerPage,
        totalPages: totalPages || 0,
        totalElements: totalElements || 0
      }));
    }
  }, [courseDataPagination]);

  // Effect for data fetching
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
        dispatch(getCoursePaginationRequest({ data: params, token }));
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
            className="flex gap-1 btn btn-light-primary w-full md:w-auto"
          >
            <IconPlus />
            <span className="block">Register New Course</span>
          </button>
        </div>
        <div className="md:hidden h-4"></div>
        <WelcomeHeader />
      </div>

      {isCreateModalOpen && (
        <CourseCreate
          openModal={modalHandlers.create.open}
          closeModal={modalHandlers.create.close}
        />
      )}

      {isEditModalOpen && (
        <CourseEdit
          openModal={modalHandlers.edit.open}
          closeModal={modalHandlers.edit.close}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {isRegistrationCourseModalOpen && (
        <SingleCourseRegister
          openModal={modalHandlers.courseRegistration.open}
          closeModal={modalHandlers.courseRegistration.close}
          courseData={selectedItem}
        // courseData={data}
        // selectedItem={selectedItem}
        // setSelectedItem={setSelectedItem}
        />
      )}

      {isFormTemplateModalOpen && (
        <CreateForm
          openModal={modalHandlers.formTemplate.open}
          closeModal={modalHandlers.formTemplate.close}
        // selectedItem={selectedItem}
        // setSelectedItem={setSelectedItem}
        />
      )}
      {!isCreateModalOpen && !isEditModalOpen && !isRegistrationCourseModalOpen && !isFormTemplateModalOpen && (
        <>
          <div className="pt-6 md:pt-7 px-5 sm:px-6 md:px-0 bg-card-color border rounded-xl shadow-xl">
            {/* Header Section */}
            <div className="flex flex-col px-5 md:mx-6 md:flex-row justify-between items-start md:items-center">
              <h5 className="text-lg sm:text-xl font-medium">
                Courses Listing
              </h5>
              {/* Search Input */}
              <div className='flex w-auto gap-3'>
                <div className='w-full bg-card-color rounded-xl form-control flex'>
                  <input
                    type="text"
                    id="team_board_search"
                    className="form-input !rounded-e-none !py-[6px]"
                    placeholder="Search Course..."
                    value={searchText}
                    onChange={handleSearch}
                  />
                  <button className="btn border border-border-color !rounded-s-none">
                    <IconSearch className='w-[20px] h-[20px]' />
                  </button>
                </div>
                <div className='flex w-1/2'>
                  <Select
                    value={selectedAcademicYear}
                    onChange={(value) => handleChange(value)}
                    className="w-full"
                    placeholder="Academic Year"
                    showSearch={true}
                    filterOption={(input, option) =>
                      (option?.children ?? '')
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    optionFilterProp="children"
                    suffixIcon={
                      <svg
                        className="w-5 h-5 mt-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    }
                  >
                    {academicYears?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.academicYearName}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className='flex w-full'>
                  <button
                    onClick={() => router.push("/academicsManagement/course/registerCourse")}
                    className="flex btn btn-light-primary w-full"
                  >
                    <IconPencilPlus />
                    <span className="block">Registration Course</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={`my-6 md:my-8 px-2 sm:px-4 md:px-10 h-fit md:h-max ${loading ? '' : 'overflow-auto cus-scrollbar'}`}>
              {loading ? (
                <div className="rounded-xl overflow-hidden border border-primary-10 shadow-sm overflow-x-auto cus-scrollbar">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead className='bg-primary-10'>
                      <tr>
                        {[...Array(5)].map((_, i) => (
                          <th key={`header-${i}`} className="py-3 px-2 md:px-4 border-b border-r border-primary-10 first:rounded-tl-lg last:rounded-tr-lg">
                            <Skeleton.Input
                              active
                              style={{ width: i === 0 ? 40 : 120, height: 24 }}
                              className="rounded-md mx-auto"
                            />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary-10">
                      {[...Array(5)].map((_, rowIndex) => (
                        <tr key={`row-${rowIndex}`} className="hover:bg-primary-10 transition-colors">
                          <td className="py-4 px-2 md:px-4 text-center border-r">
                            <Skeleton.Input active style={{ width: 30, height: 24 }} className="rounded-md mx-auto" />
                          </td>
                          <td className="py-4 px-2 md:px-4 text-center border-r">
                            <Skeleton.Input active style={{ width: 150, height: 24 }} className="rounded-md mx-auto" />
                          </td>
                          <td className="py-4 px-2 md:px-4 text-center border-r">
                            <Skeleton.Input active style={{ width: 100, height: 24 }} className="rounded-md mx-auto" />
                          </td>
                          <td className="py-4 px-2 md:px-4 text-center border-r">
                            <Skeleton.Button active style={{ width: 80, height: 32 }} className="rounded-full mx-auto" />
                          </td>
                          <td className="py-4 px-2 md:px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {[...Array(4)].map((_, btnIndex) => (
                                <Skeleton.Button
                                  key={`btn-${rowIndex}-${btnIndex}`}
                                  active
                                  style={{ width: 32, height: 32 }}
                                  className="rounded-md"
                                />
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden border border-primary-10 shadow-sm overflow-x-auto cus-scrollbar">
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
                            Course Name
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
                            Course Code
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
                            Course Status
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
                          <Fragment key={index}>
                            <tr key={index} className="hover:bg-primary-10 transition-colors">
                              <td className="py-4 px-2 md:px-4 text-center border-r">{index + 1}</td>
                              <td className="py-4 px-2 md:px-4 text-center border-r">{item?.campusCourseName || ""}</td>
                              <td className="py-4 px-2 md:px-4 text-center border-r">{item?.campusCourseCode || ""}</td>
                              <td className="py-4 px-2 md:px-4 text-center border-r">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                  {item ? (item?.isActive ? "Active" : "Inactive") : "N/A"}
                                </span>
                              </td>
                              <td className="py-4 px-2 md:px-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    className="btn btn-light-primary p-2"
                                    onClick={() => toggleAccordion(item.id)}
                                  >
                                    {expandedCourseId === item.id ? (
                                      <IconChevronUp className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                    ) : (
                                      <IconChevronDown className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                    )}
                                  </button>
                                  <button
                                    className="btn btn-light-primary p-2"
                                    onClick={() => modalHandlers.edit.open(item)}
                                  >
                                    <IconEdit className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                  </button>
                                  <button className="btn btn-light-primary p-2"
                                    onClick={() => modalHandlers.courseRegistration.open(item)}
                                  >
                                    <IconPencilPlus className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                  </button>
                                  <button className="btn btn-light-primary p-2"
                                    onClick={() => modalHandlers.formTemplate.open(item)}
                                  >
                                    <IconForms className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {expandedCourseId === item.id && (
                              <tr>
                                <td colSpan="5" className="py-4 px-6">
                                  <div className='flex items-center justify-between gap-5 relative group form-control'>
                                    <h4 className="text-base sm:text-lg my-3">Batches Listing for {item.campusCourseName}</h4>
                                  </div>
                                  <BatchListPage courseId={item?.id} />
                                </td>
                              </tr>
                            )}
                          </Fragment>
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

export default CourseListPage;