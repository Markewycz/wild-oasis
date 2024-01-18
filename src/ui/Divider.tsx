export default function Divider({ label }) {
  return (
    <div className="relative">
      <h2 className="text-center text-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2">
        {label}
      </h2>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </div>
  );
}
