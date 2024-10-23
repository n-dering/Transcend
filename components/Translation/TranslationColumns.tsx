import { Translations } from "@/app/page";
import React from "react";

type TranslationColumnsProps = {
	data: Translations;
	handleValueChange: (e: React.ChangeEvent<HTMLInputElement>, langKey: string, id: string) => void;
	translationKey: string;
	isTemporary?: boolean;
};
export const TranslationColumns = React.memo(
	({ data, handleValueChange, translationKey, isTemporary }: TranslationColumnsProps) => {
		return Object.entries(data).map(([lang, singleLangArray]) => {
			const translationObj = singleLangArray.find((object) => object.key === translationKey);

			return (
				<td key={`${lang}-${translationKey}`} className="px-4 py-2 border border-gray-700">
					<input
						type="text"
						value={translationObj?.value || ""}
						onChange={(e) => handleValueChange(e, lang, translationKey)}
						className={`bg-transparent text-white border-b ${
							isTemporary ? "border-red-600" : "border-gray-600"
						} focus:outline-none focus:border-white w-full px-2 py-1`}
						placeholder="Enter translation"
					/>
				</td>
			);
		});
	}
);

TranslationColumns.displayName = "TranslationColumns";
