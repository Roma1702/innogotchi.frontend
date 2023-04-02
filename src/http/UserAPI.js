import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (formData) => {
    await $host.post('api/User/registration', formData,
        {
            headers: {
                'accept': '*/*',
                'Content-Type': 'multipart/form-data',
            }
        })
}

export const login = async (username, password) => {
    const requestBody = new URLSearchParams({
        client_id: 'Api',
        client_secret: 'client_secret',
        AllowedScopes: 'api',
        grant_type: 'password',
        username,
        password,
    }).toString();
    debugger
    const { data } = await $authHost.post('connect/token', requestBody,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    localStorage.setItem('token', data.access_token)
    return jwt_decode(data.access_token)
}

export const fetchUser = async () => {
    const { data } = await $host.get('api/User')
    return data
}

export const getUserByName = async (name) => {
    const { data } = await $host.get('api/User/' + name)
    return data
}

export const getUserById = async (id) => {
    const { data } = await $host.get('api/User/' + id)
    return data
}

export const updateUser = async (data) => {
    await $host.put('api/User', data,
        {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
}

export const updatePassword = async (data) => {
    await $host.put('api/User/changePassword', data,
        {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
}

export const deleteUser = async () => {
    await $host.delete('api/User')
}

export const getRequests = async () => {
    const {data} = await $host.get('api/User/requests')
    return data;
}

export const inviteUser = async (userName) => {
    await $host.post(`api/User/invite/${userName}`)
}

export const confirmRequest = async (userName) => {
    await $host.put(`api/User/confirm/${userName}`)
}

export const rejectRequest = async (userName) => {
    await $host.delete(`api/User/reject/${userName}`)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}