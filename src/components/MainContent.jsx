import { CollapsibleSection } from "./CollapsibleSection";

export default function MainContent() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-10 gap-8">

        {/* Left: Input Form */}
        <form
          className="md:col-span-4 bg-white rounded-lg shadow p-6 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CollapsibleSection
            title="Loan Details"
            description="Enter the basic loan details to get started."
          >
            <label className="block mb-4">
              <span className="text-sm font-semibold text-[#212529]">
                Loan Amount (£)
              </span>
              <input
                type="number"
                placeholder="e.g. 250,000"
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-semibold text-[#212529]">
                Loan Term (years)
              </span>
              <select
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              >
                {[10, 15, 20, 25, 30].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-4 relative">
              <span className="text-sm font-semibold text-[#212529]">
                Interest Rate (%)
              </span>
              <input
                type="number"
                placeholder="e.g. 3.5"
                step="0.01"
                min="0"
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              />
              <span className="absolute right-3 top-9 text-[#6C757D] font-semibold">
                %
              </span>
            </label>
          </CollapsibleSection>

          <CollapsibleSection
            title="Mortgage Type & Options"
            description="Choose your mortgage type and any additional options."
          >
            <label className="block mb-4">
              <span className="text-sm font-semibold text-[#212529]">
                Mortgage Type
              </span>
              <select
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              >
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
                <option value="tracker">Tracker</option>
              </select>
            </label>

            <label className="flex items-center mb-3">
              <input type="checkbox" className="mr-2" />
              <span className="text-[#212529]">Offset Account</span>
            </label>

            <label className="flex items-center mb-3">
              <input type="checkbox" className="mr-2" />
              <span className="text-[#212529]">Allow Overpayments</span>
            </label>

            <label className="block mb-4">
              <span className="text-sm font-semibold text-[#212529]">
                Monthly Overpayment (£)
              </span>
              <input
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="10"
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              />
            </label>
          </CollapsibleSection>

          <CollapsibleSection
            title="Additional Costs"
            description="Include optional costs like property taxes and insurance."
          >
            <label className="block mb-4">
              <span className="text-sm font-semibold text-[#212529]">
                Property Taxes (£)
              </span>
              <input
                type="number"
                placeholder="Optional"
                min="0"
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-semibold text-[#212529]">
                Homeowner's Insurance (£)
              </span>
              <input
                type="number"
                placeholder="Optional"
                min="0"
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              />
            </label>
          </CollapsibleSection>

          <button
            type="submit"
            className="mt-auto bg-[#004481] text-white font-semibold rounded-lg py-3 hover:bg-[#0066A2] focus:outline-none focus:ring-4 focus:ring-[#0066A2] transition"
          >
            Calculate
          </button>
        </form>

        {/* Right: Placeholder content */}
        <section className="md:col-span-6 bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-gray-500">
          <p>📊 Loan summary and charts will appear here.</p>
        </section>
      </div>
    </main>
  );
}
