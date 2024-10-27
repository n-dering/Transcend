"use client";
import React, { useCallback, useEffect, useState } from "react";
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
	const [data, setData] = useState({
		pl: [
			{ key: "greeting", value: "test.test", updated_at: "2024-10-20T12:26:04.285241Z" },
			{ key: "ab.ca.c", value: "tjfy", updated_at: "2024-10-20T12:26:16.365679Z" },
			{ key: "new_greeting", value: "Dzień dobryresdfgresdddd", updated_at: "2024-10-20T12:49:46.029978Z" },
			{ key: "new_farewell", value: "Do widzenia", updated_at: "2024-10-20T12:49:46.034114Z" },
		],
		de: [
			{ key: "new_greeting", value: "Guten Tag", updated_at: "2024-10-20T12:49:46.020569Z" },
			{ key: "new_farewell", value: "Tschüss", updated_at: "2024-10-20T12:49:46.024787Z" },
		],
	});
	const [temporaryKeys, setTemporaryKeys] = useState({});

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, langKey: string, id: number) => {
			console.log(langKey, id);
			const { value } = e.target;

			const x = {
				...data,
				[langKey]: data[langKey].map((translation) =>
					translation.key === id ? { ...translation, value } : translation
				),
			};
			setData(x);
		},
		[data]
	);

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

	const saveTranslations = () => {};

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
