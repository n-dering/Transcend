import { Translations } from "@/app/page";
import React from "react";

type TranslationColumnsProps = {
	data: Translations;
	handleValueChange: (e: React.ChangeEvent<HTMLInputElement>, langKey: string, id: string) => void;
	translationKey: string;
};
export const TranslationColumns = React.memo(({ data, handleValueChange, translationKey }: TranslationColumnsProps) => {
	return Object.entries(data).map(([lang, singleLangArray]) => {
		const translationObj = singleLangArray.find((object) => object.key === translationKey);

		console.log(translationObj?.isTemporary);
		return (
			<td key={`${lang}-${translationKey}`} className="px-4 py-2 border border-gray-700">
				<textarea
					value={translationObj?.value || ""}
					onChange={(e) => handleValueChange(e, lang, translationKey)}
					className={`bg-transparent text-white border-b  resize-y ${
						!!translationObj?.isTemporary ? "border-red-600" : "border-gray-600"
					} focus:outline-none  w-full px-2 py-1`}
					placeholder="Enter translation"
					rows={1}
				/>
			</td>
		);
	});
});

TranslationColumns.displayName = "TranslationColumns";
