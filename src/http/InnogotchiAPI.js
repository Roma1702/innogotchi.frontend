import { $authHost, $host } from "./index";

export const fetchFilteredChunk = async (filter, number, size) => {
    const {data} = await $host.get(`api/Innogotchi/${filter}/${number}/${size}`)
    return data;
}

export const fetchChunk = async (number, size) => {
    const {data} = await $host.get(`api/Innogotchi/${number}/${size}`)
    return data;
}

export const getCount = async () => {
    const data = await $host.get("api/Innogotchi/count")
    return data;
}

export const fetchInnogotchi = async (name) => {
    const {data} = await $host.get("api/Innogotchi/"+ name)
    return data;
}

export const getInnogotchiState = async (name) => {
    const {data} = await $host.get("api/Innogotchi/state/"+ name)
    return data;
}

export const addInnogotchi = async (formData) => {
    await $host.post("api/Innogotchi", formData,
    {
        headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const updateInnogotchi = async (formData) => {
    await $host.put("api/Innogotchi", formData,
    {
        headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const feedInnogotchi = async (name) => {
    const data = await $host.put("api/Innogotchi/feed/" + name)
    return data
}

export const drinkInnogotchi = async (name) => {
    const data = await $host.put("api/Innogotchi/drink/" + name)
    return data
}

export const deleteInnogotchi = async (name) => {
    await $host.delete("api/Innogotchi/" + name)
}