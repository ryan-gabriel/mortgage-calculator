export default function BreakdownCards({ principal, interest, taxes, insurance }) {
  const totalPayment = principal + interest + (taxes ?? 0) + (insurance ?? 0);
  
  const percent = (amount) => ((amount / totalPayment) * 100).toFixed(1);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Loan Repayment Breakdown</h2>
        <div className="flex justify-between mb-2">
          <span>Principal</span>
          <span>${principal.toLocaleString()} ({percent(principal)}%)</span>
        </div>
        <div className="flex justify-between mb-6">
          <span>Interest</span>
          <span>${interest.toLocaleString()} ({percent(interest)}%)</span>
        </div>
        {/* Simple bar representation */}
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden flex">
          <div
            className="bg-blue-600"
            style={{ width: `${percent(principal)}%` }}
            title={`Principal: $${principal.toLocaleString()}`}
          />
          <div
            className="bg-red-500"
            style={{ width: `${percent(interest)}%` }}
            title={`Interest: $${interest.toLocaleString()}`}
          />
        </div>
      </div>

      {/* Additional Costs Card */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Additional Costs</h2>
        <div className="flex justify-between mb-2">
          <span>Taxes</span>
          <span>${taxes ? taxes.toLocaleString() : "0"} ({taxes ? percent(taxes) : "0"}%)</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Insurance</span>
          <span>${insurance ? insurance.toLocaleString() : "0"} ({insurance ? percent(insurance) : "0"}%)</span>
        </div>
        <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-semibold">
          <span>Total Additional Costs</span>
          <span>${(taxes + insurance).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
