import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers() {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
}

export async function fetchPosts() {
    const response = await axios.get(`${BASE_URL}/posts?_limit=10`);
    return response.data;
}
