export type Translations = {
	[lang: string]: TranslationObject[];
};

export type TranslationObject = {
	id: number;
	key: string;
	value: string;
	languageID: number;
};
