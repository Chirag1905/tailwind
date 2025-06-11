import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCustomization = async (realmName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/utils/realmSettings/download`, {
            realmName
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (err) {
        console.log(err, "err");
        return err.response;
    }
};

export const postCustomization = async (obj) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload`,
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