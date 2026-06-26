import logoAsset from "@/assets/wcc-logo.jpg.asset.json";

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <img
      src={logoAsset.url}
      alt="WellnessCareConnect logo"
      style={{ width: size, height: size }}
      className="rounded-full object-cover ring-1 ring-black/10"
    />
  );
}

export function LogoLockup({
  tone = "dark",
  size = 28,
}: {
  tone?: "dark" | "light";
  size?: number;
}) {
  const text = tone === "light" ? "text-white" : "text-wcc-green-deep";
  return (
    <div className="flex items-center gap-2">
      <LogoMark size={size} />
      <span className={`font-sora text-[13px] font-bold leading-none ${text}`}>
        WellnessCareConnect
      </span>
    </div>
  );
}
