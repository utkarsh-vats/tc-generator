export interface InputGroupProps {
	label: string;
	value: string | number;
	onChange: (val: string) => void;
	placeholder?: string;
	type?: "text" | "number" | "date";
	required?: boolean;
	error?: string;
}

export function InputGroup(props: InputGroupProps) {
	return (
		<div className="flex flex-col">
			<label className="block text-sm font-medium text-slate-700 mb-1">
				{props.label}
				<span className="text-red-700">
					{props.required ? "*" : ""}
				</span>
			</label>
			<input
				className="w-full h-10 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				type={props.type || "text"}
				style={{ borderColor: props.error ? "#b91c1c" : undefined }}
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				placeholder={props.placeholder}
				required={props.required}
			/>
			{props.error && (
				<p className="mt-1 text-xs text-red-700">{props.error}</p>
			)}
		</div>
	);
}
