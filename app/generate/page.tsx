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
	const [tcData, setTcData] = useState<TCData>(getDefaults());
	const [savedSchools, setSavedSchools] = useState<SavedSchools>([]);
	const [showSchoolModal, setShowSchoolModal] = useState(false);

	useEffect(() => {
		const initializeDashboard = () => {
			const schools = loadSavedSchools() || [];
			setSavedSchools(schools);

			if (schools.length === 0) {
				setShowSchoolModal(true);
			} else {
				setTcData((prev) => ({ ...prev, school: schools[0] }));
			}
		};
		initializeDashboard();
	}, []);

	const updateSchool = (
		field: keyof TCData["school"],
		value: string | number | boolean,
	) => {
		setTcData((prev) => ({
			...prev,
			school: {
				...prev.school,
				[field]: value,
			},
		}));
	};

	const updateStudent = (
		field: keyof TCData["student"],
		value: string | number | boolean | null,
	) => {
		setTcData((prev) => ({
			...prev,
			student: {
				...prev.student,
				[field]: value,
			},
		}));
	};

	const updateCertificateMeta = (
		field: keyof TCData["meta"],
		value: string | number | boolean | null,
	) => {
		setTcData((prev) => ({
			...prev,
			meta: {
				...prev.meta,
				[field]: value,
			},
		}));
	};

	const handleSaveSchoolModal = () => {
		saveSchoolInfo(tcData.school);
		setSavedSchools(loadSavedSchools() || []);
		setShowSchoolModal(false);
	};

	return (
		<div className="min-h-screen flex bg-slate-50 relative">
			{/* Left Section */}
			<section className="w-5/12 h-screen bg-slate-50 overflow-y-auto border-r p-8 text-slate-800">
				<div className="flex">
					<h1>Generate TC</h1>
					<button onClick={() => setShowSchoolModal(true)}>
						⚙️ Edit School
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-slate-50 border rounded-xl">
						<select
							value={tcData.school.schoolID || ""}
							onChange={(e) => {
								const selected = savedSchools.find(
									(s) => s.schoolID === e.target.value,
								);
								if (selected)
									setTcData((prev) => ({
										...prev,
										school: selected,
									}));
							}}
						>
							<option value="" disabled>
								Select School
							</option>
							{savedSchools.map((school) => (
								<option
									key={school.schoolID}
									value={school.schoolID}
								>
									{school.schoolName}
								</option>
							))}
						</select>
					</div>
					<InputGroup
						label="Session"
						value={tcData.student.session || ""}
						onChange={(e) => updateStudent("session", e)}
					/>
				</div>
				<h2>School Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* <div className="md:col-span-2"></div> */}
					<InputGroup
						label="Student Name"
						value={tcData.student.studentName}
						onChange={(e) => updateStudent("studentName", e)}
						required={true}
					/>
					<InputGroup
						label="Father Name"
						value={tcData.student.fatherName}
						onChange={(e) => updateStudent("fatherName", e)}
						required={true}
					/>
					<InputGroup
						label="Mother Name"
						value={tcData.student.motherName}
						onChange={(e) => updateStudent("motherName", e)}
						required={true}
					/>
					<InputGroup
						label="Guardian Name"
						value={tcData.student.guardianName || ""}
						onChange={(e) => updateStudent("guardianName", e)}
						required={false}
					/>
					<InputGroup
						label="Date of Birth"
						value={tcData.student.dateOfBirth}
						onChange={(e) => updateStudent("dateOfBirth", e)}
						required={true}
						type="date"
					/>
					<SelectGroup
						label="Gender"
						value={tcData.student.gender || ""}
						onChange={(e) => updateStudent("gender", e)}
						required={true}
						options={GENDERS}
					/>
					<InputGroup
						label="Nationality"
						value={tcData.student.nationality}
						onChange={(e) => updateStudent("nationality", e)}
						required={true}
					/>
					<InputGroup
						label="Religion"
						value={tcData.student.religion}
						onChange={(e) => updateStudent("religion", e)}
						required={true}
					/>
					{/* Caste Category */}
					<div className="flex md:col-span-2 gap-4">
						<div className="w-1/2">
							<SelectGroup
								label="Caste Category"
								value={tcData.student.casteCategory}
								onChange={(e) =>
									updateStudent("casteCategory", e)
								}
								options={CASTE_CATEGORIES}
								required={true}
							/>
						</div>
						<div className="w-1/2">
							{tcData.student.casteCategory ===
								CASTE_CATEGORIES[4] && (
								<InputGroup
									label="Other Caste Category"
									value={
										tcData.student.otherCasteCategory || ""
									}
									onChange={(e) =>
										updateStudent("otherCasteCategory", e)
									}
									required={false}
								/>
							)}
						</div>
					</div>
					<div className="md:col-span-2">
						<InputGroup
							label="Address"
							value={tcData.student.residentialAddress || ""}
							onChange={(e) =>
								updateStudent("residentialAddress", e)
							}
							required={false}
						/>
					</div>
					<InputGroup
						label="Admission Number"
						value={tcData.meta.admissionNumber || ""}
						onChange={(e) =>
							updateCertificateMeta("admissionNumber", e)
						}
						required={true}
					/>
					<InputGroup
						label="Class of Admission"
						value={tcData.student.classOfFirstAdmission || ""}
						onChange={(e) =>
							updateStudent("classOfFirstAdmission", e)
						}
						required={false}
					/>
					<InputGroup
						label="Date of Admission"
						value={tcData.student.dateOfFirstAdmission}
						onChange={(e) =>
							updateStudent("dateOfFirstAdmission", e)
						}
						required={true}
						type="date"
					/>
					<InputGroup
						label="Date of Leaving"
						value={tcData.student.dateOfLeaving}
						onChange={(e) => updateStudent("dateOfLeaving", e)}
						required={true}
						type="date"
					/>
					<InputGroup
						label="Class of Leaving"
						value={tcData.student.classAtLeaving}
						onChange={(e) => updateStudent("classAtLeaving", e)}
						required={true}
					/>
					<InputGroup
						label="Date of Application"
						value={tcData.student.dateOfApplication || ""}
						onChange={(e) => updateStudent("dateOfApplication", e)}
						required={false}
						type="date"
					/>
					<InputGroup
						label="Date of Issue"
						value={tcData.meta.dateOfIssue}
						onChange={(e) => {
							updateStudent("dateOfIssueOnCert", e);
							updateCertificateMeta("dateOfIssue", e);
						}}
						required={true}
						type="date"
					/>
					<SelectGroup
						label="Result"
						value={tcData.student.result || ""}
						onChange={(e) => updateStudent("result", e)}
						options={RESULTS}
						required={true}
					/>
					<SelectGroup
						label="All Dues Paid"
						value={tcData.student.allDuesPaid ? "Yes" : "No"}
						onChange={(e) =>
							updateStudent("allDuesPaid", e === "Yes")
						}
						options={["Yes", "No"]}
						required={true}
					/>
					<SelectGroup
						label="Promoted"
						value={
							tcData.student.qualifiedForPromotion ? "Yes" : "No"
						}
						onChange={(e) =>
							updateStudent("qualifiedForPromotion", e === "Yes")
						}
						options={["Yes", "No"]}
						required={true}
					/>
					<SelectGroup
						label="Printed Parent"
						value={tcData.student.printedParent || ""}
						onChange={(e) => updateStudent("printedParent", e)}
						options={PRINTED_PARENT}
						required={true}
					/>
					<InputGroup
						label="Total Working Days"
						value={tcData.student.totalWorkingDays || ""}
						onChange={(e) => updateStudent("totalWorkingDays", e)}
						required={true}
					/>
					<InputGroup
						label="Total Days Attended"
						value={tcData.student.totalDaysPresent || ""}
						onChange={(e) => updateStudent("totalDaysPresent", e)}
						required={true}
					/>
					<InputGroup
						label="NCC Scout Guide"
						value={tcData.student.nccScoutGuide || ""}
						onChange={(e) => updateStudent("nccScoutGuide", e)}
						required={false}
					/>
					<InputGroup
						label="Extracurricular Activities"
						value={tcData.student.gamesAndExtracurricular || ""}
						onChange={(e) =>
							updateStudent("gamesAndExtracurricular", e)
						}
						required={false}
					/>
					<InputGroup
						label="General Conduct"
						value={tcData.student.generalConduct || ""}
						onChange={(e) => updateStudent("generalConduct", e)}
						required={true}
					/>
					<InputGroup
						label="Reason of Leaving"
						value={tcData.student.reasonForLeaving || ""}
						onChange={(e) => updateStudent("reasonForLeaving", e)}
						required={false}
					/>
					<InputGroup
						label="Remarks"
						value={tcData.student.otherRemarks || ""}
						onChange={(e) => updateStudent("otherRemarks", e)}
						required={false}
					/>
				</div>
			</section>
			{/* Right Section */}
			<section className="w-7/12 h-screen bg-slate-200 overflow-y-auto border-r p-8 text-slate-800">
				{/*  */}
			</section>
		</div>
	);
};

export default GenerateTCPage;
