import axiosClient from "./axiosClient";

const PhatTuDaoTrangApi = {


    timPhatTuDaoTrangTheoDaoTrangId: (token, id) => {
        const url = `/auth/phattudaotrang/daotrang/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
    },
}

export default PhatTuDaoTrangApi;