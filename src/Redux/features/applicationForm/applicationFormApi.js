import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH;
const ACADEMICS_API_PATH_URL = process.env.NEXT_PUBLIC_ACADEMICS_API_PATH;

export const getApplicationFormId = async (obj) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/studentapplicationtemplates`,
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

export const getApplicationFormTemplate = async (obj) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/fetchstudentapplicationtemplate/${obj?.selectedFormId}`,
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

export const getApplicationFormStatus = async (obj) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/fetchstudentapplicationtemplatestatus/${obj?.id}`,
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


export const postApplicationFormTemplate = async (obj) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/createstudentapplicationtemplate?templateName=${encodeURIComponent(obj?.templateName)}`,
            null,
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

export const postApplicationFormStatus = async (obj) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/createstudentapplicationtemplatestatus`,
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

export const postApplicationFormCustomSection = async (obj) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/createstudentapplicationtemplatecustomsection/${obj?.id}`,
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


export const putApplicationFormTemplate = async (obj) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/updatestudentapplicationtemplate/${obj?.id}`,
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

export const putApplicationFormStatus = async (obj) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/updatestudentapplicationtemplatestatus/${obj?.id}`,
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
