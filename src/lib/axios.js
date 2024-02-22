import axios from "axios";

const api = {
    addFeed: async (form) => {
        const { data } = await axios.post("/api/add-feed", form);
        return data;
    }
}

export default api;