import axios from "axios";

export const axiosPostService = async (path, data) => {
    try {
        let response = await axios.post(
            `http://localhost:3000/api/v1/transBid`,
            data,
            {
                withCredentials: true
            }
        )

        return response.data.message
    }
    catch (err) {
        if (err.response) {
            return err.response.data.message
        }
        else {
            return err.message
        }
    }

}