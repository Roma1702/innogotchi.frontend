import { $authHost, $host } from "./index";

export const fetchFarm = async () => {
    const {data} = await $host.get("api/Farm")
    return data;
}

export const fetchFriendFarms = async () => {
    const {data} = await $host.get("api/Farm/friendsFarms")
    return data
}

export const getFarmStatistic = async () => {
    const {data} = await $host.get("api/Farm/statistic")
    return data
}

export const getFarm = async (name) => {
    const {data} = await $host.get("api/Farm/" + name)
    return data
}

export const createFarm = async (data) => {
    await $host.post("api/Farm", data,
    {
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const updateFarm = async (data) => {
    debugger
    await $host.put("api/Farm", data,
    {
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const deleteFarm = async () => {
    await $host.delete("api/Farm")
}