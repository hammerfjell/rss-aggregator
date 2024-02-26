import axios from "axios";

const api = {
    addFeed: async (form) => {
        const { data } = await axios.post("/api/add-feed", form);
        return data;
    },
    getFeeds: async () => {
        const { data } = await axios.get("/api/feeds");
        return data;
    },
    getFeed: async (id) => {
        const { data } = await axios.get(`/api/feed/${id}`);
        return data;
    },
    deleteFeed: async (id) => {
        const { data } = await axios.delete(`/api/delete/${id}`);
        return data;
    },
    editFeed: async (id, form) => {
        const { data } = await axios.patch(`/api/edit-feed/${id}`, form);
        return data;
    }
}

export default api;