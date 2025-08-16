export default function Header() {
  return (
    <header className="bg-white shadow-sm p-6 mb-8">
      <h1
        className="text-[32px] font-bold text-[#004481] leading-[1.2] mb-2"
        style={{ fontFamily: "'Inter', 'Roboto', Arial, sans-serif" }}
      >
        Mortgage Calculator
      </h1>
      <p
        className="text-[16px] font-normal text-[#6C757D] leading-[1.5]"
        style={{ fontFamily: "'Inter', 'Roboto', Arial, sans-serif" }}
      >
        Calculate your monthly payments easily and make informed decisions.
      </p>
    </header>
  );
}
