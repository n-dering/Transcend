"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../features/translations/Button";
import { TableHeader } from "../../features/translations/TableHeader";
import { TranslationRows } from "../../features/translations/TranslationTable";
import { api } from "../../features/translations/api";

export type LanguageCode = "pl" | "de";

export type TranslationsByLanguage = {
	[lang in LanguageCode]: TranslationEntry[];
};

export type TranslationEntry = {
	key: string;
	value: string;
	updated_at?: string;
	isTemporary?: boolean;
};

const TranslationTable = () => {
	const [translationsData, setTranslationData] = useState<TranslationsByLanguage>({
		pl: [
			{ key: "greeting", value: "Cześć", updated_at: "2024-10-20T12:26:04.285241Z" },
			{ key: "farewell", value: "Do widzenia", updated_at: "2024-10-20T12:26:16.365679Z" },
			{ key: "new_user", value: "Nowy użytkownik", updated_at: "2024-10-20T12:49:46.029978Z" },
			{ key: "welcome_message", value: "Witamy na naszej stronie!", updated_at: "2024-10-20T12:49:46.034114Z" },
			{ key: "thank_you", value: "Dziękuję", updated_at: "2024-10-20T12:50:30.123456Z" },
			{ key: "good_morning", value: "Dzień dobry", updated_at: "2024-10-20T12:51:00.654321Z" },
			{ key: "good_night", value: "Dobranoc", updated_at: "2024-10-20T12:52:10.789012Z" },
		],
		de: [
			{ key: "greeting", value: "Hallo", updated_at: "2024-10-20T12:26:04.285241Z" },
			{ key: "farewell", value: "Auf Wiedersehen", updated_at: "2024-10-20T12:26:16.365679Z" },
			{ key: "new_user", value: "Neuer Benutzer", updated_at: "2024-10-20T12:49:46.029978Z" },
			{ key: "welcome_message", value: "Willkommen auf unserer Website!", updated_at: "2024-10-20T12:49:46.034114Z" },
			{ key: "thank_you", value: "Danke", updated_at: "2024-10-20T12:50:30.123456Z" },
			{ key: "good_morning", value: "Guten Morgen", updated_at: "2024-10-20T12:51:00.654321Z" },
			{ key: "good_night", value: "Gute Nacht", updated_at: "2024-10-20T12:52:10.789012Z" },
		],
	});

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>, langKey: LanguageCode, key: string) => {
			const { value } = e.target;

			setTranslationData((prevData) => ({
				...prevData,
				[langKey]: prevData[langKey].map((translation) =>
					translation.key === key ? { ...translation, value, isTemporary: true } : translation
				),
			}));
		},
		[]
	);

	const addNewTranslation = () => {
		const newKey = prompt("Enter new translation key:");

		if (!newKey) return;

		setTranslationData((prevData) => {
			const updatedData: TranslationsByLanguage = {
				pl: [...prevData.pl, { key: newKey, value: "", isTemporary: true }],
				de: [...prevData.de, { key: newKey, value: "", isTemporary: true }],
			};
			return updatedData;
		});
	};

	const saveTranslations = async () => {
		//TODO: save only changed  translations
		try {
			api.saveTranslations(translationsData);
		} catch (error) {
			console.error("Failed to save translations:", error);
		}
	};

	useEffect(() => {
		const getInitialData = async () => {
			try {
				const resData = await api.getTranslations();
				setTranslationData(resData);
			} catch (e) {
				console.error(e);
			}
		};
		getInitialData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black">
			<h2 className="text-white text-3xl mb-6">Transcend</h2>
			<div className="w-full max-w-4xl">
				<table className="w-full text-center bg-gray-800 rounded-lg overflow-hidden shadow-lg">
					<TableHeader data={translationsData} />
					<tbody>
						<TranslationRows data={translationsData} handleValueChange={handleValueChange} />
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
