import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function SearchBar() {
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="px-4 pt-2">
      <div
        onClick={() => navigate({ to: "/doctors" })}
        className={`flex cursor-pointer items-center gap-2 rounded-[14px] border bg-[--color-wcc-mist] px-3.5 py-3 transition-all duration-300 ${
          focused
            ? "border-[--color-wcc-sage] shadow-[0_0_0_3px_rgba(86,114,87,0.18)]"
            : "border-transparent"
        }`}
      >
        <Search
          size={18}
          className={`transition-all duration-300 ${focused ? "translate-x-[3px] text-[--color-wcc-green-deep]" : "text-[--color-wcc-sage]"}`}
        />
        <input
          type="text"
          placeholder="Search doctors, symptoms, medicines"
          onFocus={() => {
            setFocused(true);
            navigate({ to: "/doctors" });
          }}
          onBlur={() => setFocused(false)}
          readOnly
          className="flex-1 cursor-pointer bg-transparent text-[14px] text-[--color-wcc-ink] outline-none placeholder:text-[--color-wcc-muted]"
        />
      </div>
    </div>
  );
}
