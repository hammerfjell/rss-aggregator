import axios from "axios";

const api = {
    addFeed: async (form) => {
        const { data } = await axios.post("/api/add-feed", form);
        return data;
    },
    getFeeds: async () => {
        const { data } = await axios.get("/api/get-feeds");
        return data;
    },
    getFullFeeds: async () => {
        const { data } = await axios.get("/api/get-full-feeds");
        return data;
    },
    getFeed: async (id) => {
        const { data } = await axios.get(`/api/get-feed/${id}`);
        return data;
    },
    deleteFeed: async (id) => {
        const { data } = await axios.delete(`/api/delete-feed/${id}`);
        return data;
    },
    editFeed: async (id, form) => {
        const { data } = await axios.patch(`/api/edit-feed/${id}`, form);
        return data;
    },
    getFeedNews: async (id) => {
        const { data } = await axios.get(`/api/get-feed-news/${id}`);
        return data;
    }
}

export default api;