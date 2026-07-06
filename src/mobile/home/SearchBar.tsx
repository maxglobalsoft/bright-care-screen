import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [focused, setFocused] = useState(false);
  return (
    <div className="px-4 pt-2">
      <div
        className={`flex items-center gap-2 rounded-[14px] bg-[--color-wcc-mist] px-3.5 py-3 transition-shadow duration-200 ${
          focused ? "shadow-[0_0_0_3px_rgba(86,114,87,0.18)]" : ""
        }`}
      >
        <Search size={18} className="text-[--color-wcc-sage]" />
        <input
          type="text"
          placeholder="Search doctors, symptoms, medicines..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-[14px] text-[--color-wcc-ink] outline-none placeholder:text-[--color-wcc-muted]"
        />
      </div>
    </div>
  );
}
