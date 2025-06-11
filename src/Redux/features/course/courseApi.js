import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH;
const ACADEMICS_API_PATH_URL = process.env.NEXT_PUBLIC_ACADEMICS_API_PATH;

export const getCourse = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/campuscourses`,
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

export const getCoursePagination = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/campuscoursepagination`,
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

export const getCourseFetch = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/fetchcampuscourse/${obj?.id}`,
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

export const postCourse = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/createcampuscourse`,
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

export const putCourse = async (obj) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/updatecampuscourse/${obj?.id}`,
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
