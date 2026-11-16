import ConstellationField from "@/components/ui/constellation-field";

export default function ConstellationFieldDemo() {
  return (
    <div className="relative h-[640px] w-full overflow-hidden rounded-2xl border border-sky-500/20 bg-[#02040a] shadow-[0_0_35px_rgba(44,103,237,0.25)]">
      <ConstellationField
        mode="auto"
        speed={1}
        size={1}
        strokeWidth={1}
        length={1}
        density={1}
        opacity={1}
        hue={0}
        saturation={1}
        brightness={1}
      />
    </div>
  );
}
