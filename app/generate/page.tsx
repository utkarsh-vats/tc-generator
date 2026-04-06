"use client";
import { useState, useEffect } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { SelectGroup } from "@/components/ui/select-group";
import { getDefaults } from "@/lib/defaults";
import { saveSchoolInfo, loadSavedSchools, SavedSchools } from "@/lib/storage";
import {
	TCData,
	BOARDS,
	BoardType,
	CASTE_CATEGORIES,
	CasteCategoryType,
	GENDERS,
	GenderType,
	RESULTS,
	ResultType,
	PRINTED_PARENT,
	PrintedParentType,
} from "@/lib/types";

const GenerateTCPage = () => {
	return (
		<div className="flex bg-slate-50">
			<div className="text-black">Generate TC</div>
		</div>
	);
};

export default GenerateTCPage;
