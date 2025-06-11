import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH;
const ACADEMICS_API_PATH_URL = process.env.NEXT_PUBLIC_ACADEMICS_API_PATH;

export const getCourseRegister = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/registrationcourses/${obj?.selectedAcademicYear}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj?.token}`,
        },
        params: obj?.data,
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const postCourseRegister = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/postregistrationcourses/${obj?.selectedAcademicYear}`,
      obj?.data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj?.token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

