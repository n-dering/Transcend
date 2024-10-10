import { Translations } from "@/app/page";

export const TranslationRows = ({
	data,
	handleValueChange,
}: {
	data: Translations;
	handleValueChange: (e: React.ChangeEvent<HTMLInputElement>, langKey: string, id: number) => void;
}) => {
	const allKeys = new Set<string>();
	Object.values(data).forEach((translations) => {
		translations.forEach(({ key }) => allKeys.add(key));
	});

	return (
		<>
			{Array.from(allKeys).map((key) => (
				<tr key={key} className="text-white">
					<td className="px-4 py-2 border border-gray-700">{key}</td>
					{Object.keys(data).map((langKey) => {
						const translation = data[langKey].find((t) => t.key === key) || {};
						console.log(translation);
						return (
							<td key={langKey} className="px-4 py-2 border border-gray-700">
								<input
									type="text"
									value={translation.value || ""}
									onChange={(e) => handleValueChange(e, langKey, translation.id)}
									className="bg-transparent text-white border-b border-gray-600 focus:outline-none focus:border-white w-full px-2 py-1"
									placeholder="Enter translation"
								/>
							</td>
						);
					})}
				</tr>
			))}
		</>
	);
};
