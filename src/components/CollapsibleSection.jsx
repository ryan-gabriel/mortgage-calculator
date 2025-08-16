import { useState } from "react";

export function CollapsibleSection({ title, description, children }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleCollapse = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <section className="mb-6 border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <button
        onClick={handleCollapse}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center font-semibold text-[#004481] text-lg mb-1"
      >
        <span>{title}</span>
        <span className="text-2xl select-none hover:cursor-pointer">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <p className="text-[#6C757D] text-sm mb-3">{description}</p>
      {isOpen && <div>{children}</div>}
    </section>
  );
}
