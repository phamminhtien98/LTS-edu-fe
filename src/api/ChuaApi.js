import axiosClient from "./axiosClient";

const ChuaApi = {
    getAllChua: () => {
        const url = "chuas";
        return axiosClient.get(url)
    },
    searchChua: (params) => {
        const url = "/chua/search";
        return axiosClient.get(url, { params })
    },
    timChuaTheoId: (id) => {
        const url = `/chua/${id}`;
        return axiosClient.get(url)
    },
    updateThongTin: (token, data) => {
        const url = "/auth/chua";
        return axiosClient.put(url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },
    themChua: (token, data) => {
        const url = "/auth/chua";
        return axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },
    delete: (token, data) => {
        const url = "/auth/chua";
        return axiosClient.delete(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
            data
        });
    },
}

export default ChuaApi;