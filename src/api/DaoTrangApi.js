import axiosClient from "./axiosClient";

const DaoTrangApi = {
    searchDaoTrang: (params) => {
        const url = "/daotrang/search";
        return axiosClient.get(url, { params })
    },

    timDaoTrangTheoId: (id) => {
        const url = `/daotrang/${id}`;
        return axiosClient.get(url)
    },

    themDaoTrang: (token, data) => {
        const url = "/auth/daotrang";
        return axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },
    updateThongTin: (token, data) => {
        const url = "/auth/daotrang";
        return axiosClient.put(url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },
    delete: (token, data) => {
        const url = "/auth/daotrang";
        return axiosClient.delete(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
            data
        });
    },
}

export default DaoTrangApi;