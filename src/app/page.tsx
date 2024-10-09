import React from "react";
import TranslationTable from "../../componennts/Translation/TranslationTable";
import { Translations } from "../../types";

const translations: Translations = {
	DE: [
		{ id: 2, key: "address", value: "Haus", languageID: 2 },
		{ id: 10, key: "fruit", value: "Apfel", languageID: 2 },
		{ id: 15, key: "animal", value: "Hund", languageID: 2 },
	],
	PL: [
		{ id: 1, key: "address", value: "Dom", languageID: 1 },
		{ id: 9, key: "fruit", value: "Jabłko", languageID: 1 },
		{ id: 14, key: "animal", value: "Pies", languageID: 1 },
		{ id: 16, key: "color", value: "Czerwony", languageID: 1 },
	],
};

const Page = () => {
	return <TranslationTable translations={translations} />;
};

export default Page;
