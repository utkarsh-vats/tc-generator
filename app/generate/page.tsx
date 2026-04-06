"use client";
import { use, useState } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { SelectGroup } from "@/components/ui/select-group";
import { getDefaults } from "@/lib/defaults";
import {
	TCData,
	BOARDS,
	CASTE_CATEGORIES,
	GENDERS,
	RESULTS,
	PRINTED_PARENT,
	BoardType,
	CasteCategoryType,
	GenderType,
	ResultType,
	PrintedParentType,
} from "@/lib/types";

const GenerateTCPage = () => {
	const [tcData, setTcData] = useState<TCData>(getDefaults());

	const updateSchool = (
		field: keyof TCData["school"],
		value: string,
	): void => {
		setTcData({
			...tcData,
			school: {
				...tcData.school,
				[field]: value,
			},
		});
	};

	return (
		<div className="flex">
			<div className="fle"></div>
		</div>
	);
};

export default GenerateTCPage;
