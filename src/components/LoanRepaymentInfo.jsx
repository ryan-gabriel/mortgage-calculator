const LoanRepaymentInfo = ({monthlyPayment, firstMonthInterestPart, firstMonthPrincipalPart, taxes, insurance, totalAdditionalCosts}) => {
  return (
    <>
      <div className="mb-6">
        <h2
          className="text-4xl font-bold text-[#004481] leading-[1.2]"
          style={{ fontFamily: "'Inter', 'Roboto', Arial, sans-serif" }}
        >
          £
          {Number(monthlyPayment).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
        <p className="text-[#6C757D] text-sm mt-1">
          Based on your inputs above.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#F9FAFB] rounded-lg p-6 shadow border border-[#E1E4E8]">
          <h3 className="text-lg font-semibold text-[#212529] mb-4">
            Loan Repayment Breakdown (First Month)
          </h3>
          <div className="flex justify-between mb-2">
            <span>Principal</span>
            <span>
              £{Number(firstMonthPrincipalPart).toFixed(2)} (
              {monthlyPayment > 0
                ? (
                    (Number(firstMonthPrincipalPart) / monthlyPayment) *
                    100
                  ).toFixed(1)
                : 0}
              %)
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Interest</span>
            <span>
              £{Number(firstMonthInterestPart).toFixed(2)} (
              {monthlyPayment > 0
                ? (
                    (Number(firstMonthInterestPart) / monthlyPayment) *
                    100
                  ).toFixed(1)
                : 0}
              %)
            </span>
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden flex">
            <div
              className="bg-blue-600"
              style={{
                width: `${
                  monthlyPayment > 0
                    ? (Number(firstMonthPrincipalPart) / monthlyPayment) * 100
                    : 0
                }%`,
              }}
              title={`Principal: £${Number(firstMonthPrincipalPart).toFixed(
                2
              )}`}
            />
            <div
              className="bg-red-500"
              style={{
                width: `${
                  monthlyPayment > 0
                    ? (Number(firstMonthInterestPart) / monthlyPayment) * 100
                    : 0
                }%`,
              }}
              title={`Interest: £${Number(firstMonthInterestPart).toFixed(2)}`}
            />
          </div>
        </div>

        <div className="bg-[#F9FAFB] rounded-lg p-6 shadow border border-[#E1E4E8]">
          <h3 className="text-lg font-semibold text-[#212529] mb-4">
            Additional Costs
          </h3>
          <div className="flex justify-between mb-2">
            <span>Taxes</span>
            <span>£{Number(taxes || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Insurance</span>
            <span>£{Number(insurance || 0).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-semibold">
            <span>Total Additional Costs</span>
            <span>£{totalAdditionalCosts}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanRepaymentInfo;
