import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const signIn = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      obj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

const signOut = async () => {
  try {

  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const permanentPass = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/password/set-permanent`,
      obj.params,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

const forgotPass = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/password/forgot`,
      obj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

const resetPass = async (obj) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/password/reset`,
      obj.params,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get(`https://testmazingutils.s3.us-east-1.amazonaws.com/realm_client_mappings.json`);
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};
export { signIn, signOut, permanentPass, forgotPass, resetPass, fetchData };