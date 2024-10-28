import { Translations } from "@/app/page";
import { TranslationColumns } from "./TranslationColumns";

export const TranslationRows = ({
	data,
	handleValueChange,
}: {
	data: Translations;
	temporaryKeys: Translations;
	handleValueChange: (e: React.ChangeEvent<HTMLInputElement>, langKey: string, id: string) => void;
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
					<TranslationColumns data={data} translationKey={key} handleValueChange={handleValueChange} />
				</tr>
			))}
		</>
	);
};
