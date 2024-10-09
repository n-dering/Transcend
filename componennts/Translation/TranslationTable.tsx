"use client";
import React, { useState } from "react";
import TranslationRows from "./TranslationRow";
import { Translations } from "../../types";

interface TranslationTableProps {
	translations: Translations;
}

const TranslationTable: React.FC<TranslationTableProps> = ({ translations }) => {
	const [data, setData] = useState(translations);

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
					<thead className="bg-gray-900">
						<tr>
							<th className="text-white px-4 py-2 border border-gray-700">Key</th>
							{Object.keys(data).map((langKey) => (
								<th key={langKey} className="text-white px-4 py-2 border border-gray-700">
									{langKey.toUpperCase()}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<TranslationRows data={data} handleValueChange={handleValueChange} />
					</tbody>
				</table>
			</div>
			<div className="mt-6 flex space-x-4">
				<button
					onClick={addNewTranslation}
					className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 focus:outline-none shadow-md"
				>
					Add New Translation
				</button>
				<button
					onClick={saveTranslations}
					className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none shadow-md"
				>
					Save Translations
				</button>
			</div>
		</div>
	);
};

export default TranslationTable;
