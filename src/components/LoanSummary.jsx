const LoanSummary = ({
  totalInterestPaid,
  actualLoanTermMonths,
  actualLoanTermYears,
  remainingMonths,
}) => {
  return (
    <div className="bg-[#F9FAFB] rounded-lg p-6 shadow border border-[#E1E4E8] mb-6">
      <h3 className="text-lg font-semibold text-[#212529] mb-4">
        Loan Summary
      </h3>
      <div className="flex justify-between mb-2">
        <span>Total Interest Paid</span>
        <span>
          £
          {totalInterestPaid.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Loan Paid Off In</span>
        <span>
          {actualLoanTermMonths > 0
            ? `${actualLoanTermYears} years, ${remainingMonths} months`
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default LoanSummary;
