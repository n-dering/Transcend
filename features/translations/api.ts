import { TranslationsByLanguage } from "@/app/page";
import axios from "axios";

export const api = {
	getTranslations: async () =>
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translations/`).then(async (e) => await e.json()),

	saveTranslations: async (data: TranslationsByLanguage) =>
		await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/translations`, { data }),
};
