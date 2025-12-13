import NodeCache from "node-cache";

const cache = new NodeCache();

export const setCache = (key, value) => {
    const data = cache.set(key, value, 120);
    return data;
}

export const getCache = (key) => {
    return cache.get(key)
}