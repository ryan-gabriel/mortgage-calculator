export default function Footer() {
  return (
    <footer
      className="bg-white border-t border-[#E1E4E8] mt-12 py-6 text-center text-[#6C757D]"
      style={{
        fontFamily: "'Inter', 'Roboto', Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.5",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Lloyds Banking Group. All rights
        reserved.
      </p>
    </footer>
  );
}
