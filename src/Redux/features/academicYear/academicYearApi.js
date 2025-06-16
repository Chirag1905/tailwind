import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH;
const ACADEMICS_API_PATH_URL = process.env.NEXT_PUBLIC_ACADEMICS_API_PATH;

export const getActiveAcademicYear = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/currentacademicyears`,
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
export const getAcademicYear = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/academicyears`,
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

export const getAcademicYearPagination = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/academicyearpagination`,
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

export const getAcademicYearFetch = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/fetchacademicyear/${obj?.id}`,
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

export const postAcademicYear = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/createacademicyear`,
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

export const putAcademicYear = async (obj) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/updateacademicyear/${obj?.id}`,
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
