"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Translation/Button";
import { TableHeader } from "../../components/Translation/TableHeader";
import { TranslationRows } from "../../components/Translation/TranslationTable";
import { getTranslations } from "../../components/Translation/api";

export type Translations = {
	[lang: string]: TranslationObject[];
};

export type TranslationObject = {
	id: number;
	key: string;
	value: string;
};

const TranslationTable = () => {
	const [data, setData] = useState({});
	const [temporaryKeys, setTemporaryKeys] = useState({});

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

		saveTranslations({});
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
		alert("Translations saved! Check the console.");
	};

	useEffect(() => {
		const getInitialData = async () => {
			try {
				const resData = await getTranslations();

				setData(resData);
			} catch (e) {}
		};
		getInitialData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black">
			<h2 className="text-white text-3xl mb-6">Transcend </h2>
			<div className="w-full max-w-4xl">
				<table className="w-full text-center bg-gray-800 rounded-lg overflow-hidden shadow-lg">
					<TableHeader data={data} />
					<tbody>
						<TranslationRows data={data} temporaryKeys={temporaryKeys} handleValueChange={handleValueChange} />
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

const App = () => <TranslationTable />;

export default App;
