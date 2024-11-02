import { TranslationsByLanguage } from "@/app/page";

export const TableHeader = ({ data }: { data: TranslationsByLanguage }) => {
	return (
		<thead className="bg-gray-900">
			<tr>
				<th className="text-white px-4 py-2 border border-gray-700">Key</th>
				{Object?.keys(data).map((langKey) => (
					<th key={langKey} className="text-white px-4 py-2 border border-gray-700">
						{langKey.toUpperCase()}
					</th>
				))}
			</tr>
		</thead>
	);
};
