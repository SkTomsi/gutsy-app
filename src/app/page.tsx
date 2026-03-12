import AccentButton from "@/components/custom/accent-button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="text-2xl font-extrabold tracking-tight ">Gutsy App</h1>
      <h1 className="text-2xl tracking-tight font-black">Gutsy App</h1>
      <AccentButton>Log a meal</AccentButton>
    </div>
  );
}
