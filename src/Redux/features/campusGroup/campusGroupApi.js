import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH;

export const getCampusGroup = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/campusgroups`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
        params: obj.data,
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const getCampusGroupPagination = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/campusgroupspagination`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
        params: obj.data,
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const getCampusGroupFetch = async (obj) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/fetchcampusgroup/${obj?.id}`,
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

export const postCampusGroup = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/createcampusgroup`,
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

export const putCampusGroup = async (obj) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${CAMPUS_API_PATH_URL}/updatecampusgroup/${obj?.id}`,
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