import axiosClient from "./axiosClient";

const phatTuApi = {
    getByToken: (token) => {
        const url = "/phattujwt";
        return axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },

    searchPhatTu: (params) => {
        const url = "/phattu/search";
        return axiosClient.get(url, { params })
    },

    findAllPhatTu: () => {
        const url = "/phattus";
        return axiosClient.get(url)
    },

    timPhatTuTheoId: (id) => {
        const url = `/phattu/${id}`;
        return axiosClient.get(url)
    },

    updateThongTin: (token, data) => {
        const url = "/auth/phattu";
        return axiosClient.put(url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },

    delete: (token, data) => {
        const url = "/auth/phattu";
        return axiosClient.delete(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
            data
        });
    },

    login: (taiKhoan) => {
        const url = '/login';
        return axiosClient.post(url, taiKhoan)
    },

    register: (infor) => {
        const url = '/register';
        return axiosClient.post(url, infor)
    }
}

export default phatTuApi;