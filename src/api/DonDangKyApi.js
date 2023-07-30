import axiosClient from "./axiosClient";

const DonDangKyApi = {
    taoDonDangKy: (token, data) => {
        const url = "/auth/dondangky";
        return axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },
}

export default DonDangKyApi;