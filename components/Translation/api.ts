import axios from "axios";

export const getTranslations = async () => await axios.get(`${process.env.API_URL}/translations`);

export const saveTranslations = async (data: any) => await axios.post(`${process.env.API_URL}/translations`, { data });
