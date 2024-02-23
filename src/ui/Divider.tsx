export default function Divider({ label }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg bg-background px-2">{label}</h2>
      <hr className="h-[2px] mb-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </div>
  );
}
