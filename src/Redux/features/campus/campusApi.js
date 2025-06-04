import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH;

export const getCampus = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/campus`,
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

export const getCampusPagination = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/campuspagination`,
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

export const getCampusFetch = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/fetchcampus/${obj?.id}`,
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

export const postCampus = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/createcampus`,
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

export const putCampus = async (obj) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/updatecampus/${obj?.id}`,
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