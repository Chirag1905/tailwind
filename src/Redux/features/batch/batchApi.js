import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH;
const ACADEMICS_API_PATH_URL = process.env.NEXT_PUBLIC_ACADEMICS_API_PATH;

export const getBatch = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/campusbatch/${obj?.courseId}/${obj?.selectedAcademicYear}`,
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

export const getBatchPagination = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/campusbatchpagination/${obj?.courseId}/${obj?.selectedAcademicYear}`,
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

export const getBatchFetch = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/fetchcampusbatch/${obj?.id}`,
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

export const postBatch = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/createcampusbatch`,
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

export const putBatch = async (obj) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/updatecampusbatch/${obj?.id}`,
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
