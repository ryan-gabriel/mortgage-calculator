import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ amortizationData, monthlyPayment }) => {
  return (
    <div className="flex-grow bg-[#F9FAFB] rounded-lg border border-[#E1E4E8] flex items-center justify-center text-[#6C757D] p-4">
      {amortizationData.length > 0 && monthlyPayment > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={amortizationData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: "Month", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{
                value: "Amount (£)",
                angle: -90,
                position: "insideLeft",
              }}
              tickFormatter={(value) => `£${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) =>
                `£${value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              }
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Principal Paid"
              stroke="#3CB371"
              strokeWidth={2}
              dot={false}
              name="Principal Paid"
            />
            <Line
              type="monotone"
              dataKey="Interest Paid"
              stroke="#FF6347"
              strokeWidth={2}
              dot={false}
              name="Interest Paid"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Enter loan details to see the amortization chart.</p>
      )}
    </div>
  );
};

export default Chart;
