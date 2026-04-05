import Link from "next/link";

export default function LandingPage() {
	return (
		// 1. The outermost wrapper: full height flex column, but NOT center-justified
		<div className="min-h-screen bg-slate-50 flex flex-col">
			{/* 2. Main Content: flex-grow makes this take up all available screen real estate.
             We center the content *inside* this specific container. */}
			<main className="grow flex flex-col justify-center items-center p-6">
				<div className="max-w-3xl text-center space-y-8">
					{/* Badge */}
					<div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
						<span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
						CBSE & State Board Compatible
					</div>

					{/* Hero Headline */}
					<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
						Generate Transfer Certificates in{" "}
						<span className="text-blue-600">Seconds.</span>
					</h1>

					{/* Sub-headline */}
					<p className="text-xl text-slate-600 max-w-2xl mx-auto">
						Stop typing in Word templates. Fill a simple form,
						generate a print-ready PDF, and get back to running your
						school.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
						<Link
							href="/generate"
							className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all w-full sm:w-auto"
						>
							Start Generating →
						</Link>
						<a
							href="#features"
							className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-all w-full sm:w-auto"
						>
							See Templates
						</a>
					</div>

					{/* Value Props */}
					<div
						className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left"
						id="features"
					>
						<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
							<h3 className="font-bold text-lg text-slate-900 mb-2">
								⚡️ Lightning Fast
							</h3>
							<p className="text-slate-600 text-sm">
								Fill the fields and see the PDF update
								instantly. No waiting, no loading spinners.
							</p>
						</div>
						<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
							<h3 className="font-bold text-lg text-slate-900 mb-2">
								💾 Auto-Saving
							</h3>
							<p className="text-slate-600 text-sm">
								Close the tab by accident? Your data is safely
								stored in your browser.
							</p>
						</div>
						<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
							<h3 className="font-bold text-lg text-slate-900 mb-2">
								🖨 Print-Ready
							</h3>
							<p className="text-slate-600 text-sm">
								Perfect A4 formatting. Just click print, stamp
								it, sign it, and you are done.
							</p>
						</div>
					</div>
				</div>
			</main>

			{/* 3. The Footer: mt-auto forces it to the bottom of the flex column. 
             It will respect the height of the main content above it. */}
			<footer className="w-full py-6 text-center text-slate-400 text-sm mt-auto">
				Built by Obtuse Labs
			</footer>
		</div>
	);
}
