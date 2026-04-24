export const getDiseases = async () => {
    const res = await fetch("/api/diseases");
    const data = await res.json();
    return data.data;
};
