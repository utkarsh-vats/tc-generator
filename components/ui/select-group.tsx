// /components/ui/select-group.tsx

export interface SelectGroupProps {
	label: string;
	value: string | number;
	onChange: (val: string) => void;
	placeholder?: string;
	options: readonly string[];
	required?: boolean;
	error?: string;
}

export function SelectGroup(props: SelectGroupProps) {
	return (
		<div className="flex flex-col">
			<label className="block text-sm font-medium text-slate-700 mb-1">
				{props.label}
				<span className="text-red-700">
					{props.required ? "*" : ""}
				</span>
			</label>
			<select
				className="w-full h-10 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				style={{ borderColor: props.error ? "#b91c1c" : undefined }}
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				required={props.required}
			>
				<option value="" disabled>
					Select an option
				</option>
				{props.options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			{props.error && (
				<p className="mt-1 text-xs text-red-700">{props.error}</p>
			)}
		</div>
	);
}
