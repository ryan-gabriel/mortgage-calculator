import { useState, useEffect } from "react";
import { CollapsibleSection } from "./CollapsibleSection";
import LoanRepaymentInfo from "./LoanRepaymentInfo";
import LoanSummary from "./LoanSummary";
import Chart from "./Chart";


export default function MainContent() {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("25");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("fixed");
  const [offsetAccount, setOffsetAccount] = useState(false);
  const [overpayment, setOverpayment] = useState(false);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState("");
  const [taxes, setTaxes] = useState("");
  const [insurance, setInsurance] = useState("");
  const [showInterestTooltip, setShowInterestTooltip] = useState(false);

  const [amortizationData, setAmortizationData] = useState([]);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);
  const [actualLoanTermMonths, setActualLoanTermMonths] = useState(0);

  function calculateMonthlyPayment(principal, annualInterestRate, years) {
    if (!principal || !years || principal <= 0 || years <= 0) {
      return 0;
    }

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = years * 12;

    if (monthlyInterestRate === 0) {
      return (principal / numberOfPayments).toFixed(2);
    }

    const payment =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    return payment.toFixed(2);
  }

  const monthlyPayment = Number(
    calculateMonthlyPayment(
      Number(loanAmount),
      Number(interestRate),
      Number(loanTerm)
    )
  );

  useEffect(() => {
    const generateAmortizationSchedule = () => {
      const data = [];
      let currentBalance = Number(loanAmount); 
      const totalPaymentsScheduled = Number(loanTerm) * 12; 
      const currentMonthlyInterestRate = Number(interestRate) / 100 / 12;
      const currentFixedMonthlyPayment = monthlyPayment; 
      const extraPayment = overpayment ? Number(monthlyOverpayment) || 0 : 0;

      let accumulatedInterest = 0; 
      let actualMonthsCount = 0; 

      if (currentBalance <= 0 || totalPaymentsScheduled <= 0 || isNaN(currentBalance)) {
        setAmortizationData([]);
        setTotalInterestPaid(0);
        setActualLoanTermMonths(0);
        return;
      }

      for (let i = 1; i <= totalPaymentsScheduled; i++) {
        actualMonthsCount = i;

        let interestDueThisMonth = currentBalance * currentMonthlyInterestRate;

        if (currentBalance < 0.01) {
            interestDueThisMonth = 0;
        }

        accumulatedInterest += interestDueThisMonth;

        const totalPaymentForMonth = currentFixedMonthlyPayment + extraPayment;

        let principalPaidThisMonth = totalPaymentForMonth - interestDueThisMonth;

        if (currentBalance <= principalPaidThisMonth) {
          principalPaidThisMonth = currentBalance; 
          currentBalance = 0; 
        } else {
          currentBalance -= principalPaidThisMonth;
        }

        data.push({
          month: i,
          "Principal Paid": parseFloat(principalPaidThisMonth.toFixed(2)),
          "Interest Paid": parseFloat(interestDueThisMonth.toFixed(2)),
        });

        if (currentBalance <= 0) {
          break;
        }
      }
      setAmortizationData(data);
      setTotalInterestPaid(parseFloat(accumulatedInterest.toFixed(2)));
      setActualLoanTermMonths(actualMonthsCount); 
    };

    generateAmortizationSchedule();
  }, [
    loanAmount,
    loanTerm,
    interestRate,
    monthlyPayment,
    overpayment,
    monthlyOverpayment,
  ]);

  let firstMonthPrincipalPart = 0;
  let firstMonthInterestPart = 0;

  if (amortizationData.length > 0) {
    firstMonthPrincipalPart = amortizationData[0]["Principal Paid"];
    firstMonthInterestPart = amortizationData[0]["Interest Paid"];
  }

  const totalAdditionalCosts = (
    Number(taxes || 0) + Number(insurance || 0)
  ).toFixed(2);

  const actualLoanTermYears = Math.floor(actualLoanTermMonths / 12);
  const remainingMonths = actualLoanTermMonths % 12;

  return (
    <main className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-10 gap-8">

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
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="e.g. 250,000"
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
                min="0"
                step="1000"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-semibold text-[#212529]">
                Loan Term (years)
              </span>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
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
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g. 3.5"
                step="0.01"
                min="0"
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              />
              <span className="absolute right-3 top-9 text-[#6C757D] font-semibold">
                %
              </span>
              <button
                type="button"
                aria-label="What is interest rate?"
                className="absolute right-8 top-9 text-[#FFD43B] hover:text-[#FFC107] focus:outline-none"
                onClick={() => setShowInterestTooltip(!showInterestTooltip)}
              >
                ℹ
              </button>
              {showInterestTooltip && (
                <div className="absolute z-10 top-full left-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg w-48">
                  Interest rate is the percentage charged on your loan amount.
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-gray-400 hover:text-white"
                    onClick={() => setShowInterestTooltip(false)}
                  >
                    ✕
                  </button>
                </div>
              )}
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
                value={mortgageType}
                onChange={(e) => setMortgageType(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
              >
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
                <option value="tracker">Tracker</option>
              </select>
            </label>

            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={offsetAccount}
                onChange={(e) => setOffsetAccount(e.target.checked)}
                className="mr-2"
              />
              <span className="text-[#212529]">Offset Account</span>
            </label>

            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={overpayment}
                onChange={(e) => setOverpayment(e.target.checked)}
                className="mr-2"
              />
              <span className="text-[#212529]">Allow Overpayments</span>
            </label>

            {overpayment && (
              <label className="block mb-4">
                <span className="text-sm font-semibold text-[#212529]">
                  Monthly Overpayment (£)
                </span>
                <input
                  type="number"
                  value={monthlyOverpayment}
                  onChange={(e) => setMonthlyOverpayment(e.target.value)}
                  placeholder="e.g. 100"
                  min="0"
                  step="10"
                  className="mt-1 block w-full rounded-md border border-[#E1E4E8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004481]"
                />
              </label>
            )}
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
                value={taxes}
                onChange={(e) => setTaxes(e.target.value)}
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
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
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

        <section className="md:col-span-6 bg-white rounded-lg shadow p-6 flex flex-col">
          <LoanRepaymentInfo
            firstMonthInterestPart={firstMonthInterestPart}
            firstMonthPrincipalPart={firstMonthPrincipalPart}
            insurance={insurance}
            monthlyPayment={monthlyPayment}
            taxes={taxes}
            totalAdditionalCosts={totalAdditionalCosts}
          />

          <LoanSummary
            actualLoanTermMonths={actualLoanTermMonths}
            actualLoanTermYears={actualLoanTermYears}
            remainingMonths={remainingMonths}
            totalInterestPaid={totalInterestPaid}
          />

          <Chart
            amortizationData={amortizationData}
            monthlyPayment={monthlyPayment}
          />
        </section>
      </div>
    </main>
  );
}
