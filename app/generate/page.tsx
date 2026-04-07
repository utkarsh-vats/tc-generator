// /app/generate/page.tsx

"use client";
import { useState, useEffect } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { SelectGroup } from "@/components/ui/select-group";
import { getDefaults } from "@/lib/defaults";
import { saveSchoolInfo, loadSavedSchools, SavedSchools } from "@/lib/storage";
import { generateAcknowledgement } from "@/lib/acknowledgement";
import {
	TCData,
	BOARDS,
	CASTE_CATEGORIES,
	GENDERS,
	RESULTS,
	PRINTED_PARENT,
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

	const handleAddNewSchool = () => {
		setTcData((prev) => ({ ...prev, school: getDefaults().school }));
		setShowSchoolModal(true);
	};

	const handleSaveSchoolModal = () => {
		saveSchoolInfo(tcData.school);
		setSavedSchools(loadSavedSchools() || []);
		setShowSchoolModal(false);
	};

	return (
		<div className="min-h-screen flex flex-col lg:flex-row bg-slate-100 relative">
			{/* Left Section */}
			<section className="w-full lg:w-5/12 xl:w-2/5 h-auto lg:h-screen bg-slate-50 lg:overflow-y-auto lg:border-r px-4 pt-4 pb-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 lg:pb-4 text-slate-800">
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
						<h1 className="text-2xl font-bold text-slate-800">
							Generate TC
						</h1>
						<div className="flex gap-3">
							<button
								onClick={handleAddNewSchool}
								className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md font-semibold transition-colors"
							>
								+ New School
							</button>
							<button
								onClick={() => setShowSchoolModal(true)}
								className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-semibold transition-colors disabled:opacity-50"
								disabled={!tcData.school.schoolID} // Prevent editing if no school is selected
							>
								Edit Active
							</button>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex flex-col">
							<label className="block text-sm font-medium text-slate-700 mb-1">
								Select Active School
							</label>
							<select
								className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 h-10"
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
									Select School...
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
							required={true}
						/>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-10">
					<div className="mb-6 flex items-center gap-2">
						<div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
						<h2 className="text-xl font-bold text-slate-800">
							Student Details
						</h2>
					</div>
					<hr className="border-slate-300 mb-4" />
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
											tcData.student.otherCasteCategory ||
											""
										}
										onChange={(e) =>
											updateStudent(
												"otherCasteCategory",
												e,
											)
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
							onChange={(e) =>
								updateStudent("dateOfApplication", e)
							}
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
								tcData.student.qualifiedForPromotion
									? "Yes"
									: "No"
							}
							onChange={(e) =>
								updateStudent(
									"qualifiedForPromotion",
									e === "Yes",
								)
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
							onChange={(e) =>
								updateStudent("totalWorkingDays", e)
							}
							required={true}
						/>
						<InputGroup
							label="Total Days Attended"
							value={tcData.student.totalDaysPresent || ""}
							onChange={(e) =>
								updateStudent("totalDaysPresent", e)
							}
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
							onChange={(e) =>
								updateStudent("reasonForLeaving", e)
							}
							required={false}
						/>
						<InputGroup
							label="Remarks"
							value={tcData.student.otherRemarks || ""}
							onChange={(e) => updateStudent("otherRemarks", e)}
							required={false}
						/>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sticky bottom-4 z-10 flex justify-between items-center mt-2">
					<button
						onClick={() =>
							setTcData((prev) => ({
								...prev,
								student: getDefaults().student,
								meta: getDefaults().meta,
							}))
						}
						className="text-sm font-bold text-slate-500 hover:text-red-600 px-4 py-2 rounded-md transition-colors"
					>
						Clear Data
					</button>
					<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-lg shadow-sm transition-colors">
						Preview TC ✨
					</button>
				</div>
			</section>
			{/* Right Section */}
			<section className="w-full lg:w-7/12 xl:w-3/5 h-auto lg:h-screen bg-slate-200 lg:overflow-y-auto p-4 sm:p-8 text-slate-800 flex flex-col items-center">
				<div className="bg-white w-full max-w-xl aspect-[1/1.414] shadow-2xl p-8 sm:p-12 flex flex-col border border-slate-200 rounded-sm">
					<h1 className="text-2xl font-bold text-center mb-8 uppercase underline tracking-wider">
						Transfer Certificate Preview
					</h1>

					{/* The Live Data Stream */}
					<div className="text-lg leading-loose text-justify font-serif">
						{generateAcknowledgement(tcData)}
					</div>
				</div>
			</section>

			{showSchoolModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
					<div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-bold text-slate-800">
								School Profile
							</h2>
							{savedSchools.length > 0 && (
								<button
									onClick={() => setShowSchoolModal(false)}
									className="text-slate-400 hover:text-slate-600 font-bold text-xl"
								>
									X
								</button>
							)}
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-800">
							<InputGroup
								label="School Name"
								value={tcData.school.schoolName}
								onChange={(e) => updateSchool("schoolName", e)}
								required={true}
							/>
							<InputGroup
								label="Address"
								value={tcData.school.schoolAddress}
								onChange={(e) =>
									updateSchool("schoolAddress", e)
								}
								required={true}
							/>
							<div className="flex md:col-span-2 gap-4">
								<div className="w-1/2">
									<SelectGroup
										label="Board"
										value={
											tcData.school.boardAffiliation || ""
										}
										onChange={(e) =>
											updateSchool("boardAffiliation", e)
										}
										required={true}
										options={BOARDS}
									/>
								</div>
								<div className="w-1/2">
									{tcData.school.boardAffiliation ===
										BOARDS[3] && (
										<InputGroup
											label="Other Board"
											value={
												tcData.school.boardNameCustom ||
												""
											}
											onChange={(e) =>
												updateSchool(
													"boardNameCustom",
													e,
												)
											}
											required={false}
										/>
									)}
								</div>
							</div>
							<InputGroup
								label="Affiliation Number"
								value={tcData.school.affiliationNumber || ""}
								onChange={(e) =>
									updateSchool("affiliationNumber", e)
								}
								required={false}
							/>
							<InputGroup
								label="School Code"
								value={tcData.school.schoolCode || ""}
								onChange={(e) => updateSchool("schoolCode", e)}
								required={false}
							/>
							<InputGroup
								label="Contact Number"
								value={tcData.school.schoolPhone || ""}
								onChange={(e) => updateSchool("schoolPhone", e)}
								required={false}
							/>
							<InputGroup
								label="Email"
								value={tcData.school.schoolEmail || ""}
								onChange={(e) => updateSchool("schoolEmail", e)}
								required={false}
							/>
							<InputGroup
								label="Logo URL"
								value={tcData.school.schoolLogoUrl || ""}
								onChange={(e) =>
									updateSchool("schoolLogoUrl", e)
								}
								required={false}
							/>
							<InputGroup
								label="Heading Subtitle"
								value={tcData.school.schoolSubtitle || ""}
								onChange={(e) =>
									updateSchool("schoolSubtitle", e)
								}
								required={false}
							/>
						</div>
						<div className="mt-8 flex justify-end">
							<button
								onClick={handleSaveSchoolModal}
								className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
							>
								Save School Details
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GenerateTCPage;
