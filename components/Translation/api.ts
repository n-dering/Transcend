import axios from "axios";

export const getTranslations = async () =>
	await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translations/`).then(async (e) => await e.json());

export const saveTranslations = async (data: any) =>
	await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/translations`, { data });
