// app/generate/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TCData } from "@/lib/types";
import { getDefaults } from "@/lib/defaults";
import { saveFormData, loadFormData, clearAll } from "@/lib/storage";

export default function GeneratePage() {
	// 1. The "Brain": State management initialized with defaults
	const [tcData, setTcData] = useState<TCData>(getDefaults());
	const [isLoaded, setIsLoaded] = useState(false);

	// 2. On Mount: Check localStorage for saved data
	useEffect(() => {
		const savedData = loadFormData();
		if (savedData) {
			setTcData(savedData);
		}
		setIsLoaded(true); // Prevents hydration mismatch flashing
	}, []);

	// 3. On Change: Auto-save to localStorage whenever tcData changes
	useEffect(() => {
		if (isLoaded) {
			saveFormData(tcData);
		}
	}, [tcData, isLoaded]);

	// 4. Action Handlers
	const handleClearAll = () => {
		if (
			confirm(
				"Are you sure you want to wipe everything, including school details?",
			)
		) {
			clearAll();
			setTcData(getDefaults());
		}
	};

	const handleNextStudent = () => {
		// Keep school and meta, wipe ONLY student data
		setTcData((prev) => ({
			...prev,
			student: getDefaults().student,
		}));
		// Note: We don't need to call saveFormData here because the useEffect above
		// will automatically catch this state change and save it!
	};

	// State updater helper for nested objects
	const updateSchool = (field: keyof TCData["school"], value: string) => {
		setTcData((prev) => ({
			...prev,
			school: { ...prev.school, [field]: value },
		}));
	};

	const updateStudent = (
		field: keyof TCData["student"],
		value: string | boolean,
	) => {
		setTcData((prev) => ({
			...prev,
			student: { ...prev.student, [field]: value },
		}));
	};

	// Prevent rendering until we've checked localStorage (fixes Next.js hydration errors)
	if (!isLoaded) return <div className="min-h-screen bg-slate-50"></div>;

	return (
		<div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
			{/* --- TOP NAVIGATION BAR --- */}
			<header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
				<div className="flex items-center gap-4">
					<Link
						href="/"
						className="text-slate-500 hover:text-slate-900 font-medium"
					>
						← Home
					</Link>
					<h1 className="text-lg font-bold text-slate-800 border-l border-slate-300 pl-4">
						TC Generator
					</h1>
				</div>

				{/* Top Action Buttons */}
				<div className="flex items-center gap-3">
					<button
						onClick={handleClearAll}
						className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
					>
						Clear Fields
					</button>
					<button
						onClick={handleNextStudent}
						className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
					>
						Next Student
					</button>
				</div>
			</header>

			{/* --- MAIN SPLIT SCREEN --- */}
			<main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
				{/* LEFT PANEL: The Form (40%) */}
				<section className="w-full lg:w-5/12 h-full bg-white border-r border-slate-200 overflow-y-auto p-6">
					<div className="max-w-md mx-auto space-y-8 pb-20">
						{/* School Info Section */}
						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-slate-800 border-b pb-2">
								School Details
							</h2>
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									School Name
								</label>
								<input
									type="text"
									value={tcData.school.schoolName}
									onChange={(e) =>
										updateSchool(
											"schoolName",
											e.target.value,
										)
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="e.g. Delhi Public School"
								/>
							</div>
						</div>

						{/* Student Info Section */}
						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-slate-800 border-b pb-2">
								Student Details
							</h2>
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Student Name
								</label>
								<input
									type="text"
									value={tcData.student.studentName}
									onChange={(e) =>
										updateStudent(
											"studentName",
											e.target.value,
										)
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="e.g. Rahul Kumar"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* RIGHT PANEL: The Preview (60%) */}
				<section className="w-full lg:w-7/12 h-full bg-slate-100 overflow-y-auto p-8 flex justify-center">
					{/* The A4 Paper Simulation */}
					<div className="bg-white shadow-xl ring-1 ring-slate-900/5 w-full max-w-[210mm] min-h-[297mm] p-12 transition-all">
						{/* Preview Content */}
						<div className="border-4 border-double border-slate-800 h-full p-8 flex flex-col items-center">
							{/* Dynamic Header */}
							<h1 className="text-2xl font-serif font-bold text-center uppercase tracking-wide">
								{tcData.school.schoolName || "[SCHOOL NAME]"}
							</h1>

							<h2 className="text-xl font-serif font-bold mt-6 tracking-[0.2em] uppercase">
								Transfer Certificate
							</h2>

							<hr className="w-full border-slate-800 my-6" />

							{/* Dynamic Body */}
							<div className="w-full space-y-4 font-sans text-sm">
								<div className="flex">
									<span className="w-8">1.</span>
									<span className="w-1/3 font-semibold">
										Name of Pupil:
									</span>
									<span className="border-b border-dashed border-slate-400 flex-1 uppercase font-semibold">
										{tcData.student.studentName}
									</span>
								</div>
								{/* More fields will go here... */}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
