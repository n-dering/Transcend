"use client";
import React, { useState } from "react";
import { Button } from "../../components/Translation/Button";
import { TableHeader } from "../../components/Translation/TableHeader";
import { TranslationRows } from "../../components/Translation/TranslationRows";

export type Translations = {
	[lang: string]: TranslationObject[];
};

export type TranslationObject = {
	id: number;
	key: string;
	value: string;
	languageID: number;
};

const TranslationTable = ({ translations }: { translations: Translations }) => {
	const [data, setData] = useState(translations);

	// Handle changes in translation values
	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, langKey: string, id: number) => {
		const { value } = e.target;
		setData((prevData) => ({
			...prevData,
			[langKey]: prevData[langKey].map((translation) =>
				translation.id === id ? { ...translation, value } : translation
			),
		}));
	};

	const addNewTranslation = () => {
		const newKey = prompt("Enter new translation key:");
		if (!newKey) return;

		setData((prevData) => {
			const updatedData: Translations = {};
			for (const langKey in prevData) {
				updatedData[langKey] = [
					...prevData[langKey],
					{ id: Math.random(), key: newKey, value: "", languageID: Number(langKey) },
				];
			}
			return updatedData;
		});
	};

	const saveTranslations = () => {
		console.log("Saving translations:", data);
		alert("Translations saved! Check the console.");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black">
			<h2 className="text-white text-3xl mb-6">Translation Table</h2>
			<div className="w-full max-w-4xl">
				<table className="w-full text-center bg-gray-800 rounded-lg overflow-hidden shadow-lg">
					<TableHeader data={data} />
					<tbody>
						<TranslationRows data={data} handleValueChange={handleValueChange} />
					</tbody>
				</table>
			</div>
			<div className="mt-6 flex space-x-4">
				<Button onClick={addNewTranslation} className="bg-orange-600 hover:bg-orange-500">
					Add new translation
				</Button>
				<Button onClick={saveTranslations} className="bg-green-600 hover:bg-green-500">
					Save Translations
				</Button>
			</div>
		</div>
	);
};

const translations: Translations = {
	DE: [
		{ id: 2, key: "address", value: "Haus", languageID: 2 },
		{ id: 10, key: "fruit", value: "Apfel", languageID: 2 },
		{ id: 15, key: "animal", value: "Hund", languageID: 2 },
		{ id: 16, key: "color", value: "", languageID: 2 },
	],
	PL: [
		{ id: 1, key: "address", value: "Dom", languageID: 1 },
		{ id: 9, key: "fruit", value: "Jabłko", languageID: 1 },
		{ id: 14, key: "animal", value: "Pies", languageID: 1 },
		{ id: 16, key: "color", value: "Czerwony", languageID: 1 },
	],
};

const App = () => <TranslationTable translations={translations} />;

export default App;
